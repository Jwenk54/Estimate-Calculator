let sqftInput = document.getElementById('sqftInput');
let materialInput = document.getElementById('materialSelect');
let priceInput = document.getElementById('priceInput');
let taxInput = document.getElementById('taxInput');
let calculateBtn = document.getElementById('calculateBtn');
let result = document.getElementById('result');
let saveBtn = document.getElementById('saveBtn');
let savedEstimates = document.getElementById('savedEstimates');
let clearSavedBtn = document.getElementById('clearSavedBtn');

//load saved estimates on page load
let estimates = JSON.parse(localStorage.getItem('estimates')) || [];
renderEstimates();

        
function renderEstimates() {
    savedEstimates.innerHTML = '';
    
    for (let i = 0; i < estimates.length; i++) {
        let div = document.createElement('div');
        div.textContent = estimates[i];
        savedEstimates.appendChild(div);
    };
}

calculateBtn.addEventListener('click', function() {
//only calculation stuff goes here

    let sqft = Number(sqftInput.value);
    let materialMarkup = Number(materialInput.value);
    let price = Number(priceInput.value);

    if (sqft <= 0 || price <= 0){
        result.textContent = 'Please enter valid numbers.';
        return;
    }

    let taxPercent = Number(taxInput.value);

    if (taxPercent < 0) { result.textContent = 'Please enter a valid tax percentage.'; return; }

    
    let subtotal = sqft * price;
    let materialExtra = subtotal * materialMarkup
    let newSubtotal = subtotal + materialExtra;

    let taxAmount = newSubtotal * (taxPercent / 100);
    let total = newSubtotal + taxAmount;

    result.textContent =
        "Subtotal: $" + subtotal.toFixed(2) + 
        " | Materials: + $" + materialExtra.toFixed(2) +
        " | Tax: + $" + taxAmount.toFixed(2) +
        " | Total: $" + total.toFixed(2);

    });

//save button
saveBtn.addEventListener('click', function() {
    if (result.textContent === '') return;
    
    estimates.push(result.textContent);
    localStorage.setItem('estimates', JSON.stringify(estimates));
    renderEstimates();
});

//clear button
clearSavedBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Clearing saved estimates');
    localStorage.removeItem('estimates');
    estimates = [];
    renderEstimates();
    });
