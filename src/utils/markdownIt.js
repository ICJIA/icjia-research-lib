export { createMarkdownUtils, initMarkdownIt }

const createMarkdownUtils = md => ({
  addImages(images, markdown) {
    return `${markdown}${images
      .map(i => `\n\n[${i.title}]: ${i.src}`)
      .join('\n')}`
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
    .use(require('markdown-it-anchor').default, mdAnchorOpts)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-link-attributes'), mdLinkAttrOpts)
    .use(require('markdown-it-multimd-table'), mdMultimdTableOpts)

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

const mdLinkAttrOpts = {
  attrs: {
    target: '_blank'
  }
}

const mdMultimdTableOpts = {
  enableMultilineRows: true,
  enableRowspan: true
}
