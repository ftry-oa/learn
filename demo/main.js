const $icon = document.getElementById('sidebar-btn')

// 1. 监听图标的点击事件
$icon.addEventListener('click', () => {
  const $leftSide = document.getElementById('left-aside')
  const className = $leftSide.getAttribute('class')
  const isHidden = className && className.includes('hidden')
  if (isHidden) {
    const tmpClassName = className.split('hidden').join(' ')
    $leftSide.setAttribute('class', tmpClassName)
  } else {
    $leftSide.setAttribute('class', `${className} hidden`)
  }
}, false)

// 2. 实现高亮效果+高度自适应
const $textarea = document.getElementById('message-textarea')
const $messageBtn = document.getElementById('message-btn')

// 抽取封装成一个函数，方便复用
const handleActiveBtn = ({ value }) => {
  const className = $messageBtn.getAttribute('class')
  const isActive = className && className.includes('active')
  if (value && !isActive) {
    $messageBtn.setAttribute('class', `${className || ''} active`)
  } else if (!value && isActive) {
    $messageBtn.setAttribute('class', className.split('active').join(' '))
  }
}
$textarea.addEventListener('input', (e) => {
  const value = e.target.value
  // 2.1 高亮效果
  handleActiveBtn({ value })
  // 2.2 高度自适应效果
  $textarea.style.height = '24px'
  let height = e.target.scrollHeight || 24
  if (height > 200) {
    height = 200
  }
  $textarea.style.height = `${height}px`
}, false)

// 3. 按下回车键发送消息实现
document.addEventListener('keydown', (e) => {
  const value = $textarea.value
  if (e.code === 'Enter' && !e.shiftKey) {
    // 这一句很重要，否则无法清空textare输入框
    e.preventDefault()
    if (!value) {
      alert('没有需要发送的消息')
      return
    }
    // alert(`发送消息：${value}`)
    getResponse(value)
    // 清空消息
    $textarea.value = ''
    // 清空消息后，注意还原textarea输入框的高度
    $textarea.style.height = '24px'
    // 发送按钮高亮还原
    handleActiveBtn({ value: '' })
  }
}, false)

let $text = null
let typingEffect = null
let message = ''
let index = 0
const print2Screen = (newMessage) => {
  if (!$text) {
    $text = document.getElementById('answer-content-1')
  }
  if (message && typingEffect) {
    message += newMessage
    return
  } else {
    message = newMessage
  }
  typingEffect = setInterval(function () {
    // 如果所有字符都已添加，停止 setInterval
    if (index >= message.length) {
      clearInterval(typingEffect)
      message = ''
      index = 0
    } else {
      // 否则，添加下一个字符
      let textNode = document.createTextNode(message[index]);
      $text.appendChild(textNode);
      index++;
    }
  }, 50); // 每 100 毫秒添加一个字符
}

const getResponse = async (ask) => {
  fetch('http://localhost:3000')
    .then((response) => response.body)
    .then(async (body) => {
      let reader = body.getReader()
      while (true) {
        const { value, done } = await reader.read();
        const decoder = new TextDecoder(); // 默认编码是 'utf-8'
        const str = decoder.decode(value);
        console.log('@@@@value', str)
        print2Screen(str)
        if (done) {
          break
        }
      }
    })
}
