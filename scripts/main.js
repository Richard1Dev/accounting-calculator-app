function calculateLoan() {
    let principal = document.getElementById('principal').value;
    let interest = document.getElementById('interest').value;
    let years = document.getElementById('years').value;

    if (principal === '' || interest === '' || years === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Convert annual interest rate to monthly rate
    let monthlyInterestRate = (interest / 100) / 12;

    // Calculate number of months
    let totalPayments = years * 12;

    // Calculate monthly payment
    let x = Math.pow(1 + monthlyInterestRate, totalPayments);
    let monthlyPayment = (principal * x * monthlyInterestRate) / (x - 1);

    if (isNaN(monthlyPayment) || (!isFinite(monthlyPayment))) {
        alert('Invalid input');
    } else {
        monthlyPayment = monthlyPayment.toFixed(2);
        document.getElementById('result').innerHTML = `Your monthly payment is $${monthlyPayment}`;
    }
}