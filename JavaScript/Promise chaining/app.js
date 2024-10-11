let h1=document.querySelector("h1");

function changeColor(color, delay){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            h1.style.color=color;
            resolve("color is changed");
        }, delay);
    });
}

changeColor("red", 1000)
.then(()=>{
    console.log("red color is changed");
    return changeColor("blue", 1000);
})
.then(()=>{
    console.log("blue color is changed");
    return changeColor("orange", 1000);
})
.then(()=>{
    console.log("balck color is changed");
    return changeColor("black", 1000);
});