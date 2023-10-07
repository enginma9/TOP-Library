Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}

let myLibrary = [];
const defaultData = [
    { read:false, title:"Tale of Two Cities", pages:448, author:"Charles Dickens", color: "green", link:"https://www.gutenberg.org/cache/epub/98/pg98-images.html" },
    { read:false, title:"Farenheit 451", pages:249, author:"Ray Bradbury", color: "red" },
    { read:false, title:"Wizard's First Rule", pages:836, author:"Terry Goodkind", color: "black" },
    { read:false, title:"The Lion, the Witch, and the Wardrobe", pages:186, author:"C.S Lewis", color: "purple" },
    { read:false, title:"Prince Caspian", pages:216, author:"C.S Lewis", color: "green" },
    { read:false, title:"Voyage of the Dawn Treader", pages:216, author:"C.S Lewis", color: "blue" },
    { read:false, title:"The Silver Chair", pages:217, author:"C.S Lewis", color: "white" },
    { read:false, title:"The Horse and His Boy", pages:217, author:"C.S Lewis", color: "red" },
    { read:false, title:"The Magician's Nephew", pages:186, author:"C.S Lewis", color: "purple" },
    { read:false, title:"The Last Battle", pages:184, author:"C.S Lewis", color:"white" }
]

function Book( read, title, pages, author, color="purple", link="" ){
    this.read = read;     // bool 
    this.author = author; // 16 char [16]...
    this.title = title;   // 36 char [33]...
    this.pages = pages;   // 4 char  [4]
    this.color = color;
    this.series = "";
    this.seriesNumber = 1;
    this.link = link;
    this.id = "Book-".concat(( myLibrary.length + 1).toString() );
    console.log( this.id ," { ", this.read, ", ", this.title, ", ", this.pages, ", ", this.author, " } created. " );
}

// Element Grabbers
const shelfDiv = document.getElementById("shelf-div");
const friendlyDialog = document.getElementById("hello-friend");
const okFriend = document.getElementById("ok-friend"); 
const newDialog = document.getElementById("new-dialog");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const inputPages = document.getElementById("input-pages");
const readCheckbox = document.getElementById("read-checkbox");
const inputTitle = document.getElementById("input-title");
const inputAuthor = document.getElementById("input-author");
const inputColor = document.getElementById("input-color");

//const newBook = document.getElementById("new-book");
const newBook = document.createElement("div");
newBook.setAttribute("id","new-book");
newBook.classList.add("book", "purple-book");

const newStatus = document.createElement("span");
newStatus.classList.add("read-status", "read");
newStatus.appendChild( document.createTextNode("Add") );
newBook.appendChild( newStatus );

const newTitle = document.createElement('span');
newTitle.classList.add("bookTitle");
newTitle.appendChild( document.createTextNode("New Book") );
newBook.appendChild( newTitle );

const newPages = document.createElement('span');
newPages.classList.add("pages");
newPages.appendChild( document.createTextNode("?") );
newBook.appendChild( newPages );

const newAuthor = document.createElement('span');
newAuthor.classList.add("author");
newAuthor.appendChild( document.createTextNode("Click Me") );
newBook.appendChild( newAuthor );



// Event Listeners
okFriend.addEventListener("click", function(){ friendlyDialog.close() }, false);
newBook.addEventListener("click", function(){ 
    newDialog.showModal()
    //console.log( 'Collect info from user' );
 });
addButton.addEventListener("click", addButtonClick, false);
cancelButton.addEventListener("click", cancelButtonClick, false);
inputPages.addEventListener("beforeinput", function(event){
    var character = event.data;
    if( Number(character) && inputPages.value.length < 4 ){
        return true
    }else{
        //console.log('prevent');
        event.preventDefault();
    }
});

function addButtonClick(event){
    // Verify Pages is numeric and over 0, Title and Author have text
    //let pages = parseInt( inputPages.value );
    if( Number(inputPages.value) && inputPages.value > 0 && inputTitle.value != "" && inputAuthor.value != "" ){
        addBookToLibrary( readCheckbox.checked, inputTitle.value, parseInt( inputPages.value ), inputAuthor.value, inputColor.value ); 
        clearAndHide();
    }
    
    event.preventDefault();
}
function cancelButtonClick(event){
    clearAndHide();
    event.preventDefault();
}
function clearAndHide(){
    // Clear all Input
    //document.getElementById('input-pages').value = 0;
    document.getElementById('new-book-form').reset()
    // Hide Modal
    newDialog.close()
}

