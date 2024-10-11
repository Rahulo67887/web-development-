const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride=require("method-override");

const{v4 : uuidv4}=require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.listen(port, ()=>{
    console.log(`Port is listening at ${port}`);
});

let posts=[
    {
        id : uuidv4(),
        username : "rahul",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "Thor",
        content : "i am odin son thor, I am the god of thor", 
    },
    {
        id : uuidv4(),
        username : "Loki",
        content : "i am the adopted son of odin, I am the god of mischeaf"
    }
];

app.get("/post", (req,res)=>{
    res.render("index.ejs", {posts});
})

app.post("/post", (req, res)=>{
    let{username, content}=req.body;
    let id=uuidv4();
    posts.push({ id, username, content});
    res.redirect("/post");
});

app.get("/post/:id", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs", {post});
});

app.get("/post/:id/edit", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs", { post });
});

app.patch("/post/:id", (req, res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/post");
});

app.delete("/post/:id", (req, res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/post");
})

app.get("/postpost/newpost", (req,res)=>{
    res.render("new.ejs");
})

