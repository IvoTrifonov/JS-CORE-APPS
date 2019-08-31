(async function() {
    const { getTemplateFunc, getTemplateString, registerPartial } = window.templates;

    await registerPartial('card', 'card');

    const cardsListFunc = await getTemplateFunc('cards-list');

    document.getElementById('contacts').innerHTML = cardsListFunc({contacts});

    const getCardParent = (el) => {
        const className = 'contact';
        let node = el.parentNode;
        while(!node) {
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentNode;
        }

        return node;
    };

    const handleDetails = ({ target }) => {
        const card = getCardParent(target);
        const details = card.querySelector('.details');
        details.style.display = details.style.display
            ? ''
            : 'block';
    };

    document.getElementById('contacts')
        .addEventListener('click', ({ target }) => {
            if (target.classList.contains('detailsBtn')) {
                handleDetails({target});
            }
        });
}());