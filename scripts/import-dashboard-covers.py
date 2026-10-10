"""Export generated project-cover assets; keep real interface captures separate."""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
records = json.loads((root / '.qa/dashboard-generated-files.json').read_text(encoding='utf-8'))
if len(records) != 30 or len({record['slug'] for record in records}) != 30:
    raise ValueError('Expected one generated dashboard cover for each of the 30 projects.')
public = []
for record in records:
    source = Path(record['source'])
    folder = root / 'public/images/portfolio' / record['slug']
    target = folder / 'dashboard-cover.webp'
    image = Image.open(source).convert('RGB')
    image.thumbnail((1280, 900), Image.Resampling.LANCZOS)
    image.save(target, 'WEBP', quality=90, method=6)
    public.append({
        'slug': record['slug'], 'image': '/images/portfolio/' + record['slug'] + '/dashboard-cover.webp',
        'kind': 'Generated branded dashboard visualization; not an actual project screenshot',
        'tool': 'Built-in imagegen', 'mode': 'Generation with supplied Rayan logo reference',
        'prompt': record['prompt'], 'width': image.width, 'height': image.height, 'bytes': target.stat().st_size,
    })
(root / 'public/images/portfolio/dashboard-cover-prompts.json').write_text(json.dumps(public, indent=2) + '\n', encoding='utf-8')
print('Exported', len(public), 'generated covers; authentic screenshot files untouched.')
