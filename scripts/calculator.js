// Pure math logic
export const Loan = {
    calculateMonthly: (p, r, y) => {
        const monthlyRate = (r / 100) / 12;
        const totalPayments = y * 12;
        const x = Math.pow(1 + monthlyRate, totalPayments);
        const monthly = (p * x * monthlyRate) / (x - 1);
        return isFinite(monthly) ? monthly.toFixed(2) : "0.00";
    }
};

export const VAT = {
    add: (amount, rate) => {
        const tax = amount * (rate / 100);
        return { tax: tax.toFixed(2), total: (amount + tax).toFixed(2) };
    },
    remove: (amount, rate) => {
        const net = amount / (1 + (rate / 100));
        const tax = amount - net;
        return { net: net.toFixed(2), tax: tax.toFixed(2) };
    }
};