Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}

let myLibrary = [];
const defaultData = [
    { read:false, title:"Tale of Two Cities", pages:448, author:"Charles Dickens", color: "green", link:"https://www.gutenberg.org/cache/epub/98/pg98-images.html" },
    { read:false, title:"Farenheit 451", pages:249, author:"Ray Bradbury", color: "red", link:"https://www.thepublicdomain.org/2009/12/31/fahrenheit-451-book-burning-as-done-by-lawyers/" },
    { read:false, title:"Wizard's First Rule", pages:836, author:"Terry Goodkind", color: "black", link:"https://www.amazon.com/Wizards-First-Rule-Terry-Goodkind-ebook/dp/B08KH4G4R8" },
    { read:false, title:"The Lion, the Witch, and the Wardrobe", pages:186, author:"C.S Lewis", color: "purple", link:"https://www.amazon.com/Lion-Witch-Wardrobe-Chronicles-Narnia-ebook/dp/B001I45UFC" },
    { read:false, title:"Prince Caspian", pages:216, author:"C.S Lewis", color: "green", link:"https://www.amazon.com/Prince-Caspian-Return-Narnia-Chronicles-ebook/dp/B001I45UFW" },
    { read:false, title:"Voyage of the Dawn Treader", pages:216, author:"C.S Lewis", color: "blue", link:"https://www.amazon.com/gp/product/B001I45UEI?notRedirectToSDP=1&ref_=dbs_mng_calw_4&storeType=ebooks" },
    { read:false, title:"The Silver Chair", pages:217, author:"C.S Lewis", color: "white", link:"https://www.amazon.com/gp/product/B004DNWQ34?notRedirectToSDP=1&ref_=dbs_mng_calw_5&storeType=ebooks" },
    { read:false, title:"The Horse and His Boy", pages:217, author:"C.S Lewis", color: "red", link:"https://www.amazon.com/gp/product/B001I45UFM?notRedirectToSDP=1&ref_=dbs_mng_calw_2&storeType=ebooks" },
    { read:false, title:"The Magician's Nephew", pages:186, author:"C.S Lewis", color: "purple", link:"https://www.amazon.com/gp/product/B001I45UF2?notRedirectToSDP=1&ref_=dbs_mng_calw_0&storeType=ebooks" },
    { read:false, title:"The Last Battle", pages:184, author:"C.S Lewis", color:"white", link:"https://www.amazon.com/gp/product/B001I45UE8?notRedirectToSDP=1&ref_=dbs_mng_calw_6&storeType=ebooks" }
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
const inputLink = document.getElementById("input-link");

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
 });
addButton.addEventListener("click", addButtonClick, false);
cancelButton.addEventListener("click", cancelButtonClick, false);
inputPages.addEventListener("beforeinput", function(event){
    var character = event.data;
    if( Number(character) && inputPages.value.length < 4 ){
        return true
    }else{
        event.preventDefault();
    }
});

function addButtonClick(event){
    if( Number(inputPages.value) && inputPages.value > 0 && inputTitle.value != "" && inputAuthor.value != "" ){
        addBookToLibrary( readCheckbox.checked, inputTitle.value, parseInt( inputPages.value ), inputAuthor.value, inputColor.value, inputLink.value ); 
        clearAndHide();
    }
    
    event.preventDefault();
}
function cancelButtonClick(event){
    clearAndHide();
    event.preventDefault();
}
function clearAndHide(){
    document.getElementById('new-book-form').reset()
    newDialog.close()
}

function logBooks(){
    myLibrary.forEach((book) => {
        console.log( "The book ", book.title, " by ", book.author, " has ", book.pages, " pages and read status is ", book.read )
    });
}

function addBookToLibrary( read, title, pages, author, color , link="" ){
    myLibrary.push( new Book( read, title, pages, author, color, link ) );
    shelveBooks();
    // logBooks();
}

function clearShelf(){
    var first = shelfDiv.firstElementChild;
    while(first){
        first.remove();
        first = shelfDiv.firstElementChild;
    }
}

function shelveBooks(){
    clearShelf();
    for( i = 0; i < myLibrary.length; i++ ){
        myLibrary[i].id = "Book-".concat( i.toString() );
    }
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
            newerBook.classList.add("book", "purple-book");
        }

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
            let thisBookPosition = parseInt( event.target.parentNode.id.slice(5) ) ;
            if ( myLibrary[ thisBookPosition ].read == true){
                myLibrary[ thisBookPosition ].read = false;
            }else{
                myLibrary[ thisBookPosition ].read = true;
            }
            shelveBooks();
        });
        newerBook.appendChild( newStatus );

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

        const newPages = document.createElement('span');
        newPages.classList.add("pages");
        newPages.appendChild( document.createTextNode( book.pages.toString().slice(0,4).concat('p') ) );
        newerBook.appendChild( newPages );

        const deleteBook = document.createElement('span');
        deleteBook.classList.add('delete');
        deleteBook.appendChild( document.createTextNode( 'Remove' ) );

        deleteBook.addEventListener("click", function(event){
            const thisBook = event.target.parentNode.id;
            let thisBookPosition = parseInt( thisBook.slice(5) );
                
            if( confirm("Sure you want to delete ".concat( myLibrary[thisBookPosition].title,"?" ) ) ){
                myLibrary.splice( thisBookPosition, 1 );
                console.log( myLibrary );
                shelveBooks();    
            }
        });

        newerBook.appendChild( deleteBook );

        let newerID =  book.id;
        newerBook.id = newerID;

        shelfDiv.appendChild( newerBook );
    });
    // Add newBook back
    shelfDiv.appendChild( newBook );
}

window.onload = function(){    
    defaultData.sortBy('author').forEach((book) =>{
        const BookObject = new Book( book.read, book.title, book.pages, book.author , book.color, book.link )
        myLibrary.push(  BookObject )
        shelfDiv.appendChild( newBook )
    });
    shelveBooks();
}