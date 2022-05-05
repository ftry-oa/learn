const fs = require('fs')
const path = require('path')

const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const parser = {
  getAst (filePath) {
    // 将其filePath文件内容解析为ast抽象语法树
    const entryCode = fs.readFileSync(filePath)
    const ast = babelParser.parse(entryCode.toString(), {
      sourceType: 'module',
    })
    return ast
  },
  getDeps (ast, filePath) {
    const dirname = path.dirname(filePath)

    // 依赖
    const deps = {}

    babelTraverse(ast, {
      ImportDeclaration: function ({ node }) {
        const relativePath = node.source.value
        const absolutePath = path.resolve(dirname, relativePath)
        deps[relativePath] = absolutePath
      },
    })
    return deps
  },
  getCode (ast) {
    // 编译文件代码,成为浏览器可以识别的代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  },
}

module.exports = parser