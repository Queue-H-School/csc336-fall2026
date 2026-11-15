import express from 'express';

let BASE_URL = "https://airportsapi.com/api/";
let FILTERS = "?page%5Bsize%5D=100&filter%5Btype%5D=large_airport";

const app = express();
// 3000 if process.env.PORT is not set
const port = process.env.PORT || 3000;

// do this first
app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
    console.log("Express server started on port", port);
});

app.post("/countries", async (req, res) => {
    let country = req.body.country;
    let countryData = await fetch(BASE_URL + `countries/${country}/airports` + FILTERS);
    let data = await countryData.json();
    res.send(JSON.stringify(data));
});

app.post("/nextpage", async (req, res) => {
    let link = req.body.link;
    let countryData = await fetch(link);
    let data = await countryData.json();
    res.send(JSON.stringify(data));
});
