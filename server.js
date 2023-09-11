const fetch = require('node-fetch')

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const siteRules = require('./libraries/Server-Legos/siteRules');
const fileUpload = require('express-fileupload');


const {db, auth} = require("./firebase")

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

app.get("/external-forms", (req, res) => {
    const siteId = req.query.siteId;
    const accessToken = req.query.accessToken;


    auth.verifyIdToken(accessToken).then(decodedToken => {
        // We made it through!
        let secret = null;
        let url = null;
        switch (siteId) {
            case "BTB":
                secret = process.env.BTBFORMKEY;
                url = "https://www.beyondthebelleducation.com"
                break;
            default:
                break;
        }
        const userEmail = decodedToken.email;
        // TODO: Before this fetch, scrape AvailableSites to make sure this user has access to the requested form deck
        fetch(`${url}/site-forms?key=${secret}`).then(externalRes => {
            externalRes.json().then(json => {
                res.json(json);
            })
        })
    }).catch(err => {
        res.send(403)
    })
})

app.get("/external-users", (req, res) => {
    const siteId = req.query.siteId;
    const accessToken = req.query.accessToken;

    auth.verifyIdToken(accessToken).then(decodedToken => {
        // We made it through!
        let secret = null;
        let url = null;
        switch (siteId) {
            case "BTB":
                secret = process.env.BTBUSERKEY;
                url = "https://www.beyondthebelleducation.com"
                break;
            case "YCD":
                secret = process.env.YCDUSERKEY;
                url = "https://www.youcandoitgardening.com"
                break;
            default:
                break;
        }
        const userEmail = decodedToken.email;
        // TODO: Before this fetch, scrape AvailableSites to make sure this user has access to the requested user deck
        fetch(`${url}/site-auth?key=${secret}`).then(externalRes => {
            externalRes.json().then(json => {
                res.json(json);
            })
        })
    }).catch(err => {
        res.send(403)
    })
})

app.post("/external-users", (req, res) => {
    auth.verifyIdToken(req.body.accessToken).then(decodedToken => {
        // We made it through!
        let secret = null;
        let url = null;
        switch (req.body.siteId) {
            case "BTB":
                secret = process.env.BTBUSERKEY;
                url = "https://www.beyondthebelleducation.com"
                break;
            case "YCD":
                secret = process.env.YCDUSERKEY;
                url = "https://www.youcandoitgardening.com"
                break;
            default:
                break;
        }
        const userEmail = decodedToken.email;
        // TODO: Before this fetch, scrape AvailableSites to make sure this user has access to the requested user deck
        const postBody = {
            key: secret,
            email: req.body.email,
            field: req.body.field,
            value: req.body.value,
          }
        fetch(`${url}/site-auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
          }).then((response) => {
            console.log(response)
            res.sendStatus(response.status)
          });
        }).catch((error) => {
            console.log(error)
            res.sendStatus(404)
        })
})

// Serve React build
app.use(express.static(__dirname + "/client/build"));

// Serve react app
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});