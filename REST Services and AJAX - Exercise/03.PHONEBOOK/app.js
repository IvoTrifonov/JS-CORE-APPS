function attachEvents() {
    document.getElementById('btnLoad')
    .addEventListener('click', loadNumbers );

    document.getElementById('btnCreate')
    .addEventListener('click', addNumber);

    function loadNumbers() {
        let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
        fetch(url)
        .then((request) => request.json())
        .then((data) => {
            if (data) {
                for (const key of Object.keys(data)) {
                    let person = data[key];
                    let name = person.person;
                    let phone = person.phone;
                    (key)
                    let delBtn = document.createElement('button');
                    delBtn.textContent = 'DELETE';
                    delBtn.addEventListener('click', function deleteNumber(e) {
                        let url = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`
                
                        fetch(url, {
                            method: 'DELETE'
                        })
                        .then(x => x.json())
                        .then(x => {
                            e.target.parentNode.remove();
                            loadNumbers();
                        });
                        
                        
                    });
    
                    let li = document.createElement('li');
                    li.textContent = `${name}:  ${phone} `;
                    li.appendChild(delBtn);
                    
                    document.getElementById('phonebook').appendChild(li);
                }
            }
        });
    }

    function addNumber() {
        let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
        let name = document.getElementById('person');
        let phone = document.getElementById('phone');
        let data = {
            'person': name.value,
            'phone': phone.value
        }

        fetch(url, {
            method: 'post',
            headers: { 'Content-type': 'application/json' }, 
            body: JSON.stringify(data)
        })
        .then(x => x.json())
        .then(x => {
            name.value = null;
            phone.value = null;
            loadNumbers();
        });
    }
}

attachEvents();