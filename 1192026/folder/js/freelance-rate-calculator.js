// Freelance Rate Calculator Logic
(function() {
    const form = document.getElementById('freelanceRateForm');
    const resultsDiv = document.getElementById('results');

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    }

    function formatNumber(value) {
        return Math.round(value).toLocaleString('en-US');
    }

    function validateInputs(desiredSalary, billableHours, vacationWeeks, expenses, profitMargin, taxRate) {
        const errors = [];

        if (desiredSalary <= 0) errors.push('Desired salary must be greater than 0');
        if (billableHours <= 0 || billableHours > 168) {
            errors.push('Billable hours must be between 1 and 168 hours per week');
        }
        if (vacationWeeks < 0 || vacationWeeks >= 52) {
            errors.push('Vacation weeks must be between 0 and 51');
        }
        if (expenses < 0) errors.push('Expenses cannot be negative');
        if (profitMargin < 0 || profitMargin > 100) {
            errors.push('Profit margin must be between 0% and 100%');
        }
        if (taxRate < 0 || taxRate > 100) {
            errors.push('Tax rate must be between 0% and 100%');
        }

        return errors;
    }

    function calculateRate(desiredSalary, billableHours, vacationWeeks, expenses, profitMargin, taxRate) {
        const workingWeeks = 52 - vacationWeeks;
        const annualBillableHours = billableHours * workingWeeks;
        const salaryAfterTax = desiredSalary / (1 - (taxRate / 100));
        const totalNeeds = salaryAfterTax + expenses;
        const minimumRate = totalNeeds / annualBillableHours;
        const profitMultiplier = 1 - (profitMargin / 100);
        const recommendedRate = minimumRate / profitMultiplier;
        const annualRevenue = recommendedRate * annualBillableHours;

        return {
            annualBillableHours,
            minimumRate,
            recommendedRate,
            annualRevenue
        };
    }

    function displayResults(results) {
        document.getElementById('annualHours').textContent = formatNumber(results.annualBillableHours) + ' hours/year';
        document.getElementById('minimumRate').textContent = formatCurrency(results.minimumRate) + '/hour';
        document.getElementById('recommendedRate').textContent = formatCurrency(results.recommendedRate) + '/hour';
        document.getElementById('annualRevenue').textContent = formatCurrency(results.annualRevenue) + '/year';

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const desiredSalary = parseFloat(document.getElementById('desiredSalary').value) || 0;
        const billableHours = parseFloat(document.getElementById('billableHours').value) || 0;
        const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value) || 0;
        const expenses = parseFloat(document.getElementById('expenses').value) || 0;
        const profitMargin = parseFloat(document.getElementById('profitMargin').value) || 0;
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;

        const errors = validateInputs(desiredSalary, billableHours, vacationWeeks, expenses, profitMargin, taxRate);

        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }

        const results = calculateRate(desiredSalary, billableHours, vacationWeeks, expenses, profitMargin, taxRate);
        displayResults(results);
    });

    form.addEventListener('reset', function() {
        resultsDiv.style.display = 'none';
    });
})();