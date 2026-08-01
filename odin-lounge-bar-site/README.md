# ODIN Lounge Bar Menu

Premium one-page Ukrainian menu website prepared for GitHub Pages.

## Structure

- `index.html` - page markup and sections
- `styles/main.css` - visual system, responsive layout, animations
- `scripts/menu-data.js` - editable menu content and prices
- `scripts/app.js` - rendering, navigation, loader, interactions
- `scripts/hookah-scene.js` - procedural Three.js hookah scene
- `assets/logo-odin.svg` - placeholder logo asset
- `assets/odin-logo.jpg` - real ODIN logo image
- `assets/hookah-model.svg` - local fallback hookah visual

## Edit Menu

Update names, descriptions, and prices in `scripts/menu-data.js`.

## Logo And Photos

- `assets/odin-logo.jpg` is used for the loader, header, and footer.
- Hero hookah uses a detailed procedural Three.js model with `assets/hookah-model.svg` as fallback.
- Menu reference photos are intentionally not included in the website UI.
- Menu content is rewritten as editable structured text in `scripts/menu-data.js`.


## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Open repository settings.
3. Go to Pages.
4. Choose deploy from the main branch root.
5. Save and wait for the published URL.

The `.nojekyll` file is included so GitHub Pages serves all static assets directly.
