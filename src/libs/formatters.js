/*
amount - amount of money to be formated
currency - currency 
sufix - if true that the currency fill be placed after the ammount and if false it will be placed before the ammount
*/
let currencyFormat = function(amount, currency='SFX', sufix=false){
   return amount+currency;
}

export {
    currencyFormat
}