const monthlyInvestmentInput = document.getElementById('monthlyInvestment');
const returnRateInput = document.getElementById('returnRate');
const timePeriodInput = document.getElementById('timePeriod');
const investmentSlider = document.getElementById('investmentSlider');
const returnSlider = document.getElementById('returnSlider');
const timeSlider = document.getElementById('timeSlider');
const calculateBtn = document.getElementById('calculateBtn');
const futureValueEl = document.getElementById('futureValue');
const investedAmountEl = document.getElementById('investedAmount');
const wealthGainedEl = document.getElementById('wealthGained');
const summaryEl = document.getElementById('summary');

function syncInputAndSlider(input, slider) {
    input.addEventListener('input', () => {
        slider.value = input.value;
        calculateSIP();
    });

    slider.addEventListener('input', () => {
        input.value = slider.value;
        calculateSIP();
    });
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function calculateSIP() {
    const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);
    const annualRate = parseFloat(returnRateInput.value);
    const years = parseFloat(timePeriodInput.value);

    if (isNaN(monthlyInvestment) || isNaN(annualRate) || isNaN(years)) {
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedAmount = monthlyInvestment * months;
    const wealthGained = futureValue - investedAmount;

    futureValueEl.textContent = formatCurrency(Math.round(futureValue));
    investedAmountEl.textContent = formatCurrency(Math.round(investedAmount));
    wealthGainedEl.textContent = formatCurrency(Math.round(wealthGained));

    summaryEl.textContent = `If you invest ${formatCurrency(monthlyInvestment)} every month for ${years} years at an annual return rate of ${annualRate}%, you could accumulate ${formatCurrency(Math.round(futureValue))}. Your total investment would be ${formatCurrency(Math.round(investedAmount))}, resulting in a wealth gain of ${formatCurrency(Math.round(wealthGained))}.`;
}

function init() {
    syncInputAndSlider(monthlyInvestmentInput, investmentSlider);
    syncInputAndSlider(returnRateInput, returnSlider);
    syncInputAndSlider(timePeriodInput, timeSlider);
    calculateBtn.addEventListener('click', calculateSIP);
    calculateSIP();
}

document.addEventListener('DOMContentLoaded', init);
