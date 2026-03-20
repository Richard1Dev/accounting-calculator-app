// --- Tab Switching Function ---
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }
    const links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// --- Digital Tape / History Logic ---
const historyList = document.getElementById('history-list');
function logToTape(msg) {
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString('en-GB')}] ${msg}`;
    if (historyList) historyList.prepend(li);
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Loan Amortisation Event
    const btnLoan = document.getElementById('btn-loan');
    if (btnLoan) {
        btnLoan.addEventListener('click', () => {
            const p = parseFloat(document.getElementById('loan-principal').value);
            const r = parseFloat(document.getElementById('loan-interest').value);
            const y = parseFloat(document.getElementById('loan-years').value);

            if (isNaN(p) || isNaN(r) || isNaN(y)) return alert("Please enter valid numbers.");

            const result = FinanceLogic.generateAmortization(p, r, y);
            document.getElementById('loan-result').innerHTML = `Monthly Payment: <strong>£${result.monthlyPayment}</strong>`;
            
            const tbody = document.querySelector('#amortization-table tbody');
            tbody.innerHTML = ''; // Clear table
            
            result.schedule.forEach(row => {
                const tr = `<tr>
                    <td>${row.month}</td>
                    <td>£${row.interest}</td>
                    <td>£${row.principal}</td>
                    <td>£${row.balance}</td>
                </tr>`;
                tbody.insertAdjacentHTML('beforeend', tr);
            });
            logToTape(`Loan: £${p} at ${r}% for ${y}y. Payment: £${result.monthlyPayment}`);
        });
    }

    // VAT Event
    document.getElementById('btn-vat-add').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('calc-amount').value);
        const rate = parseFloat(document.getElementById('calc-secondary').value);
        if (isNaN(amt) || isNaN(rate)) return;

        const res = FinanceLogic.addVAT(amt, rate);
        document.getElementById('tax-result').innerHTML = `Total (Gross): £${res.total} (Tax: £${res.tax})`;
        logToTape(`VAT: £${amt} + ${rate}% = £${res.total}`);
    });

    // Margin Event
    document.getElementById('btn-margin').addEventListener('click', () => {
        const cost = parseFloat(document.getElementById('calc-amount').value);
        const rev = parseFloat(document.getElementById('calc-secondary').value);
        if (isNaN(cost) || isNaN(rev)) return;

        const res = FinanceLogic.getMarginMarkup(cost, rev);
        document.getElementById('tax-result').innerHTML = `Margin: ${res.margin}% | Markup: ${res.markup}%`;
        logToTape(`Margin: Cost £${cost}, Rev £${rev} -> ${res.margin}%`);
    });

    // Clear History
    document.getElementById('btn-clear-history').addEventListener('click', () => {
        historyList.innerHTML = '';
    });
});