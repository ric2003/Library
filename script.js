const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let infoStr = `${title} by ${author}, ${pages} pages, `;
        if (read) {
            return infoStr + "has read";
        } else {
            return infoStr + "not read yet";
        }
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log("Book added to library:", newBook);
    saveLibrary();
    displayBooks(); // Call the function to update the display
}


document.getElementById("bookRegisterForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var bookTitle = document.getElementById("bookTitle").value;
    var bookAuthor = document.getElementById("bookAuthor").value;
    var pageNum = document.getElementById("pageNum").value;
    var bookRead = false;

    console.log("Title:", bookTitle);
    console.log("Author:", bookAuthor);
    console.log("Pages:", pageNum);
    console.log("Read:", bookRead);

    addBookToLibrary(bookTitle, bookAuthor, pageNum, bookRead);
    document.getElementById("bookRegisterForm").style.display = "none"; // Re-hide the form
    document.getElementById("header").style.filter = "brightness(100%)";
    document.getElementById("library").style.filter = "brightness(100%)";
    document.getElementById("footer").style.filter = "brightness(100%)";
    document.getElementById("showFormButton").innerHTML="Add Book"
    document.getElementById("bookRegisterForm").reset();

});


// Show the form when the button is clicked
document.getElementById("showFormButton").addEventListener("click", function() {
    if(document.getElementById("showFormButton").innerHTML=="Add Book"){
        document.getElementById("bookRegisterForm").style.display = "flex";
        document.getElementById("header").style.filter = "brightness(70%)";
        document.getElementById("library").style.filter = "brightness(70%)";
        document.getElementById("footer").style.filter = "brightness(70%)";
        document.getElementById("showFormButton").style.setProperty("filter", "brightness(100%)", "important");
        document.getElementById("showFormButton").innerHTML="Close Form"
    }else{
        document.getElementById("bookRegisterForm").style.display = "none";
        document.getElementById("header").style.filter = "brightness(100%)";
        document.getElementById("library").style.filter = "brightness(100%)";
        document.getElementById("footer").style.filter = "brightness(100%)";
        document.getElementById("showFormButton").innerHTML="Add Book"
    }
});

function displayBooks() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = ""; // Clear previous content
    myLibrary.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container"); // Add this line to assign the CSS class

        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const hasReadLabel = document.createElement("label");
        const hasReadCheckbox = document.createElement("input");
        const deleteButton = document.createElement("button"); // Create delete button

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;

        hasReadCheckbox.type = "checkbox";
        hasReadCheckbox.checked = book.read;
        hasReadCheckbox.addEventListener("change", function() {
            book.read = hasReadCheckbox.checked;
            saveLibrary(); // Save the updated read status to localStorage
            displayBooks(); // Update the display to reflect changes
        });

        hasReadLabel.textContent = "Read: ";
        hasReadLabel.appendChild(hasReadCheckbox);

        deleteButton.className = "fa-solid fa-trash";
        deleteButton.style ="border: none;background-color: #E8EEF2;cursor: pointer;"
        deleteButton.addEventListener("click", function() {
            myLibrary.splice(index, 1); // Remove the book from the array
            saveLibrary(); // Save the updated library to localStorage
            displayBooks(); // Update the display
        });

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookContainer.appendChild(hasReadLabel);
        bookContainer.appendChild(deleteButton); // Append delete button to book container

        libraryContainer.appendChild(bookContainer);
    });
}

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
    const library = localStorage.getItem('myLibrary');
    if (library) {
        myLibrary.length = 0;
        JSON.parse(library).forEach(book => {
            myLibrary.push(new Book(book.title, book.author, book.pages, book.read));
        });
    }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.push(theHobbit);//starter book for everyone

loadLibrary();
displayBooks();
