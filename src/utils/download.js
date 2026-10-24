export function download(filename, href) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
}
