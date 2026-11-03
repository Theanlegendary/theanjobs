import re

with open("Builtin-Clone/artifacts/builtin-recreation/src/pages/Home.tsx", "r", encoding="utf-8") as f:
    text = f.read()

matches = re.findall(r'className=["\']([^"\']+)["\']', text)
classes = set()
for m in matches:
    for c in m.split():
        if not c.startswith("{") and not "$" in c:
            classes.add(c)

with open("Builtin-Clone/artifacts/builtin-recreation/src/index.css", "r", encoding="utf-8") as f:
    css = f.read()

missing = [c for c in sorted(classes) if ("." + c) not in css and not c.startswith("lucide")]
print(f"Total classes: {len(classes)}, Missing classes: {len(missing)}")
for c in missing:
    print(c)
