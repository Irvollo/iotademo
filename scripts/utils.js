//Return correct format for Ti,Gi,Mi,Ki, i
var parseAmount = function(amount) {
    
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
}

module.exports = parseAmount;