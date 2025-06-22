const gameStartEl = document.querySelector(".game-start");
const gameAreaEL = document.querySelector(".game-area");
const gameOverEl = document.querySelector(".game-over");
const gameScoreEl = document.querySelector(".game-score");
const gamePointsEl = gameScoreEl.querySelector(".points");


gameStartEl.addEventListener("click", onGameStart);

function onGameStart() {
    gameStartEl.classList.add("hide");

    let keys = {};

    let player = {
        x: 150,
        y: 100,
        width: 0,
        height: 0,
        lastTimeFiredFireball: 0
    };

    let game = {
        speed: 2,
        movingMultiplier: 4,
        fareBallMultiplier: 5,
        fireInterval: 1000,
        cloudSpawnInterval: 3000
    };

    let scene = {
        score: 0,
        lastCloudSpawn: 0
    }


    const wizard = document.createElement("div");
    wizard.classList.add("wizard");
    wizard.style.top = player.y + "px";
    wizard.style.left = player.x + "px";

    gameAreaEL.appendChild(wizard);

    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    window.requestAnimationFrame(gameAction);


    function onKeyDown(event) {
        keys[event.code] = true;

    }

    function onKeyUp(event) {
        keys[event.code] = false;

    }


    function gameAction(timestamp) {
        const wizard = document.querySelector(".wizard");

        let isInAir = (player.y + player.height) <= gameAreaEL.offsetHeight;


        if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
            wizard.classList.add("wizard-fire");
            addFireBall(player);
            player.lastTimeFiredFireball = timestamp;
        } else {
            wizard.classList.remove("wizard-fire");
        }

        if (isInAir) {
            player.y += game.speed;
        }

        if (keys.ArrowUp && player.y >= 0) {
            player.y -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowDown && isInAir) {
            player.y += game.speed * game.movingMultiplier;
        }

        if (keys.ArrowLeft && player.x >= 0) {
            player.x -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowRight && player.x + player.width < gameAreaEL.offsetWidth) {
            player.x += game.speed * game.movingMultiplier;
        }

        wizard.style.top = player.y + "px";
        wizard.style.left = player.x + "px";

        scene.score++;

        // Add clouds
        if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 2000 * Math.random()) {
            let cloud = document.createElement("div");
            cloud.classList.add("cloud");
            cloud.x = gameAreaEL.offsetWidth - 200;
            cloud.style.left = cloud.x + "px";
            cloud.style.top = (gameAreaEL.offsetHeight - 200) * Math.random() + "px";
            gameAreaEL.appendChild(cloud);
            scene.lastCloudSpawn = timestamp;
        }

        // Modify cloud positions
        let clouds = document.querySelectorAll(".cloud");

        clouds.forEach((cloud) => {
            cloud.x -= game.speed;
            cloud.style.left = cloud.x + "px";

            if (cloud.x + clouds.offsetWidth <= 0) {
                cloud.parentElement.removeChild(cloud);
            };
        });

        gamePointsEl.textContent = scene.score;

        let fireBalls = document.querySelectorAll(".fire-ball");


        fireBalls.forEach((ball) => {
            ball.x += game.speed * game.fareBallMultiplier;
            ball.style.left = ball.x + "px";

            if (ball.x + ball.offsetWidth > gameAreaEL.offsetWidth) {
                ball.parentElement.removeChild(ball);
            }
        });

        window.requestAnimationFrame(gameAction);
    }

    function addFireBall() {
        let fireBall = document.createElement("div");
        fireBall.classList.add("fire-ball");

        fireBall.style.top = (player.y + player.height / 3 - 5) + "px";
        fireBall.x = player.x + player.width;
        fireBall.style.left = fireBall.x + "px";

        gameAreaEL.appendChild(fireBall);
    }


}