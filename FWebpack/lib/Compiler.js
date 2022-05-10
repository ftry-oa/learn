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
    console.log('@@@@modules', this.modules)

    /**
     * 构建依赖关系图
     {
        'index.js': {
          code: 'xxxx',
          deps: { 'add.js': '绝对路径' }
        },
        'add.js': {
          code: 'xxx',
          deps: {},
        }
     }
     */
    const depsGraph = this.modules.reduce((prevValue, currentValue) => {
      const { filePath, code, deps } = currentValue
      prevValue[filePath] = {
        code,
        deps,
      }
      console.log('@@@@---e', code)
      return prevValue
    }, {})
    console.log('@@@@', depsGraph)
  }

  build (filePath) {
    // 1. 解析文件内容为ast
    const ast = getAst(filePath)

    // 2. 构建依赖
    const deps = getDeps(ast, filePath)

    // 3. 编译文件代码
    const code = getCode(ast)

    return {
      filePath,
      ast,
      deps,
      code,
    }
  }

  genarate (depsGraph) {
    /**
      "use strict";
    
      var _add = _interopRequireDefault(require("./add.js"));
      
      var _todo = _interopRequireDefault(require("./todo.js"));
      
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
      
      console.log('@@@@add', (0, _add["default"])(1, 2));
      console.log('@@@@todo', (0, _todo["default"])('jianfehuang', 'hahahhaxxxx'));
     */
    const bundle = `(function(depsGraph){
      function require(filePath){
        eval(depsGraph[filePath].code)
      }

      require(${this.options.entry})
    })(${JSON.stringify(depsGraph)})`



  }
}

module.exports = Compiler