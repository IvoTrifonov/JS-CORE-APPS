const kinvey = {
    username: 'guest',
    password: 'guest',
    appKey: 'kid_S1c5U1GMS',
    appSecret: '9ad75207e9c74f4ea734b23c1f29a4be',
    baseURL: `https://baas.kinvey.com/appdata/kid_S1c5U1GMS/books`,
}

const elements = {
    submitBtn: document.querySelector('#submitBtn'),
    loadBooksBtn: document.querySelector('#loadBooks'),
    cancelEditBtn: document.querySelector('#cancelBtn'),
    doneEdit: document.querySelector('#editBtn'),
    inputTitle: document.querySelector('#title'),
    inputAuthor: document.querySelector('#author'),
    inputIsbn: document.querySelector('#isbn'),
    tbodyBooks: document.querySelector('.tbodyBooks'),
    h3FormHeading: document.querySelector('#formHeader')
}

elements.submitBtn.addEventListener('click', addBook);
elements.loadBooksBtn.addEventListener('click', loadBooks);
elements.doneEdit.addEventListener('click', editBook);
elements.cancelEditBtn.addEventListener('click', cancelEdit);

function addBook(ev) {
    ev.preventDefault();
    
    let title = elements.inputTitle.value;
    let author = elements.inputAuthor.value;
    let isbn = elements.inputIsbn.value;

    if (title && author && isbn) {
        dataObj = {
            title,
            author,
            isbn
        }
    
        const headers = {
            method: 'POST',
            body: JSON.stringify(dataObj),
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${kinvey.username}: ${kinvey.password}`),
            headers: {
                'Content-type': 'application/json'
            }
        };

        fetch(kinvey.baseURL, headers)
        .then(handler)
        .then(loadBooks)
        .catch(err => console.log(err))
        clearElementValue(elements.inputAuthor, elements.inputTitle, elements.inputIsbn);
    }
}

function loadBooks(params) {
    const headers = {
        credentials: 'include', 
        Authorization: 'Kinvey ' + localStorage.getItem('authToken')
    }

    fetch(kinvey.baseURL, headers)
    .then(handler)
    .then((data) => {
        elements.tbodyBooks.innerHTML = '';
        data.forEach((book) => {
            let trNextBook = document.createElement('tr');
            trNextBook.setAttribute('id', book._id);

            trNextBook.innerHTML = `<td> ${book.title}</td>
            <td> ${book.author}</td>
            <td> ${book.isbn}</td>
            <td>
                <button class="btnEdit" value="${book._id}">Edit</button>
                <button class="btnDelete" value="${book._id}">Delete</button>
            </td>`;

            trNextBook.querySelector('button.btnEdit')
            .addEventListener('click', () => loadEditForm(book._id));

            trNextBook.querySelector('button.btnDelete')
            .addEventListener('click', () => deleteBook(book._id));

            elements.tbodyBooks.appendChild(trNextBook);
        });
    })
    .catch(err => console.log(err))
}

function loadEditForm(bookId) {
    let dataToEdit = document.getElementById(bookId)
    .querySelectorAll('td');

    elements.h3FormHeading.textContent = 'EDIT BOOK';
    elements.inputTitle.value = dataToEdit[0].textContent;
    elements.inputAuthor.value = dataToEdit[1].textContent;
    elements.inputIsbn.value = dataToEdit[2].textContent;
    elements.submitBtn.style.display = 'none';
    elements.cancelEditBtn.style.display = 'block';
    elements.doneEdit.style.display = 'block';
    elements.doneEdit.value = bookId;
}

function editBook(ev) {
    ev.preventDefault();
    let bookId = ev.target.value;
    ev.target.value = '';

    const bookData = {
        'title': elements.inputTitle.value,
        'author': elements.inputAuthor.value,
        'isbn': elements.inputIsbn.value
    };
    
    let editUrl = `${kinvey.baseURL}/${bookId}`;

    let headers = {
        method: 'PUT',
        body: JSON.stringify(bookData),
        credentials: 'include',
        Authorization: 'Kinvey' + localStorage.getItem('authToken'),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(editUrl, headers)
    .then(response => response.json())
    .then(loadBooks)
    .catch(err => console.log(err))

    fromEditToSubmitForm();
}

function cancelEdit(ev) {
    ev.preventDefault();
    fromEditToSubmitForm();
}

function fromEditToSubmitForm(ev) {
    clearElementValue(elements.inputAuthor, elements.inputTitle, elements.inputIsbn);
    elements.h3FormHeading.textContent = 'FORM';

    elements.submitBtn.style.display = 'block';
    elements.cancelEditBtn.style.display = 'none';
    elements.doneEdit.style.display = 'none';
}

function clearElementValue(...arguments) {
    arguments.forEach((element) => {
        element.value = '';
    });
}

function deleteBook(bookId) {
    let deleteUrl = `${kinvey.baseURL}/${bookId}`;

    let headers = {
        method: 'DELETE',
        credentials: 'include',
        Authorization: 'Kinvey' + localStorage.getItem('authToken'),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(deleteUrl, headers)
    .then(handler)
    .then(loadBooks)
    .catch(err => console.log(err))
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error(response.status);
    }
    return response.json();
}