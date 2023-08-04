// let myLibrary = [['The Hobbit', 'J.R.R. Toldien', false, ''],
// ['Lord of The Rings', 'J.R.R. Tolkien', true, 'nice book'],
// ['Harry Potter', 'J.K. Rowling', true, 'gogo HARRY']];

let myLibrary = [];

const libraryTable = document.querySelector('tbody');

//
function Book(title, author, read, notes) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.notes = notes;
}

Book.prototype.changeRead = function (count) {
    let colorChange = libraryTable.rows[count].cells[3];

    if (!this.read) {
        this.read = true;
        colorChange.classList.remove("readYes");
        colorChange.classList.add("readNot");
    }
    else {
        this.read = false;
        colorChange.classList.remove("readNot");
        colorChange.classList.add("readYes");
    }
}

function refreshLibrary() {
    let count = libraryTable.rows.length;
    let row = libraryTable.insertRow(count);

    let listNumber = row.insertCell(0);
    let title = row.insertCell(1);
    let author = row.insertCell(2);
    let read = row.insertCell(3);
    let notes = row.insertCell(4);
    let remove = row.insertCell(5);

    listNumber.textContent = count + 1;
    title.textContent = myLibrary[count].title;
    author.textContent = myLibrary[count].author;

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    if (myLibrary[count].read)
        checkbox.checked = true;
    read.appendChild(checkbox);
    myLibrary[count].changeRead(count);

    notes.textContent = myLibrary[count].notes;
    remove.innerHTML = "remove";
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("addBook").style.visibility = "hidden";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("addBook").style.visibility = "visible"
}

function cleanForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").checked = false;
    document.getElementById("notes").value = "";
}

const submitForm = document.querySelector("#myForm");
submitForm.addEventListener("submit", addBookToLibrary, false);

function addBookToLibrary(event) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let read = document.getElementById('read').checked;
    let notes = document.getElementById('notes').value;

    const book = new Book(title, author, read, notes);
    myLibrary.push(book);

    refreshLibrary();
    cleanForm();
    event.preventDefault();
}

//event listener for checkbox and remove
if (libraryTable.addEventListener) {
    libraryTable.addEventListener('click', handler, false);
} else if (libraryTable.atachEvent) {
    libraryTable.atachEvent('onclick', handler);
}

function handler(e) {
    if (e.target.type === 'checkbox') {
        let row = e.target.parentNode.parentNode.cells[0].innerHTML - 1;
        myLibrary[row].changeRead(row);
    } else if (e.target.innerHTML === "remove") {
        let count = e.target.parentNode.cells[0].innerHTML - 1;
        myLibrary.splice(count, 1);
        libraryTable.deleteRow(count);
    }
}
//end event listener for checkbox and remove