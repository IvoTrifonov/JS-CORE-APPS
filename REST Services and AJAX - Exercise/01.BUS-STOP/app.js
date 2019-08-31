function getInfo() {
    let stopName = document.querySelector('#stopName');
    let busesUl = document.querySelector('#buses');

    let stopId = document.querySelector('#stopId');
    let url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;
    
    fetch(url)
    .then((info) => info.json())
    .then((data) => {
        busesUl.innerHTML = '';
        stopName.textContent = data.name;
        let buses = Object.entries(data.buses);
        
        for (const [busNumber, busTime] of buses) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busNumber} arrives in ${busTime}`;
            busesUl.appendChild(li);
        }
    })
    .catch(error => {
        stopName.textContent = 'Error!';
    })

    stopId.value = null;
}