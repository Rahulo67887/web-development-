const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main()
.then((res)=>{
  console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChat=[
    {
        from : "Priya",
        to : "rahul",
        msg : "how are you",
        created_at : new Date()
    },
    {
        from : "rahul",
        to : "priya",
        msg : "i am fine",
        created_at : new Date()
    },
    {
        from : "rahul",
        to : "harshita",
        msg : "whats up",
        created_at : new Date()
    },
    {
        from : "harshita",
        to : "rahul",
        msg : "as usual",
        created_at : new Date()
    },
    {
        from : "Priyal",
        to : "rahul",
        msg : "yo!",
        created_at : new Date()
    },        
];

Chat.insertMany(allChat);
  