# MemeGenerator

## Programming Languages, Frameworks and Tools

- Frontend was developed with React.
- Backend was developed with Node.js, Express framework.
- Google Cloud Storage was used as the storage service to manage data on App Engine.

- API used for meme creation: "memegen" by jacebrowning
  - Resource: https://github.com/jacebrowning/memegen

## Dependencies:

"@google-cloud/storage": "^5.8.3"

"bootstrap": "^4.6.0"

"dotenv": "^8.2.0"

"express": "^4.17.1"

"format-util": "^1.0.5"

"multer": "^1.4.2"

"request": "^2.88.2"

"util": "^0.12.3"



## How to use

1- Go to https://memegenerator-ceng495-hw1.appspot.com/

2- Upload image (jpeg or png)

3- Write your captions (top text and bottom text)

4- Submit and wait for a few seconds

5- Your meme is ready!


## How to run the service

'npm start'

Note: Since the system uses Google Cloud Storage, the file upload will not be allowed due to authentication. The service key can be provided for testing on local if it is necessary.