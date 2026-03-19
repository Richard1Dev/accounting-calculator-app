import { Loan, VAT } from './calculators.js';

// --- Tab Logic ---
window.openTab = (evt, tabName) => {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].classList.remove("active");
    
    const links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
};

// --- Audit Trail ---
const historyList = document.querySelector('#history-list');
const log = (msg) => {
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    historyList.prepend(li);
};

// --- Loan Events ---
document.querySelector('#btn-loan').addEventListener('click', () => {
    const p = parseFloat(document.querySelector('#loan-principal').value);
    const r = parseFloat(document.querySelector('#loan-interest').value);
    const y = parseFloat(document.querySelector('#loan-years').value);

    if (isNaN(p) || isNaN(r) || isNaN(y)) return alert("Fill all fields");

    const result = Loan.calculateMonthly(p, r, y);
    document.querySelector('#loan-result').innerText = `Monthly: $${result}`;
    log(`Loan: $${p} @ ${r}% / ${y}yrs -> $${result}/mo`);
});

// --- VAT Events ---
document.querySelector('#btn-vat-add').addEventListener('click', () => {
    const amt = parseFloat(document.querySelector('#vat-amount').value);
    const rate = parseFloat(document.querySelector('#vat-rate').value);
    if (isNaN(amt)) return;

    const res = VAT.add(amt, rate);
    document.querySelector('#vat-result').innerText = `Total: $${res.total}`;
    log(`VAT Add: $${amt} + ${rate}% = $${res.total}`);
});

document.querySelector('#btn-vat-remove').addEventListener('click', () => {
    const amt = parseFloat(document.querySelector('#vat-amount').value);
    const rate = parseFloat(document.querySelector('#vat-rate').value);
    if (isNaN(amt)) return;

    const res = VAT.remove(amt, rate);
    document.querySelector('#vat-result').innerText = `Net: $${res.net}`;
    log(`VAT Sub: $${amt} minus ${rate}% = $${res.net}`);
});

document.querySelector('#btn-clear-history').addEventListener('click', () => {
    historyList.innerHTML = '';
});