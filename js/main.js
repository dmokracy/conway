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

// Data structure
var dataMatrix = [];

// Make a grid and initialize data structure
for (var i = 0; i < canvas.height / pixelSize; i++) {
    dataMatrix.push([]);
    for (var j = 0; j < canvas.width / pixelSize; j++) {
        ctx.fillStyle = ((i + j) % 70) ? "black" : "white";  // Arbitrary colouring for demo
        ctx.fillRect(pixelSize * j,          pixelSize * i,
                     pixelSize - borderSize, pixelSize - borderSize);
        dataMatrix[i][j] = ((i + j) % 70) ? 0 : 1;
    }
}

/*
 *  Data update functions
 */
function deepCopyMatrix(mat)
{
    let copy = [];
    for (var i = 0; i < mat.length; i++) {
        copy.push(mat[i].slice());
    }
    return copy;
}


// Counts the number of living neighbours for a given cell
function sumNeighbours(mat, i, j)
{
    let n = (i == 0) ? 0 : 1;
    let s = (i == (mat.length - 1)) ? 0 : 1;
    let w = (j == 0) ? 0 : 1;
    let e = (j == (mat[0].length - 1)) ? 0 : 1;
    
    let neighbours = [ mat[i-n][j-w], mat[i-n][j], mat[i-n][j+e],
                       mat[i][j-w],                 mat[i][j+e],
                       mat[i+s][j-w], mat[i+s][j], mat[i+s][j+e] ];

    // Cells beyond the edge of the matrix are considered dead
    if (!n) {
        neighbours[0] = neighbours[1] = neighbours[2] = 0;
    }
    if (!s) {
        neighbours[5] = neighbours[6] = neighbours[7] = 0;
    }
    if (!w) {
        neighbours[0] = neighbours[3] = neighbours[5] = 0;
    }
    if (!e) {
        neighbours[2] = neighbours[4] = neighbours[7] = 0;
    }
    return neighbours.reduce(function(total, num) {
        return total + num;
    });
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
