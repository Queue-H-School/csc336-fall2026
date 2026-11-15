import express from 'express';

// instantiate
const app = express();
const port = 3000;

// do this first
app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
    console.log("Express server started on port", port);
});

// make endpoint
app.get('/demo', (req, res) => {
    console.log("CALL TO DEMO");

    let jsonObj = {
        message: "hello from demo!",
    }
    res.json(jsonObj);
})

app.get("/food", (req, res) => {

    let foodReq = req.query.food;
    let userReq = req.query.user;

    console.log(foodReq);
    console.log(userReq);
})


app.post('/food', (req, res) => {

    let fData = req.body;
    console.log(fData.food);
    console.log(fData.user);

})