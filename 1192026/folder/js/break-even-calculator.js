// Break-Even Calculator Logic
(function() {
    const form = document.getElementById('breakEvenForm');
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

    function formatPercent(value) {
        return value.toFixed(1) + '%';
    }

    function validateInputs(fixedCosts, pricePerUnit, variableCost) {
        const errors = [];

        if (fixedCosts < 0) errors.push('Fixed costs cannot be negative');
        if (pricePerUnit <= 0) errors.push('Price per unit must be greater than 0');
        if (variableCost < 0) errors.push('Variable cost cannot be negative');
        if (variableCost >= pricePerUnit) {
            errors.push('Variable cost must be less than price per unit');
        }

        return errors;
    }

    function calculateBreakEven(fixedCosts, pricePerUnit, variableCost) {
        const contributionMargin = pricePerUnit - variableCost;
        const breakEvenUnits = fixedCosts / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * pricePerUnit;
        const contributionMarginRatio = (contributionMargin / pricePerUnit) * 100;

        return {
            contributionMargin,
            breakEvenUnits,
            breakEvenRevenue,
            contributionMarginRatio
        };
    }

    function displayResults(results) {
        document.getElementById('contributionMargin').textContent = formatCurrency(results.contributionMargin);
        document.getElementById('breakEvenUnits').textContent = formatNumber(results.breakEvenUnits) + ' units';
        document.getElementById('breakEvenRevenue').textContent = formatCurrency(results.breakEvenRevenue);
        document.getElementById('contributionMarginRatio').textContent = formatPercent(results.contributionMarginRatio);

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fixedCosts = parseFloat(document.getElementById('fixedCosts').value) || 0;
        const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value) || 0;
        const variableCost = parseFloat(document.getElementById('variableCost').value) || 0;

        const errors = validateInputs(fixedCosts, pricePerUnit, variableCost);

        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }

        const results = calculateBreakEven(fixedCosts, pricePerUnit, variableCost);
        displayResults(results);
    });

    form.addEventListener('reset', function() {
        resultsDiv.style.display = 'none';
    });
})();