let url="https://universities.hipolabs.com/search?name=";
let btn=document.querySelector("button");

btn.addEventListener("click", async ()=>{
    let country=document.querySelector("#inp").value;
    let collArr=await getColleges(country);
    show(collArr);
})

async function getColleges(country) {
    try{
        let res=await axios.get(url+country);
        return res.data;
    }
    catch(e){
        console.log("Error - ", e);
        return [];
    }
}

function show(colleges){
    let list=document.querySelector("#list");
    list.innerText="";

    for(col of colleges){
        let li=document.createElement("li");
        li.innerText=col.name;
        list.appendChild(li);
    }
}
    