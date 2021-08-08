const KEY_STORAGE = 'BOOKSELF_APPS';
let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser anda tidak mendukung API Storage');
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(KEY_STORAGE, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function updateDataToStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeToObject(title, author, year, isRead) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isRead,
    }    
}

function loadDataFromStorage() {
    const serialized = localStorage.getItem(KEY_STORAGE);
    const data = JSON.parse(serialized);
    
    if (data !== null) {
        books = data;
        document.dispatchEvent(new Event('ondataloaded'));
    }
}

function refreshDataFromBooks() {
    for(book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isRead);
        newBook[BOOK_ITEMID] = book.id;
    }
}