// ALL AI CALLS LIVE HERE. Each function is a stub. Replace the body with a real API call.
// Keep API keys on a small backend or serverless function, never in this client bundle.

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

// TODO: fetch product details from a link. TikTok Shop has no open scraping endpoint;
// use your own backend, the TikTok Shop Partner API, or keep manual entry.
export async function importProduct(link) {
  await sleep(500)
  return { title: '', price: '', image: '' }
}

// TODO: call an image model with the locked character + product image.
// Pass character.seed and character.description for consistency.
export async function generateStill({ character, product, pose }) {
  await sleep(1200)
  return placeholder(product.title || 'Product', `${character.name} - ${pose}`)
}

// TODO: call an image-to-video model with the approved still. Return a playable URL.
export async function generateVideo({ still, pose }) {
  await sleep(1500)
  return { url: null, note: 'Video stub. Plug in your video API in src/ai.js' }
}

// TODO: swap for an LLM call if you want better copy. The AI label stays in.
export function makeCaption(product) {
  const name = product.title || 'this outfit'
  return [
    `Cute and comfy: ${name} ${product.price ? '(' + product.price + ')' : ''}`.trim(),
    'Tap the orange cart to shop.',
    'AI-generated model.',
    '#kidsfashion #ternoset #tiktokshop #aigenerated'
  ].join('\n')
}
