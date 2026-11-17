import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"))
app.use(express.json());

app.post("/hello", (req, res) => {
    let max = req.body.max;
    let min = req.body.min;

    let num = Math.floor(Math.random() * max) - min;
    res.json({randNum: num});
})


app.listen(port);
console.log(`Server started on port ${port}`);