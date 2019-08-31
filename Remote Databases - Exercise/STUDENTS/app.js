(() => {
    const kinvey = {
        username: 'guest',
        password: 'guest',
        appKey: 'kid_S1c5U1GMS',
        appSecret: '9ad75207e9c74f4ea734b23c1f29a4be',
        baseURL: `https://baas.kinvey.com/appdata/kid_S1c5U1GMS/students`
    };

    const elements = {
        tbody: document.querySelector('tbody')
    };
    
    const headers = {
        credentials: 'include', 
        Authorization: 'Kinvey ' + localStorage.getItem('authToken')
    };

    fetch(kinvey.baseURL, headers)
    .then(response => response.json())
    .then(appendRecords)
    
    function appendRecords(records) {
        let idCounter = 1;
        [...records].forEach((record => {
            let tr = document.createElement('tr');
            let patternTd = document.createElement('td');

            let [idTd, firstNameTd, lastNameTd, factultyNumberTd, gradeTd] = [
                patternTd.cloneNode(),
                patternTd.cloneNode(),
                patternTd.cloneNode(),
                patternTd.cloneNode(),
                patternTd.cloneNode(),
            ];

            idTd.textContent = idCounter;
            firstNameTd.textContent = record.firstName;
            lastNameTd.textContent = record.lastName;
            factultyNumberTd.textContent = record.facultyNumber;
            gradeTd.textContent = record.grade;

            appendChildrenToParent([idTd, firstNameTd, lastNameTd, factultyNumberTd, gradeTd], elements.tbody);
            elements.tbody.appendChild(tr);
            idCounter++;
        }));

        function appendChildrenToParent(children, parent) {
            [...children].forEach(c => parent.appendChild(c));
        }
    }
})();

