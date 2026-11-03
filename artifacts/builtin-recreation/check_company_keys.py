import re

path = r'C:\Users\DELL\.gemini\antigravity\scratch\thesandbox-logistics-platform\web-prototype\company-detail.html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Find lines like 'gemadept': { or "viconship": {
matches = re.findall(r"['\"]([a-zA-Z0-9_\-]+)['\"]\s*:\s*\{\s*\n\s*name:\s*['\"]([^'\"]+)['\"]", text)
for slug, name in matches:
    print(f"{slug} -> {name}")
