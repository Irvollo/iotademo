//Require modules
var express = require("express");
var IOTA = require("iota.lib.js")
var qr = require("qr-image");

//Init app
var app = express();

//IOTA node
 var iota = new IOTA({
    'provider':'http://iri2.iota.fm:80'
})

app.get('/qr/:address', function(req,res){

    var address = req.param("address");
    var code = qr.image(address, {type: 'png', ec_level:'H', size: 10, margin: 0});
    res.render("button")

});

//Init server
app.listen(3000, function(){
    console.log("App started on port 3000");
});