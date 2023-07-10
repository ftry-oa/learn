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
    handleChat(value)
    // 清空消息
    $textarea.value = ''
    // 清空消息后，注意还原textarea输入框的高度
    $textarea.style.height = '24px'
    // 发送按钮高亮还原
    handleActiveBtn({ value: '' })
  }
}, false)

// 聊天逻辑实现 start ---------------------------------------
// 滚动到底部
const scroll2Bottom = () => {
  const $chatBox = document.getElementById('chat-box')
  $chatBox.scrollTop = $chatBox.scrollHeight
}
// 提问逻辑
const appendQuestion = (question) => {
  const $chatBox = document.getElementById('chat-box')
  const $questionEle = document.createElement('div')
  $questionEle.setAttribute('class', 'chat-item ask')
  // 提问HTML模版
  $questionEle.innerHTML = `<div class="chat-inner-item">
  <div class="chat-img">
    <img
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202103%2F23%2F20210323142848_6a340.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688969056&t=022c786aec872cde374f6a8ff3a70b17"
      style="width:30px" alt="">
  </div>
  <div class="chat-content">
    <div class="text-content ask-text-content">${question}</div>
  </div>
</div>`
  $chatBox.appendChild($questionEle)
  // 提问完成后，有时内容很多，需要滚动到最顶部，让新增的提问可见
  scroll2Bottom()
}

// 回答模版
const appendAnswer = () => {
  const $chatBox = document.getElementById('chat-box')
  const $answerEle = document.createElement('div')
  $answerEle.setAttribute('class', 'chat-item answer')
  // 回答的HTML模版
  $answerEle.innerHTML = `<div class="chat-inner-item">
  <div class="chat-img">
    <img src="https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png" style="width:30px"
      alt="">
  </div>
  <div class="chat-content">
    <div class="text-content">
    </div>
    <div class="chat-op">
      <span><svg class="iconpark-icon">
          <use href="#copy"></use>
        </svg></span>
      <span><svg class="iconpark-icon">
          <use href="#zan"></use>
        </svg></span>
      <span><svg class="iconpark-icon">
          <use href="#cai"></use>
        </svg></span>
    </div>
  </div>
</div>`
  const $textContent = $answerEle.querySelector('.text-content')
  $chatBox.appendChild($answerEle)
  return {
    $textContent,
  }
}

let typingTimer = null
let message = ''
let index = 0
const typing2Screen = ($dom, newMessage) => {
  if (message && typingTimer) {
    message += newMessage
    return
  }
  message = newMessage
  typingTimer = setInterval(() => {
    // 已经全部输出，停止定时器
    if (index >= message.length) {
      clearInterval(typingTimer)
      typingTimer = null
      message = ''
      index = 0
    } else {
      // 一个一个字符输出到页面上
      const textNode = document.createTextNode(message[index])
      $dom.appendChild(textNode)
      index++
    }
    // 输出时也自动滚动
    scroll2Bottom()
  }, 50) // 每50毫秒输出一个字符
}

const getResponse = async ({ question, $textContent }) => {
  const $text = document.createElement('div')
  // 加上光标样式
  $text.setAttribute('class', 'cursor')
  $textContent.appendChild($text)
  fetch(`http://localhost:3000?question=${question}`)
    .then((response) => response.body)
    .then(async (body) => {
      let reader = body.getReader()
      // 递归读取分片数据
      while (true) {
        const { value, done } = await reader.read()
        const decoder = new TextDecoder()
        const str = decoder.decode(value)
        // 输出到页面上
        typing2Screen($text, str)
        if (done) {
          // 回答结束，去掉光标效果
          $text.setAttribute('class', '')
          break
        }
      }
    })
}

// 聊天入口
const handleChat = (question) => {
  // 提问
  appendQuestion(question)
  const { $textContent } = appendAnswer()
  // 拉取数据实现输出
  getResponse({ question, $textContent })
}
// 聊天逻辑实现 end -----------------------------------------
