var IOTA = require("iota.lib.js")

module.exports = {
    detectTransaction : function(address) {
        var iota = new IOTA({
            'provider':'http://iri2.iota.fm:80'
        })
        iota.api.findTransactions({'addresses': [address]},function(error, hashes) {
            if (error) {
                console.log(error.message) 
            } else {
                /*iota.api.getLatestInclusion(hashes, function(error, states) {
                    var trackingHashes = []
                    for (i = 0; i < hashes.length; i++) {
                        var status = [hashes[i],states[i]];
                        trackingHashes.push(status);
                    }
                    console.log(trackingHashes);
                    
                })*/
                if (hashes.length > 1 ) {
                    console.log("transaction detected!");
                    return true;
                } else {
                    console.log("No transaction found");
                    return false;
                } 
            }
        });
    }
}