(() => {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        createBtn: document.querySelector('button.add'),
        catches: document.getElementById('catches'),
    };
    
    elements.catches.children[0].style.display = 'none';

    elements.loadBtn.addEventListener('click', loadAllCatches);
    elements.createBtn.addEventListener('click', createCatch);
    
    function loadAllCatches() {
        fetch('https://fisher-game.firebaseio.com/catches.json')
        .then(handler)
        .then(showCatches)
    }

    function showCatches(data) {
        Object.keys(data).forEach((key) => {
            let catchElement = elements.catches.children[0].cloneNode(true);
            catchElement.style.display = 'inline-block';

            catchElement.setAttribute('data-id', key);
            catchElement.querySelector('input.angler').value = data[key].angler;
            catchElement.querySelector('input.weight').value = data[key].weight;
            catchElement.querySelector('input.species').value = data[key].species;
            catchElement.querySelector('input.location').value = data[key].location;
            catchElement.querySelector('input.bait').value = data[key].bait;
            catchElement.querySelector('input.captureTime').value = data[key].captureTime;

            catchElement.querySelector('button.update').addEventListener('click', updateCatch);
            catchElement.querySelector('button.delete').addEventListener('click', deleteCatch);

            elements.catches.appendChild(catchElement);
        });
        
        function deleteCatch(event) {
            let catchId = event.currentTarget.parentNode.getAttribute('data-id');
            
            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
                method: 'DELETE',

            })
            .then(handler)
            .then()
        }

        function updateCatch(event) {
            let catchId = event.currentTarget.parentNode.getAttribute('data-id');
            let catchElement = event.currentTarget.parentNode;

            let data = [...catchElement.children]
            .filter((element) => element.tagName === 'INPUT')
            .reduce((acc, curr) => {
                let prop = curr.className;
                acc[prop] = curr.value;
                return acc;
            }, {});

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
                method: 'PUT',
                body: JSON.stringify(data)
            })
            .then(handler)
            .then()
        }
    }

    function createCatch() {
        let catchElement = document.querySelector('fieldset#addForm');
        
        let data = [...catchElement.children]
        .filter((element) => element.tagName === 'INPUT')
        .reduce((acc, curr) => {
            let prop = curr.className;
            acc[prop] = curr.value;
            return acc;
        }, {});

        fetch('https://fisher-game.firebaseio.com/catches.json', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(handler)
        .then()

    }

    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Sth went WRONG. Error: ${response.statusText}`);
        }

        return response.json();
    }
})();

