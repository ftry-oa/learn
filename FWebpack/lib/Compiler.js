const { getAst, getDeps, getCode } = require('./parser')

class Compiler {
  constructor(options) {
    this.options = options
    this.modules = []
  }
  run () {
    const entryFilePath = this.options.entry
    const fileInfo = this.build(entryFilePath)
    this.modules.push(fileInfo)

    this.modules.forEach(({ deps }) => {
      for (const relativePath in deps) {
        if (deps[relativePath]) {
          const moduleFileInfo = this.build(deps[relativePath])
          this.modules.push(moduleFileInfo)
        }
      }
    })
  }

  build (filePath) {
    // 1. 解析文件内容为ast
    const ast = getAst(entryFilePath)

    // 2. 构建依赖
    const deps = getDeps(ast, entryFilePath)

    // 3. 编译文件代码
    const code = getCode(ast)

    return {
      filePath,
      ast,
      deps,
      code,
    }
  }
}

module.exports = Compiler