module.exports = {
    //Return correct format for Ti,Gi,Mi,Ki, i
    parseAmount: function(amount) {
    
        var localeAmount = amount.toLocaleString('en');
        
        if (amount < 999) {
            return localeAmount + " i"
        } else if (amount >= 1000 && amount < 999999) {
            return (localeAmount/1000) + " Ki"
        } else if (amount >= 1000000 && amount < 999999999) {
            return (localeAmount/1000000) + " Mi"
        } else if (amount >= 1000000000 && amount < 999999999999) {
            return (localeAmount/1000000000) + " Gi"
        } else if (amount >= 1000000000000 && amount < 999999999999999) {
            return (localeAmount/1000000000000) + " Ti"
        }
    },
    expirationDate: function(creationDate){

        var expirationSeconds = 300;
        var expirationDate = new Date(); 
        expirationDate.setTime(creationDate.getTime() + (expirationSeconds*1000));
        var currentDate = new Date();
        return (expirationDate - currentDate)/1000;
        
    }
}

