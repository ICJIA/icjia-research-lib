const fs = require('fs-extra')
const path = require('path')

// Export style.css to root
const srcPath = path.resolve(__dirname, '../src/style.css')
const destPath = path.resolve(__dirname, '../style.css')

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
  }
} catch (err) {
  console.error(err)
}
