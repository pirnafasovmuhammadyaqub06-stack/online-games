const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 300;
let speed = 5;

let right = false;
let left = false;

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") right = true;
    if (e.key === "ArrowLeft") left = true;
});

document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight") right = false;
    if (e.key === "ArrowLeft") left = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (right) x += speed;
    if (left) x -= speed;

    ctx.fillStyle = "lime";
    ctx.fillRect(x, y, 40, 40);

    requestAnimationFrame(gameLoop);
}

gameLoop();
