const express = require("express");
const bodyParser = require("body-parser");

const uploadRoute = require("./src/routes/upload.route");

const app = express();
app.use(bodyParser.json());

app.use("/upload", uploadRoute);

app.all("*", (req, res) => {
    res.sendStatus(500);
});

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})
