// Profit Margin Calculator Logic
(function() {
    const form = document.getElementById('profitMarginForm');
    const resultsDiv = document.getElementById('results');

    // Format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    // Format percentage
    function formatPercent(value) {
        return value.toFixed(1) + '%';
    }

    // Validate inputs
    function validateInputs(revenue, cogs, expenses) {
        const errors = [];
        
        if (revenue <= 0) {
            errors.push('Revenue must be greater than 0');
        }
        if (cogs < 0) {
            errors.push('COGS cannot be negative');
        }
        if (cogs >= revenue) {
            errors.push('COGS must be less than revenue');
        }
        if (expenses < 0) {
            errors.push('Expenses cannot be negative');
        }
        
        return errors;
    }

    // Calculate margins
    function calculateMargins(revenue, cogs, expenses) {
        const grossProfit = revenue - cogs;
        const grossMargin = (grossProfit / revenue) * 100;
        const netProfit = revenue - cogs - expenses;
        const netMargin = (netProfit / revenue) * 100;
        const markup = ((revenue - cogs) / cogs) * 100;

        return {
            grossProfit,
            grossMargin,
            netProfit,
            netMargin,
            markup
        };
    }

    // Display results
    function displayResults(results) {
        document.getElementById('grossProfit').textContent = formatCurrency(results.grossProfit);
        document.getElementById('grossMargin').textContent = formatPercent(results.grossMargin);
        document.getElementById('netProfit').textContent = formatCurrency(results.netProfit);
        document.getElementById('netMargin').textContent = formatPercent(results.netMargin);
        document.getElementById('markup').textContent = formatPercent(results.markup);
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const revenue = parseFloat(document.getElementById('revenue').value) || 0;
        const cogs = parseFloat(document.getElementById('cogs').value) || 0;
        const expenses = parseFloat(document.getElementById('expenses').value) || 0;

        const errors = validateInputs(revenue, cogs, expenses);
        
        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }

        const results = calculateMargins(revenue, cogs, expenses);
        displayResults(results);
    });

    // Handle reset
    form.addEventListener('reset', function() {
        resultsDiv.style.display = 'none';
    });
})();