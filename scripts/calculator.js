// Global object to store math logic
const FinanceLogic = {
    addVAT: (amount, rate) => {
        const tax = amount * (rate / 100);
        return { tax: tax.toFixed(2), total: (amount + tax).toFixed(2) };
    },

    getMarginMarkup: (cost, revenue) => {
        const profit = revenue - cost;
        const margin = (profit / revenue) * 100;
        const markup = (profit / cost) * 100;
        return {
            profit: profit.toFixed(2),
            margin: margin.toFixed(2),
            markup: markup.toFixed(2)
        };
    },

    generateAmortization: (principal, annualRate, years) => {
        const monthlyRate = (annualRate / 100) / 12;
        const totalMonths = years * 12;
        const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
        
        let balance = principal;
        const schedule = [];

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;
            
            schedule.push({
                month: i,
                interest: interestPayment.toFixed(2),
                principal: principalPayment.toFixed(2),
                balance: Math.max(0, balance).toFixed(2)
            });
        }
        return { monthlyPayment: monthlyPayment.toFixed(2), schedule };
    }
};