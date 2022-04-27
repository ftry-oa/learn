
const webpack = require('../lib')
const config = require('../webpack.config')

const compiler = webpack(config)

compiler.run()