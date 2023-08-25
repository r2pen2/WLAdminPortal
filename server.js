const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const siteImages = require('./libraries/Server-Legos/siteImages');
const siteText = require('./libraries/Server-Legos/siteText');
const siteModels = require('./libraries/Server-Legos/siteModels');
const fileUpload = require('express-fileupload');

// Init express application
const app = express();

// Allow for CORS and file upload
app.use(cors());
app.use(fileUpload());

// Init env files
dotenv.config();

// Start listening on defined port
app.listen(25565, () => {
    console.log('Now listening on port ' + 25565);
});

// Serve static files
app.use(express.static(__dirname + "/static/"));

// BodyParser setup
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));

// Server site text
app.use("/site-text", siteText);
// Server site images
app.use("/site-images", siteImages);
// Server site models
app.use("/site-models", siteModels);
// Server site rules
app.use("/site-rules", siteRules);
// Server site mail
app.use("/site-mail", siteMail);

// Allow post to /images, placing an image in the static folder
app.post("/images/*", (req, res) => {
    const targetPath = __dirname + "static/" + req._parsedUrl.path;
    fs.writeFile(targetPath, req.files.file.data, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    });
})

app.post("/delete-img", (req, res) => {
    const targetPath = __dirname + "/images/" + req._parsedUrl.query.substring(req._parsedUrl.query.indexOf("=") + 1)

    fs.rm(targetPath, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
})

// Serve React build
app.use(express.static(__dirname + "/client/build"));

// Serve react app
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});