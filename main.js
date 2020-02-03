"use strict"

let myLibrary = [];


function Book(title, author, pages, read = false) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}


Book.prototype.getHtml = function() {
  let libraryItem = document.createElement("div");
  libraryItem.classList.add("book");

  let title = document.createElement("h2");
  title.textContent = this.title;

  let info = document.createElement("ul");

  let author = document.createElement("li");
  author.textContent = `Author: ${this.author}`;

  let pages = document.createElement("li");
  pages.textContent = `Pages: ${this.pages > 0 ? this.pages : "unknown"}`;

  let read = document.createElement("li");
  read.textContent = `${this.read ? '' : 'not yet'} read`;

  libraryItem.append(title);

  info.append(author);
  info.append(pages);
  info.append(read);

  libraryItem.append(info);

  return libraryItem;
}


function addBookToLibrary(title, author, pages, read = false) {
  myLibrary.push(new Book(title, author, pages, read));
}


function render(library, parentNode) {
  library.forEach(book => {
    parentNode.append(book.getHtml());
  });
}


function toggleForm(button, form) {
  button.classList.toggle("invisible");
  form.classList.toggle("invisible");
}

function clearForm(form) {
  form.title.value = "";
  form.author.value = "";
  form.pages.value = "";
  form.read.value = "not-read";
}


function createNewBook(form) {
  let book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value > 0 || 0,
    form.read.value == "read"
  );

  return book;
}

// temporary
addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
addBookToLibrary("The Brothers Karamazov", "Fyodor Dostoyevsky", 776, true);
addBookToLibrary("Jane Eyre", "Charlotte Bronte", 502, false);
// console.log(myLibrary);

window.onload = () => {
  const newBookButton = document.getElementById("new-book-button");
  const newBookForm = document.getElementById("new-book-form");
  const submitBook = document.getElementById("submit-book");
  const allBooksDiv = document.getElementById("all-books");

  render(myLibrary, allBooksDiv);


  newBookButton.addEventListener("click", e => {
    toggleForm(newBookButton, newBookForm);
  });


  submitBook.addEventListener("click", e => {
    e.preventDefault();

    let book = createNewBook(newBookForm);
    allBooksDiv.append(book.getHtml());

    toggleForm(newBookButton, newBookForm);
    clearForm(newBookForm);
  });
}
