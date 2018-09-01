var canvas = document.querySelector(".canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight - 4;
ctx.canvas.width = window.innerWidth;

// Paramters for the grid
var pixelSize = 25;
var borderSize = 2;      // Border is drawn on the right and bottom edges of the pixel
ctx.fillStyle = "gray";  // This will be the border colour
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// Make a grid
for (var i = 0; i < canvas.height / pixelSize; i++) {
    for (var j = 0; j < canvas.width / pixelSize; j++) {
        ctx.fillStyle = ((i + j) % 70) ? "black" : "white";
        ctx.fillRect(pixelSize * j,          pixelSize * i,
                     pixelSize - borderSize, pixelSize - borderSize);
    }
}
