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

const cursorHandler = {
  addCursor: ($dom) => {
    if (!$dom) {
      return
    }
    $dom.setAttribute('class', 'cursor')
  },
  removeCursor: ($dom) => {
    if (!$dom) {
      return
    }
    $dom.setAttribute('class', '')
  },
}

// 策略模式
const createElementHandler = {
  paragraph: () => {
    return document.createElement('p')
  },
  heading: ({ token }) => {
    return document.createElement(`h${token.depth}`)
  },
  blockquote: () => {
    return document.createElement('blockquote')
  },
  list: ({ token, $parentDom, parentToken }) => {
    const items = token.items || []
    const doms = []
    items.forEach((listInnerItem) => {
      if ('list_item' === listInnerItem.type) {
        const domItem = document.createElement('li')
        domItem.innerText = (token.start ? `${token.start}. ` : '') + listInnerItem.text
        doms.push(domItem)
      }
    })
    let $listBox = null
    if (token.ordered) {
      // 有序列表
      if ($parentDom && parentToken && parentToken.ordered && parentToken.type === 'list') {
        $listBox = $parentDom
      } else {
        $listBox = document.createElement('ol')
      }
    } else {
      // 无序列表
      if ($parentDom && parentToken && !parentToken.ordered && parentToken.type === 'list') {
        $listBox = $parentDom
      } else {
        $listBox = document.createElement('ul')
      }
    }
    doms.forEach((domItem) => {
      $listBox.appendChild(domItem)
    })
    return {
      $doms: doms,
      $parent: $listBox,
    }
  },
}

// let typingTimer = null
// // let message = ''
// let list = []
// let index = 0

// const clear = () => {
//   clearInterval(typingTimer)
//   typingTimer = null
//   index = 0
//   list = []
// }

// const typing2Screen = ($dom, tokens) => {
//   list = list.concat(...tokens)
//   if (tokens && typingTimer) {
//     // message += newMessage
//     return
//   }
//   // message = newMessage
//   let curToken = list[index]
//   let lineIndex = 0
//   let $lineDom = null
//   let message = curToken.text || ''
//   typingTimer = setInterval(() => {
//     // if (index >= list.length) {
//     //   console.log('end1', list, index)
//     //   clear()
//     //   return
//     // }
//     if (curToken && !$lineDom) {
//       // $lineDom = document.createElement('p')
//       if (!createElementHandler[curToken.type]) {
//         index += 1
//         curToken = list[index]
//         // if (!curToken) {
//         //   return
//         // }
//         lineIndex = 0
//         if (curToken && !curToken.concatPrevLine) {
//           cursorHandler.removeCursor($lineDom)
//           $lineDom = null
//         }
//         message = curToken.text || ''
//         return
//       }
//       $lineDom = createElementHandler[curToken.type](curToken)
//       cursorHandler.addCursor($lineDom)
//       $dom.appendChild($lineDom)
//     }
//     if (lineIndex >= message.length) {
//       console.log('@@@@prev line info', message, lineIndex)
//       console.log('@@@@line end', JSON.stringify({ index, len: list?.length }))
//       if (index >= list.length) {
//         // 已经全部输出，停止定时器
//         // clearInterval(typingTimer)
//         // typingTimer = null
//         // index = 0
//         // list = []
//         console.log('end2', JSON.stringify({
//           list, index,
//         }))
//         clear()
//         cursorHandler.removeCursor($lineDom)
//         $lineDom = null
//         return
//       }
//       // 下一行的输出
//       index += 1
//       curToken = list[index]
//       if (!curToken) {
//         return
//       }
//       lineIndex = 0
//       if (curToken && !curToken.concatPrevLine) {
//         cursorHandler.removeCursor($lineDom)
//         $lineDom = null
//       }
//       message = curToken.text || ''
//     } else {
//       // 该行一个一个字符输出到页面上
//       const textNode = document.createTextNode(message[lineIndex])
//       $lineDom.appendChild(textNode)
//       lineIndex++
//     }
//     // 输出时也自动滚动
//     scroll2Bottom()
//   }, 50) // 每50毫秒输出一个字符
// }

