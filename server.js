// server.js
// console.log('May Node be with you');

// We use Express in Node.js by requiring it.
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
    // this is used to connect to MongoDB
const app = express()

MongoClient.connect('mongodb+srv://starwars:Starwars1@cluster0.sf7uo8q.mongodb.net/?retryWrites=true&w=majority',
{ useUnifiedTopology: true })
    // this gets rid of the depreciation warning
    // make sure that password is in this format username:password@cluster
  
    //// do something here
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
            // this a collection named quotes
        
    // ========================
    // Middlewares
    // ========================
       app.set('view engine', 'ejs')
           // This tells express we're using EJS as a template engine. 
    
       app.use(bodyParser.urlencoded({ extended: true }))
            // Make sure to place body-parser before your CRUD handlers!
       app.use(bodyParser.json())
        // this teaches the server to accept JSON data
       app.use(express.static('public'))

    // ========================
    // Routes
    // ========================

        //In Express we handle a GET request with the get method.
            // app.get(endpoint, callback)

        //endpoint is the requested endpoint, in other words the value that comes after your domain name.
            // Ex: Google.com/links    Google.com is the domain /links is the endpoint

        //callback tells the server what to do when the rqueested endpoint matches the endpoint stated
            //callback takes two arguments: a request object and a response object.

        app.get('/', (req, res) => {
            //req means request
            //res means response

            //do something here
            // Ex: res.send('Hello World')
            db.collection('quotes').find().toArray()
                // here we create a cursor object that contains all our quotes
                    // we use .toArray() to move all the quotes into an array.
                .then(quotes => {
                    res.render('index.ejs', { quotes: quotes })
                    // this renders the index.ejs file.
                    // the { quotes: results } passes quotes to the render method.
                })
                .catch(error => console.error(error))
         })


        // This is a POST method that handles a POST request.
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    // this res.redirect() makes sure that the page redirects to the home page after posting information so that it is not stuck loading.
                })
                .catch(error => console.error(error))
            })
        
        // This PUT method handles the PUT request
        app.put('/quotes', (req, res) => {

            // .findOneAndUpdate() syntax is
                // .findOneAndUpdate(query, update, options)
            quotesCollection.findOneAndUpdate(
                // this .findOneAndUpdate() method allows us to find and change one item in the database
                { name: 'Yoda' },
                    // here we are finding any quote with the name: value of 'Yoda'
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
                    // upsert means that if no documents can be update we can insert one ourselves
            }
          )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
        })


    // ========================
    // Listen
    // ========================
        app.listen(3000, function () {
        console.log('listening on 3000')
            // Here we create a server that browsers can connect to using Express' listen method.
        })
        
    })
    .catch(error => console.error(error))



