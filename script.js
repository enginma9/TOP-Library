const myLibrary = [];

/* 
false, "title", pages, "author"
false, "Tale of Two Cities", 448, "Charles Dickens"
false, "Farenheit 451", 249, "Ray Bradbury"
false, "Wizard's First Rule", 836, "Terry Goodkind"
false, "The Lion, the Witch, and the Wardrobe", 186, "C.S Lewis"
false, "title", pages, "author"
false, "title", pages, "author"
false, "title", pages, "author"
false, "title", pages, "author"
false, "title", pages, "author"
*/

// Element Grabbers
const friendlyDialog = document.getElementById("hello-friend");
const okFriend = document.getElementById("ok-friend"); 
const newDialog = document.getElementById("new-dialog");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const newBook = document.getElementById("new-book");

// Event Listeners
okFriend.addEventListener("click", function(){ friendlyDialog.close() }, false);
newBook.addEventListener("click", function(){
    addBookToLibrary()
});
addButton.addEventListener("click", addButtonClick, false);
cancelButton.addEventListener("click", cancelButtonClick, false);

function addButtonClick(event){
    // Verify Pages is numeric and over 0, Title and Author have text
    clearAndHide();
    event.preventDefault();
}
function cancelButtonClick(event){
    clearAndHide();
    event.preventDefault();
}
function clearAndHide(){
    // Clear all Input
    // Hide Modal
    newDialog.close()
}

function Book( read, title, pages, author ){
    this.read = read;
    this.author = author;
    this.title = title;
    this.pages = pages;
    console.log( "Book { ", this.read, ", ", this.title, ", ", this.pages, ", ", this.author, " } created. " )
}

function logBooks(){
    myLibrary.forEach((book) => {
        console.log( "The book ", book.title, " by ", book.author, " has ", book.pages, " pages and read status is ", book.read );
    });
}

function addBookToLibrary(){
    console.log( 'Collect info from user' );
    newDialog.showModal();
    console.log( 'Adding book to myLibrary.' );
    myLibrary.push( new Book( true, 'Animorphs', 96, 'K.A. Applegate' ) );

    console.log( 'Sorting books.' );
    
    console.log( 'Shelving books.' );
    logBooks();
    console.log("Window Dimensions");
    console.log( window.screen.width, window.screen.height );

}


