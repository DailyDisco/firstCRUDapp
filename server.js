// server.js
// console.log('May Node be with you');

// We use Express in Node.js by requiring it.
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
    // this is used to connect to MongoDB
const app = express();

MongoClient.connect('monogodb-connection-string', (err, client) => {
    // do something here
})


// Here we create a server that browsers can connect to using Express' listen method.
app.listen(3000, function () {
    console.log('listening on 3000')
})

// Make sure to place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))

//In Express we handle a GET request with the get method.

    // app.get(endpoint, callback)

    //endpoint is the requested endpoint, in other words the value that comes after your domain name.
    // Ex: Google.com/links    Google.com is the domain /links is the endpoint

    //callback tells the server what to do when the rqueested endpoint matches the endpoint stated
        //callback takes two arguments: a request object and a response object.

            app.get('/', (req, res) => {
                //do something here
                    // Ex: res.send('Hello World')
                    res.sendFile(__dirname + '/index.html');
                        // __dirname is the current directory that you're in
            })
                //req means request
                //res means response


// This is a POST method that handles a POST request.
    app.post('/quotes', (req, res) => {
        console.log(req.body)
    })



