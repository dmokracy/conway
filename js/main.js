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

// Data structure containing status of all cells in the grid
var dataMatrix = [];

// Make a grid and initialize data structure
for (var i = 0; i < canvas.height / pixelSize; i++) {
    dataMatrix.push([]);
    for (var j = 0; j < canvas.width / pixelSize; j++) {
        ctx.fillStyle = "black";
        ctx.fillRect(pixelSize * j,          pixelSize * i,
                     pixelSize - borderSize, pixelSize - borderSize);
        dataMatrix[i][j] = 0;
    }
}

// Initialize data matrix with a blinker for testing purposes
dataMatrix[20][20] = 1;
dataMatrix[20][21] = 1;
dataMatrix[20][22] = 1;

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

// Updates the drawn grid with contents of the data matrix
function updateGridDrawing(mat)
{
    for (var i = 0; i < canvas.height / pixelSize; i++) {
        for (var j = 0; j < canvas.width / pixelSize; j++) {
            ctx.fillStyle = Boolean(mat[i][j]) ? "white" : "black";
            ctx.fillRect(pixelSize * j,          pixelSize * i,
                         pixelSize - borderSize, pixelSize - borderSize);
        }
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

// Grid animation test
// Send 10 messages to the worker's event queue
if (window.Worker) {
    var updateWorker = new Worker("js\\updateWorker.js");
    for (var i = 0; i < 10; i++) {
        updateWorker.postMessage(dataMatrix);
    }
    updateWorker.onmessage = function(e) {
        updateGridDrawing(e.data);
        console.log('Message received from worker!');
    }
}


