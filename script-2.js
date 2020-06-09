window.onload = startup;

// Sores the value of if a key is pressed
var keys = [];

window.addEventListener("keydown", function (e){    // Event lisner for when a key is pressed
    keys[e.keyCode || e.which] = true;      // Sett the keys that is presst to true so I know what key is pressed
}, false);

window.addEventListener("keyup", function (e){      // Event lisner for when a key is relesed
    keys[e.keyCode || e.which] = false;     // Change the value of the key that was just releasd to false, so it wil not be registerd at pressed by mistake
}, false);

var asidePosition = localStorage.asidePosition;
var mainPosition = "right";
var sprint = false;
var baguette;
var baguetteEnable = false;
var baguetteRotation = 0;
var stylesheetPositionZero = 0;    // Setts what rules in the CSS should be changed
var stylesheetPositionOne = 0;     // Setts what rules in the CSS should be changed

var moveAsideFunc = {   // Function for moving the aside on the webpage 
    moveLeft : function() {     // Moves the window to the left
        document.getElementById("aside").classList = "asideLeft";       // Changes the class for aside to what is in asideLeft
        document.getElementById("main").classList = "mainRight";        // Changes the class for main to what is in mainRight

        document.getElementById("asideButton").innerHTML = "-->";

        asidePosition = "left"

        localStorage.asidePosition = "left"     // Stores where the aside is in lockal storage
    },
    moveRight : function() {    // Moves the window to the right
        document.getElementById("aside").classList = "asideRight";      // Changes the class for aside to what is in asideRight
        document.getElementById("main").classList = "mainLeft";         // Changes the class for main to what is in mainLeft

        document.getElementById("asideButton").innerHTML = "<--";

        asidePosition = "right";

        localStorage.asidePosition = "right"    // Stores where the aside is in lockal storage
    }
}

function moveAside() {      // Checks if the aside is on the left or right, based on the value in local storage
    if (localStorage.asidePosition == "left") {
        moveAsideFunc.moveRight();
    } else if (localStorage.asidePosition == "right") {
        moveAsideFunc.moveLeft();
    }
}

function minemizeAside() {      // Hides the aside
    document.getElementById("aside").style.visibility = "hidden";
    document.getElementById("main").classList = "mainFull";     // Adds the content form the class mainFull to main

    document.getElementById("showAside").style.visibility = "visable";

    localStorage.asideGone = "Gone";        // Stores that the aside is hidden in local storage
}

function minemizeAsideMessage() {   // Samme as minemizeAside, but has a alert for the button that is in HTML
    document.getElementById("aside").style.visibility = "hidden";
    document.getElementById("main").classList = "mainFull";

    document.getElementById("showAside").style.visibility = "";

    localStorage.asideGone = "Gone";

    alert("You have just presed the button to hide the aside menu! To make it apear again you need to skrol all the way donw and press the show aside button. The state is saved so it you want the aside back you need to press the show aside button at the buttom of the page");
}

function displayAside() {   // Makes the aside visible
    document.getElementById("aside").style.visibility = "";
    document.getElementById("main").classList = "mainRight";

    document.getElementById("showAside").style.visibility = "hidden";

    localStorage.asideGone = "Here";
}

var moveImage = {       // Function for moving the background immage
    up : function(a){

        a = parseInt(a);
        a -= 5;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"] = a;     // Gest the background position y from the CSS file. His edits CSS file 0
         

    },
    upFast : function(a){

        a = parseInt(a);
        a -= 20;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"] = a;     // Gest the background position y from the CSS file. His edits CSS file 0
         

    },

    right : function(a){

        a = parseInt(a);
        a += 5;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"] = a;     // Gest the background position x from the CSS file. His edits CSS file 0
         

    },
    rightFast : function(a){

        a = parseInt(a);
        a += 20;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"] = a;     // Gest the background position x from the CSS file. His edits CSS file 0
         
    },

    down : function(a){

        a = parseInt(a);
        a += 5;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"] = a;     // Gest the background position y from the CSS file. His edits CSS file 0
         


    },
    downFast : function(a){

        a = parseInt(a);
        a += 20;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"] = a;     // Gest the background position y from the CSS file. His edits CSS file 0
         

    },

    left : function(a){

        a = parseInt(a);
        a -= 5;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"] = a;     // Gest the background position x from the CSS file. His edits CSS file 0
         

    },
    leftFast : function(a){

        a = parseInt(a);
        a -= 20;
        a += "px";
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"] = a;     // Gest the background position x from the CSS file. His edits CSS file 0
         

    },
    home : function(a){     // Setts the background image to 0,0
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"] = "0";   // Gest the background position y from the CSS file. His edits CSS file 0
        
        
        document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"] = "0";   // Gest the background position x from the CSS file. His edits CSS file 0
         
        
    }
}

