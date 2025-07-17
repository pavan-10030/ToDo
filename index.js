const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const methodOverride=require("method-override");
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

let taskList=[
    {
        id:uuidv4(),
        task:"Go to gym"
    },
    {
        id:uuidv4(),
        task:"Complete assignment"
    }
];

app.get("/tasks",(req,res)=>{
    // res.send("Tasks working");
    res.render("index.ejs",{taskList});
})


app.get("/tasks/new",(req,res)=>{
    // res.send("New tasks route");
    res.render("newtask.ejs");
})

app.post("/tasks/new",(req,res)=>{
    let task=req.body.task;
    let id=uuidv4();
    taskList.push({id,task});
    res.redirect("/tasks");
})

app.delete("/tasks/delete/:id",(req,res)=>{
    let {id}=req.params;
    
    // res.send("delete");
    taskList=taskList.filter((t)=>id!=t.id);
    res.redirect("/tasks");

})