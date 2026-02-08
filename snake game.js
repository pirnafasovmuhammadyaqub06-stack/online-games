const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

// Ilon
let snake = [
    { x: 9 * box, y: 10 * box }
];

// Yo‘nalish
let direction = "RIGHT";

// Ovqat
let food = {
    x: Math.floor(Math.random() * 29) * box,
    y: Math.floor(Math.random() * 19) * box
};

// Ball
let score = 0;

// Klaviatura
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// O‘yinni chizish
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ilonni chizish
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Ovqat
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Eski bosh
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Yo‘nalish bo‘yicha yurish
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Ovqat yeyildimi?
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 29) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop(); // harakat
    }

    // Yangi bosh
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Devorga yoki o‘ziga urildimi?
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over 😢  Score: " + score);
    }

    snake.unshift(newHead);

    // Ballni yozish
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);
}

// To‘qnashuv tekshiruvi
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// O‘yinni boshlash
let game = setInterval(draw, 100);
