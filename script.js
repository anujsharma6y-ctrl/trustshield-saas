// Day 5: Initialize Security Chart
const ctx = document.getElementById('scanChart').getContext('2d');
let scanChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Audit 1', 'Audit 2', 'Audit 3', 'Audit 4', 'Audit 5'],
        datasets: [{
            label: 'Risk Level (%)',
            data: [15, 45, 20, 35, 10],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, grid: { color: '#334155' } }, x: { grid: { display: false } } }
    }
});

// Scan Functionality
document.getElementById('v-scan-btn').onclick = function() {
    const url = document.getElementById('repo-url').value;
    if(!url) return alert("Enter Repository URL");

    this.innerText = "🔍 Deep Scanning...";
    this.disabled = true;

    setTimeout(() => {
        const score = Math.floor(Math.random() * 50) + 10;
        document.getElementById('v-score').innerText = score + "%";
        document.getElementById('v-vuln').innerText = Math.floor(score/10);
        
        // Update Graph
        scanChart.data.datasets[0].data.push(score);
        scanChart.data.datasets[0].data.shift();
        scanChart.update();

        document.getElementById('v-map').innerHTML = `<div style="color:#10b981">Analysis Done. Path: <b>CloudFront -> S3 Bucket</b></div>`;
        this.innerText = "Launch Active Scan";
        this.disabled = false;
    }, 2000);
};

// Simulated Threat Feed
setInterval(() => {
    const feed = document.getElementById('threat-list');
    const logs = ["IP Blocked: 192.168.1.4", "IAM Role Changed", "Secret Scanned", "Alert: S3 Public Access"];
    const item = document.createElement('div');
    item.innerText = `[${new Date().toLocaleTimeString()}] ${logs[Math.floor(Math.random()*logs.length)]}`;
    feed.prepend(item);
    if(feed.children.length > 5) feed.lastChild.remove();
}, 5000);
