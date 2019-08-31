function attachEvents() {
    let author = document.getElementById('author');
    let text = document.getElementById('content');
    let textArea = document.getElementById('messages');

    document.getElementById('submit')
    .addEventListener('click', postRequest);

    document.getElementById('refresh')
    .addEventListener('click', getAllMessages);
    
    function postRequest() {
        let url = 'https://rest-messanger.firebaseio.com/messanger.json';
        let data = {
            'author': author.value,
            'content': text.value
        }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })

        author.value = null;
        text.value = null;
    }

    function getAllMessages() {
        let url = 'https://rest-messanger.firebaseio.com/messanger.json';

        fetch(url)
        .then((request) => request.json())
        .then((data) => {
            for (const key of Object.values(data)) {
                textArea.textContent += `${key.author}: ${key.content}\n`;
            }
        });
    }
}

attachEvents();