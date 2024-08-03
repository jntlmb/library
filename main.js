// modal functionality
const modal = document.querySelector("#modal");
const openModal = document.querySelector("#open-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (modal.open) {
      modal.close();
    }
  }
});

// library and book handling
const library = [];

function Book(bookTitle, bookAuthor, bookPages, bookStatus) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
  this.bookStatus = bookStatus;
}

Book.prototype.changeBookStatus = function () {
  this.bookStatus = !this.bookStatus;
};

function addBookToLibrary(title, name, pages, status) {
  const bookObj = new Book(title, name, pages, status);
  library.push(bookObj);
}

// card container
const cardContainer = document.querySelector("#card-container");

function resetCardContainer() {
  cardContainer.innerHTML = "";
}

function printBooks(lib) {
  lib.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "p-2",
      "max-h-44",
      "border-[1px]",
      "rounded-md",
      "border-gray-700",
      "bg-gray-800",
      "flex",
      "flex-col",
      "justify-center"
    );

    const contentContainer = document.createElement("div");

    // title
    const title = document.createElement("h2");
    title.classList.add(
      "text-xl",
      "font-semibold",
      "text-center",
      "text-gray-200",
      "text-clip",
      "overflow-hidden"
    );
    title.textContent = data.bookTitle;

    // author
    const author = document.createElement("p");
    author.classList.add(
      "text-lg",
      "text-center",
      "text-gray-300",
      "text-clip",
      "overflow-hidden",
      "whitespace-nowrap"
    );
    author.innerHTML = `Author: ${data.bookAuthor}`;

    // pages
    const pages = document.createElement("p");
    pages.classList.add(
      "text-lg",
      "text-center",
      "text-gray-300",
      "text-clip",
      "overflow-hidden",
      "whitespace-nowrap"
    );
    pages.innerHTML = `Pages: ${data.bookPages}`;

    // button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "gap-2", "mt-4");

    // read button
    const readButton = document.createElement("button");
    readButton.classList.add(
      "p-2",
      "w-1/2",
      "border-[1px]",
      "rounded-md",
      "hover:opacity-70",
      "transition",
      "duration-150",
      "border-gray-700",
      "text-gray-200",
      "font-semibold"
    );

    const updateReadButton = () => {
      if (data.bookStatus) {
        readButton.classList.add("bg-green-600");
        readButton.classList.remove("bg-red-500");
        readButton.innerHTML = `<i class="bi bi-book"></i> Read`;
      } else {
        readButton.classList.add("bg-red-500");
        readButton.classList.remove("bg-green-600");
        readButton.innerHTML = `<i class="bi bi-book"></i> Not Read`;
      }
    };

    updateReadButton();

    readButton.addEventListener("click", () => {
      data.changeBookStatus();
      updateReadButton();
    });

    // remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add(
      "bg-gray-500",
      "p-2",
      "w-1/2",
      "border-[1px]",
      "rounded-md",
      "hover:opacity-70",
      "transition",
      "duration-150",
      "border-gray-700",
      "text-gray-200",
      "font-semibold"
    );
    removeButton.innerHTML = `<i class="bi bi-trash"></i> Remove`;

    removeButton.addEventListener("click", () => {
      card.remove();
      const index = lib.indexOf(data);
      if (index > -1) {
        lib.splice(index, 1);
      }
    });

    contentContainer.appendChild(title);
    contentContainer.appendChild(author);
    contentContainer.appendChild(pages);
    card.appendChild(contentContainer);

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
    card.appendChild(buttonContainer);

    cardContainer.appendChild(card);
  });
}

// form handling
const form = document.querySelector("#book-form");
const bookTitle = document.querySelector("#book-title");
const authorName = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatus = document.querySelector("#book-status");
const submitBtn = document.querySelector("#submit-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (bookTitle.value && authorName.value && bookPages.value) {
    addBookToLibrary(
      bookTitle.value,
      authorName.value,
      bookPages.value,
      bookStatus.checked
    );

    resetCardContainer();
    printBooks(library);

    resetForm();
  }
});

function resetForm() {
  modal.close();
  form.reset();
}
