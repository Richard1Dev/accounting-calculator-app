import { calculateVAT, calculateBreakEven } from './calculators.js';

// --- Tab Switching Logic ---
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.calc-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        
        // UI Updates
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        sections.forEach(s => {
            s.id === target ? s.classList.remove('hidden') : s.classList.add('hidden');
        });
    });
});

// --- VAT Logic ---
document.querySelector('#btn-calc-vat').addEventListener('click', () => {
    const amt = parseFloat(document.querySelector('#vat-amount').value);
    const rate = parseFloat(document.querySelector('#vat-rate').value);
    
    if(isNaN(amt)) return;

    const res = calculateVAT(amt, rate);
    document.querySelector('#vat-result').innerHTML = `
        Net: $${amt.toFixed(2)}<br>
        VAT: $${res.tax}<br>
        <strong>Gross: $${res.gross}</strong>
    `;
});

// --- Break-Even Logic ---
document.querySelector('#btn-calc-be').addEventListener('click', () => {
    const fixed = parseFloat(document.querySelector('#be-fixed').value);
    const price = parseFloat(document.querySelector('#be-price').value);
    const variable = parseFloat(document.querySelector('#be-variable').value);

    const units = calculateBreakEven(fixed, price, variable);
    document.querySelector('#be-result').innerHTML = `
        Units to break even: <strong>${units}</strong>
    `;
});