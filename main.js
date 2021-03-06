"use strict"

let myLibrary = [];

// Book constructor
function Book(title, author, pages, read = false) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

// method definitions
Book.prototype.getHtml = function() {
  let libraryItem = document.createElement("div");
  libraryItem.classList.add("book");

  let title = document.createElement("h2");
  title.textContent = this.title;

  let info = document.createElement("ul");

  let author = document.createElement("li");
  author.textContent = `Author: ${this.author}`;

  let pages = document.createElement("li");
  pages.textContent = `Pages: ${this.pages}`;

  let read = document.createElement("li");
  read.classList.add("read-status");
  read.textContent = `${this.read ? '' : 'not yet'} read`;

  libraryItem.append(title);

  info.append(author);
  if (this.pages > 0) {
    info.append(pages);
  }
  info.append(read);

  libraryItem.append(info);

  return libraryItem;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}


function addBookToLibrary(title, author, pages, read = false) {
  myLibrary.push(new Book(title, author, pages, read));
}


function render(library, parent) {
  library.forEach((book, i) => {
    let bookDiv = book.getHtml();
    bookDiv.dataset.index = i;

    let readButton = createReadButton();
    bookDiv.append(readButton);

    let removalButton = createRemovalButton();
    bookDiv.append(removalButton);

    parent.append(bookDiv);
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
    parseInt(form.pages.value) || 0,
    form.read.value == "read"
  );

  return book;
}


function createReadButton() {
  let readButton = document.createElement("button");
  readButton.textContent = "Change Read Status";

  readButton.addEventListener("click", e => {
    let parent = e.target.parentNode
    myLibrary[parent.dataset.index].toggleRead();

    parent.querySelector(".read-status").textContent =
      `${myLibrary[parent.dataset.index].read ? '' : 'not yet'} read`;
  });

  return readButton;
}


function createRemovalButton() {
  let removalButton = document.createElement("button");
  removalButton.textContent = "Remove";

  removalButton.addEventListener("click", e => {
    myLibrary[e.target.parentNode.dataset.index] = null;
    e.target.parentNode.classList.toggle("invisible");
  });

  return removalButton;
}


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
    if (newBookForm.checkValidity()) {
      e.preventDefault();

      let book = createNewBook(newBookForm);
      myLibrary.push(book);

      let bookDiv = book.getHtml();
      bookDiv.dataset.index = myLibrary.length - 1;
      bookDiv.append(createReadButton());
      bookDiv.append(createRemovalButton());

      allBooksDiv.append(bookDiv);

      toggleForm(newBookButton, newBookForm);
      clearForm(newBookForm);
    }
  });
}
