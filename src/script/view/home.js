import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const searchBarElement = document.querySelector('note-search-bar');

  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteQueryWaitingElement = document.querySelector('note-query-waiting');
  const noteLoadingElement = document.querySelector('note-search-loading');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const showNotes = (query) => {
    showLoading();

    const result = Notes.searchNotes(query); // Menggunakan Notes.searchNotes() untuk pencarian
    displayResult(result);

    showNoteList();
  };

  const displayAllNotes = () => {
    showLoading();

    const allNotes = Notes.getAllNotes();
    displayResult(allNotes);

    showNoteList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();

    const { query } = event.detail;
    showNotes(query);
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };

  searchBarElement.addEventListener('search', onSearchHandler);
  displayAllNotes(); // Tampilkan semua catatan saat halaman dimuat
};

export default home;
