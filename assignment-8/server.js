// Server JS
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    cors = require('cors'); // body parser

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/assignment8',
    {useNewUrlParser: true,  useUnifiedTopology: true }
    );
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//Enabling CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const initApp = require('./app/app');
initApp(app);

// Listen Port
app.listen(port);
console.log('Todo RESTful API server started on: ' + port);