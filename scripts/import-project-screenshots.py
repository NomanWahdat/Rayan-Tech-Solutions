"""Import read-only, privacy-masked browser captures into the existing exact screenshot slots."""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
mapping = {
    'ai-resume-analyzer': {'hero': 'hero', 'interview': 'interview', 'resume-analysis': 'job-match', 'dashboard': 'history'},
    'bazaaraf': {'hero': 'login', 'homepage': 'hero'},
    'school-management-system': {'hero': 'hero'},
    'hospital-management-system': {'hero': 'hero', 'patients': 'patients', 'appointments': 'appointments', 'medical-records': 'medical-records', 'billing': 'billing', 'pharmacy-inventory': 'inventory'},
    'pharmacy-management-system': {'hero': 'hero'},
    'tailoring-management-system': {'hero': 'hero', 'customers': 'customers', 'fabric-inventory': 'inventory', 'reports': 'reports'},
    'supermarket-management-system': {'hero': 'hero'},
    'poultry-feed': {'hero': 'hero', 'raw-stock': 'inventory', 'feed-records': 'feed-records', 'sales': 'sales', 'reports': 'reports'},
    'cargo-management-demo': {'hero': 'hero', 'customer-portal': 'customer-portal', 'branch-access': 'branch-access'},
    'sahil-gps': {'hero': 'hero'},
    'travel-agency-accounting': {'hero': 'hero'},
}
records = []
for slug, files in mapping.items():
    for filename, source_name in files.items():
        source = root / '.qa/project-inspection' / slug / (source_name + '.png')
        target = root / 'public/images/portfolio' / slug / (filename + '.webp')
        if not source.exists():
            raise FileNotFoundError(source)
        image = Image.open(source).convert('RGB')
        image.save(target, 'WEBP', quality=88, method=6)
        records.append({'slug': slug, 'file': '/images/portfolio/' + slug + '/' + filename + '.webp', 'capture': source_name, 'reviewedOn': '2026-10-10', 'kind': 'Captured public interface or explicitly supplied demo', 'bytes': target.stat().st_size})
(root / 'public/images/portfolio/capture-sources.json').write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
print('Imported', len(records), 'real captures for', len(mapping), 'projects.')
