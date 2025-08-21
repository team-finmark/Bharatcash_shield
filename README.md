 BharatCash Shield

**Predicting MSME Bankruptcy. Zero Servers. Pure AI in your Browser.**

> **A lifeline for India's 63 million MSMEs, packaged in a single HTML file.**

BharatCash Shield is an AI-powered web application that predicts cash flow crises in Indian Micro, Small, and Medium Enterprises (MSMEs) **90 days early**. Its revolutionary client-side architecture means all data processing and machine learning happen instantly and securely in the user's browser, with no servers, no APIs, and no data ever leaving their device.

##  The Problem: A Silent Crisis

-   **45% of Indian MSMEs** face a severe cash flow crisis.
-   They contribute **~30% of India's GDP** and employ over **110 million people**.
-   Traditional detection methods are slow, relying on manual audits and delayed GST filings, causing interventions to come too late.
-   Existing solutions are expensive, server-dependent, and inaccessible to the average small business owner.

## 💡 Our Solution: AI Democratized

BharatCash Shield fights this crisis by putting powerful AI directly into the hands of business owners, bankers, and advisors.

-   **🔒 100% Private:** All financial data is analyzed locally in the browser. Nothing is sent to any server.
-   **🚀 Instant Analysis:** Get a risk assessment in milliseconds, not months.
-   **🌐 Zero Deployment:** Runs on any device with a web browser—from a flagship smartphone to a budget laptop.
-   **📉 Proactive, Not Reactive:** Identifies warning signs like dropping revenue trends, high debt-to-income ratios, and GST compliance issues long before they become fatal.

## 🧠 How It Works

The magic of BharatCash Shield lies in its simplicity and power. The entire application is a static web page.

flowchart TD
    A[User Opens Web Page] --> B[Browser loads HTML, JS, CSS]
    B --> C[App fetches pre-loaded<br>MSME data from JSON file]
    C --> D[User selects a company<br>from the dropdown]
    D --> E[TensorFlow.js model<br>runs prediction locally]
    E --> F{AI Calculates<br>Bankruptcy Probability}
    F -- >85% --> G[🚨 Triggers Red Alert<br>Visual & Audible Siren]
    F -- <85% --> H[✅ Shows Stable Operation]
    G --> I[Displays Intervention Steps<br>e.g., MSME Samadhan Loan]
    H --> J[Displays Healthy Metrics]
🛠️ Tech Stack & Architecture
Frontend Framework: Vanilla JavaScript (ES6+)
Machine Learning: TensorFlow.js
Data Visualization: Chart.js
Styling: Tailwind CSS
Icons: Boxicons
Data Persistence: Static JSON File
Hosting: GitHub Pages

This stack was chosen for its zero-dependency, instant execution capabilities, making it perfectly suited for hackathons and real-world deployment without any backend infrastructure.

📦 Project Structure
text
bharatcash-shield/
├── index.html          # Single-page application
├── script.js           # Core application logic, AI, and charts
├── data.json           # Pre-loaded financial data for sample MSMEs
├── assets/
│   └── siren.mp3       # Red alert sound effect
└── README.md           # This file
🚀 Getting Started: 30-Second Setup
Getting BharatCash Shield running is impossibly simple.

Hosted Version (Recommended):
Simply visit our live demo: https://team-finmark.github.io/Bharatcash_shield/

Local Version:

bash
# 1. Clone the repository
git clone https://github.com/team-finmark/Bharatcash_shield.git

# 2. Navigate to the project folder
cd bharatcash-shield

# 3. Open the main file in any modern browser
# (That's it. No installs, no builds, no servers.)
open index.html # On macOS
# or
start index.html # On Windows
# or just double-click the file in your file explorer.  


🎮 How to Use: Demo Flow for Judges


Select a Healthy Business: Choose "Sharma Electronics" from the dropdown. Point out the green risk meter (<60%), stable revenue chart, and healthy debt-to-revenue ratio.

Trigger the Crisis: Select "Patel Textiles" from the dropdown.

Watch the revenue chart plummet.

See the debt bar dwarf the revenue.

Watch the AI Risk Meter shoot up from green to yellow to RED.

The Red Alert: The screen will flash, a siren will blare, and the "Red Alert" panel will appear with immediate, actionable intervention steps.

The Impact: With this 90-day head start, we can save Patel Textiles, their 20 employees, and over ₹1.2 Crore in community value. This isn't just an app; it's a lifeline.

🧪 The AI Model
For the scope of this hackathon, BharatCash Shield uses a neural network created and trained directly in the browser.

Architecture: A simple Sequential model with Dense layers.

Input Features: Average Monthly Revenue, Total Debt, and GST Compliance Percentage.

Output: A single probability score between 0 (No Risk) and 1 (Certain Bankruptcy).

Future Scale: The architecture is designed to easily swap in a larger, more accurate pre-trained model for real-world use.

🌐 Browser Compatibility
This application runs on any modern browser that supports TensorFlow.js:

Chrome >= 70

Safari >= 13

Firefox >= 65

Edge >= 79

📄 License
This project is open source and available under the MIT License.

🙋 FAQ
Q: Does this connect to real GST or bank APIs?

A: Not in this demo. For speed and simplicity, we use pre-loaded sample data. The application's architecture is designed to easily integrate with such APIs in a production environment.

Q: Is my data safe?

A: Absolutely. The core principle of this app is privacy. All calculations are performed on your own device. No financial data is ever transmitted over the internet.

Q: Can I use this for my actual business?

A: This is a proof-of-concept demo. While the AI provides insights, please consult a qualified financial advisor for real business decisions.

👥 Team
Built with ❤️ for the hackathon by [Muzammil Ali Baig/Team FinMark].


BharatCash Shield: Because every minute, and every business, counts. 🇮🇳

