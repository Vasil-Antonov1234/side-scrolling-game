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
        height: 0
    };

    let game = {
        speed: 2,
        movingMultiplier: 4
    };

    let scene = {
        score: 0
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


    function gameAction() {
        const wizard = document.querySelector(".wizard");


        let isInAir = (player.y + player.height) <= gameAreaEL.offsetHeight;


        if (keys.Space) {
            wizard.classList.add("wizard-fire");
            addFireBall();
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
        
        gamePointsEl.textContent = scene.score;

        window.requestAnimationFrame(gameAction);
    }

    function addFireBall() {
        let fireBall = document.createElement("div");
        fireBall.classList.add("fire-ball");
        
        gameAreaEL.appendChild(fireBall);
    }


}