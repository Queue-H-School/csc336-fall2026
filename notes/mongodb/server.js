import express from "express";
import "dotenv/config"
import {MongoClient, ObjectId} from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

// initiate express
app.use(express.static("public"))
app.use(express.json());

// initiate mongo
let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

// create database
let database = client.db("csc336");
let todos = database.collection("todos");

async function getAllEntries() {
    let cursor = todos.find({});
    return await cursor.toArray();
}

// create
app.post("/api/todos", async (req, res) => {
    console.log(req.body);
    let newTodo = {
        text: req.body.todoText,
    };

    // add to db
    await todos.insertOne(newTodo);

    // return updated list
    let allTodos = await getAllEntries();
    res.json(allTodos);
});

// read
app.get("/api/todos", async (req, res) => {
    let allTodos = await getAllEntries();
    res.json(allTodos);
});

// update
app.put("/api/todos/:id", async (req, res) => {
    let id = new ObjectId(req.body.id);

    // change id field
    await todos.updateOne({_id: id}, {$set: {text: req.body.text}});

    let allTodos = await getAllEntries();
    res.json(allTodos);
});

// delete
app.delete("/api/todos/:id", async (req, res) => {
    let id = new ObjectId(req.params.id);

    await todos.deleteOne({_id: id});

    let allTodos = await getAllEntries();
    res.json(allTodos);
});


// start server
app.listen(port);
console.log(`Server started on port 3000`);