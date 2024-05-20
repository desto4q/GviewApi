const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const filepath = path.join(__dirname, "../version.json");
app.use(express.json());

app.listen(PORT, () => {
	console.log("Server started on port", PORT);
});

app.get("/", (req, res) => {
	fs.readFile(filepath, "utf-8", (err, data) => {
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

	if (!body.version || !body.min ) {
		res.status.send(404);
	}
	let newVersion = {
		version: body.version,
		minimumVersion: body.min,
		breaking: body.breaking ? body.breaking : false,
	};

	fs.writeFile(
		filepath,
		JSON.stringify(newVersion, null, 2),
		"utf-8",
		(err) => {
			if (err) {
				res.status(500).send("Error writing file");
				return;
			}
			res.status(200).send(newVersion);
		}
	);
});

app.get("/version", (req, res) => {
	res.status(200).send({
		version: "2",
	});
});
