import { FinanceLogic } from './calculators.js';

// --- Tab Switching ---
window.openTab = (evt, tabName) => {
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-link").forEach(l => l.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
};

// --- Audit Trail Logging ---
const historyList = document.querySelector('#history-list');
const log = (msg) => {
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    historyList.prepend(li);
};

// --- Loan Event ---
document.querySelector('#btn-loan').addEventListener('click', () => {
    const p = parseFloat(document.querySelector('#loan-principal').value);
    const r = parseFloat(document.querySelector('#loan-interest').value);
    const y = parseFloat(document.querySelector('#loan-years').value);

    if (isNaN(p) || isNaN(r) || isNaN(y)) return;

    const { monthlyPayment, schedule } = FinanceLogic.generateAmortisation(p, r, y);
    
    document.querySelector('#loan-result').innerHTML = `Monthly Payment: <strong>$${monthlyPayment}</strong>`;
    
    const tbody = document.querySelector('#amortisation-table tbody');
    tbody.innerHTML = ''; // Clear old data
    
    schedule.forEach(row => {
        const tr = `<tr>
            <td>${row.month}</td>
            <td>$${row.interest}</td>
            <td>$${row.principal}</td>
            <td>$${row.balance}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', tr);
    });

    log(`Loan: $${p} @ ${r}% for ${y}y. Payment: $${monthlyPayment}`);
});

// --- VAT/Margin Events ---
document.querySelector('#btn-vat-add').addEventListener('click', () => {
    const amt = parseFloat(document.querySelector('#calc-amount').value);
    const rate = parseFloat(document.querySelector('#calc-secondary').value);
    const res = FinanceLogic.addVAT(amt, rate);
    document.querySelector('#tax-result').innerHTML = `Total (Gross): $${res.total} (Tax: $${res.tax})`;
    log(`VAT: $${amt} + ${rate}% = $${res.total}`);
});

document.querySelector('#btn-margin').addEventListener('click', () => {
    const cost = parseFloat(document.querySelector('#calc-amount').value);
    const rev = parseFloat(document.querySelector('#calc-secondary').value);
    const res = FinanceLogic.getMarginMarkup(cost, rev);
    document.querySelector('#tax-result').innerHTML = `Margin: ${res.margin}% | Markup: ${res.markup}%`;
    log(`Margin: Cost $${cost}, Rev $${rev} -> ${res.margin}%`);
});

document.querySelector('#btn-clear-history').addEventListener('click', () => historyList.innerHTML = '');