let inp=document.createElement("input");
inp.placeholder="enter your name";
document.querySelector("body").append(inp);
let heading=document.createElement("h2");

document.querySelector("body").append(heading);
inp.addEventListener("input", function(){
    heading.innerText = inp.value.replace(/[^a-zA-Z\s]/g, '');
})

