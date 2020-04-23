"use strict";

/*
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateDate()
      Validates that the user has entered a valid expiration date for the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

   /* Create an event listener for the window load event that retrieves the field values attached to the query string of the page’s URL. Add the following to the event listener’s anonymous function: */
   window.addEventListener("load", function () {
   /* Create the orderData variable that stores the query string text from the URL. Slice the orderData text string to remove the first ? character, replace every occurrence of the + character with a blank space, and decode the URI-encoded characters. */
   var orderData = location.search.slice(1);
   orderData = orderData.replace(/\+/g," ");
   orderData = decodeURIComponent(orderData);
   /* Split the orderData variable at every occurrence of a & or = character and store the substrings in the orderFields array variable. */
   var orderFields = orderData.split(/[&=}]/g);

   /* Write the following values from the orderFields array into the indicated fields of the order form:
   orderFields[3] into the modelName field
   orderFields[5] into the modelQty field
   orderFields[7] into the orderCost field
   orderFields[9] into the shippingType field
   orderFields[13] into the shippingCost field
   orderFields[15] into the subTotal field
   orderFields[17] into the salesTax field
   orderFields[19] into the cartTotal field */
   document.forms.order.elements.modelName.value = orderFields[3];
   document.forms.order.elements.modelQty.value = orderFields[5];
   document.forms.order.elements.orderCost.value = orderFields[7];
   document.forms.order.elements.shippingType.value = orderFields[9];
   document.forms.order.elements.shippingCost.value = orderFields[13];
   document.forms.order.elements.subTotal.value = orderFields[15];
   document.forms.order.elements.salesTax.value = orderFields[17];
   document.forms.order.elements.cartTotal.value = orderFields[19];

});

   /* Add another event listener for the window load event that runs different validation event handlers when the page is loaded by the browser. Add the following code to the anonymous function for load event:
 */
   window.addEventListener("load",function () {
   /* Run the runSubmit() function when the subButton isclicked.
   Run the validateName() function when a value is input into the cardHolder field.
   Run the validateNumber() function when a value is input into the cardNumber field.
   Run the validateDate() function when a value is input into the expDate field.
   Run the validateCVC() function when a value is input into the cvc field. */
   document.getElementById("subButton").onclick = runSubmit;
   document.getElementById("cardHolder").oninput = validateName;
   document.getElementById("cardNumber").oninput = validateNumber;
   document.getElementById("expDate").oninput = validateDate;
   document.getElementById("cvc").oninput = validateCVC;

});

   /* Create the runSubmit() function that is run when the form is submitted. Within the function add commands to run the validateName(), validateCredit(), validateNumber(), validateDate(), and validateCVC() functions. */
   function runSubmit() {
   validateName();
   validateCredit();
   validateNumber();
   validateDate();
   validateCVC();
}

   /* Create the validateDate() function. The purpose of this function is to validate the credit card expiration date stored in the expDate field */
   function validateDate() {
   var cardExp = document.getElementById("expDate");
   /* Insert an if-else structure that tests If no value has been entered for the expiration date, set the custom validation message to Enter the expiration date.
   If the expiration date does not match the regular expression pattern:
   /^(0[1-9]|1[0-2])\/20[12]\d$/
   set the custom validation message to Enter a valid expiration date. (Hint: Use the test() method.)
   Otherwise set the custom validation message to an empty text string. */
   if (cardExp.validity.valueMissing) {
       cardExp.setCustomValidity("Enter the expiration date");
   }
   else if (/^(0[1-9]|1[0-2])\/20[12]\d$/.test(cardExp.value) ===false) {
       cardExp.setCustomValidity("Enter a valid expiration date");
   }
   else {
       cardExp.setCustomValidity("");
   }

}

/* Functions already provided in the file */

function validateName() {
   var cardName = document.getElementById("cardHolder");
   if (cardName.validity.valueMissing) {
       cardName.setCustomValidity("Enter the card holder");
   } else {
       cardName.setCustomValidity("");
   }
}


function validateCredit() {
   var creditCard = document.forms.credit.elements.company[0];
   if (creditCard.validity.valueMissing) {
       creditCard.setCustomValidity("Select your credit card");
   } else {
       creditCard.setCustomValidity("");
   }
}

function validateNumber() {
   var cardNumber = document.getElementById("cardNumber");
   if (cardNumber.validity.valueMissing) {
       cardNumber.setCustomValidity("Enter your card number");
   } else if (cardNumber.validity.patternMismatch) {
       cardNumber.setCustomValidity("Enter a valid card number");
   } else if (luhn(cardNumber.value) === false) {
       cardNumber.setCustomValidity("Enter a legitimate card number");
   } else {
       cardNumber.setCustomValidity("");
   }
}

function validateCVC() {
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="company"]:checked').value;

   if (cardCVC.validity.valueMissing) {
       cardCVC.setCustomValidity("Enter your code CVC number");
   } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
       cardCVC.setCustomValidity("Enter a 4-digit CVC number");
   } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
       cardCVC.setCustomValidity("Enter a 3-digit CVC number");
   } else {
       cardCVC.setCustomValidity("");
   }
}

function sumDigits(numStr) {
   var digitTotal = 0;
   for (var i = 0; i < numStr.length; i++) {
       digitTotal += parseInt(numStr.charAt(i));
   }
   return digitTotal;
}

function luhn(idNum) {
   var string1 = "";
   var string2 = "";

   // Retrieve the odd-numbered digits
   for (var i = idNum.length - 1; i >= 0; i -= 2) {
       string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits and double them
   for (var i = idNum.length - 2; i >= 0; i -= 2) {
       string2 += 2 * idNum.charAt(i);
   }

   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
}
