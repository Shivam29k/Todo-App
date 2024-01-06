const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express()
app.use(express.json());
app.use(cors())

// body = {
//     title: "title",
//     description: "description"
// }
app.post("/todo", async (req, res)=>{
    const payload = req.body;
    const parsePayload = createTodo.safeParse(payload);
    if(!parsePayload.success){
        console.log
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    }
    // put it in mogodb
    await todo.create({
        title: payload.title,
        description: payload.description,
        completed: false
    })

    res.json({
        msg: "Todo Created"
    })
})

app.get("/todo", async (req, res)=>{
    const todos = await todo.find({});
    res.json({todos})
})


// body = {
//     id: "_id cjbcjk:LCMKLD"
// }
app.put("/completed", async (req, res)=>{
    const upadatePayload = req.body;
    const parsePayload = updateTodo.safeParse(upadatePayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    }

    const filter = {
        _id: req.body.id
    }
    const update = {
        completed: true
    }
    await todo.updateOne(filter, update);
    res.json({
        msg: "Todo marked as completed"
    })

})


app.get("/", (req, res)=>{
    res.json({msg: "Application is up"});
})

app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
});