// ROI Calculator Logic
(function() {
    const form = document.getElementById('roiForm');
    const resultsDiv = document.getElementById('results');

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    }

    function formatPercent(value) {
        return value.toFixed(1) + '%';
    }

    function formatMultiple(value) {
        return value.toFixed(2) + 'x';
    }

    function validateInputs(investment, revenue, cogs) {
        const errors = [];

        if (investment <= 0) errors.push('Investment must be greater than 0');
        if (revenue < 0) errors.push('Revenue cannot be negative');
        if (cogs < 0) errors.push('COGS cannot be negative');
        if (cogs >= revenue) errors.push('COGS must be less than revenue');

        return errors;
    }

    function calculateROI(investment, revenue, cogs) {
        const netProfit = revenue - investment - cogs;
        const roiPercentage = (netProfit / investment) * 100;
        const returnMultiple = revenue / investment;
        const profitPerDollar = netProfit / investment;

        return {
            netProfit,
            roiPercentage,
            returnMultiple,
            profitPerDollar
        };
    }

    function displayResults(results) {
        document.getElementById('netProfit').textContent = formatCurrency(results.netProfit);
        document.getElementById('roiPercentage').textContent = formatPercent(results.roiPercentage);
        document.getElementById('returnMultiple').textContent = formatMultiple(results.returnMultiple);
        document.getElementById('profitPerDollar').textContent = formatCurrency(results.profitPerDollar);

        // Add color indicator for profit/loss
        const roiElement = document.getElementById('roiPercentage');
        const profitElement = document.getElementById('netProfit');
        
        if (results.roiPercentage > 0) {
            roiElement.classList.add('positive');
            roiElement.classList.remove('negative');
            profitElement.classList.add('positive');
            profitElement.classList.remove('negative');
        } else {
            roiElement.classList.add('negative');
            roiElement.classList.remove('positive');
            profitElement.classList.add('negative');
            profitElement.classList.remove('positive');
        }

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const investment = parseFloat(document.getElementById('investment').value) || 0;
        const revenue = parseFloat(document.getElementById('revenue').value) || 0;
        const cogs = parseFloat(document.getElementById('cogs').value) || 0;

        const errors = validateInputs(investment, revenue, cogs);

        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }

        const results = calculateROI(investment, revenue, cogs);
        displayResults(results);
    });

    form.addEventListener('reset', function() {
        resultsDiv.style.display = 'none';
    });
})();