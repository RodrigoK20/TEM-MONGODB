require('./styles/app.css');

import BookService from './services/BookService';
import UI from './UI.js';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
});


document.getElementById('book-form')
  .addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    const image = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addANewBook(formData);
    ui.renderMessage('Nuevo libro agregado', 'success',3000);

    e.preventDefault();


 //const bookService= new BookService();
 //bookService.postBook(formData);
  });

  document.getElementById('books-cards')
    .addEventListener('click', e =>{

      if (e.target.classList.contains('delete')){
       const ui =new UI()
       ui.deleteBook(e.target.getAttribute('_id'));
       ui.renderMessage('Libro eliminado', 'danger',2000);
      }
      e.preventDefault();
    });