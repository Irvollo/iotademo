//Require modules
var express = require("express");
var IOTA = require("iota.lib.js")

//Init app
var app = express();

//IOTA node
 var iota = new IOTA({
    'provider':'http://iri2.iota.fm:80'
})

//Init server
app.listen(3000, function(){
    console.log("App started on port 3000");
});