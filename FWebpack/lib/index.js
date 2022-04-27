const Compiler = require('./Compiler')

const webpack = (options) => {
  const compiler = new Compiler(options)
  return compiler
}

module.exports = webpack