let currentTool = 'dashboard';

// Sidebar selection logic
function selectTool(tool, element) {
    currentTool = tool;
    document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
    element.classList.add('active');
    
    const titles = {
        'dashboard': 'Infrastructure Health Overview',
        'secrets': 'Secret & Key Leak Scanner',
        'compliance': 'SOC2 / GDPR Compliance Audit',
        'blast-radius': 'Attack Blast Radius Map'
    };
    document.getElementById('main-title').innerText = titles[tool];
}

document.getElementById('scan-btn').onclick = function() {
    const url = document.getElementById('repo-url').value;
    if(!url) { alert("Please enter a URL first"); return; }

    this.innerHTML = "🔍 Scanning Assets...";
    this.disabled = true;

    // Simulate Scan Delay
    setTimeout(() => {
        let score = Math.floor(Math.random() * (95 - 60) + 60);
        let findings = Math.floor(Math.random() * 8);

        document.getElementById('main-score').innerText = score + "%";
        document.getElementById('vuln-count').innerText = findings;
        
        showResults(currentTool, findings);
        
        document.getElementById('security-report').style.display = 'block';
        this.innerHTML = "Run Audit";
        this.disabled = false;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
};

function showResults(tool, count) {
    const list = document.getElementById('report-details-list');
    let html = "";

    if(tool === 'secrets') {
        html = `<div class="compliance-row ${count > 0 ? 'fail' : 'pass'}">
            <div><strong>Leak Check</strong><p>Found ${count} potentially exposed credentials in source code.</p></div>
            <div class="check-status">${count > 0 ? 'FAIL' : 'PASS'}</div>
        </div>`;
    } else if(tool === 'blast-radius') {
        html = `<div class="compliance-row pass">
            <div><strong>Blast Radius Mapping</strong><p>Interactive graph generated. 3 high-risk paths identified.</p></div>
            <div class="check-status">COMPLETE</div>
        </div>`;
    } else {
        html = `<div class="compliance-row pass">
            <div><strong>General Audit</strong><p>Security posture is stable. No critical zero-day exploits found.</p></div>
            <div class="check-status">PASS</div>
        </div>`;
    }
    list.innerHTML = html;
}
