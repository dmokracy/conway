/*
 *  Grid drawing
 */

var canvas = document.querySelector(".canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

// Grid parameters
//   We will make the border on the right and bottom edges of the pixel
//     (that is, we fill in the grid cell and but leave a gap).
//   The fillStyle of the background canvas will be the border colour.
var pixelSize = 25;
var borderSize = 2;      
ctx.fillStyle = "gray";  
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// Make a grid
for (var i = 0; i < canvas.height / pixelSize; i++) {
    for (var j = 0; j < canvas.width / pixelSize; j++) {
        // Arbitrary colouring for demo
        ctx.fillStyle = ((i + j) % 70) ? "black" : "white";
        ctx.fillRect(pixelSize * j,          pixelSize * i,
                     pixelSize - borderSize, pixelSize - borderSize);
    }
}




/*
 *  Toolbar animations
 */

// Logic for hiding animation
var hideLogicObj = {
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
Object.keys(hideLogicObj).forEach(function(dir) {
    document.querySelectorAll(".hideable-" + dir).forEach(function(e) {
        e.style[hideLogicObj[dir].style] = "0px";
    });
});

var hideBtn = document.querySelector(".hide-button");
hideBtn.addEventListener("click", function() {
    let isHiding = hideBtn.classList.toggle("active");

    let hideBtnIcon = hideBtn.querySelector("i");
    hideBtnIcon.classList.toggle("fa-angle-double-up", !isHiding);
    hideBtnIcon.classList.toggle("fa-angle-double-down", isHiding);

    // Hide each hideable
    Object.keys(hideLogicObj).forEach(function(dir) {
        document.querySelectorAll(".hideable-" + dir).forEach(function(e) {
            e.style[hideLogicObj[dir].style] =
                isHiding ? e[hideLogicObj[dir].size] + "px" : "0px";
        });
    });
});
