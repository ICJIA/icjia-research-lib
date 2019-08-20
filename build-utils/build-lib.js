/* eslint-disable no-console */
const fs = require('fs-extra')
const path = require('path')

console.info("🚀 Let's build this thing!")

// Update the index file
console.info('📝 Updating index file')
require('./update-index-file')

// Export CSS
exportCSS()

function exportCSS() {
  const srcPath = getPath('../src/style.css')
  const destPath = getPath('../style.css')

  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath)
      console.info('💅 CSS file is exported.')
    }
  } catch (err) {
    console.error(err)
  }
}

function getPath(...args) {
  return path.resolve(__dirname, ...args)
}
