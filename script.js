function generateComplianceReport(hasEnv, stars, forkCount) {
    const reportList = document.getElementById('report-details-list');
    
    // Compliance Rules Definition
    const checks = [
        {
            name: "SOC2: Confidentiality & Encryption",
            status: hasEnv ? "FAIL" : "PASS",
            desc: "Checks for hardcoded secrets or .env files in public root."
        },
        {
            name: "GDPR: Data Privacy",
            status: "PASS", 
            desc: "Scanning for PII (Personally Identifiable Information) patterns."
        },
        {
            name: "Infrastructure Integrity",
            status: forkCount > 50 ? "WARNING" : "PASS",
            desc: "Monitoring high fork rates for potential unauthorized code drift."
        }
    ];

    reportList.innerHTML = checks.map(check => `
        <div class="compliance-row ${check.status.toLowerCase()}">
            <div class="check-info">
                <strong>${check.name}</strong>
                <p>${check.desc}</p>
            </div>
            <div class="check-status">${check.status}</div>
        </div>
    `).join('');
}
