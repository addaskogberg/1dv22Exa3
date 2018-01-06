
function desktop () {
// Wait for HTML to load
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button1').onclick = function () {
      StartApp1()
    }

    document.getElementById('button2').onclick = function () {
      StartApp2()
    }
    document.getElementById('button3').onclick = function () {
      StartApp3()
    }
  })

  var xStart
  var yStart
  var tabindex = 0

  function StartApp1 () {
    let window1 = document.createElement('div')
    window1.setAttribute('class', 'window1')
    window1.setAttribute('draggable', 'true')
    window1.setAttribute('tabindex', tabindex)
    window1.addEventListener('dragstart', DragStarted)
    window1.addEventListener('dragend', DragEnded)
    window1.addEventListener('focusin', WindowFocusin)
    window1.addEventListener('focusout', WindowFocusout)

    let buttonW1 = document.createElement('button')
    buttonW1.setAttribute('class', 'buttonW1')
    window1.appendChild(buttonW1)

    buttonW1.onclick = function () {
      window1.remove()
    }

    let topbarW1 = document.createElement('div')
    topbarW1.setAttribute('class', 'topbarW1')
    window1.appendChild(topbarW1)

    let text1 = document.createTextNode('My Window')
    window1.appendChild(text1)

    let memoryContainer = document.createElement('div')
    memoryContainer.setAttribute('id', 'memoryContainer')
    window1.appendChild(memoryContainer)

    let template = document.createElement('template')
    memoryContainer.appendChild(template)

    let memoryDiv = document.createElement('div')
    memoryDiv.setAttribute('class', 'memory')
    template.appendChild(memoryDiv)

    let anchor = document.createElement('a')
    anchor.setAttribute('href', '#')
    memoryDiv.appendChild(anchor)
    anchor.addEventListener('focusin', WindowFocusin)
    anchor.addEventListener('focusout', WindowFocusout)

    let img = document.createElement('img')
    img.setAttribute('src', '../image/0.png')
    img.setAttribute('alt', 'A memory brick')
    // img.addEventListener('focusin', WindowFocusin)
    // img.addEventListener('focusout', WindowFocusout)

    anchor.appendChild(img)

    if (tabindex > 0) {
      window1.style.top = 100 + tabindex * 33 + 'px'
      window1.style.left = 100 + tabindex * 33 + 'px'
    }

    document.body.appendChild(window1)

    var memory = require('./Memory')
    // memory.playMemory(4, 4, 'memoryContainer')
    memory.playMemory(4, 4, memoryContainer)
    tabindex++
  }

  function StartApp2 () {
    let window2 = document.createElement('div')
    window2.setAttribute('class', 'window2')
    window2.setAttribute('draggable', 'true')
    window2.setAttribute('tabindex', tabindex)
    window2.addEventListener('dragstart', DragStarted)
    window2.addEventListener('dragend', DragEnded)
    window2.addEventListener('focusin', WindowFocusin)
    window2.addEventListener('focusout', WindowFocusout)

    let buttonW1 = document.createElement('button')
    buttonW1.setAttribute('class', 'buttonW1')
    window2.appendChild(buttonW1)

    buttonW1.onclick = function () {
      window2.remove()
    }

    let topbarW2 = document.createElement('div')
    topbarW2.setAttribute('class', 'topbarW2')
    window2.appendChild(topbarW2)

    let text1 = document.createTextNode('')
    window2.appendChild(text1)

    let chatContainer = document.createElement('div')
    chatContainer.setAttribute('id', 'chatContainer')
    window2.appendChild(chatContainer)

    let chatTemplate = document.createElement('template')
    chatTemplate.setAttribute('id', 'chat')
    window2.appendChild(chatTemplate)

    let chatDiv = document.createElement('div')
    chatDiv.setAttribute('class', 'chat')
    chatTemplate.appendChild(chatDiv)

    let messagesDiv = document.createElement('div')
    messagesDiv.setAttribute('class', 'messages')
    chatDiv.appendChild(messagesDiv)

    let messageTemplate = document.createElement('template')
    messagesDiv.appendChild(messageTemplate)

    let messageText = document.createElement('textarea')
    messageText.setAttribute('class', 'messageArea')
    messageText.style.position = 'relative'
    messageText.style.top = '-333px'
    messageText.style.left = '10px'
    chatDiv.appendChild(messageText)
    // window2.appendChild(messageText)

    document.body.appendChild(window2)

    var Chat = require('./Chat')

    var chat = new Chat(window2)

    chat.connect().then(function (socket) {
      // chat.sendMessage('Hello')
    })

    if (tabindex > 0) {
      window2.style.top = 100 + tabindex * 33 + 'px'
      window2.style.left = 100 + tabindex * 33 + 'px'
    }

    tabindex++
  }

  function StartApp3 () {
    let window3 = document.createElement('div')
    window3.setAttribute('class', 'window3')
    window3.setAttribute('draggable', 'true')
    window3.setAttribute('tabindex', tabindex)
    window3.addEventListener('dragstart', DragStarted)
    window3.addEventListener('dragend', DragEnded)
    window3.addEventListener('focusin', WindowFocusin)
    window3.addEventListener('focusout', WindowFocusout)

    let buttonW1 = document.createElement('button')
    buttonW1.setAttribute('class', 'buttonW1')
    window3.appendChild(buttonW1)

    let topbarW3 = document.createElement('div')
    topbarW3.setAttribute('class', 'topbarW3')
    window3.appendChild(topbarW3)

    let text1 = document.createTextNode('')
    window3.appendChild(text1)

    let videoView = document.createElement('video')
    videoView.setAttribute('id', 'video')
    videoView.setAttribute('autoplay', 'autoplay')
    videoView.style.width = '280px'
    videoView.style.height = '210px'
    window3.appendChild(videoView)
/*
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.style.width = '280px'
    canvas.style.height = '210px'
    window3.appendChild(canvas)
*/
    document.body.appendChild(window3)

    var video = require('./video')
    video.startVideo()

    buttonW1.onclick = function () {
      video.stopVideo()
      window3.remove()
    }

    if (tabindex > 0) {
      window3.style.top = 100 + tabindex * 33 + 'px'
      window3.style.left = 100 + tabindex * 33 + 'px'
    }
    tabindex++

    var button3 = document.getElementById('button3')
    button3.disabled = true
    button3.style.opacity = 0.4
    button3.title = 'Only one video is allowed'
  }

  function DragStarted (event) {
    let style = window.getComputedStyle(event.target)
    let top = style.getPropertyValue('top').split('px')
    let left = style.getPropertyValue('left').split('px')
    xStart = event.pageX
    yStart = event.pageY

  // Output some text when starting to drag the p element
    console.log('Started to drag the window. xStart:  ' + xStart + ' yStart:' + yStart + ' top:' + top[0] + ' left:' + left[0])

  // Change the opacity of the draggable element
    event.target.style.opacity = '0.4'
  }

  function DragEnded (event) {
    let style = window.getComputedStyle(event.target)
    let top = style.getPropertyValue('top').split('px')
    let left = style.getPropertyValue('left').split('px')

    var xEnd = event.pageX
    var yEnd = event.pageY
    event.target.style.opacity = '1'

    var xPos = xEnd - xStart + parseInt(left[0])
    var yPos = yEnd - yStart + parseInt(top[0])
    event.target.style.top = yPos + 'px'
    event.target.style.left = xPos + 'px'
    console.log('Finished dragging the window. xEnd:' + xEnd + ' yEnd:' + yEnd + ' xPos:' + xPos + ' yPos:' + yPos)
  }

  function WindowFocusin (event) {
    console.log('Element got focus ' + String(event.target.nodeName))
    event.target.style.zIndex = 100
    if (String(event.target.nodeName) !== 'DIV') {
      event.target.parentNode.parentNode.parentNode.style.zIndex = 100
    }
  }

  function WindowFocusout (event) {
    console.log('Element lost focus ' + String(event.target.nodeName))
    event.target.style.zIndex = 0
    if (String(event.target.nodeName) !== 'DIV') {
      event.target.parentNode.parentNode.parentNode.style.zIndex = 0
    }
  }
}

module.exports = {
  desktop
}
