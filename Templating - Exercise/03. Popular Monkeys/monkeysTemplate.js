(() => {
    (function renderMonkeyTemplate() {
        let template = document.getElementById('monkey-template').innerHTML;
        let compiled = Handlebars.compile(template);
        let rendered = compiled({
            monkeys: window.monkeys
        });

        document.querySelector('.monkeys').innerHTML = rendered;
    })()

    let loadInfoButtons = document.querySelectorAll('.monkey button');
    [...loadInfoButtons].forEach((button => {
        button.addEventListener('click', function showInfo() {
            let infoParagraph = this.parentNode.querySelector('p');
            infoParagraph.style.display === 'none' 
            ? infoParagraph.style.display = 'block' 
            : infoParagraph.style.display = 'none';
        });
    }))
})()