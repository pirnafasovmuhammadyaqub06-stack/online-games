const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const grid = 20;
let snake = [{ x: 10, y: 10 }];
let food = randomFood();
let dir = { x: 0, y: 0 };
let score = 0;
let speed = 150;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, speed);
}

function update() {
    if (dir.x === 0 && dir.y === 0) return;

    const head = {
        x: snake[0].x + dir.x,
        y: snake[0].y + dir.y
    };

    // devor
    if (head.x < 0 || head.y < 0 ||
        head.x >= canvas.width / grid ||
        head.y >= canvas.height / grid) {
        reset();
        return;
    }

    // o‘ziga urilishi
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
        reset();
        return;
    }

    snake.unshift(head);

    // ovqat
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreText.textContent = score;
        food = randomFood();
        speed = Math.max(50, speed - 5);
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ilon
    ctx.fillStyle = "lime";
    snake.forEach(p => {
        ctx.fillRect(p.x * grid, p.y * grid, grid - 2, grid - 2);
    });

    // ovqat
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / grid)),
        y: Math.floor(Math.random() * (canvas.height / grid))
    };
}

function reset() {
    alert("O‘yin tugadi! Score: " + score);
    snake = [{ x: 10, y: 10 }];
    dir = { x: 0, y: 0 };
    score = 0;
    speed = 150;
    scoreText.textContent = score;
    food = randomFood();
}

// boshqaruv
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dir.y === 0) dir = { x: 0, y: -1 };
    if (e.key === "ArrowDown" && dir.y === 0) dir = { x: 0, y: 1 };
    if (e.key === "ArrowLeft" && dir.x === 0) dir = { x: -1, y: 0 };
    if (e.key === "ArrowRight" && dir.x === 0) dir = { x: 1, y: 0 };
});

gameLoop();
