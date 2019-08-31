(function attachEvents() {
    const btnLoadTowns = document.getElementById('btnLoadTowns');
    btnLoadTowns.addEventListener('click', attachTowns);

    function attachTowns() {
        const towns = document.getElementById('towns').value
            .split(', ')
            .map(town => {
                return { name: town };
            });
            
            renderTowns(towns);
    }

    function renderTowns(towns) {
        let template = document.getElementById('towns-template').innerHTML;
        let compiled = Handlebars.compile(template);
        let rendered = compiled({
            towns
        });

        document.querySelector('#root ul').innerHTML = rendered;
    }
}())
