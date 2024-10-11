let btn=document.querySelector("button");
let inp=document.querySelector("input");
let ul=document.querySelector("ul");

btn.addEventListener("click", function(){
    let li=(document.createElement("li"));
    li.innerText=inp.value;
    ul.appendChild(li);
    inp.value="";

    let delbtn=document.createElement("button");
    delbtn.classList.add("delete");
    delbtn.innerText="delete";
    li.append(delbtn);
})

ul.addEventListener("click", function(){
    if(event.target.nodeName == "BUTTON"){
        event.target.parentElement.remove();
    }
})