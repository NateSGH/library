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
  const bookInfoDiv = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const removeBookBtn = document.createElement("button");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadBtn = document.createElement("button");
  const bookReadIcon = document.createElement("i");

  bookDiv.classList.add("book");
  bookInfoDiv.classList.add("book-info-container");
  bookReadBtn.classList.add("btn-read");
  bookReadIcon.classList.add("far");
  removeBookBtn.classList.add("btn-remove");

  bookReadBtn.textContent = "Read: ";
  removeBookBtn.textContent = "Remove";

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
  bookInfoDiv.appendChild(bookTitle);
  bookInfoDiv.appendChild(bookAuthor);
  bookInfoDiv.appendChild(bookPages);
  bookInfoDiv.appendChild(bookReadBtn);
  bookReadBtn.appendChild(bookReadIcon);
  bookInfoDiv.appendChild(removeBookBtn);

  changeReadStatusOnClick(bookReadBtn, book);
  removeBookOnClick(removeBookBtn, book);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    displayBook(book);
  });
}

function openForm() {
  formDiv.style.display = "flex";
  formDiv.style.flexDirection = "column";
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
    console.log(bookObj);
    const bookIndex = myLibrary.indexOf(bookObj);
    console.log(bookIndex);
    myLibrary.splice(myLibrary.indexOf(bookObj), 1);

    const divBooks = document.querySelectorAll(".book");
    console.log(divBooks[bookIndex]);
    divBooks[bookIndex].remove();

    console.log(myLibrary);
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
  // displayLibrary();
  console.log(myLibrary);
}

newBookBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);

newBookForm.addEventListener("submit", (event) => {
  addNewBookByUser(event);
});

displayLibrary();

// let readBtns = document.getElementsByClassName("btn-read");
// console.log(readBtns);

// // for (i = 0; i < readBtns.length; i++) {
// //   console.log(readBtns[i]);
// // }

// [...readBtns].forEach((btn, index) => {
//   // Array.prototype.forEach.call(readBtns, function (btn) {
//   console.log(btn);
//   btn.addEventListener("click", () => {
//     console.log(btn);
//     console.log(readBtns);
//     //   btn.childNodes[1].classList.toggle("fa-check-circle");
//     //   btn.childNodes[1].classList.toggle("fa-times-circle");

//     //   if (myLibrary[index].read) {
//     //     myLibrary[index].read = false;
//     //   } else {
//     //     myLibrary[index].read = true;
//     //   }
//     //   console.log(myLibrary[index]);
//   });
// });
