// Startup Cost Calculator Logic
(function() {
    const form = document.getElementById('startupCostForm');
    const resultsDiv = document.getElementById('results');
    const oneTimeSection = document.getElementById('oneTimeItems');
    const monthlySection = document.getElementById('monthlyItems');

    // Add item functionality
    function createItemRow(section) {
        const row = document.createElement('div');
        row.className = 'cost-item-row';
        row.innerHTML = `
            <input type="text" class="item-name" placeholder="Item name" required>
            <input type="number" class="item-amount" placeholder="Amount" step="0.01" min="0" required>
            <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
        `;
        section.appendChild(row);
    }

    // Initialize with default items
    function initializeDefaults() {
        // One-time costs defaults
        const oneTimeDefaults = [
            'Business Registration & Licenses',
            'Equipment & Furniture',
            'Website & Technology',
            'Initial Marketing'
        ];
        oneTimeDefaults.forEach(() => createItemRow(oneTimeSection));

        // Monthly costs defaults
        const monthlyDefaults = [
            'Rent',
            'Salaries & Payroll',
            'Software & Subscriptions',
            'Marketing & Advertising'
        ];
        monthlyDefaults.forEach(() => createItemRow(monthlySection));
    }

    // Calculate totals
    function calculateTotals() {
        let totalOneTime = 0;
        let totalMonthly = 0;

        // Sum one-time costs
        oneTimeSection.querySelectorAll('.item-amount').forEach(input => {
            totalOneTime += parseFloat(input.value) || 0;
        });

        // Sum monthly costs
        monthlySection.querySelectorAll('.item-amount').forEach(input => {
            totalMonthly += parseFloat(input.value) || 0;
        });

        const runwayMonths = parseFloat(document.getElementById('runwayMonths').value) || 6;
        const cashRunway = totalMonthly * runwayMonths;
        const totalCapital = totalOneTime + cashRunway;

        return {
            totalOneTime,
            totalMonthly,
            cashRunway,
            totalCapital,
            burnRate: totalMonthly
        };
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value);
    }

    function displayResults(results) {
        document.getElementById('totalOneTime').textContent = formatCurrency(results.totalOneTime);
        document.getElementById('totalMonthly').textContent = formatCurrency(results.totalMonthly) + '/month';
        document.getElementById('cashRunway').textContent = formatCurrency(results.cashRunway);
        document.getElementById('totalCapital').textContent = formatCurrency(results.totalCapital);
        document.getElementById('burnRate').textContent = formatCurrency(results.burnRate) + '/month';

        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Add item buttons
    document.getElementById('addOneTime').addEventListener('click', () => {
        createItemRow(oneTimeSection);
    });

    document.getElementById('addMonthly').addEventListener('click', () => {
        createItemRow(monthlySection);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const results = calculateTotals();
        displayResults(results);
    });

    form.addEventListener('reset', function() {
        oneTimeSection.innerHTML = '';
        monthlySection.innerHTML = '';
        initializeDefaults();
        resultsDiv.style.display = 'none';
    });

    // Initialize
    initializeDefaults();
})();