# CS Painting & Powerwashing

Mobile-first, dependency-free marketing site for CS Painting & Powerwashing LLC in Orofino, Idaho. All deployable files live in `dist/`. No build step or paid assets required.

## Features
- Signature hero roller reveal using the real exterior before/after pair. Plays once when visible, with pause/resume, replay and instant photo selection. Stops off-screen and on hidden tabs; reduced-motion users receive still images and manual before/after buttons. No additional libraries or image downloads.
- Responsive layouts, locally hosted fonts, optimized WebP photos, lazy loading.
- Real project gallery, keyboard/touch before-and-after slider, accessible native photo dialog.
- Expandable services, service-to-estimate preselection, click-to-call and SMS links.
- Estimate form validates fields and prepares a `mailto:` draft. It does **not** send/store leads. Visitors must send from their email app. For direct submissions, connect a backend before changing the success message.
- Scroll entrance motion with reduced-motion support; normal content remains visible without JavaScript.

## Content & source facts
Business phone, email, services, hours, towns, and family story: https://www.cspaintingandpowerwashing.com/ (home, about, services, contact), reviewed November 25, 2026. Facebook branding/service context also supplied in the user's screenshot. The old website's Facebook link pointed to Squarespace; no unverified Facebook URL is shipped.

Project photos supplied by the user in before/after order:
- `23605.jpg` → `trim-before.webp`; `23606.jpg` → `trim-after.webp`.
- `23608.jpg` → `house-before.webp`; `23603.jpg` → `house-after.webp`. Matching front elevation, featured in the opening animated comparison only. The user supplied the corrected before photo to replace the earlier rear elevation.
- `23607.jpg` → `shop-comparison.webp`. Original collage preserved, including its branding.
- `clearwater.webp`: service-area photograph from the original site's About page.
Images are resized/compressed only; no invented project results, reviews, ratings, or locations. Existing stock/generated worker images were not reused. Header is a typographic CS treatment based on supplied brand colors; replace with the official vector logo when available.

## Editing
Edit `dist/index.html` for content, `dist/style.css` for styling, and `dist/app.js` for behavior. Gallery photos are in `dist/assets/`. Keep before/after labels and pair ordering accurate. Replace the Open Graph image origin when moving to a custom domain.

## Preview and deployment
Serve `dist/` with any static server (e.g. `python3 -m http.server 8000 --directory dist`). GitHub Pages deployment is included at `.github/workflows/pages.yml`; choose GitHub Actions as the Pages source to enable it. Cloudflare Pages also supports this repo: no build command, output directory `dist`. `.openai/hosting.json` retains the private review site's identity.

## Verification
Run `node --check dist/app.js`. Browser checks cover comparison keyboard controls, full-image dialog open/close, service accordion and estimate preselection. The estimate flow opens the visitor's email client; no message was sent during verification.

## GitHub Pages branch deployment

Pages also works with **Deploy from a branch → main → / (root)**. The root `index.html` is generated from `dist/index.html` and references assets under `dist/`. `.nojekyll` prevents Jekyll from rendering the README as the homepage. After editing `dist/index.html`, run `python3 scripts/sync-pages-root.py` and commit the updated root page. The existing Actions deployment still serves `dist/` directly.
