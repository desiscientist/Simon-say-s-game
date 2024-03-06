let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let maxScore = 0;
let h2 = document.querySelector("h2");
let maxsrc = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 250);
}

function printMaxScore() {
    maxsrc.innerText = `Your Highest Score is ${maxScore}`;
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    maxsrc.innerText = `Your Highest Score is ${maxScore}`;

    let randIdx = Math.floor(Math.random()*3 + 1);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    }
    else {
        if (level > maxScore) {
            maxsrc.innerText = `Your Highest Score is ${level}`;
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        if (level > maxScore) {
            maxScore = level;
            // alert(`Congratulation ! Your new high score is ${maxScore}`);
        }
        setTimeout (function () {
            document.querySelector("body").style.backgroundColor = "#1F1717";
        }, 150)
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(this);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset () {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

