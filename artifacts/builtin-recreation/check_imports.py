import re

with open(r'C:\Users\DELL\Downloads\Builtin-Clone\Builtin-Clone\artifacts\builtin-recreation\src\pages\Home.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r"from ['\"]lucide-react['\"]", text)
import_block = text[:m.start()]
imported_names = set(re.findall(r"([A-Za-z0-9_]+)", import_block))

jsx_tags = set(re.findall(r"<([A-Z][A-Za-z0-9_]+)", text))

ignore = {'Link', 'Home', 'HomeIcon', 'Fragment', 'Switch', 'Route'}
missing = [tag for tag in jsx_tags if tag not in imported_names and tag not in ignore]
print('Missing JSX components in Home.tsx:', missing)
