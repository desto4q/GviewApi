"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 8080;
const filepath = path_1.default.join(__dirname, "../version.json");
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
app.get("/", (req, res) => {
    fs_1.default.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);
    });
    2;
});
app.post("/update", (req, res) => {
    const body = req.body;
    if (!body.version || !body.min) {
        res.status(404).send(404);
    }
    let newVersion = {
        version: body.version,
        minimumVersion: body.min,
    };
    fs_1.default.writeFile(filepath, JSON.stringify(newVersion, null, 2), "utf-8", (err) => {
        if (err) {
            res.status(500).send("Error writing file");
            return;
        }
        res.status(200).send(newVersion);
    });
});
app.get("/version", (req, res) => {
    res.status(200).send({
        version: "2",
    });
});
