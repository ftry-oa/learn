const http = require('http')
const url = require('url')
const querystring = require('querystring')

const data = require('./data.js')

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    // 'Content-Type': 'text/plain',
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*' // 允许所有域进行跨域请求
  })
  // 解析 URL
  const parsedUrl = url.parse(request.url);
  // 获取查询字符串
  const queryString = parsedUrl.query;
  // 解析查询字符串
  const queryParams = querystring.parse(queryString);
  // 获取参数值
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
    text = list[0][1]
  }
  // console.log('@@@@@999', request)
  let index = 0;
  let len = 2;
  const interval = setInterval(() => {
    response.write(text.substring(index, index + len))
    index += len;
    if (index >= text.length) {
      clearInterval(interval);
      response.end()
    }
  }, 100)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
