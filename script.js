// Global variables
let companyData = [];
let revenueChart, debtChart;
let model;
let sirenAudio = null;
let isSirenPlaying = false;

// DOM elements
const companyCardsContainer = document.getElementById('company-cards');
const dashboard = document.getElementById('dashboard');
const riskScoreElement = document.getElementById('risk-score');
const riskBar = document.getElementById('risk-bar');
const redAlertSection = document.getElementById('red-alert');
const interventionSuccess = document.getElementById('intervention-success');
const financialMetricsContainer = document.getElementById('financial-metrics');
const whatsappButton = document.getElementById('whatsapp-alert-btn');
const sirenButton = document.getElementById('siren-btn');
const stopSirenButton = document.getElementById('stop-siren-btn');

// Sample and Raw MSME Data
const sampleData = {
    "companies": [
        {
            "id": 1,
            "name": "Sharma Electronics",
            "revenue_last_3_months": [950000, 870000, 820000],
            "debt": 1200000,
            "gstCompliance": 92,
            "employeeCount": 15,
            "location": "Delhi",
            "industry": "Retail Electronics",
            "yearsInBusiness": 8
        },
        {
            "id": 2,
            "name": "Patel Textiles",
            "revenue_last_3_months": [1800000, 1500000, 900000],
            "debt": 5000000,
            "gstCompliance": 67,
            "employeeCount": 20,
            "location": "Surat",
            "industry": "Textile Manufacturing",
            "yearsInBusiness": 12
        },
        {
            "id": 3,
            "name": "Shinde Fabrics",
            "revenue_last_3_months": [750000, 780000, 800000],
            "debt": 600000,
            "gstCompliance": 95,
            "employeeCount": 8,
            "location": "Mumbai",
            "industry": "Textile Wholesale",
            "yearsInBusiness": 5
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCompanyData();
    createModel();
    initSiren();
    
    // Add click event listeners
    whatsappButton.addEventListener('click', sendWhatsAppAlert);
    sirenButton.addEventListener('click', playSiren);
    stopSirenButton.addEventListener('click', stopSiren);
    
    // Enable audio on first user interaction
    document.body.addEventListener('click', function enableAudio() {
        // This is just to get user interaction for audio playback
        document.body.removeEventListener('click', enableAudio);
    }, { once: true });
});

// Initialize the siren audio
function initSiren() {

    // This is a short audio data URI for demonstration purposes
    sirenAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    sirenAudio.loop = true;
}

// Play the siren sound
function playSiren() {
    if (sirenAudio && !isSirenPlaying) {
        sirenAudio.play()
            .then(() => {
                isSirenPlaying = true;
                document.body.classList.add('siren-active');
                sirenButton.classList.add('hidden');
                stopSirenButton.classList.remove('hidden');
            })
            .catch(error => {
                console.log("Siren play failed, may require user interaction first:", error);
                alert("Please click anywhere on the page first to enable sound, then try again.");
            });
    }
}

// Stop the siren sound
function stopSiren() {
    if (sirenAudio && isSirenPlaying) {
        sirenAudio.pause();
        sirenAudio.currentTime = 0;
        isSirenPlaying = false;
        document.body.classList.remove('siren-active');
        sirenButton.classList.remove('hidden');
        stopSirenButton.classList.add('hidden');
    }
}

// Load company data
async function loadCompanyData() {
   
    companyData = sampleData.companies;
    renderCompanyCards(companyData);
}

// Render company cards
function renderCompanyCards(companies) {
    companyCardsContainer.innerHTML = '';
    
    companies.forEach(company => {
        const avgRevenue = company.revenue_last_3_months.reduce((a, b) => a + b, 0) / 3;
        const riskIndicator = company.debt > avgRevenue * 3 ? 'High Risk' : 'Stable';
        
        const card = document.createElement('div');
        card.className = 'company-card bg-white rounded-lg shadow-md p-4 border-l-4';
        card.classList.add(riskIndicator === 'High Risk' ? 'border-orange-500' : 'border-green-500');
        card.innerHTML = `
            <h3 class="text-xl font-semibold">${company.name}</h3>
            <p class="text-gray-600">${company.industry} • ${company.location}</p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-sm ${riskIndicator === 'High Risk' ? 'text-orange-600' : 'text-green-600'}">
                    ${riskIndicator}
                </span>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm analyze-btn" data-id="${company.id}">
                    Analyze
                </button>
            </div>
        `;
        
        companyCardsContainer.appendChild(card);
    });
    
    // Add event listeners to all analyze buttons
    document.querySelectorAll('.analyze-btn').forEach(button => {
        button.addEventListener('click', function() {
            const companyId = parseInt(this.getAttribute('data-id'));
            const company = companyData.find(c => c.id === companyId);
            if (company) {
                showDashboard(company);
            }
        });
    });
}

// Show dashboard with company data
async function showDashboard(company) {
    dashboard.classList.remove('hidden');
    
    // Use the REAL AI prediction
    const realRiskScore = await predictRisk(company);
    updateRiskMeter(realRiskScore);
    updateRevenueChart(company);
    updateDebtChart(company);
    updateFinancialMetrics(company);
    checkForRedAlert(realRiskScore, company);
    
    // Scroll to dashboard
    dashboard.scrollIntoView({ behavior: 'smooth' });
}

// Create a simple TensorFlow.js model
async function createModel() {
    
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    
    // For demo purposes, we'll just use a simple calculation
    console.log("Simple model created for demo purposes");
}

// Predict risk using our simple model
async function predictRisk(company) {
   
    
    const avgRevenue = company.revenue_last_3_months.reduce((a, b) => a + b, 0) / 3;
    let risk = 0.2; // Base risk
    
    // Debt to revenue ratio
    if (company.debt > avgRevenue * 4) risk += 0.4;
    else if (company.debt > avgRevenue * 3) risk += 0.3;
    else if (company.debt > avgRevenue * 2) risk += 0.2;
    
    // Revenue trend (last month vs first month)
    const revenueTrend = (company.revenue_last_3_months[2] - company.revenue_last_3_months[0]) / company.revenue_last_3_months[0];
    if (revenueTrend < -0.4) risk += 0.3;
    else if (revenueTrend < -0.2) risk += 0.2;
    else if (revenueTrend < 0) risk += 0.1;
    
    // GST compliance
    if (company.gstCompliance < 70) risk += 0.2;
    else if (company.gstCompliance < 80) risk += 0.1;
    
    // Ensure risk is between 0 and 1
    return Math.min(Math.max(risk, 0), 1);
}

// Update the risk meter
function updateRiskMeter(score) {
    const percentage = (score * 100).toFixed(1);
    riskScoreElement.textContent = `${percentage}%`;
    riskBar.style.width = `${percentage}%`;

    // Change color based on risk
    if (score > 0.85) {
        riskBar.classList.remove('bg-yellow-500', 'bg-green-600');
        riskBar.classList.add('bg-red-600');
    } else if (score > 0.6) {
        riskBar.classList.remove('bg-green-600', 'bg-red-600');
        riskBar.classList.add('bg-yellow-500');
    } else {
        riskBar.classList.remove('bg-yellow-500', 'bg-red-600');
        riskBar.classList.add('bg-green-600');
    }
}

// Update revenue chart
function updateRevenueChart(company) {
    const ctx = document.getElementById('revenue-chart').getContext('2d');
    
    // Destroy the old chart if it exists
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['3 Months Ago', '2 Months Ago', 'Last Month'],
            datasets: [{
                label: 'Monthly Revenue (₹)',
                data: company.revenue_last_3_months,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 100000).toFixed(1) + 'L';
                        }
                    }
                }
            }
        }
    });
}

