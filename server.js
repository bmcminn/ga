// initialize our environment configurations
require('dotenv').config();


// initialize our library instnace vars
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var fs          = require('fs');
var path        = require('path');


// setup the static directory we will serve all static assets from
//   - (images, txt, fonts, css, js, etc.)
app.use(express.static(path.join(__dirname, '/public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, 'public')));


// GET requests should serve the content requested by the client
app.get('/favorites', function(req, res) {
    var data = fs.readFileSync('./data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});


// POST requests should insert new data specified by the client
app.post('/favorites', function(req, res){
    if(!req.body.name || !req.body.oid){
        res.send("Error");
        return;
    }

    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});


// PUT requests should update the data specified by the client



// initialize the server on port 3000, unless defined in our .env file
var serverPort = process.env.PORT || 3000;
app.listen(serverPort, function(){
    console.log("Listening on port " + serverPort);
});
