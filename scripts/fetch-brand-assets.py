"""Vendor a small, pinned set of authentic brand SVGs for offline site rendering."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import urllib.request
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1] / 'public/images/technologies'
root.mkdir(parents=True, exist_ok=True)
devicon = 'https://raw.githubusercontent.com/devicons/devicon/v2.17.0/'
names = {'react': 'react-original', 'nextjs': 'nextjs-original', 'typescript': 'typescript-original', 'javascript': 'javascript-original', 'tailwindcss': 'tailwindcss-original', 'html5': 'html5-original', 'css3': 'css3-original', 'python': 'python-original', 'django': 'django-plain', 'nodejs': 'nodejs-original', 'postgresql': 'postgresql-original', 'mongodb': 'mongodb-original', 'vercel': 'vercel-original', 'git': 'git-original', 'github': 'github-original', 'docker': 'docker-original', 'figma': 'figma-original'}
names['supabase'] = 'supabase-original'

def read(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Rayan-asset-import'}), timeout=30) as response:
        return response.read()
def fetch(item):
    name, url = item
    asset = root / (name + '.svg')
    data = asset.read_bytes() if asset.exists() else read(url)
    tree = ET.fromstring(data)
    if not tree.tag.endswith('svg') or b'<script' in data or b'<image' in data or b'href="http' in data:
        raise ValueError('Invalid or externally dependent SVG: ' + name)
    (root / (name + '.svg')).write_bytes(data)
    print(name, len(data))
    return {'file': name + '.svg', 'source': url, 'sha256': hashlib.sha256(data).hexdigest()}
jobs = [(name, devicon + 'icons/' + name + '/' + file + '.svg') for name, file in names.items()]
# Pin the AI icon repository commit once for reproducibility and attribution.
pin_file = root / 'ai-source-pin.json'
if pin_file.exists():
    commit = json.loads(pin_file.read_text())['commit']
else:
    commit = json.loads(read('https://api.github.com/repos/lobehub/lobe-icons/commits/master'))['sha']
    pin_file.write_text(json.dumps({'repository': 'lobehub/lobe-icons', 'commit': commit}, indent=2) + '\n')
ai_base = 'https://raw.githubusercontent.com/lobehub/lobe-icons/' + commit + '/packages/static-svg/icons/'
jobs += [(name, ai_base + file + '.svg') for name, file in [('openai','openai'), ('groq','groq'), ('gemini','gemini-color'), ('ollama','ollama')]]
with ThreadPoolExecutor(max_workers=6) as workers:
    records = list(workers.map(fetch, jobs))
(root / 'sources.json').write_text(json.dumps(records, indent=2) + '\n')
(root / 'LICENSE-devicon.txt').write_bytes(read(devicon + 'LICENSE'))
(root / 'LICENSE-lobe-icons.txt').write_bytes(read('https://raw.githubusercontent.com/lobehub/lobe-icons/' + commit + '/LICENSE'))
print('Saved', len(records), 'validated SVG assets and source/license records.')
