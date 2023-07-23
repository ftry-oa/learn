// 测试数据
module.exports = {
  'ChatGPT的前端是ChatGPT生成的，还是工程师编写？': 'ChatGPT的前端通常由工程师编写。ChatGPT本身是一个语言模型，它负责生成回答文本。但是，为了将ChatGPT嵌入到一个可交互的界面中，工程师需要编写前端代码，以便用户可以与ChatGPT进行对话。这包括创建用户界面、处理用户输入、向ChatGPT发送请求并显示生成的回答等任务。前端的目的是提供一个友好和可访问的交互界面，使用户能够与ChatGPT进行对话。',
  '你是ChatGPT吗？': '是的，我是ChatGPT，一个由OpenAI开发的大型语言模型。\n我基于GPT-3.5架构进行训练，可以回答各种问题，提供信息和与用户进行对话。我在2021年9月之前的知识为止，但我会尽力帮助您提供相关的信息和支持。有什么我可以帮助您的吗？',
  '你的聊天输入框是怎么实现的？\n可以教教我们吗？\n': '当涉及到实现聊天输入框时，有几种常见的方法。以下是一种基本的实现方式，供您参考：\n\n1. HTML结构：在HTML文件中，创建一个输入框和一个用于显示对话的容器。例如：\n\n```html\n<div id=\"chat-container\">\n  <div id=\"chat-log\"></div>\n  <input type=\"text\" id=\"user-input\" placeholder=\"请输入消息...\" />\n</div>\n```\n\n2. CSS样式：使用CSS样式对聊天输入框进行布局和美化。例如：\n\n```css\n#chat-container {\n  width: 400px;\n  height: 400px;\n  border: 1px solid #ccc;\n  padding: 10px;\n  overflow-y: auto;\n}\n\n#user-input {\n  width: 100%;\n  padding: 5px;\n}\n```\n\n3. JavaScript交互：使用JavaScript处理用户输入和显示聊天对话。例如：\n\n```javascript\n// 获取HTML元素\nvar userInput = document.getElementById(\"user-input\");\nvar chatLog = document.getElementById(\"chat-log\");\n\n// 处理用户输入\nfunction handleUserInput() {\n  var userMessage = userInput.value;\n\n  // 显示用户消息\n  displayMessage(userMessage, \"user\");\n\n  // 发送用户消息给后端或ChatGPT模型进行处理\n  sendMessageToBackend(userMessage);\n\n  // 清空输入框\n  userInput.value = \"\";\n}\n\n// 显示消息\nfunction displayMessage(message, sender) {\n  var messageElement = document.createElement(\"div\");\n  messageElement.classList.add(sender);\n  messageElement.innerText = message;\n\n  chatLog.appendChild(messageElement);\n}\n\n// 监听输入框的回车键事件\nuserInput.addEventListener(\"keydown\", function(event) {\n  if (event.key === \"Enter\") {\n    handleUserInput();\n  }\n});\n```\n\n在上述代码中，我们首先获取了输入框和对话容器的引用，然后定义了处理用户输入和显示消息的函数。函数中，我们根据用户输入创建一个新的`<div>`元素，并将其添加到对话容器中。我们还可以将用户输入发送到后端或ChatGPT模型进行处理，这一部分需要根据具体的后端实现进行编写。最后，我们监听输入框的回车键事件，以便在用户按下回车键时调用处理用户输入的函数。\n\n请注意，上述代码仅提供了一个基本的实现示例，实际的实现可能会根据具体的需求和技术栈有所不同。希望这个例子能帮助您了解如何实现聊天输入框。',
  "原生JS如何清空textarea的内容？我这样做（$textarea是js实例）：\n$textarea.value = ''\n但是发现，textarea里面还有空格，并且placeholder也没有显示出来。": "要清空 textarea 元素的内容，可以使用 `textContent` 属性而不是 `value` 属性。以下是正确的方法：\n\n```javascript\n$textarea.textContent = '';\n```\n\n通过设置 `textContent` 为一个空字符串，可以完全清空 textarea 的内容。\n\n关于空格和占位符（placeholder）的问题，如果 textarea 中存在空格，可能是因为代码中的其他处理或设置导致的。请确保在清空 textarea 内容之前没有额外的空格或其他字符被添加进去。\n\n占位符（placeholder）是 textarea 的一个属性，用于在没有用户输入时显示默认的提示文本。如果你在代码中直接设置了 `textContent`，则会清空所有内容，包括占位符。如果你想要重新显示占位符，可以通过以下方法设置：\n\n```javascript\n$textarea.value = '';\n$textarea.placeholder = '请输入消息...';\n```\n\n将 `value` 属性设置为空字符串，然后将 `placeholder` 属性设置为相应的提示文本即可。这样，当 textarea 内容为空时，占位符文本将会显示出来。\n\n请确保在设置占位符文本时使用正确的属性名称，即 `placeholder`。",
  "test\n": "还是结婚登记收到回复加上地方\njksdjf时代峰峻开始的***abcde***\n# 标题1\n ## 标题2\n ### 标题3 \n > 这是引用的文本。\n - 项目 1 \n - 项目 2 - 项目 3 \n 1. project1 \n 2. project2 \n 3. project2 \n 11. project4 "
}

