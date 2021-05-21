const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const cancelBtn = document.querySelector(".cancel");
const formDiv = document.querySelector(".new-book-form");
const newBookForm = document.querySelector(".form-container");

let myLibrary = [];

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

const theLotr = new Book("The LOTR", "J.R.R. Tolkien", 500, false);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = () => {
  let readResult = "";
  if (read) {
    readResult = "read";
  } else readResult = "not read yet";
  return `${title} by ${autor}, ${pages} pages, ${readResult}`;
};

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
}

addBookToLibrary(theHobbit);
addBookToLibrary(theLotr);

function displayBook(book) {
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookRead = document.createElement("i");

  bookDiv.classList.add("book");
  bookRead.classList.add("far");

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;

  if (book.read === true) {
    bookRead.classList.add("fa-check-circle");
  } else {
    bookRead.classList.add("fa-times-circle");
  }

  container.appendChild(bookDiv);
  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookRead);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    displayBook(book);
  });
}

function openForm() {
  formDiv.style.display = "block";
}

function closeForm() {
  formDiv.style.display = "none";
}

newBookBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);

newBookForm.addEventListener("submit", (event) => {
  const newBook = new Book(
    newBookForm.elements.title.value,
    newBookForm.elements.author.value,
    newBookForm.elements.pages.value,
    newBookForm.elements.read.checked
  );
  addBookToLibrary(newBook);
  event.preventDefault();
  newBookForm.reset();
  closeForm();
  console.log(myLibrary);
  displayBook(newBook);
});

console.log(theHobbit);
displayLibrary();
