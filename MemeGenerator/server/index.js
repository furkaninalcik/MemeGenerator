const express = require("express");
const Multer = require("multer");

const PORT = process.env.PORT || 3001;

const app = express();


const path = require('path');
const {format} = require('util');

// resource for the code : https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-storage


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    console.log("api call")
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));

    //for testing on local
    //res.sendFile(path.resolve(__dirname, 'index.html'));

});

app.get('/images', (req, res) => {
    res.send("response");
    console.log(req.pathname);

    //var filePath = path.join(__dirname, req.pathname).split("%20").join(" ");
    //console.log(filePath);
    //
    //fs.exists(filePath, function (exists) {
    //
    //    if (!exists) {
    //        res.writeHead(404, {
    //            "Content-Type": "text/plain"
    //        });
    //        res.end("404 Not Found");
    //        return;
    //    }
    //
    //    // Extracting file extension
    //    var ext = path.extname(action);
    //
    //    // Setting default Content-Type
    //    var contentType = "text/plain";
    //
    //    // Checking if the extention of 
    //    // image is '.png'
    //    if (ext === ".png") {
    //        contentType = "image/png";
    //    }
    //
    //    // Setting the headers
    //    res.writeHead(200, {
    //        "Content-Type": contentType
    //    });
    //
    //    // Reading the file
    //    fs.readFile(filePath,
    //        function (err, content) {
    //            // Serving the image
    //            res.end(content);
    //        });
    //});


});



// image upload

//localStorageInfo is not used!
//const localStorageInfo = multer.diskStorage({
//    destination: function (req, file, callback)  {
//        callback(null, "/tmp/meme-generator-images")
//    },
//    filename: function (req, file, callback) {
//        const { originalname } = file;
//
//        callback(null, originalname);
//    }
//
//})


//const upload = multer({ dest: "server/images/" });
//const upload = multer({ storage: storageInfo });

//app.use(express.static('public'))
//app.use(express.static('images'))
//app.use('/images', express.static('images')); 

//app.post("/upload", upload.single("baseImage"),
//    (req, res) => {
//        console.log(req.file)
//        res.status(200).contentType("text/plain").end(req.file.originalname + "Image uploaded!!!");
//        
//    }
//);

const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();


// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 7 * 1024 * 1024, // max size is 7mb
  },
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
// A bucket is a container for objects (files).


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

    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
