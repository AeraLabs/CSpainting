"""Keep main/root GitHub Pages compatible with the canonical dist site."""
from pathlib import Path
import re
root = Path(__file__).resolve().parent.parent
html = (root / 'dist/index.html').read_text()
# Only local URL attributes change. Fragment links stay on the root page.
html = re.sub(r'(\b(?:src|href|data-photo)=")((?:assets/)[^"]*|style\.css|app\.js)(")', r'\1dist/\2\3', html)
html = re.sub(r'\bsrcset="([^"]+)"', lambda m: 'srcset="' + re.sub(r'(^|,\s*)assets/', r'\1dist/assets/', m[1]) + '"', html)
html = html.replace('https://cs-painting-orofino.cherryspool16384.chatgpt.site/assets/house-after.webp', 'https://aeralabs.github.io/CSpainting/dist/assets/house-after.webp')
(root / 'index.html').write_text(html)
(root / '.nojekyll').touch()
