const threatDatabase = [
    "Blocked suspicious IP: 185.12.34.9",
    "CRITICAL: Exposed AWS Access Key found",
    "Security Group 'Prod-DB' modified",
    "New IAM user created: 'temp_admin'",
    "Anomaly: High outbound traffic detected"
];

// 1. Live Threat Feed Logic
function runThreatFeed() {
    const feed = document.getElementById('threat-list');
    setInterval(() => {
        const log = threatDatabase[Math.floor(Math.random() * threatDatabase.length)];
        const time = new Date().toLocaleTimeString();
        const div = document.createElement('div');
        div.className = "feed-item";
        div.innerHTML = `[${time}] <span class="${log.includes('CRITICAL') ? 'crit-log' : ''}">${log}</span>`;
        feed.prepend(div);
        if(feed.children.length > 6) feed.lastChild.remove();
    }, 4000);
}

// 2. Scan Button Logic
document.getElementById('v-scan-btn').onclick = function() {
    const url = document.getElementById('repo-url').value;
    if(!url) { alert("Please enter a valid URL!"); return; }

    this.innerText = "🔍 Auditing Infra...";
    this.disabled = true;

    setTimeout(() => {
        document.getElementById('v-score').innerText = "32%";
        document.getElementById('v-vuln').innerText = "5 High";
        document.getElementById('v-vuln').style.color = "#ef4444";
        
        document.getElementById('v-map').innerHTML = `
            <div style="padding:20px; text-align:center;">
                <i class="fas fa-check-circle" style="color:#10b981; font-size:2rem;"></i>
                <p>Scan Finished. <br> Attack Path: <b>EC2 -> Public Gateway -> Data Leak</b></p>
            </div>`;
        
        this.innerText = "Re-Launch Scan";
        this.disabled = false;
    }, 2500);
};

window.onload = runThreatFeed;
