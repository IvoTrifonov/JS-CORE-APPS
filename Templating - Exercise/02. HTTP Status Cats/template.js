(() => {
    (function renderCatTemplate() { 
        let template = document.getElementById('cat-template').innerHTML;
        
        let compiled = Handlebars.compile(template);
        let rendered = compiled({
            cats: window.cats
        });

        document.querySelector('#allCats ul').innerHTML = rendered;
    })();

    let loadButtons = document.getElementsByClassName('showBtn');
    [...loadButtons].forEach((button => {
        button.addEventListener('click', function toggleStatusInfo() {
            let statusInfoDiv = this.parentNode.querySelector('.status');
            
            if (this.textContent === 'Show status code') {
                statusInfoDiv.style.display = 'block';
                this.textContent = 'Hide status code';
            } else {
                statusInfoDiv.style.display = 'none';
                this.textContent = 'Show status code';
            }
        })
    }));
})();
