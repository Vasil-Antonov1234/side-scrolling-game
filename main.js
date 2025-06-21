const gameStartEl = document.querySelector(".game-start");
const gameAreaEL = document.querySelector(".game-area");
const gameOverEl = document.querySelector(".game-over");
const gameScoreEl = document.querySelector(".game-score");


gameStartEl.addEventListener("click", onGameStart);

function onGameStart() {
    gameStartEl.classList.add("hide");

    let keys = {};

    let player = {
        x: 150,
        y: 100
    };

    let game = {
        speed: 2,
        movingMultiplier: 4
    };

    const wizard = document.createElement("div");
    wizard.classList.add("wizard");
    wizard.style.top = player.y + "px";
    wizard.style.left = player.x + "px";

    gameAreaEL.appendChild(wizard);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    window.requestAnimationFrame(gameAction);


    function onKeyDown(event) {
        keys[event.code] = true;
        console.log(keys);
    }

    function onKeyUp(event) {
        keys[event.code] = false;
        console.log(keys);
    }

    function gameAction() {
        const wizard = document.querySelector(".wizard");
        
        if (keys.ArrowUp) {
            player.y -= game.speed * game.movingMultiplier;
        }
        
        if (keys.ArrowDown) {
            player.y += game.speed * game.movingMultiplier;
        }

        if (keys.ArrowLeft) {
            player.x -= game.speed * game.movingMultiplier;
        }

        if (keys.ArrowRight) {
            player.x += game.speed * game.movingMultiplier;
        }

        wizard.style.top = player.y + "px";
        wizard.style.left = player.x + "px";

        window.requestAnimationFrame(gameAction);
    }


}