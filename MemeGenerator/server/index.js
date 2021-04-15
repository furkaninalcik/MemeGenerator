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
    res.json({ message: "Upload an image and write your captions!" });
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

// -------- TO DO --------
//console.log(`Your bucket is ${process.env.GCLOUD_STORAGE_BUCKET}`); // undefined
//const dotenv = require('dotenv');
//dotenv.config();
//console.log(`Your bucket is ${process.env.GCLOUD_STORAGE_BUCKET}`); // "memegenerator-ceng495-hw1.appspot.com"
//console.log(process.env); // 8626



//console.log(process.env)
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || "memegenerator-ceng495-hw1.appspot.com" );
//const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
//const bucket = storage.bucket("memegenerator-ceng495-hw1.appspot.com");
// A bucket is a container for objects (files).

const https = require('https')
const options = {
    hostname: 'api.memegen.link',
    //port: 443,
    path: '/images/custom/TOPTEXT/my_background.png?background=http://www.gstatic.com/webp/gallery/1.png',
    method: 'GET'
}

const request = require('request')


function createMeme(url, textData, res) {

    var reqSettings = {
        url: 'https://api.memegen.link/images/custom/' + textData.topText + '/' + textData.buttomText + '.png?background=' + url,
        //url: 'https://api.memegen.link/images/custom/TOPTEXT/my_background.png?background=' + url,
        method: 'GET',
        encoding: null
    };

    request(reqSettings, (error, response, body) => {
        res.status(200);
        res.set('Content-Type', 'image/png');
        res.send(body);
    });





    //const req = https.request(options, res => {
    //    console.log(`statusCode: ${res.statusCode}`)
    //
    //    res.on('data', d => {
    //        //process.stdout.write(d)
    //    })
    //
    //    res.on('end', () => {
    //        console.log('No more data in response.');
    //    });
    //
    //
    //})
    //
    //req.on('error', error => {
    //    console.error(error)
    //})
    //
    //req.end()

   



    //axios.get("https://api.memegen.link/images/custom/TOPTEXT/my_background.png?background=http://www.gstatic.com/webp/gallery/1.png")
    //    .then(res => {
    //        console.log(res.name)
    //    
    //        //this.setState({
    //        //    memeURL: 'https://api.memegen.link/images/custom/_/my_background.png?background=${this.state.image}'
    //        //})
    //    
    //    })
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

    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    //const elements = ['https://storage.googleapis.com/', bucket.name, blob.name];
    //console.log(elements.join());
    //const publicUrl = 
    //    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //;

      //res.status(200).send(publicUrl);
      console.log(req.body.topText);
      console.log(req.body.buttomText);
      createMeme(publicUrl, req.body , res ); // req.body holds the "topText" and the "buttomText" which will be placed on the image (texts and the image will be send to -> api.memegen.link)

  });

  blobStream.end(req.file.buffer);
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
