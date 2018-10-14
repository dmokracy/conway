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

// Hide button
var hideBtn = document.querySelector(".hide-button");
hideBtn.addEventListener("click", function() {
    var hideBtnIconClassList = hideBtn.querySelector("i").classList;
    hideBtnIconClassList.toggle("fa-angle-double-up");
    hideBtnIconClassList.toggle("fa-angle-double-down");
    document.querySelectorAll(".hide-up").forEach(function(e) {
        if (hideBtnIconClassList.contains("fa-angle-double-down")) {
            e.style.bottom = e.offsetHeight + "px";
        } else {
            e.style.bottom = 0 + "px";
        }
    });
    document.querySelectorAll(".hide-down").forEach(function(e) {
        if (hideBtnIconClassList.contains("fa-angle-double-down")) {
            e.style.top = e.offsetHeight + "px";
        } else {
            e.style.top = 0 + "px";
        }
    });
    document.querySelectorAll(".hide-right").forEach(function(e) {
        if (hideBtnIconClassList.contains("fa-angle-double-down")) {
            e.style.left = e.offsetWidth + "px";
        } else {
            e.style.left = 0 + "px";
        }
    });
});
