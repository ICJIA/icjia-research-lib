const fs = require('fs')
const path = require('path')

const srcPath = path.resolve(__dirname, '../dist/index.css')
const destPath = path.resolve(__dirname, '../icjia-research-lib.css')

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log('CSS file is exported.')
  }
} catch (err) {
  console.error(err)
}
