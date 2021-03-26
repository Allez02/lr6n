const express = require("express");
const body = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

var jsonData = require('./storage.json');
var pusto = []
var storage = [];

app.use(cors());
app.use(body.urlencoded({extended: true}));



app.get('/guide', function (req,res){
	storage=jsonData;
    res.send(storage);
	storage=[];
});
app.post('/guide',(req,res)=>{
	storage=jsonData;
    storage.push(req.body);
	fs.writeFileSync('storage.json', JSON.stringify(storage));
	res.send(storage[storage.length-1]);
	storage=[];
});
app.put('/guide/:id',(req,res) =>{
	storage=jsonData;
    const id = req.params.id;
    storage[id] = req.body;
	fs.writeFileSync('storage.json', JSON.stringify(storage));
	res.send(storage[id]);
	storage=[];
});
app.delete('/guide/:id', (req,res) =>{
	storage=jsonData;
    const id = req.params.id;
    storage.splice(parseInt(id), 1);
	fs.writeFileSync('storage.json', JSON.stringify(storage));
	storage= [];
	res.send(id);
});
app.listen(8080,function(){console.log('Server started')});