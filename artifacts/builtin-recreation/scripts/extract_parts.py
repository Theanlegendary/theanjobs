import json

with open(r'C:\Users\DELL\.gemini\antigravity\brain\33e9453b-b052-455c-b37d-b62b8ed0f87c\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        idx = obj.get('step_index')
        if idx == 861:
            for c in obj.get('tool_calls', []):
                css861 = c.get('args', {}).get('Replacement', '')
                with open('part_wired.css', 'w', encoding='utf-8') as out:
                    out.write(css861)
                print('Wrote part_wired.css, len:', len(css861))
        elif idx == 970:
            for c in obj.get('tool_calls', []):
                css970 = c.get('args', {}).get('Replacement', '')
                with open('part_internships.css', 'w', encoding='utf-8') as out:
                    out.write(css970)
                print('Wrote part_internships.css, len:', len(css970))
        elif idx == 2138:
            for c in obj.get('tool_calls', []):
                cmd = c.get('args', {}).get('CommandLine', '')
                triple = "'''"
                s_idx = cmd.find("css = " + triple)
                if s_idx != -1:
                    e_idx = cmd.find(triple, s_idx + 10)
                    if e_idx != -1:
                        css2138 = cmd[s_idx + 9 : e_idx]
                        with open('part_companies_experts.css', 'w', encoding='utf-8') as out:
                            out.write(css2138)
                        print('Wrote part_companies_experts.css, len:', len(css2138))
