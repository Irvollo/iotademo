//Require modules
var express = require("express");
var IOTA = require("iota.lib.js")
var qr = require("qr-image");
var path = require("path");
var parseAmount = require("./scripts/utils");
var request = require("request");



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
    var displayAmount = parseAmount(amount);

    //Call CoinMarketCap Api to fetch IOTA USD Price
    var usdPrice;
    var usdAmount;

    //Check if the address is valid, if it is calls the USD price tracker.
    if (iota.valid.isAddress(address)) { 

        request('https://api.coinmarketcap.com/v1/ticker/iota/', function(error, response, body){
            if (error) {
                //This should handle price not available
                usdPrice = 0;
            } else {
                //Get the CMC price and calculate the total amount in USD to send of IOTa.
                var json = JSON.parse(body);
                usdPrice = json[0].price_usd;
                // Converts iotas to Miotas
                usdAmount = ((amount/1000000) * usdPrice).toFixed(2);
                //After the price calculation calls the render and send the parameters
                res.render("button", {
                    amount: amount,
                    displayAmount: displayAmount,
                    usdAmount: usdAmount,
                    address: address
                });
            }
        });
    //If the input address is invalid returns an error
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