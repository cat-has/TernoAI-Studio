// ALL AI CALLS LIVE HERE. Every function is a stub.
// Keep API keys on a backend or serverless function. Never put them in this client bundle.

export const POSES = ['Twirl', 'Walk', 'Pose on pink set', 'Mirror try-on', 'Dance']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const placeholder = (label, sub) =>
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDF2F5"/>
          <stop offset="50%" stop-color="#F7C6D4"/>
          <stop offset="100%" stop-color="#F4A8C0"/>
        </linearGradient>
        <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FBE3EA"/>
          <stop offset="100%" stop-color="#F5D0DC"/>
        </linearGradient>
        <linearGradient id="dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F06292"/>
          <stop offset="100%" stop-color="#E8467C"/>
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#E8467C" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="360" height="640" fill="url(#bg)"/>

      <!-- Soft decorative circles -->
      <circle cx="60" cy="80" r="40" fill="#FCE4EC" opacity="0.6"/>
      <circle cx="310" cy="140" r="50" fill="#F8BBD0" opacity="0.45"/>
      <circle cx="40" cy="520" r="60" fill="#FCE4EC" opacity="0.5"/>

      <!-- Body / dress silhouette -->
      <g filter="url(#shadow)">
        <!-- Head -->
        <circle cx="180" cy="195" r="58" fill="url(#skin)"/>
        
        <!-- Hair (simple rounded top) -->
        <path d="M122 185 Q122 125 180 120 Q238 125 238 185 Q238 155 180 150 Q122 155 122 185" fill="#4A2C3A"/>
        <path d="M130 175 Q130 140 180 135 Q230 140 230 175" fill="#5C3545"/>

        <!-- Neck -->
        <rect x="168" y="248" width="24" height="22" rx="8" fill="url(#skin)"/>

        <!-- Dress body -->
        <path d="M115 270 
                 Q115 265 125 265 
                 L235 265 
                 Q245 265 245 270 
                 L255 420 
                 Q255 460 180 470 
                 Q105 460 105 420 
                 Z" fill="url(#dress)" filter="url(#softGlow)"/>

        <!-- Dress sash / detail -->
        <rect x="115" y="320" width="130" height="14" rx="7" fill="#C42F63" opacity="0.7"/>

        <!-- Arms (subtle) -->
        <path d="M115 280 Q85 320 95 380" stroke="#F5D0DC" stroke-width="18" stroke-linecap="round" fill="none"/>
        <path d="M245 280 Q275 320 265 380" stroke="#F5D0DC" stroke-width="18" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Soft floor shadow -->
      <ellipse cx="180" cy="510" rx="70" ry="12" fill="#E8467C" opacity="0.12"/>

      <!-- Labels -->
      <text x="180" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" text-anchor="middle" fill="#2B1530">${label}</text>
      <text x="180" y="585" font-family="system-ui, -apple-system, sans-serif" font-size="13" text-anchor="middle" fill="#8A5A6B">${sub}</text>
    </svg>`
  )

/* TODO(importProduct): resolve a TikTok Shop link to { title, price, image }.
   No open scraping endpoint exists. Use your own backend, the TikTok Shop Partner API, or keep manual entry. */
export async function importProduct(link) {
  await sleep(500)
  return { title: '', price: '', image: '' }
}

/* TODO(generateStill): call an image model (Flux, SD3 with IP-Adapter, etc.) through your backend.
   Send character.description, character.seed, character.refs (synthetic reference image URLs),
   product.image and the pose. Return a data URL or image URL. */
export async function generateStill({ character, product, pose }) {
  await sleep(1200)
  return placeholder(product.title || 'Product', `${character.name} - ${pose}`)
}

/* TODO(generateVideo): call an image-to-video model (Kling, Seedance, Runway, Luma) through your backend.
   Send the approved still and the pose. Return { url, note } with a 9:16 clip URL. */
export async function generateVideo({ still, pose }) {
  await sleep(1500)
  return { url: '', note: 'Video stub. Plug in your video API in src/ai.js' }
}

/* TODO(makeCaption): optionally swap for an LLM call. Keep the AI-generated label in every caption. */
export function makeCaption(product) {
  const name = product.title || 'this outfit'
  return [
    `Cute and comfy: ${name} ${product.price ? '(' + product.price + ')' : ''}`.trim(),
    'Tap the orange cart to shop.',
    'AI-generated model.',
    '#kidsfashion #ternoset #tiktokshop #aigenerated'
  ].join('\n')
}