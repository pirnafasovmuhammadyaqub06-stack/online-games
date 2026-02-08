<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <title>Iloncha O'yini</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #222;
            flex-direction: column;
        }
        canvas {
            border: 2px solid #fff;
            background-color: #000;
        }
        .score {
            color: white;
            font-size: 24px;
            margin-bottom: 10px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="score">Shtat: <span id="score">0</span></div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');

        const gridSize = 20;
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let direction = {x: 0, y: 0};
        let score = 0;
        let gameSpeed = 150;

        function drawGame() {
            updateGame();
            
            // Kanvasni tozalash
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ilonchani chizish
            ctx.fillStyle = '#0f0';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });

            // Ovqatni chizish
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            setTimeout(drawGame, gameSpeed);
        }

        function updateGame() {
            if (direction.x === 0 && direction.y === 0) return;

            const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

            // Devorga urilishni tekshirish (TUZATILDI)
            if (head.x < 0 || head.x >= canvas.width/gridSize || 
                head.y < 0 || head.y >= canvas.height/gridSize) {
                resetGame();
                return;
            }

            // O'ziga urilishni tekshirish
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                resetGame();
                return;
            }

            snake.unshift(head);

            // Ovqat yeyishni tekshirish
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                scoreElement.textContent = score;
                generateFood();
                gameSpeed = Math.max(50, gameSpeed - 2); 
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            food = {
                x: Math.floor(Math.random() * (canvas.width / gridSize)),
                y: Math.floor(Math.random() * (canvas.height / gridSize))
            };
            if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
                generateFood();
            }
        }

        function resetGame() {
            alert(`O'yin tugadi! Sizning balingiz: ${score}`); // TUZATILDI
            snake = [{x: 10, y: 10}];
            direction = {x: 0, y: 0};
            score = 0;
            scoreElement.textContent = score;
            gameSpeed = 150;
            generateFood();
        }

        // Klaviatura boshqaruvi (TO'LDIRILDI)
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':    if (direction.y === 0) direction = {x: 0, y: -1}; break;
                case 'ArrowDown':  if (direction.y === 0) direction = {x: 0, y: 1}; break;
                case 'ArrowLeft':  if (direction.x === 0) direction = {x: -1, y: 0}; break;
                case 'ArrowRight': if (direction.x === 0) direction = {x: 1, y: 0}; break;
            }
        });

        drawGame(); // O'yinni boshlash
    </script>
</body>
</html>
