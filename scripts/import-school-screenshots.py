"""Optimize the seven owner-supplied originals, preserving their full contents."""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
source = Path.home() / 'Pictures' / 'Screenshots'
folder = root / 'public/images/portfolio/school-management-system'
mapping = {
    'dashboard': '020652',
    'students': '021002',
    'classes': '021026',
    'teachers': '021040',
    'attendance': '021056',
    'exams': '021157',
    'teacher-dashboard': '021419',
}
records_path = root / 'public/images/portfolio/capture-sources.json'
records = json.loads(records_path.read_text(encoding='utf-8'))
for slot, timestamp in mapping.items():
    original = source / ('Screenshot 2026-10-10 ' + timestamp + '.png')
    target = folder / (slot + '.webp')
    image = Image.open(original).convert('RGB')
    image.save(target, 'WEBP', quality=92, method=6)
    url = '/images/portfolio/school-management-system/' + target.name
    records = [record for record in records if record['file'] != url]
    records.append({
        'slug': 'school-management-system', 'file': url,
        'capture': original.name, 'reviewedOn': '2026-10-10',
        'kind': 'Owner-supplied screenshot, matched visually to chat attachment',
        'bytes': target.stat().st_size,
    })
records_path.write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
print('Imported seven matching school screenshots; originals preserved.')
