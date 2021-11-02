const express = require('express');
const { get } = require('request');
const request = require('request');
const parser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
    res.send("Hello World")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));