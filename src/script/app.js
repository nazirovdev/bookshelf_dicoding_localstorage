document.addEventListener('DOMContentLoaded', () => {
    const formSubmitBookself = document.getElementById('form__bookself');

    formSubmitBookself.addEventListener('submit', (event) => {
        event.preventDefault();
        addbook();
        clearInput();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('data berhasil disimpan');
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
});

document.addEventListener('ondeleted', () => {
    alert('Data berhasil dihapus');
})


const btnCari = document.getElementById('submitSearch');

btnCari.addEventListener('submit', (event) => {
    event.preventDefault();
    searchBook(document.getElementById('search').value);
});