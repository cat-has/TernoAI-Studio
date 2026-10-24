TernoAI Studio

Mobile-first PWA for TikTok Shop kids-fashion affiliates. Add products, lock a synthetic model character, queue try-on videos, export the still and a caption with the AI label.

Run locally
  npm install
  npm run dev

Deploy to GitHub Pages
  1. Push this folder to a GitHub repo on the main branch.
  2. Repo Settings > Pages > Source: GitHub Actions.
  3. The workflow in .github/workflows/deploy.yml builds and publishes on every push.

Plug in AI
  Edit src/ai.js. importProduct, generateStill, generateVideo and makeCaption are stubs.
  Put API keys on a backend or serverless function, not in the client.

Notes
  Data is stored in the browser (localStorage). Real images and videos need IndexedDB or a backend.
  TikTok requires AI-generated content to be labeled. Captions export with the label included.
  Use a fully synthetic character, not photos of a real child.
