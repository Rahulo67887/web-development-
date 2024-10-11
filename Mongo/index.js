const mongoose = require('mongoose');
const express=require("express");
const app=express();
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.listen(8080, ()=>{
  console.log("server is listening at port 8080");
});

app.get("/", (req, res)=>{
  console.log("root working properly");
});

app.get("/chats", async (req, res)=>{
  let chats=await Chat.find();
  console.log(chats);
  res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res)=>{
  res.render("new.ejs");
  console.log("root working properly");
});

app.get("/chats/:id/edit", async (req, res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
  res.render("edit.ejs", {chat});
});

app.put("/chats/:id", async (req, res)=>{
  let {id}=req.params;
  let {newMessage}=req.body;
  let updatedChat=await Chat.findByIdAndUpdate(
    id,
    {msg : newMessage}, 
    {runVallidators : true, new : true}
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async(req, res)=>{
  let {id}=req.params;
  
  let deletedChat=await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.post("/chats", (req, res)=>{
  let {from, to ,msg}=req.body;
  let chat =new Chat({
    from : from,
    to : to,
    msg :msg,
    created_at : new Date()
  })
  chat.save()
    .then((res)=>{
      console.res("Chat is saved");
    })
    .catch((err)=>{
      console.log(err);
    })
  res.redirect("/chats");
});

main()
.then((res)=>{
  console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// .then((res)=>{
//   console.log(res);
// })
// .catch((err)=>console.log(err));