let currentTool = 'full_audit';

// Tool Selection Logic
function selectTool(toolName, element) {
    currentTool = toolName;
    
    // UI Update: Active Class
    document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
    element.classList.add('active');
    
    // Content Update based on selection
    const config = {
        'full_audit': { title: "Infrastructure Health Overview", desc: "Full SOC2 & GDPR mapping." },
        'secret_scan': { title: "Secret Leak Detection", desc: "Scanning for .env and API Keys." },
        'prowler': { title: "Prowler Security Audit", desc: "AWS Best Practices Benchmark." },
        'vulnerability': { title: "Vulnerability Assessment", desc: "Checking for known exploits." }
    };
    
    document.getElementById('tool-title').innerText = config[toolName].title;
    document.getElementById('tool-desc').innerText = config[toolName].desc;
    document.getElementById('current-tool-display').innerText = config[toolName].title;
}

document.getElementById('scan-btn').onclick = async function() {
    const url = document.getElementById('repo-url').value;
    if(!url) { alert("Please enter a URL first"); return; }

    this.innerHTML = `🔍 Running ${currentTool}...`;
    this.disabled = true;

    // Simulating API call for Day 2
    setTimeout(() => {
        let score = Math.floor(Math.random() * (98 - 70) + 70);
        let findings = Math.floor(Math.random() * 5);
        
        document.getElementById('main-score').innerText = score + "%";
        document.getElementById('vuln-count').innerText = findings;
        
        displayResults(currentTool, findings);
        
        document.getElementById('security-report').style.display = 'block';
        this.innerHTML = "Run Audit";
        this.disabled = false;
        
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 2000);
};

function displayResults(tool, count) {
    const list = document.getElementById('report-details-list');
    const status = count > 0 ? "FAIL" : "PASS";
    
    // Result Templates based on Tool
    const results = {
        'full_audit': `Audit completed. System health is ${status}.`,
        'secret_scan': count > 0 ? `Found ${count} sensitive files (.env/config).` : "No secrets leaked.",
        'prowler': "AWS CIS Benchmarks verified.",
        'vulnerability': "No critical vulnerabilities detected in root."
    };

    list.innerHTML = `
        <div class="compliance-row ${status.toLowerCase()}">
            <div>
                <strong>${tool.toUpperCase()} Report</strong>
                <p style="font-size: 0.85rem; color: #64748b; margin-top:5px;">${results[tool]}</p>
            </div>
            <div class="check-status">${status}</div>
        </div>
    `;
}
