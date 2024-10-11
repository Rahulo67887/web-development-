const {faker} =require('@faker-js/faker');
const mysql=require('mysql2');
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view enjine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'sql_app',
    password:'chou@SQL67887'
});

let getRandomUser = ()=> {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

app.get("/", (req, res)=>{
    let q="SELECT count(*) FROM user";
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch(err){
        console.log(err);
        res.send("Got some error");
    } 
});

app.get("/user", (req, res)=>{
    let q="SELECT * FROM user";
    try{
        connection.query(q, (err, users)=>{
            if(err) throw err;
            res.render("show.ejs", { users });
        });
    } catch(err){
        console.log(err);
        res.send("Got some error");
    } 
});

app.patch("/user/:id", (req, res)=>{
    let {id}=req.params;
    let {password : formPass, username: newUsername}=req.body;
    console.log(newUsername, formPass);
    let q=`SELECT * FROM USER WHERE id="${id}"`;

    connection.query(q, (err, result)=>{
        try{
            if(err) throw err;
            let user=result[0];
            if(formPass!=user.password){
                res.send("Wrong Password!");
            }else{
                let q2=`UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result)=>{
                    if(err) throw err;
                    res.redirect("/user");
                });
            }
        }
        catch(err){
            console.log(err);
            res.send("Got some error");
        } 
    });
});

app.get("/user/:id/edit", (req, res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user=result[0];
            res.render("edit.ejs", { user });
        });
    } catch(err){
        console.log(err);
        res.send("Got some error");
    } 
});

app.get("/user/new", (req, res) => {
    res.render("new.ejs");
});
  
app.post("/user/new", (req, res)=>{
    let {username, email, password} = req.body;
    let id=uuidv4();

    let q=`INSERT INTO user (id, username, password, email) VALUES ('${id}', '${username}', '${password}', '${email}')`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            console.log("added new user");
            res.redirect("/user");
        });
    }
    catch(err){
        console.log(err);
        res.send("Got some error");
    } 
});

app.get("/user/:id/delete", (req, res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id = '${id}'`;
        console.log(id);
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user=result[0];
            res.render("delete.ejs", {user});
        });
    }
    catch(err){
        console.log(err);
        res.send("Got some error");
    } 
    
});

app.delete("/user/:id/", (req, res)=>{
    let {id}=req.params;
    let {password}=req.body;
    let q=`SELECT * FROM user WHERE id="${id}"`;

    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user=result[0];
            if(password!=user.password){
                res.send("Wrong Password");
            }
            else{
                let q2=`DELETE FROM user WHERE id="${id}"`;
                connection.query(q2, (err, result)=>{
                    if(err) throw err;
                    console.log(result);
                    res.redirect("/user");
                });
            }
        });
    }
    catch(err){
        console.log(err);
        res.send("Got some error");
    } 
});

app.listen("8080", ()=>{
    console.log("app is listening at port 8080");
})