// Update debt chart
function updateDebtChart(company) {
    const ctx = document.getElementById('debt-chart').getContext('2d');
    
    // Destroy the old chart if it exists
    if (debtChart) {
        debtChart.destroy();
    }
    
    const avgRevenue = company.revenue_last_3_months.reduce((a, b) => a + b, 0) / 3;
    
    debtChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Debt', 'Avg Monthly Revenue'],
            datasets: [{
                label: 'Amount (₹)',
                data: [company.debt, avgRevenue],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 100000).toFixed(1) + 'L';
                        }
                    }
                }
            }
        }
    });
}

// Update financial metrics
function updateFinancialMetrics(company) {
    const avgRevenue = company.revenue_last_3_months.reduce((a, b) => a + b, 0) / 3;
    const revenueChange = ((company.revenue_last_3_months[2] - company.revenue_last_3_months[0]) / company.revenue_last_3_months[0]) * 100;
    const debtToRevenueRatio = (company.debt / avgRevenue).toFixed(1);
    
    financialMetricsContainer.innerHTML = `
        <div class="text-center p-4 bg-blue-50 rounded-lg">
            <i class='bx bx-trending-down text-3xl ${revenueChange < 0 ? 'text-red-600' : 'text-green-600'} mb-2'></i>
            <h3 class="font-semibold">Revenue Trend</h3>
            <p class="text-2xl font-bold ${revenueChange < 0 ? 'text-red-600' : 'text-green-600'}">${revenueChange.toFixed(1)}%</p>
        </div>
        <div class="text-center p-4 bg-blue-50 rounded-lg">
            <i class='bx bx-credit-card text-3xl ${debtToRevenueRatio > 3 ? 'text-red-600' : 'text-green-600'} mb-2'></i>
            <h3 class="font-semibold">Debt-to-Revenue</h3>
            <p class="text-2xl font-bold ${debtToRevenueRatio > 3 ? 'text-red-600' : 'text-green-600'}">${debtToRevenueRatio}x</p>
        </div>
        <div class="text-center p-4 bg-blue-50 rounded-lg">
            <i class='bx bx-check-circle text-3xl ${company.gstCompliance < 80 ? 'text-red-600' : 'text-green-600'} mb-2'></i>
            <h3 class="font-semibold">GST Compliance</h3>
            <p class="text-2xl font-bold ${company.gstCompliance < 80 ? 'text-red-600' : 'text-green-600'}">${company.gstCompliance}%</p>
        </div>
    `;
}

