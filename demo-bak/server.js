const http = require('http')
const url = require('url')
const querystring = require('querystring')
// 引入测试数据
const data = require('./data.js')

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*', // 允许跨域请求
  })
  // 解析URL
  const parseUrl = url.parse(request.url)
  const queryString = parseUrl.query;
  const queryParams = querystring.parse(queryString)
  // 获取参数
  const question = queryParams.question;
  const list = Object.entries(data)
  let text = ''
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i][0].includes(question)) {
      text = list[i][1]
      break
    }
  }
  if (!text) {
    // 没有找到问题的答案，取第一个回答返回
    text = list[0][1]
  }
  // 模拟持续返回
  let index = 0;
  let len = 2; // 每次返回2个字符
  const interval = setInterval(() => {
    response.write(text.substring(index, index + len))
    index += len;
    if (index >= text.length) {
      clearInterval(interval)
      response.end(); // 响应结束
    }
  }, 100)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
