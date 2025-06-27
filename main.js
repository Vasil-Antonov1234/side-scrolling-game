// select game screens
const gameStartEl = document.querySelector(".game-start");
const gameAreaEL = document.querySelector(".game-area");
const gameOverEl = document.querySelector(".game-over");
const gameScoreEl = document.querySelector(".game-score");
const gamePointsEl = gameScoreEl.querySelector(".points");
const gameHealthEl = document.querySelector(".health");
const gameHealthPointsEl = gameHealthEl.querySelector(".health-points");

const bottomEl = document.querySelector(".bottom");
const leftEl = document.querySelector(".left");

// game start listener
gameStartEl.addEventListener("click", onGameStart);


// let isTest = false;


// game start function
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
        cloudSpawnInterval: 3000,
        bugSpawnInterval: 1000,
        bugKillBonus: 2000,
        bigCloudSpawnInterval: 4000,
        bigCloudsMovingMultiplier: 4.9,
        healthSpawnInterval: 20000,
        stoneSpawnInterval: 2000,
        stoneMovingMultilier: 4
    };

    let scene = {
        score: 0,
        health: 100,
        lastCloudSpawn: 0,
        lastBigCloudSpawn: 0,
        lastBugSpawn: 0,
        lastHealthSpown: 0,
        lastStoneSpown: 0,
        isActiveGame: true
    }

    // render wizard
    const wizard = document.createElement("div");
    wizard.classList.add("wizard");
    wizard.style.top = player.y + "px";
    wizard.style.left = player.x + "px";

    gameAreaEL.appendChild(wizard);

    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;

    // global key listeners
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    window.requestAnimationFrame(gameAction);

    // key handlers
    function onKeyDown(event) {
        keys[event.code] = true;

    }

    function onKeyUp(event) {
        keys[event.code] = false;

    }



    // game loop function
    function gameAction(timestamp) {
        const wizard = document.querySelector(".wizard");

        // Aply gravitation
        let isInAir = (player.y + player.height) <= gameAreaEL.offsetHeight;

        if (isInAir) {
            player.y += game.speed;
        }

        // register user input
        if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
            wizard.classList.add("wizard-fire");
            addFireBall(player);
            player.lastTimeFiredFireball = timestamp;

            isCollision(wizard, wizard);
        } else {
            wizard.classList.remove("wizard-fire");
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

        // aply movement
        wizard.style.top = player.y + "px";
        wizard.style.left = player.x + "px";

        // Increment score counter
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

            if (isCollision(cloud, leftEl)) {
                cloud.parentElement.removeChild(cloud);
            }
            
            // if (cloud.x + clouds.offsetWidth <= 0) {
            //     cloud.parentElement.removeChild(cloud);
            // };
        });

        // Add big clouds
        if (timestamp - scene.lastBigCloudSpawn > game.bigCloudSpawnInterval + 900000 * Math.random()) {
            let bigCloud = document.createElement("div");
            bigCloud.classList.add("big-cloud");
            bigCloud.x = gameAreaEL.offsetWidth - 700;
            bigCloud.style.left = bigCloud.x + "px";
            bigCloud.style.top = (gameAreaEL.offsetHeight - 700) * Math.random() + "px";
            gameAreaEL.appendChild(bigCloud);
            scene.lastBigCloudSpawn = timestamp;
        };

        // Modify big cloud positions
        let bigClouds = document.querySelectorAll(".big-cloud");

        bigClouds.forEach((bigCloud) => {
            bigCloud.x -= game.speed * game.bigCloudsMovingMultiplier;
            bigCloud.style.left = bigCloud.x + "px";

            if (isCollision(bigCloud, leftEl)) {
                bigCloud.parentElement.removeChild(bigCloud);
            }
            
            // if (bigCloud.x + bigClouds.offsetWidth <= 0) {
            //     bigCloud.parentElement.removeChild(bigCloud);
            // };
        });



        // Add bugs
        if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
            let bug = document.createElement("div");
            bug.classList.add("bug");
            bug.x = gameAreaEL.offsetWidth - 60;
            bug.style.left = bug.x + "px";
            bug.style.top = (gameAreaEL.offsetHeight - 60) * Math.random() + "px";
            gameAreaEL.appendChild(bug);
            scene.lastBugSpawn = timestamp;
        };

        // Modify bug positions
        let bugs = document.querySelectorAll(".bug");

        bugs.forEach((bug) => {
            bug.x -= game.speed * 3;
            bug.style.left = bug.x + "px";

            if (isCollision(bug, leftEl)) {
                bug.parentElement.removeChild(bug);
            };
            
            // if (bug.x + bugs.offsetWidth <= 0) {
            //     bug.parentElement.removeChild(bug);
            // };
        });

        // Add health
        if (timestamp - scene.lastHealthSpown > game.healthSpawnInterval + 5000 * Math.random()) {
            let healthBonus = document.createElement("div");
            healthBonus.classList.add("health-bonus");
            healthBonus.x = gameAreaEL.offsetWidth - 60;
            healthBonus.style.left = healthBonus.x + "px";
            healthBonus.style.top = (gameAreaEL.offsetHeight - 60) * Math.random() + "px";
            gameAreaEL.appendChild(healthBonus);
            scene.lastHealthSpown = timestamp;
        }

        // Modify healthBonus positions
        let healthBonuses = document.querySelectorAll(".health-bonus");

        healthBonuses.forEach((hBonus) => {
            hBonus.x -= game.speed;
            hBonus.style.left = hBonus.x + "px";


            if (isCollision(hBonus, leftEl)) {
                hBonus.parentElement.removeChild(hBonus);
            }
        });

        // Add stones
        if (timestamp - scene.lastStoneSpown > game.stoneSpawnInterval + 5000 * Math.random() && timestamp > 10000) {
            let stone = document.createElement("div");
            stone.classList.add("stone");
            //   stone.x = gameAreaEL.offsetHeight - 60;
            stone.y = 0 + 60;
            stone.style.top = stone.y + "px";
            stone.style.left = (gameAreaEL.offsetWidth - 60) * Math.random() + "px";
            gameAreaEL.appendChild(stone);
            scene.lastStoneSpown = timestamp;
        }

        // Modify stone positions
        let stones = document.querySelectorAll(".stone");

        stones.forEach((currstone) => {
            currstone.y += game.speed * game.stoneMovingMultilier;
            currstone.style.top = currstone.y + "px";

            if (isCollision(currstone, bottomEl)) {
                currstone.parentElement.removeChild(currstone);
            };
        });



        // Aply score
        gamePointsEl.textContent = scene.score;

        // Aply health
        gameHealthPointsEl.textContent = scene.health;

        // Add Low-Health Indicator
        if (scene.health < 30) {
            gameHealthEl.classList.add("health-danger");
        } else {
            gameHealthEl.classList.remove("health-danger");
        }

        // Modify fireball positions
        let fireBalls = document.querySelectorAll(".fire-ball");


        fireBalls.forEach((ball) => {
            ball.x += game.speed * game.fareBallMultiplier;
            ball.style.left = ball.x + "px";

            if (ball.x + ball.offsetWidth > gameAreaEL.offsetWidth) {
                ball.parentElement.removeChild(ball);
            }
        });


        // Collision detection
        bugs.forEach((bug) => {
            if (isCollision(wizard, bug)) {
                scene.health--;

                if (scene.health < 0) {
                    gameOverAction();
                };
            };

            fireBalls.forEach((ball) => {
                if (isCollision(ball, bug)) {
                    scene.score += game.bugKillBonus;
                    bug.parentElement.removeChild(bug);
                    ball.parentElement.removeChild(ball);
                };
            });
        });

        healthBonuses.forEach((hBonus) => {
            if (isCollision(wizard, hBonus)) {
                scene.health += 30;

                if (scene.health > 100) {
                    scene.health = 100
                };

                hBonus.parentElement.removeChild(hBonus);
            };
        });

        stones.forEach((currstone) => {
            if (isCollision(wizard, currstone)) {
                gameOverAction();
            };
        });

        fireBalls.forEach((ball) => {
            stones.forEach((x) => {
                if (isCollision(ball, x)) {
                    ball.parentElement.removeChild(ball);
                };
            });
        });


        // if (isTest === false) {
        //     // debugger;
        //     isTest = true;
        //     const test = document.createElement("h3");
        //     test.textContent = "TEST";
        //     gameAreaEL.appendChild(test);
        // }

        if (scene.isActiveGame) {
            // game infinite loop
            window.requestAnimationFrame(gameAction);
        };

    }


    // refresh the game
    gameOverEl.addEventListener("click", onRefreshPage);

    function onRefreshPage() {
        window.location.reload();
    }

    function addFireBall() {
        let fireBall = document.createElement("div");
        fireBall.classList.add("fire-ball");

        fireBall.style.top = (player.y + player.height / 3 - 5) + "px";
        fireBall.x = player.x + player.width;
        fireBall.style.left = fireBall.x + "px";

        gameAreaEL.appendChild(fireBall);
    }


    function isCollision(firstElement, secondElement) {
        let firstRect = firstElement.getBoundingClientRect();
        let secondRect = secondElement.getBoundingClientRect();

        return !(firstRect.top > secondRect.bottom ||
            firstRect.bottom < secondRect.top ||
            firstRect.right < secondRect.left ||
            firstRect.left > secondRect.right);
    }


    function gameOverAction() {
        scene.isActiveGame = false;
        gameOverEl.classList.remove("hide");
    }

}
