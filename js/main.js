/*
 *  Grid drawing
 */

var canvas = document.querySelector(".canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight - 4;  // slight offset or else it overflows and causes scroll in Firefox
ctx.canvas.width = window.innerWidth;

// Grid parameters
var pixelSize = 25;
var borderSize = 2;      // Border is drawn on the right and bottom edges of the pixel
ctx.fillStyle = "gray";  // This will be the border colour
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// Make a grid
for (var i = 0; i < canvas.height / pixelSize; i++) {
    for (var j = 0; j < canvas.width / pixelSize; j++) {
        ctx.fillStyle = ((i + j) % 70) ? "black" : "white";  // Arbitrary colouring for demo
        ctx.fillRect(pixelSize * j,          pixelSize * i,
                     pixelSize - borderSize, pixelSize - borderSize);
    }
}




/*
 *  Toolbar animations
 */

// Logic for hiding animation
var hideIterator = {
    up: {
        style: "bottom",
        size: "offsetHeight"
    },
    down: {
        style: "top",
        size: "offsetHeight"
    },
    left: {
        style: "right",
        size: "offsetWidth"
    },
    right: {
        style: "left",
        size: "offsetWidth"
    }
}

// Initialize CSS attributes for hideables so CSS animations work properly
Object.keys(hideIterator).forEach(function(dir) {
    document.querySelectorAll(".hideable-" + dir).forEach(function(e) {
        e.style[hideIterator[dir].style] = "0px";
    });
});

var hideBtn = document.querySelector(".hide-button");
hideBtn.addEventListener("click", function() {
    let hideBtnIconClassList = hideBtn.querySelector("i").classList;
    hideBtnIconClassList.toggle("fa-angle-double-up");
    hideBtnIconClassList.toggle("fa-angle-double-down");
    let isHidden = hideBtnIconClassList.contains("fa-angle-double-down");

    // Hide each hideable
    Object.keys(hideIterator).forEach(function(dir) {
        document.querySelectorAll(".hideable-" + dir).forEach(function(e) {
            if (isHidden) {
                e.style[hideIterator[dir].style] = e[hideIterator[dir].size] + "px";
            } else {
                e.style[hideIterator[dir].style] = "0px";
            }
        });
    });
});
