let gameSeq=[];
let userSeq=[];
let color=["red", "yellow", "green", "purple"];

let level=0;
let started=false;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        started=true;
        levelup();
    }
})

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=color[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    flash(randBtn);
}

function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function btnPress(){
    let btn=this;
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    flash(btn);
    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup, 500);
        }
    }
    else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

let Allbtns=document.querySelectorAll(".btn");
for(btn of Allbtns){
    btn.addEventListener("click", btnPress);
}

