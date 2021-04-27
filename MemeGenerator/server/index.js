const express = require("express");
const Multer = require("multer");
const { Storage } = require('@google-cloud/storage');
const request = require('request');


const PORT = process.env.PORT || 3001;

const app = express();


const path = require('path');
const {format} = require('util');

// resource for the code : https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-storage
// some code snippets have been taken from Google Cloud documentation.
// Also some files and codes have been created automatically by the commands such as "npx create-react-app" 
// Therefore some similarities with online resources may be found.


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/message", (req, res) => {
    res.json({ message: "Upload an image and write your captions!" });
    console.log("api call for message")
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));

});


// Instantiate a storage client
// The uploaded image will be stored in Google Cloud Storage and the public url will be sent to "api.memegen.link" to create meme.
const storage = new Storage();


// Multer is required to process file uploads and make them available via
// req.files.

const multer = Multer({

  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // max file size is 15mb
  },
});


// the bucket will store the images ever uploaded to the system
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || "memegenerator-ceng495-hw1.appspot.com" );


function createMeme(url, textData, res) {

    var reqSettings = {

        url: 'https://api.memegen.link/images/custom/' + textData.topText + '/' + textData.bottomText + '.png?background=' + url,
        method: 'GET',
        encoding: null
    };

    request(reqSettings, (_error, _response, body) => {
        res.status(200);
        res.set('Content-Type', 'image/png');
        res.send(body);
    });

}

app.post('/upload', multer.single('baseImage'), (req, res, next) => {

    if (!req.file) {
        res.status(400).send('No image uploaded.');
        return;
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {

        console.log("UPLOAD FINISHED")

        // This public URL will be sent to "api.memegen.link"
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
            
        createMeme(publicUrl, req.body , res ); // req.body holds the "topText" and the "bottomText" which will be placed on the image (texts and the image will be send to -> api.memegen.link)

    });

    blobStream.end(req.file.buffer);

});


app.listen(PORT, () => {
    //console.log(`Server listening on ${PORT}`);
});
