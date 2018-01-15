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
            var addressBalance = balance.balances[0]
            console.log("Balance is: " + addressBalance);
            res.json({balance: addressBalance});
        }
    });

});

app.get("/transactions/:address",function(req, res){
    // This get the address to which we should check if a transaction is confirmed and add it to the array.
    var hashes = []
    hashes.push(req.param('address'));

    /*
    iota.api.findTransactions({"addresses": hashes} ,function(error, transactions){
        if(error) {
            console.log("Error");
        } else {
            res.json({transactions: transactions});
        }
    });*/
    /*
    iota.api.isReattachable(req.param('address') , function(error,status){
        if (error) {
            console.log("Couldn't found the address");
        } else {
            console.log("Searching for transactions in "+ req.param('address'))
            res.json({status: status});
        }
    });
    */

    iota.api.getTransactionsObjects(hashes, function(error, transactions){
        if (error) {
            console.log("Transaction error");
            res.json({error: error})
        } else { 
            res.json({transactions: transactions});
        }
    })
})

//Init server
app.listen(3000, function(){
    console.log("App started on port 3000");
});