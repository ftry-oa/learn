const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*' // 允许所有域进行跨域请求
  })
  console.log('@@@@@999', request)
  let count = 0;
  const interval = setInterval(() => {
    response.write(`Message ${count}\n`);
    count++;
    if (count > 10) {
      clearInterval(interval);
      response.end()
    }
  }, 1000)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
