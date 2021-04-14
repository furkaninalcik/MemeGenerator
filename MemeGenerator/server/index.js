const express = require("express");
const multer = require("multer");

const PORT = process.env.PORT || 3001;

const app = express();


const path = require('path');



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

const storageInfo = multer.diskStorage({
    destination: function (req, file, callback)  {
        callback(null, 'server/images/')
    },
    filename: function (req, file, callback) {
        const { originalname } = file;

        callback(null, originalname);
    }

})


//const upload = multer({ dest: "server/images/" });
const upload = multer({ storage: storageInfo });

//app.use(express.static('public'))
//app.use(express.static('images'))
app.use('/images', express.static('images')); 

app.post("/upload", upload.single("baseImage"),
    (req, res) => {
        console.log(req.file)
        res.status(200).contentType("text/plain").end(req.file.originalname + "Image uploaded!!!");
        
    }
);




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
