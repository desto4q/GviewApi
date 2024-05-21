const express = require("express");
const app = express();
const path = require("path");

const PORT = 8080;
app.use(express.json());

let versionData = {
    version: "2",
    minimumVersion: "1.0",
    breaking: false,
};

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});

app.get("/", (req, res) => {
    res.send(versionData);
});

app.post("/update", (req, res) => {
    const body = req.body;

    if (!body.version || !body.min) {
        res.status(400).send("Missing version or min in request body");
        return;
    }

    versionData = {
        version: body.version,
        minimumVersion: body.min,
        breaking: body.breaking ? body.breaking : false,
    };

    res.status(200).send(versionData);
});

app.get("/version", (req, res) => {
    res.status(200).send({
        version: "2",
    });
});
