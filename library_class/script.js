const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const cancelBtn = document.querySelector(".cancel");
const formDiv = document.querySelector(".new-book-form");
const newBookForm = document.querySelector(".form");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    let readResult = "";
    if (read) {
      readResult = "read";
    } else readResult = "not read yet";
    return `${title} by ${autor}, ${pages} pages, ${readResult}`;
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

const theLotr = new Book("The Lord of the Rings", "J.R.R. Tolkien", 500, false);

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
}

addBookToLibrary(theHobbit);
addBookToLibrary(theLotr);

function displayBook(book) {
  const bookDiv = document.createElement("div");
  const bookInfoDiv = document.createElement("div");
  const bookReadBtnDiv = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const removeBookBtn = document.createElement("span");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadBtn = document.createElement("button");
  const bookReadIcon = document.createElement("i");

  bookDiv.classList.add("book");
  bookInfoDiv.classList.add("book-info-container");
  bookReadBtn.classList.add("btn-read");
  bookReadIcon.classList.add("far");
  removeBookBtn.classList.add("btn-remove");
  bookReadBtnDiv.classList.add("book-read-btn-container");

  bookReadBtn.textContent = "Read: ";
  removeBookBtn.textContent = "×";

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;

  if (book.read === true) {
    bookReadIcon.classList.add("fa-check-circle");
  } else {
    bookReadIcon.classList.add("fa-times-circle");
  }

  container.appendChild(bookDiv);
  bookDiv.appendChild(bookInfoDiv);
  bookInfoDiv.appendChild(removeBookBtn);
  bookInfoDiv.appendChild(bookTitle);
  bookInfoDiv.appendChild(bookAuthor);
  bookInfoDiv.appendChild(bookPages);
  bookInfoDiv.appendChild(bookReadBtnDiv);
  bookReadBtnDiv.appendChild(bookReadBtn);
  bookReadBtn.appendChild(bookReadIcon);

  changeReadStatusOnClick(bookReadBtn, book);
  removeBookOnClick(removeBookBtn, book);
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

function changeReadStatusOnClick(btn, bookObj) {
  btn.addEventListener("click", () => {
    btn.querySelector("i").classList.toggle("fa-check-circle");
    btn.querySelector("i").classList.toggle("fa-times-circle");

    if (bookObj.read) {
      bookObj.read = false;
    } else {
      bookObj.read = true;
    }
    console.log(bookObj.read);
  });
}

function removeBookOnClick(btn, bookObj) {
  btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this book from Library?")) {
      console.log(bookObj);
      const bookIndex = myLibrary.indexOf(bookObj);
      console.log(bookIndex);
      myLibrary.splice(myLibrary.indexOf(bookObj), 1);

      const divBooks = document.querySelectorAll(".book");
      console.log(divBooks[bookIndex]);
      divBooks[bookIndex].remove();

      console.log(myLibrary);
    }
  });
}

function addNewBookByUser(event) {
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
  displayBook(newBook);
  console.log(myLibrary);
}

newBookBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);
window.addEventListener("click", (event) => {
  if (event.target == formDiv) {
    formDiv.style.display = "none";
    newBookForm.reset();
  }
});

newBookForm.addEventListener("submit", (event) => {
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      newBookForm.elements.title.value == myLibrary[i].title &&
      newBookForm.elements.author.value == myLibrary[i].author
    ) {
      alert("Book is already in the Library!");
      event.preventDefault();
      return;
    }
  }
  addNewBookByUser(event);
});

displayLibrary();
