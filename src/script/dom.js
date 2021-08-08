const UNREAD_BOOK_ID = 'books__unread';
const READ_BOOK_ID = 'books__read';
const BOOK_ITEMID = 'itemid';

function makeBook(title, author, year, isRead) {
    const UNREAD_BOOK_LIST = document.getElementById(UNREAD_BOOK_ID);
    const READ_BOOK_LIST = document.getElementById(READ_BOOK_ID);

    const createTitle = document.createElement('h3');
    createTitle.classList.add('title');
    createTitle.classList.add('card__title');
    createTitle.innerText = title;

    const createImage = document.createElement('img');
    createImage.setAttribute('src', './src/assets/images/open-book.png');
    createImage.setAttribute('alt', 'buku');
    createImage.classList.add('card__img');

    const createAuthor = document.createElement('p');
    createAuthor.classList.add('author');
    createAuthor.classList.add('card__author');
    createAuthor.innerText = author;

    const createYear = document.createElement('p');
    createYear.classList.add('year');
    createYear.classList.add('card__year');
    createYear.innerText = year;

    const containerButtonRead = document.createElement('div');
    containerButtonRead.classList.add('button__card');
    containerButtonRead.append(createUnreadButton(), createDeleteButton());

    const containerButtonUnread = document.createElement('div');
    containerButtonUnread.classList.add('button__card');
    containerButtonUnread.append(createReadButton(), createDeleteButton());

    const container = document.createElement('article');
    container.classList.add('card');
    
    if (isRead) {
        container.append(createTitle, createImage, createAuthor, createYear, containerButtonRead);
        READ_BOOK_LIST.append(container);
    }else {
        container.append(createTitle, createImage, createAuthor, createYear, containerButtonUnread);
        UNREAD_BOOK_LIST.append(container);
    }

    return container;
}

function createButton(buttonName, buttonClass, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonClass);
    button.innerText = buttonName;

    button.addEventListener('click', function(event){
        eventListener(event);
    });

    return button;
}

function createDeleteButton() {
    return createButton('Delete', 'btn__delete', function(event){
        removeBook(event.target.parentElement.parentElement);
    })
}

function removeBook(bookElement) {
    const bookPosition = books.findIndex(book => book.id === bookElement[BOOK_ITEMID]);

    const confirmUser = confirm('Yakin ingin dihapus ?');

    if (confirmUser) {
        books.splice(bookPosition, 1);

        bookElement.remove();
        updateDataToStorage();

        document.dispatchEvent(new Event('ondeleted'));
    }
}

function createReadButton() {
    return createButton('Read', 'btn__read', function(event){
        addBookToRead(event.target.parentElement.parentElement);
    })
}

function addBookToRead(bookElement) {
    const title = bookElement.querySelector('.title').innerText;
    const author = bookElement.querySelector('.author').innerText;
    const year = bookElement.querySelector('.year').innerText;
    
    const newBook = makeBook(title, author, year, true);
    const book = (books.find(book => book.id === bookElement[BOOK_ITEMID]));

    book.isRead = true;
    newBook[BOOK_ITEMID] = book.id;

    bookElement.remove();
    updateDataToStorage();
}

function createUnreadButton() {
    return createButton('Unread', 'btn__unread', function(event){
        addBookToUnread(event.target.parentElement.parentElement);
    })
}

function addBookToUnread(bookElement) {
    const title = bookElement.querySelector('.title').innerText;
    const author = bookElement.querySelector('.author').innerText;
    const year = bookElement.querySelector('.year').innerText;

    const newBook = makeBook(title, author, year, false);
    const book = (books.find(book => book.id === bookElement[BOOK_ITEMID]));

    book.isRead = false;
    newBook[BOOK_ITEMID] = book.id

    bookElement.remove();
    updateDataToStorage();
}

function addbook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isRead = document.getElementById('isRead').checked;

    const book = makeBook(title, author, year, isRead);
    const bookObject = composeToObject(title, author, year, isRead);

    book[BOOK_ITEMID] = bookObject.id;

    books.push(bookObject);
    updateDataToStorage();
};

function clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isRead').checked = false;
}

function searchBook(query) {
    const articles = document.querySelectorAll('article');

    articles.forEach(article => {
        if(article.querySelector('.title').innerText.match(new RegExp(query, "i"))) {
            article.style.display = 'flex';
        }else if (query === "") {
            article.style.display = 'flex';
        }else {
            article.style.display = 'none';
        }
    })
}

function clearText() {
    document.getElementById('title').innerText = "";
}