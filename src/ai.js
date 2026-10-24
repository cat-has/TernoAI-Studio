// ALL AI CALLS LIVE HERE. Every function is a stub.
// Keep API keys on a backend or serverless function. Never put them in this client bundle.

export const POSES = ['Twirl', 'Walk', 'Pose on pink set', 'Mirror try-on', 'Dance']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const placeholder = (label, sub) =>
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">
      <rect width="360" height="640" fill="#F7C6D4"/>
      <circle cx="180" cy="210" r="70" fill="#FBE3EA"/>
      <rect x="110" y="290" width="140" height="220" rx="40" fill="#E8467C"/>
      <text x="180" y="560" font-family="sans-serif" font-size="20" text-anchor="middle" fill="#2B1530">${label}</text>
      <text x="180" y="590" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#2B1530">${sub}</text>
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
