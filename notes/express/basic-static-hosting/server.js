// const express = require('express');
import express from 'express';

const app = express();
const port = 3000;

// do this first
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("This is a response!");
});

app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

// start the server
app.listen(port);