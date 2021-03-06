const fs = require('fs').promises
const path = require('path')
var uuid = require('uuid')

async function walkDir(dir, result=[]) {
  const re = new RegExp('.txt$')
  const list = await fs.readdir(dir);
    for(let item of list) {
      const itemPath = path.join(dir, item)
      const stats = await fs.stat(itemPath)
      if (stats.isDirectory()) {
        await walkDir(itemPath, result)
      } else if (re.test(item)) {
        const id = uuid.v4() 
        const fileName = path.basename(item, path.extname(item));
        const absolutePath = path.dirname(path.resolve(itemPath));
        const date = stats.birthtime
        const size = stats.size
        result.push({ id, fileName, absolutePath, date, size })
      }     
    }
  return result
}

module.exports.walkDir = walkDir