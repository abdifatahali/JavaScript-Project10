"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Abdifatah Ali
   Date:   January 27, 2020   
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

/* dd an event listener for the window load event */
window.addEventListener("load",function () {
   /* When the page is loaded, load event runs the calcCart() function. */
   calcCart();
   /* Add an event handler to the modelQty field in the cart form that runs the calcCart() function when the field value is changed. */
   var cart = document.forms.cart;
   cart.elements.modelQty.onchange = calcCart;
   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   /* A for loop that loops through every option in the group of shipping option buttons, adding an event handler to run the calcCart() function when each option button is clicked. */
   for (var i = 0;i <= shippingOptions.length; i++) {
       shippingOptions[i].onclick = calcCart;
   }

});

/* Create the calcCart() function to calculate the cost of the customer’s order using field values in the cart form */
function calcCart() {
   /* Create a variable named orderCost that is equal to the cost of the espresso machine stored in the modelCost field multiplied by the quantity of machines ordered as stored in the modelQty field. */
   var cart = document.forms.cart;
   var machineCost = cart.elements.modelCost.value;
   var qIndex = cart.elements.modelQty.selectedIndex;
   var qty = cart.elements.modelQty[qIndex].value;
   /* Display the value of the orderCost variable in the orderCost field, formatted as U.S. currency. */
   var orderCost = machineCost * qty;
   cart.elements.orderCost.value = formatUSCurrency(orderCost);

   /* Create a variable named shipCost equal to the value of the selected shipping option from the group of shipping option buttons multiplied by the quantity of machines ordered. */
   var shipCost = document.querySelector('input[name="shipping"]:checked').value*qty;
   /* Display the value of the shipCost variable in the shippingCost field, formatted with a thousands separator and to two decimals places. */
   cart.elements.shippingCost.value = formatNumber(shipCost);

   /* Display the sum of orderCost and shipCost formatted with a thousands separator and to two decimal places. */
   cart.elements.subTotal.value = formatNumber(orderCost+shipCost, 2);

   /* Create a variable named salesTax equal to 0.05 times the sum of the orderCost and shipCost variables. */
   var salesTax = 0.05*(orderCost+shipCost);
   /* Display the value of the salesTax variable in the salesTax field, formatted with a thousands separator and to two decimal places. */
   cart.elements.salesTax.value = formatNumber(salesTax,2);

   /* Display the sum of the orderCost, shipCost, and salesTax variables. Format the value as U.S. currency. */
   cart.elements.cartTotal.value = formatUSCurrency(orderCost+shipCost+salesTax);

}



function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals
   });
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