function logBooks(){
    myLibrary.forEach((book) => {
        console.log( "The book ", book.title, " by ", book.author, " has ", book.pages, " pages and read status is ", book.read )
    });
}

function addBookToLibrary( read, title, pages, author, color ){
    
    //console.log( 'Adding book to myLibrary.' );
    myLibrary.push( new Book( read, title, pages, author, color ) );
    shelveBooks();
    // logBooks();
    //console.log("Window Dimensions: width: ", window.screen.width, ", height: ", window.screen.height );
}

function clearShelf(){
    var first = shelfDiv.firstElementChild;
    while(first){
        first.remove();
        first = shelfDiv.firstElementChild;
    }
}

function shelveBooks(){
    //console.log('Clear Shelves; sort and place books.')
    clearShelf();
    myLibrary.forEach((book) => {
        const newerBook = document.createElement("div");
        if( book.color === "purple"){
            newerBook.classList.add("book", "purple-book");
        }else if( book.color === "green"){
            newerBook.classList.add("book", "green-book");
        }else if( book.color === "red"){
            newerBook.classList.add("book", "red-book");
        }else if( book.color === "black"){
            newerBook.classList.add("book", "black-book");
        }else if( book.color === "white"){
            newerBook.classList.add("book", "white-book");
        }else{
            //console.log("Default")
            newerBook.classList.add("book", "purple-book");
        }
        // bool
        const newStatus = document.createElement("span");
        if( book.read == true ){
            newStatus.classList.add("read-status", "read");
            newStatus.appendChild( document.createTextNode("Read") );
        }else{
            newStatus.classList.add("read-status", "unread");
            newStatus.appendChild( document.createTextNode("Unread") );
        }
        newStatus.addEventListener("click", function(event){
            const thisBook = event.target.parentNode.id;
            let thisBookPosition = parseInt( event.target.parentNode.id.slice(5) ) - 1;
            //console.log( thisBookPosition );
            //console.log( thisBook );
            if ( myLibrary[ thisBookPosition ].read == true){
                myLibrary[ thisBookPosition ].read = false;
            }else{
                myLibrary[ thisBookPosition ].read = true;
            }
            shelveBooks();
        });
        newerBook.appendChild( newStatus );
        // 36
        const newTitle = document.createElement('a');
        let thisTitle = "";
        newTitle.classList.add("bookTitle");
        if( book.title.length > 36 ){
            thisTitle = book.title.slice( 0, 33 ).concat( "..." );
        }else{
            thisTitle = book.title;
        }
        newTitle.appendChild( document.createTextNode( thisTitle ) );
        if( book.link != "" ){
            newTitle.href = book.link;
            newTitle.target = "_blank";
            newTitle.rel = "noreferrer noopener";
        }
        newerBook.appendChild( newTitle );
        // 4
        const newPages = document.createElement('span');
        newPages.classList.add("pages");
        newPages.appendChild( document.createTextNode( book.pages.toString().slice(0,4).concat('p') ) );
        newerBook.appendChild( newPages );
        // 16
        const newAuthor = document.createElement('span');
        newAuthor.classList.add("author");
        let thisAuthor = "";
        if( book.author.length > 16 ){
            thisAuthor = book.author.slice(0,13).concat("...");
        }else{
            thisAuthor = book.author;
        }
        newAuthor.appendChild( document.createTextNode( thisAuthor ) );
        newerBook.appendChild( newAuthor );
        
        let newerID =  book.id;
        newerBook.id = newerID;
        //console.log( newerBook.id );
        // newerBook.addEventListener("click", addButtonClick, false);
        //console.log("Adding Book to DOM");
        shelfDiv.appendChild( newerBook );
    });
    // Add newBook back
    shelfDiv.appendChild( newBook );
}

window.onload = function(){    
    //console.log("Leaving these in for educational value. ")
    defaultData.sortBy('author').forEach((book) =>{
        const BookObject = new Book( book.read, book.title, book.pages, book.author , book.color, book.link )
        myLibrary.push(  BookObject )
        shelfDiv.appendChild( newBook )
    });
    //console.log( myLibrary );
    shelveBooks();
}