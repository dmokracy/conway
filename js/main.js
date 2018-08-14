var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Make a grid
for (var i = 0; i < canvas.width / 10; i++) {
    for (var j = 0; j < canvas.width / 10; j++) {
        ctx.fillStyle = ((i + j) % 2) ? "black" : "lightgreen";
        ctx.fillRect(10 * i, 10 * j, 10, 10);
    }
}
