//Require modules
var express = require("express");
var IOTA = require("iota.lib.js")

//Init app
var app = express();

//IOTA node
 var iota = new IOTA({
    'provider':'http://iri2.iota.fm:80'
})


app.get("/node/status", function(req, res){

    iota.api.getNodeInfo(function(error, nodeInfo){
        if(error){
            console.log("Error getting node info");
            return;
        } else {
            //console.log('NodeInfo:' + JSON.stringify(nodeInfo));
            res.json({nodeInfo: JSON.stringify(nodeInfo)});
        }
    });

});

app.get("/balance/:seed", function(req, res){

    var seed = req.param('seed');
    console.log(seed);
    iota.api.getAccountData(seed, function(error, accountData){
        if(error) {
            cosole.log("Error: " + error.description);
            return;
        } else {
            console.log('The balance of this account is: ' + accountData.balance + 'i');
            res.json({accountData: accountData}) 
        }
    });
     
});

app.get("/balances/:address",function(req, res){

    var address = []
    address.push(req.param('address'));

    iota.api.getBalances(address,100,function(error, balance){
        if(error) {
            console.log("Error");
            return;
        } else {
            console.log("Balance is: " + balance.balances[0]);
            res.json({balance: balance});
        }
    });

});

app.get("/transactions/:address",function(req, res){
    var hashes = []
    hashes.push(req.param('address'));
    console.log(hashes);
    iota.api.findTransactions({"addresses": hashes} ,function(error, transactions){
        if(error) {
            console.log("Error");
        } else {
            res.json({transactions: transactions});
        }
    });
})

//Init server
app.listen(3000, function(){
    console.log("App started on port 3000");
});