function moveTheImage(evt){     // This is the function that test for the keys and then call the currect fnction to move the immage the correct way

    var ruleX2 = document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-x"];

    var ruleY2 = document.styleSheets[0]["rules"][stylesheetPositionZero]["style"]["background-position-y"];

    if (keys[87] && keys[68]) {           // up right
        if (sprint == true) {
            moveImage.upFast(ruleY2);
            moveImage.rightFast(ruleX2);
        } else {
            moveImage.up(ruleY2);
            moveImage.right(ruleX2);
        }
    }
    if (keys[87] && keys[65]) {    // up left
        if (sprint == true) {
            moveImage.upFast(ruleY2);
            moveImage.leftFast(ruleX2);
        } else {
            moveImage.up(ruleY2);
            moveImage.left(ruleX2);
        }
    } 
    if (keys[83] && keys[68]) {    // down right
        if (sprint == true) { 
            moveImage.downFast(ruleY2);
            moveImage.rightFast(ruleX2);
        } else {
            moveImage.down(ruleX2);
            moveImage.right(ruleY2);
        }
    } 
    if (keys[83] && keys[65]) {    // down left
        if (sprint == true) { 
            moveImage.downFast(ruleY2);
            moveImage.leftFast(ruleX2);
        } else {
            moveImage.down(ruleX2);
            moveImage.left(ruleY2);
        }
    } 
    if (keys[87]) {   // up
        if (sprint == true) {
            moveImage.upFast(ruleY2);
        } else {
            moveImage.up(ruleY2);
        }
    } 
    if (keys[68]) {   // right
        if (sprint == true) {
            moveImage.rightFast(ruleX2);
        } else {
            moveImage.right(ruleX2);
        }
    } 
    if (keys[83]) {   // down
        if (sprint == true) {
            moveImage.downFast(ruleY2);
        } else {
            moveImage.down(ruleY2);
        }
    } 
    if (keys[65]) {   // left
        if (sprint == true) {
            moveImage.leftFast(ruleX2);
        } else {
            moveImage.left(ruleX2);
        }
    } 
    if (keys[36]) {   // home
        moveImage.home(ruleX2);
    }
    //setInterval(moveTheImage, 20000)  // Hopes to remove the litle delay on firt move
}


function moveLoafRandom() {     // Tries the to move the loaf in a random direction
    // this function do not work now and is not in use
    
    var random = Math.floor((Math.random() * 8) + 1);

    switch (random) {
        case 1:
            moveImage.up();
            break;
        case 2:
            moveImage.upFast();
            break;
        case 3:
            moveImage.right();
            break;
        case 4:
            moveImage.rightFast();
            break;  
        case 5:
            moveImage.down();
            break;
        case 6:
            moveImage.downFast();
            break;
        case 7:
            moveImage.left();
            break;
        case 8:
            moveImage.leftFast();
            break;

        default:
            break;
    }

    setTimeout(function(){
        moveLoafRandom();
    }, 300);
}

//
//
// Here is the baguette move part
//
//

var directionX; 
var directionY; 
var interval = null; 

if (baguetteEnable == true) {   // Test if the baguette should move or not. If it should move then is start a timer for when the next bauette movement should start
    setTimeout(function(){      // Setts a time out and start a function afther the time out, im milisecounds
        startNewBaguetteMovement();
    }, 3000);
}

