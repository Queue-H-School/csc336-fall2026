import express from "express";
import "dotenv/config"
import {MongoClient, ObjectId} from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

const BASE_URL = "https://opentdb.com";

// initiate express
app.use(express.static("public"))
app.use(express.json());

// initiate mongo
let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

// init database
let database = client.db("csc336");
let scoreboard = database.collection("08-api-game");

app.get("/categories", async (req, res) => {
    let categories = await fetch(BASE_URL + "/api_category.php");
    res.send(JSON.stringify(await categories.json()));
});

async function getScoreboard() {
    let cursor = scoreboard.find({});
    return await cursor.toArray();
}

// create
app.post("/scoreboard", async (req, res) => {
    console.log(req.body);
    let newUser = {
        name: req.body.name,
        categoriesPlayed: {},
        numCorrect: 0,
        numIncorrect: 0,
        totalQuestions: 0,
        bestCategory: ""
    };

    // add to db
    await scoreboard.insertOne(newUser);

    // return updated list
    let updatedScoreboard = await getScoreboard();
    res.json(updatedScoreboard);
});

// read
app.get("/api/scoreboard", async (req, res) => {
    // return updated list
    let updatedScoreboard = await getScoreboard();
    res.json(updatedScoreboard);
});

// update
app.put("/scoreboard/:name", async (req, res) => {
    let name = new ObjectId(req.body.name);

    // update category field
    await todos.updateOne({_name: name}, {$set: {text: req.body.text}});

    // return updated list
    let updatedScoreboard = await getScoreboard();
    res.json(updatedScoreboard);
});

app.listen(port, () => {
    console.log("Express server started on port", port);
});