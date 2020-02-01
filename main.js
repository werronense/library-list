"use strict"

let myLibrary = [];


function Book(title, author, pages, read = false) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,

  this.info = function() {
    return (
      `${title} by ${author}, ${pages} pages, ${read ? '' : 'not yet'} read`
    );
  }
}


function addBookToLibrary(title, author, pages, read = false) {
  myLibrary.push(new Book(title, author, pages, read));
}


function renderBook(book) {
  let libraryItem = document.createElement("div");

  let title = document.createElement("h2");
  title.textContent = book.title;

  let info = document.createElement("ul");

  let author = document.createElement("li");
  author.textContent = `Author: ${book.author}`;

  let pages = document.createElement("li");
  pages.textContent = `Pages: ${book.pages}`;

  let read = document.createElement("li");
  read.textContent = `${read ? '' : 'not yet'} read`;

  libraryItem.append(title);

  info.append(author);
  info.append(pages);
  info.append(read);

  libraryItem.append(info);

  return libraryItem;
}


function render(library) {
  const allBooks = document.getElementById("all-books");

  library.forEach(book => {
    allBooks.append(renderBook(book));
  });
}

// temporary
addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
// console.log(myLibrary);

window.onload = () => {
  render(myLibrary);
}
