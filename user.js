var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient; 
const path = require('path');
const rootDir= require('./util/path.js');

var app=express();
MongoClient.connect('mongodb://localhost:27017',function(){
    console.log('MongoClient Connected');
}); 

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.post('/login',urlencodedParser, function (req, res) {
    response = { UserName:req.body.uname, Password:req.body.psw, };
    console.log(req.body)
    res.redirect('trial3.html')
    MongoClient.connect('mongodb://localhost:27017/', function(err, db)
        { 
            if (err) throw err;
            console.log("Connected to Database");
            var dbc=db.db("myclient");
            dbc.collection('clientd').insertOne(response, function(err, result)
            { 
                if (err) throw err;
                console.log("1 Client info inserted in your mongodb database" ); 
            });
        });
        console.log(response);
        res.end();
    });
app.get('/',(req, res)=>{
    res.sendfile('./views/trial3.html');
});
app.listen(3000);