// 单例
const typingHandler = {
  typing: false,
  typingTimer: null,
  $prevDom: null,
  $parentDom: null,
  parentToken: null,
  // 输出到页面上
  typingLine ({ $dom, token, tokenList, tokenIndex }) {
    if (!createElementHandler[token.type]) {
      console.warn(`暂不支持这种类型哟`, token.type, token)
      printHandler.update(this)
      return
    }
    console.log('@@@token', token)
    let lineIndex = 0
    let $lineDom = null
    if (token.concatPrevLine) {
      $lineDom = this.$prevDom
    } else {
      const domResult = createElementHandler[token.type]({ token, $parentDom: this.$parentDom, parentToken: this.parentToken })
      if (domResult?.$doms) {
        $lineDom = domResult?.$doms[0]
        this.$parentDom = domResult?.$parent
        this.parentToken = token
        $dom.appendChild(this.$parentDom)
      } else {
        $lineDom = domResult
        $dom.appendChild($lineDom)
      }
    }
    // 对token对象实例产生副作用，增加属性标记所属的dom
    token.$dom = $lineDom
    cursorHandler.addCursor($lineDom)
    // $dom.appendChild($lineDom)
    let message = token.text || ''
    // 设置为正在打印中
    this.typing = true
    this.typingTimer = setInterval(() => {
      if (lineIndex >= message.length) {
        // 设置为打印完了
        this.typing = false
        clearInterval(this.typingTimer)
        this.typingTimer = null
        cursorHandler.removeCursor($lineDom)
        this.$prevDom = $lineDom
        // 发布结束的通知
        printHandler.update(this)
        return
      }
      // 该行一个一个字符输出到页面上
      const textNode = document.createTextNode(message[lineIndex])
      $lineDom.appendChild(textNode)
      lineIndex++
      // 输出时也自动滚动
      scroll2Bottom()
    }, 80)
  }
}

const printHandler = {
  tokenList: [],
  index: 0,
  msgList: [], // { text: '', enabledPrint: false, transformAll: false }
  msgIndex: 0,
  $rootDom: null,
  receiveMsg ({ str, $dom, done }) {
    if (str.length <= 0) {
      return
    }
    const lexer = marked.lexer;
    this.$rootDom = $dom
    if (this.msgList[this.msgIndex] === undefined) {
      this.msgList[this.msgIndex] = {
        text: '',
        enabledPrint: false,
      }
    }
    let curMsgItem = this.msgList[this.msgIndex]
    if (str.includes('\n')) {
      const [prevLine, nextLine] = str.split('\n')
      curMsgItem.text += prevLine
      if (curMsgItem.enabledPrint) {
        const tokens = lexer(prevLine)
        if (tokens && tokens.length > 0) {
          tokens.forEach((tokenItem, index) => {
            tokenItem.concatPrevLine = true
            if (index === tokens.length - 1) {
              // 标记这个token是这一行的结束token
              tokenItem.lineEnd = true
            }
          })
        }
        this.receive($dom, tokens)
      } else {
        curMsgItem.enabledPrint = true
        const tokens = lexer(curMsgItem.text)
        if (tokens && tokens.length > 0) {
          // 标记这个token是这一行的开始
          tokens.forEach((tokenItem, index) => {
            if (index === 0) {
              tokenItem.lineStart = true
            }
          })
        }
        this.receive($dom, tokens)
      }
      // 标记这一行已经转换转换完毕
      curMsgItem.transformAll = true
      this.msgIndex++
      if (this.msgList[this.msgIndex] === undefined) {
        this.msgList[this.msgIndex] = {
          text: nextLine,
          enabledPrint: false,
        }
      }
      curMsgItem = this.msgList[this.msgIndex]
    } else {
      curMsgItem.text += str
    }
    if (curMsgItem.enabledPrint) {
      const tokens = lexer(str)
      if (tokens && tokens.length > 0) {
        tokens.forEach((tokenItem) => {
          tokenItem.concatPrevLine = true
        })
      }
      this.receive($dom, tokens)
    } else {
      // 判断markdown语法
      const regex = /^\s*[\S]+\s+.+$/
      const isMatch = regex.test(curMsgItem.text)
      if (isMatch || curMsgItem.text.length > 5 || done) {
        const tokens = lexer(curMsgItem.text)
        if (tokens && tokens?.length > 0) {
          tokens.forEach((tokenItem, index) => {
            if ((isMatch || curMsgItem.text.length > 5) && index === 0) {
              tokenItem.lineStart = true
            } else if (done && index === tokens.length - 1) {
              tokenItem.lineEnd = true
              // 标记整个文档结束
              tokenItem.markdownEnd = true
            }
          })
        }
        this.receive($dom, tokens)
        curMsgItem.enabledPrint = true
        // const trimText = trim(curMsgItem.text)
        // const isMarkdown = this.isMarkdownLexical(trimText)
        // if (isMarkdown) {
        //   const tokens = lexer(curMsgItem.text)
        //   this.receive($dom, tokens)
        //   curMsgItem.enabledPrint = true
        // } else {
        //   // todo 当作段落语法来处理
        // }
      } else {
        // 如果不符合，就不处理，等待接收下一次的字符
      }
    }
  },
  receive ($dom, tokens) {
    this.tokenList = this.tokenList.concat(...tokens)
    this.$rootDom = $dom
    if (typingHandler.typing) {
      return
    }
    // typingHandler.typingLine(printHandler.$rootDom, this.tokenList[this.index])
    typingHandler.typingLine({
      $dom: printHandler.$rootDom,
      token: this.tokenList[this.index],
      tokenList: this.tokenList,
      tokenIndex: this.index,
    })
  },
  update (typingInst) {
    if (typingInst.typing) {
      return
    }
    this.index += 1
    if (!this.tokenList[this.index]) {
      return
    }
    // typingHandler.typingLine(printHandler.$rootDom, this.tokenList[this.index])
    typingHandler.typingLine({
      $dom: printHandler.$rootDom,
      token: this.tokenList[this.index],
      tokenList: this.tokenList,
      tokenIndex: this.index,
    })
  }
}

