//Require modules
var express = require("express");
var IOTA = require("iota.lib.js")
var qr = require("qr-image");
var path = require("path")


//Init app
var app = express();

//IOTA node
 var iota = new IOTA({
    'provider':'http://iri2.iota.fm:80'
})

//Set views
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");


app.get('/new/:amount/:address', function(req, res){
    var amount = req.param("amount");
    var address = req.param("address");

    if (iota.valid.isAddress(address)) { 
        res.render("button", {
            amount: amount,
            address: address
        });
    } else {
        res.send("Invalid address")
    }

});

app.get('/qr/:address', function(req,res){

    var address = req.param("address");
    var code = qr.image(address, {type: 'png', ec_level:'H', size: 5, margin: 0});
    res.setHeader('Content-type', 'image/png');  //sent qr image to client side
    code.pipe(res);
    
});

//Init server
app.listen(3000, function(){
    console.log("App started on port 3000");
});