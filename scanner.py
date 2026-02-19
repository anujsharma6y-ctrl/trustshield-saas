import os

# GDPR Keywords jo humein scan karne hain
GDPR_KEYWORDS = ['email', 'address', 'phone', 'ip_address', 'credit_card', 'passport']

def scan_for_gdpr_risks():
    print("🛡️ Starting GDPR Compliance Audit...")
    risks_found = []
    
    # Ye logic files ko scan karega
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith((".py", ".js", ".sql")):
                with open(os.path.join(root, file), 'r', errors='ignore') as f:
                    content = f.read().lower()
                    for keyword in GDPR_KEYWORDS:
                        if keyword in content:
                            risks_found.append(f"Potential PII ({keyword}) found in {file}")

    return risks_found

if __name__ == "__main__":
    results = scan_for_gdpr_risks()
    # Report generate karne ka logic
    with open("compliance_report.txt", "w") as f:
        f.write("TRUSTSHIELD EU - COMPLIANCE REPORT\n")
        f.write("-" * 30 + "\n")
        if not results:
            f.write("✅ Status: GDPR Ready\n")
        else:
            f.write("⚠️ Status: Risks Detected\n")
            for risk in results:
                f.write(f"- {risk}\n")
