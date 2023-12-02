
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var dure;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var swappingOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var target = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
               //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            document.getElementById("board").append(tile);

        }
    }
   
    
}

function dragStart() {

    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns = turns + 1;

        document.getElementById("turns").innerText = turns;

       // alert(JSON.stringify(()))
        var draggbleImg = currImg.split("/")[currImg.split("/").length-1].split(".")[0];
        var blankImg = otherImg.split("/")[otherImg.split("/").length-1].split(".")[0];
        var drIndex = swappingOrder.indexOf(draggbleImg);
        var bindex = swappingOrder.indexOf(blankImg);
        var temp = swappingOrder[bindex];
        swappingOrder[bindex] = swappingOrder[drIndex];
        swappingOrder[drIndex] = temp;
        (JSON.stringify(swappingOrder))
        var sameOrder = swappingOrder.every(function(element, index) {
            return element === target[index];
            });
           

        }
            if(sameOrder)
            { 
                let audio = new Audio('complete.wav');
                audio.play();       
                const du = audio.duration;   
              //  alert(du); 
                const adio = new Audio();
            adio.src = "complete.wav";
            adio.addEventListener("loadedmetadata",() => {
                 dure = adio.duration;
                // alert(dure);
                // alert(typeof dure); 
                 
            if(typeof dure === 'number'){
                alert("Hwwrrrreeee......YOU WON THE GAME")   
                    window.location.href="slidehome.html";
                }
            });
            
            
            }

            
    


}