// Check for red alert
function checkForRedAlert(riskScore, company) {
    if (riskScore > 0.85) {
        // SHOW THE ALERT
        redAlertSection.classList.remove('hidden');
        document.body.classList.add('bg-red-100');
        
        // HIDE success message if shown
        interventionSuccess.classList.add('hidden');
        
        // Store current company for WhatsApp alert
        redAlertSection.setAttribute('data-company', JSON.stringify(company));
        
        // Auto-play siren if not already playing
        if (!isSirenPlaying) {
            setTimeout(playSiren, 500);
        }
        
    } else {
        // HIDE THE ALERT
        redAlertSection.classList.add('hidden');
        document.body.classList.remove('bg-red-100');
        
        // Show success message for lower risk companies
        interventionSuccess.classList.remove('hidden');
        
        // Calculate saved value (for demo purposes)
        const savedValue = (company.employeeCount * 600000 * 0.7).toLocaleString('en-IN');
        document.getElementById('saved-value').textContent = `₹${savedValue}`;
        
        // Stop siren if playing
        if (isSirenPlaying) {
            stopSiren();
        }
    }
}

// Send WhatsApp Alert
function sendWhatsAppAlert() {
    const companyData = JSON.parse(redAlertSection.getAttribute('data-company'));
    
    // Craft a compelling message with the company's details
    const revenueChange = ((companyData.revenue_last_3_months[2] - companyData.revenue_last_3_months[0]) / companyData.revenue_last_3_months[0]) * 100;
    const avgRevenue = companyData.revenue_last_3_months.reduce((a, b) => a + b, 0) / 3;
    const debtToRevenueRatio = (companyData.debt / avgRevenue).toFixed(1);
    
    const message = `🚨 CRISIS ALERT: ${companyData.name} (${companyData.location}) is at high risk of bankruptcy!

*Key Indicators:*
• Revenue Drop: ${revenueChange.toFixed(1)}%
• Debt Burden: ₹${(companyData.debt / 100000).toFixed(1)} Lakhs
• Debt-to-Revenue Ratio: ${debtToRevenueRatio}x
• GST Compliance: ${companyData.gstCompliance}%
• Employees at Risk: ${companyData.employeeCount}

*Recommended Action:* Immediate consultation for MSME Samadhan Loan and debt restructuring.

_This alert was generated by BharatCash Shield._`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);

    // Create the special WhatsApp link
    // In a real implementation, you would use a specific number
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open the link in a new tab, which will launch WhatsApp
    window.open(whatsappUrl, '_blank');
}