function startNewBaguetteMovement() {   // Start to move the baguette

    baguetteRotation = 0;

    baguette.style.visibility = "visible";      // Makes the baguette visible

    var randX = Math.floor((Math.random() * 101));      // Desides where on the viewport (in %) the loaf should start, in x direction
    var randY = Math.floor((Math.random() * 101));      // Desides where on the viewport (in %) the loaf should start, in x direction

    var rand = Math.floor(Math.random() * 6) + 1;       // Setts the direction of the batuette, so it will not go the wrong way

    switch(rand) {      // Setts what way the baguette should move
        case 1: 
            directionX = 1; 
            directionY = 1;
            randX = 0; 
        break; 
        case 2: 
            directionX = -1;
            directionY = 1; 
            randX = 100; 
        break; 
        case 3: 
            directionX = 1; 
            directionY = -1;
            randX = 0; 
        break; 
        case 4: 
            directionX = -1;
            directionY = 1; 
            randX = 100; 
        break; 
        case 5: 
            directionX = 0;
            directionY = 1;  
            randY = 0; 
        break; 
        case 6: 
            directionX = 1; 
            directionY = 0; 
            randY = 100; 
        break; 
    }

    baguette.style.top = randY + "vh"; 
    baguette.style.left = randX + "vw"; 

    console.log(baguette.style.left); 
    console.log(baguette.style.top); 

    interval = setInterval(moveBaguette, 100);

    setTimeout(function(){
        startNewBaguetteMovement();
    }, 30000);
}

function moveBaguette() {       // Hvis is the fuction to move the baguette

    document.getElementById("baguette").style.transform = "rotate(" + baguetteRotation % 360 + "deg)";      // Rotates the baguette

    var y = parseInt(baguette.style.top);
    var x = parseInt(baguette.style.left);


    if(x < -20 || x > 102 || y < -10 || y > window.innerHeight) {       // Test if the batuette is outside of the screen or not, if it is the image wil be hidden and the interval wil end.
        baguette.style.visibility = "hidden";
        clearInterval(interval);
        return; 
    }

    baguette.style.top = (y + 1 * directionY) + "vh";
    baguette.style.left = (x + 1 * directionX) + "vw";

    baguetteRotation += 10;
}



// Here because Google Chrome did not work when a function was called before the function was defined in code...
// document.addEventListener('DOMContentLoaded', function() {      // Event listner that lisens for when DOM is ready to be edited. This is so i can change the HTML before it is displayed to the user
//     if (localStorage.asideGone == "Gone") {     // Checks if the aside should be hidden or not, by checking lockal storage
//         minemizeAside();
//         showAside.style.visibility = "";
//     } else {
//         showAside.style.visibility = "hidden";
//     }

//     if (localStorage.asidePosition == "left") {     // Checks what position the aside should be, by checking lockal storage.
//         moveAsideFunc.moveLeft();
//     } else if (localStorage.asidePosition == "right") {
//         moveAsideFunc.moveRight();
//     } else {
//         localStorage.asidePosition = "left"
//     }

//  }, false);

function startup() {        // The start up function
    window.addEventListener("keydown", moveTheImage);       // Runs the moveTheImage when a button is pressed
    window.addEventListener("keydown", function(evt){if (evt.keyCode == 16) {       // Test if shift is pressed and if it is the global variable will be sett to true
        sprint = true;
    }})
    window.addEventListener("keyup", function(evt){if (evt.keyCode == 16) {         // Test if shift it releasd and it it is sprint is sett to false
        sprint = false;
    }})    

    // var loafImage = document.getElementsByClassName("image");

    // loafImage.addEventListener("click", function() {
    //     console.log("loaf!!!");
    //     // Random counter to move the loaf! in a random direction!
    //     // Move the image in the header also
    //     document.styleSheets[1]["rules"][stylesheetPositionOne]["style"]["background-repeat"] = "repeat";
    // });
    
    var asideButton = document.getElementById("asideButton");
    var minemizeButton = document.getElementById("minemizeButton");
    var showAside = document.getElementById("showAside");
    baguette = document.getElementById("baguette");
    baguette.style.visibility = "hidden";

    baguette.style.top = "50px";
    baguette.style.left = "50px";

    //setInterval(moveBaguette, 10);

    //console.log(asideHere);

    // asideButton.addEventListener("click", moveAside);
    // minemizeButton.addEventListener("click", minemizeAsideMessage);
    // showAside.addEventListener("click", displayAside);


}

    function myFunction(x) {
        x.classList.toggle("change");
    } 