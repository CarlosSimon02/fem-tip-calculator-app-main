"use strict";

let bill = document.getElementById("bill");
let currentTip = document.querySelector("input[type=radio]:checked");
let tips = document.getElementsByName("tip");
let custom = document.getElementById("custom");
let customTipInput = document.getElementById("customTipInput");
let persons = document.getElementById("persons");
let tipAmount = document.getElementById("tip-amount");
let total = document.getElementById("total");
let reset = document.getElementById("reset");

function setResetEnabled() {
    if(bill.value === "" && currentTip === null && persons.value === "") {
        reset.disabled = true;
        return;
    }

    reset.disabled = false;
}

function calculateTipAndTotal() {
    setResetEnabled();
    if(bill.value !== "" &&
       (currentTip !== null && currentTip.value !== "") &&
       (persons.value !== "" && parseInt(persons.value) > 0)) {
        let tipAmountI = (bill.value*currentTip.value) / persons.value;
        tipAmount.innerHTML = "$" + tipAmountI.toFixed(2);
        total.innerHTML = "$" + ((bill.value / persons.value) + tipAmountI).toFixed(2);
        return;
    }

    tipAmount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
}

function validateDecimal(elem) {
    let validNumber = new RegExp(/^\d+(\.\d+)?$/);
    let lastValid = bill.value;
    if (validNumber.test(elem.value)) {
        lastValid = elem.value;
    } else {
        elem.value = lastValid;
    }
}

bill.oninput = function() {
    validateDecimal(this);
    calculateTipAndTotal();
}

for (var i = 0; i < tips.length; i++) {
    tips[i].addEventListener('change', function() {
        if(this.checked) {
            currentTip = this;
            calculateTipAndTotal();
        }
    });
}

customTipInput.onfocus = function() {
    custom.checked = true;
    currentTip = custom;
    calculateTipAndTotal();
}

customTipInput.oninput = function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    custom.value = this.value / 100;
    calculateTipAndTotal();
}

persons.oninput = function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    calculateTipAndTotal();
}

reset.onclick = function() {
    bill.value = "";
    customTipInput.value = "";
    if(currentTip !== null) {
        currentTip.checked = false;
        currentTip = null;
    }
    persons.value = "";
    calculateTipAndTotal(); 
}