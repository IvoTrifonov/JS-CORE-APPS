function attachEvents() {
    const elements = {
        inputField: document.getElementById('location'),
        submitBtn: document.getElementById('submit'),
        forecastDiv: document.getElementById('forecast'),
        currentDiv: document.getElementById('current'),
        upcomingDiv: document.getElementById('upcoming')
    };

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    elements.submitBtn.addEventListener('click', getLocation)

    function getLocation(data) {
        elements.forecastDiv.style.display = 'block';
        fetch('https://judgetests.firebaseio.com/locations.json')
        .then(handler)
        .then((data) => {
            let location = data.find(x => x.name === elements.inputField.value);
            
            fetch(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`)
            .then(handler)
            .then((data) => showLocationWeather(data, location.code))
            
        })
        .catch((err) => {
            elements.forecastDiv.innerHTML = 'ERROR';
        })

        function showLocationWeather(data, code) {
            let divForecast = createHTMLElement('div', 'forecasts');
            
            let symbol = symbols[data.forecast.condition];
            let spanSymbol = createHTMLElement('span', ['condition', 'symbol'], symbol);
            
            let spanHolder = createHTMLElement('span', 'condition');
            
            let spanName = createHTMLElement('span', 'forecast-data', data.name);
            let degrees = `${data.forecast.low}°/${data.forecast.high}°`;
            let spanDegrees = createHTMLElement('span', 'forecast-data', degrees);
            let spanCondition = createHTMLElement('span', 'forecast-data', data.forecast.condition);

            spanHolder = appendChildrenToParent([spanName, spanDegrees, spanCondition], spanHolder);
            divForecast = appendChildrenToParent([spanSymbol, spanHolder], divForecast);
            elements.currentDiv.appendChild(divForecast);
            loadUpcomingWeather(code);
        }

        function loadUpcomingWeather(code) {
            fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handler)
            .then(showUpcomingWeather)
        }
        
        function showUpcomingWeather(datas) {
            let divForecastInfo = createHTMLElement('div', 'forecast-info');
            
            datas.forecast.forEach((data) => {
                let spanHolder = createHTMLElement('span', 'upcoming');

                let symbol = symbols[data.condition];
                let spanSymbol = createHTMLElement('span', 'symbol', symbol);
                let degrees = `${data.low}°/${data.high}°`;
                let spanDegrees = createHTMLElement('span', 'forecast-data', degrees);
                let spanCondition = createHTMLElement('span', 'forecast-data', data.condition);

                spanHolder = appendChildrenToParent([spanSymbol, spanDegrees, spanCondition], spanHolder);
                divForecastInfo.appendChild(spanHolder);
            });
            
            elements.upcomingDiv.appendChild(divForecastInfo);
        }

        function createHTMLElement(tagName, className, textContent) {
            let currentElement = document.createElement(tagName);

            if (className) {
                typeof className === 'object' ? 
                currentElement.classList.add(...className) :
                currentElement.classList.add(className);
            }

            if (textContent) {
                currentElement.textContent = textContent;
            }

            return currentElement;
        }

        function appendChildrenToParent(children, parent) {
            children.forEach((child) => parent.appendChild(child));
            return parent;
        }
    }

    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }

        return response.json();
    }
}

attachEvents();