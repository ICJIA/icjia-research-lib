export { initTexmath }

const initTexmath = async () => {
  await initKatex()

  if (!document.head.querySelector('#texmathCSS'))
    await loadFromCDN('link', {
      id: 'texmathCSS',
      rel: 'stylesheet',
      href:
        'https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.css'
    })
  if (!document.head.querySelector('#texmathJS'))
    await loadFromCDN('script', {
      id: 'texmathJS',
      src:
        'https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.js'
    })
}

const initKatex = async () => {
  if (!document.head.querySelector('#katexCSS'))
    await loadFromCDN('link', {
      id: 'katexCSS',
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css',
      integrity:
        'sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j',
      crossorigin: 'anonymous'
    })

  if (!document.head.querySelector('#katexJS'))
    await loadFromCDN('script', {
      id: 'katexJS',
      src: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js',
      integrity:
        'sha384-9Nhn55MVVN0/4OFx7EE5kpFBPsEMZxKTCnA+4fqDmg12eCTqGi6+BB2LjY8brQxJ',
      crossorigin: 'anonymous'
    })
}

const loadFromCDN = (tagName, attrs) => {
  const el = document.createElement(tagName)
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
  document.head.appendChild(el)

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => el.addEventListener('load', resolve))
}