function trim (str) {
  return str.replace(/^\s+|\s+$/g, '');
}
// 接收markdown数据流处理
// const receiveCharHandler = {
//   lineList: [],
//   index: 0,
//   markdownLexical: [
//     '#',
//     '>',
//     '-',
//     (str) => {
//       const regex = /^\d+\.$/
//       return regex.test(str)
//     },
//     '```',
//     '|',

//   ],
//   isMarkdownLexical (str) {
//     let flag = false
//     for (let i = 0, len = this.markdownLexical; i < len; i++) {
//       const item = this.markdownLexical[i]
//       if (typeof item === 'function') {
//         let tmpFlag = item(str)
//         if (tmpFlag) {
//           flag = true
//           break
//         }
//         continue
//       }
//       if (str.startsWith(item)) {
//         flag = true
//         break
//       }
//     }
//   },
//   receive (str) {
//     if (str.length <= 0) {
//       return
//     }
//     if (this.lineList[this.index] === undefined) {
//       this.lineList[this.index] = ''
//     }
//     let curLine = this.lineList[this.index]
//     if (str.includes('\n')) {
//       const [prevLine, nextLine] = str.split('\n')
//       this.lineList[this.index] += prevLine
//       this.index++
//       this.lineList[this.index] = nextLine
//       curLine = this.lineList[this.index]
//     } else {
//       this.lineList[this.index] += str
//     }
//     // 判断markdown语法
//     const regex = /^\s*[\S]+\s+.*$/
//     const isMatch = regex.test(curLine)
//     if (isMatch) {
//       const trimLine = trim(curLine)
//       const isMarkdown = this.isMarkdownLexical(trimLine)
//       if (isMarkdown) {
//         // const tokens = lexer(typingLine)
//         // printHandler.receive($textContent, tokens)
//       }
//     }
//   },
// }

const getResponse = async ({ question, $textContent }) => {
  // const $text = document.createElement('div')
  // 加上光标样式
  // $text.setAttribute('class', 'cursor')
  // $textContent.appendChild($text)
  // let line = ''
  // let concatPrevLine = false
  const lexer = marked.lexer;
  fetch(`http://localhost:3000?question=${question}`)
    .then((response) => response.body)
    .then(async (body) => {
      let reader = body.getReader()
      // 递归读取分片数据
      while (true) {
        const { value, done } = await reader.read()
        const decoder = new TextDecoder()
        const str = decoder.decode(value)
        printHandler.receiveMsg({
          str,
          $dom: $textContent,
          done,
        })
        console.log('@@@@str', str)
        // line += str
        // // console.log('@@@@line', line)
        // // 一行一行地输出
        // if (line.includes('\n')) {
        //   console.log('@@@@line1', line)
        //   const [typingLine, nextLine] = line.split('\n')
        //   // const typingHtml = marked.parse(typingLine)
        //   if (line.includes('标题1') || line.includes('标题2')) {
        //     debugger
        //   }
        //   const tokens = lexer(typingLine)
        //   // console.log('@@@tokens1', tokens)
        //   // typing2Screen($textContent, tokens)
        //   printHandler.receive($textContent, tokens)
        //   line = nextLine
        //   concatPrevLine = false
        // } else if (line.length > 10) {
        //   console.log('@@@@line2', line)
        //   const tokens = lexer(line)
        //   // console.log('@@@tokens2', tokens)
        //   if (tokens && tokens.length > 0) {
        //     tokens.forEach((tokenItem) => {
        //       tokenItem.concatPrevLine = concatPrevLine
        //     })
        //   }
        //   // typing2Screen($textContent, tokens)
        //   printHandler.receive($textContent, tokens)
        //   line = ''
        //   concatPrevLine = true
        // } else if (done) {
        //   console.log('@@@@done line', line)
        //   // const lineList = line.split('\n')
        //   const tokens = lexer(line)
        //   // typing2Screen($textContent, tokens)
        //   printHandler.receive($textContent, tokens)
        // }

        if (done) {
          // 回答结束，去掉光标效果
          // $text.setAttribute('class', '')
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
setTimeout(() => {
  handleChat('test')
}, 100)
// 聊天逻辑实现 end -----------------------------------------
