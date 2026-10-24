TernoAI Studio

Mobile-first PWA for TikTok Shop kids-fashion affiliates. Add products, lock up to 3 synthetic model characters, queue try-on videos by pose, and export the still, caption and video. Captions always include the AI-generated label.

Run locally
  npm install
  npm run dev

Deploy to GitHub Pages
  1. Push this folder to a GitHub repo on the main branch.
  2. Settings > Pages > Source: GitHub Actions.
  3. .github/workflows/deploy.yml runs npm ci and npm run build, then publishes dist on every push.

Replace the AI stubs
  Open src/ai.js. importProduct, generateStill, generateVideo and makeCaption each have a TODO block describing what to send and return.
  Call your own backend or serverless function from these. Never put API keys in the client.

Storage
  Products, characters and jobs are in localStorage. Generated stills are in IndexedDB.

Notes
  TikTok requires AI-generated content to be labeled.
  Use synthetic characters only, not photos of a real child.
  .well-known/assetlinks.json is a placeholder for a future Play Store TWA.
