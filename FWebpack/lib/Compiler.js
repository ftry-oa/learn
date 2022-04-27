
class Compiler {
  constructor(options) {
    this.options = options
  }
  run () {
    console.log('@@@run compiler')
  }
}

module.exports = Compiler