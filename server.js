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
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'./views/trial3.html'));

});
app.get('/register',(req, res)=>{
    res.sendfile('./views/register.html');
});
app.get('/login',(req, res)=>{
    res.sendfile('./views/login.html');
    
});
app.get('/logind',(req, res)=>{
    response = { email:req.query.email, password:req.query.psw, };
    console.log(req.query) ;
    MongoClient.connect('mongodb://localhost:27017/', function(err, db)
        { 
            if (err) throw err;
            console.log("Connected to Database");
            var dbc=db.db('')
            dbc.collection('clientd').findOne({email:req.query.email}).then(user =>{
                if(user){
                    res.sendFile('./views/trial3.html');
                }
                else{
                    res.sendfile('./views/register.html');
                }
            })
        });     
});
app.get('/signup',(req, res)=>{
    response = { UserName:req.query.name, email:req.query.email, password:req.query.psw, state:req.query.state };
    console.log(req.query) 
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
        res.sendfile('./views/login.html');
});

app.listen(3000);