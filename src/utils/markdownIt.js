export { createMarkdownUtils, initMarkdownIt }

const createMarkdownUtils = md => ({
  addImages(images, markdown) {
    return `${markdown}${images.map(i => `\n\n[${i.title}]: ${i.src}`)}`
  },
  parseHeadings(markdown) {
    return new DOMParser()
      .parseFromString(md.render(markdown), 'text/html')
      .querySelectorAll('h2')
  },
  renderMarkdown(markdown) {
    return md.render(markdown)
  }
})

const initMarkdownIt = () =>
  require('markdown-it')(mdOpts)
    .use(require('markdown-it-anchor'), mdAnchorOpts)
    .use(require('markdown-it-footnote'))

const mdOpts = {
  html: true,
  linkify: true,
  typographer: true
}

const mdAnchorOpts = {
  level: 2,
  slugify: s =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
}
