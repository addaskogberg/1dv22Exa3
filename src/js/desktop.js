function desktop () {
// Wait for HTML to load
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof (Storage) === 'undefined') {
      document.getElementById('header').innerHTML = 'Sorry, your browser does not support Web Storage...'
      document.getElementById('button2').disabled = true
    } else if (window.localStorage.getItem('setChatName') !== null) {
      setChatName = window.localStorage.getItem('setChatName')
    } else {
      console.log('localStorage parameter setChatName is null, setting true')
      setChatName = 'true'
    }
    document.getElementById('button1').onclick = function () {
      StartApp1()
    }
    document.getElementById('button2').onclick = function () {
      StartApp2()
    }
    document.getElementById('button3').onclick = function () {
      StartApp3()
    }
    document.getElementById('button4').onclick = function () {
      StartApp4()
    }
  })

  var xStart
  var yStart
  var tabindex = 0
  var setChatName = null
  /**
   * starts the memory game, sets the elements and handles the tabindex ie position of
   * next opened window.
   */
  function StartApp1 () {
    let window1 = document.createElement('div')
    window1.setAttribute('class', 'window1')
    window1.setAttribute('draggable', 'true')
    window1.setAttribute('tabindex', tabindex)
    window1.addEventListener('dragstart', DragStarted)
    window1.addEventListener('dragend', DragEnded)
    window1.addEventListener('focusin', WindowFocusin)
    window1.addEventListener('focusout', WindowFocusout)

    let topbarW1 = document.createElement('div')
    topbarW1.setAttribute('class', 'topbarW1')
    window1.appendChild(topbarW1)

    let buttonW1 = document.createElement('button')
    buttonW1.setAttribute('class', 'buttonW1')
    window1.appendChild(buttonW1)

    buttonW1.onclick = function () {
      window1.remove()
    }

    let textP = document.createElement('p')
    window1.appendChild(textP)
    let text1 = document.createTextNode('Memory Game')
    textP.appendChild(text1)

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

    anchor.appendChild(img)

    if (tabindex > 0) {
      window1.style.top = 100 + tabindex % 10 * 33 + 'px' // bounce vertical
      window1.style.left = 100 + tabindex % 34 * 33 + 'px'// bounce horisontal
    }

    document.body.appendChild(window1)

    var memory = require('./Memory')
    memory.playMemory(4, 4, window1)
    tabindex++
  }
  /**
   * starts the chat sets the elements and positions new windows
   */
  function StartApp2 () {
    let window2 = document.createElement('div')
    window2.setAttribute('class', 'window2')
    window2.setAttribute('draggable', 'true')
    window2.setAttribute('tabindex', tabindex)
    window2.addEventListener('dragstart', DragStarted)
    window2.addEventListener('dragend', DragEnded)
    window2.addEventListener('focusin', WindowFocusin)
    window2.addEventListener('focusout', WindowFocusout)

    let topbarW2 = document.createElement('div')
    topbarW2.setAttribute('class', 'topbarW2')
    window2.appendChild(topbarW2)

    let buttonW2 = document.createElement('button')
    buttonW2.setAttribute('class', 'buttonW2')
    window2.appendChild(buttonW2)

    buttonW2.onclick = function () {
      window2.remove()
    }

    let paragraph2 = document.createElement('p')
    paragraph2.setAttribute('id', 'chatName')
    let text2 = document.createTextNode('Welcome ' + window.localStorage.getItem('username'))
    paragraph2.appendChild(text2)
    window2.appendChild(paragraph2)

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
    messageText.style.top = '-318px'
    messageText.style.left = '10px'
    chatDiv.appendChild(messageText)

    document.body.appendChild(window2)

    var Chat = require('./Chat')
    var chat = new Chat(window2)

    if (setChatName === 'true') { // if there is no chatter name in local storage chatter must submit a name.
      let nameinput = document.createElement('input')
      nameinput.setAttribute('id', 'chatUsername')
      let nameButton = document.createElement('button')
      nameButton.setAttribute('id', 'nameButton')
      let buttonText = document.createTextNode('Submit name')
      nameButton.appendChild(buttonText)
      window2.appendChild(nameinput)
      window2.appendChild(nameButton)
      messageText.disabled = true
      var button2 = document.getElementById('button2')
      button2.disabled = true
      buttonW2.disabled = true

      nameButton.onclick = function () { // adds the username submitted and hides input field and button
        chat.setUsername(nameinput.value)
        window.localStorage.setItem('username', nameinput.value)
        document.getElementById('chatName').innerHTML = 'Welcome ' + nameinput.value
        window.localStorage.setItem('setChatName', false)
        setChatName = window.localStorage.getItem('setChatName')
        nameButton.remove()
        nameinput.remove()
        messageText.disabled = false
        button2.disabled = false
        buttonW2.disabled = false
        let name = document.getElementById('chatName')
        name.parentNode.style.zIndex = 100
      }
    }

    chat.connect().then(function (socket) {
      // open the connection to the server
    })

    if (tabindex > 0) {
      window2.style.top = 100 + tabindex % 10 * 33 + 'px' // bounce vertical
      window2.style.left = 100 + tabindex % 34 * 33 + 'px'// bounce horisontal
    }

    tabindex++
  }
  /**
   * creates the elements for the window and starts the video
   */
  function StartApp3 () {
    let window3 = document.createElement('div')
    window3.setAttribute('class', 'window3')
    window3.setAttribute('draggable', 'true')
    window3.setAttribute('tabindex', tabindex)
    window3.addEventListener('dragstart', DragStarted)
    window3.addEventListener('dragend', DragEnded)
    window3.addEventListener('focusin', WindowFocusin)
    window3.addEventListener('focusout', WindowFocusout)

    let topbarW3 = document.createElement('div')
    topbarW3.setAttribute('class', 'topbarW3')
    window3.appendChild(topbarW3)
    let buttonW1 = document.createElement('button')

    buttonW1.setAttribute('class', 'buttonW3')
    window3.appendChild(buttonW1)

    let text1 = document.createTextNode('')
    window3.appendChild(text1)

    let videoView = document.createElement('video')
    videoView.setAttribute('id', 'video')
    videoView.setAttribute('autoplay', 'autoplay')
    videoView.style.width = '400px'
    videoView.style.height = '300px'
    window3.appendChild(videoView)

    document.body.appendChild(window3)

    var video = require('./video')
    video.startVideo()

    buttonW1.onclick = function () { // stops the camera and closes the window
      video.stopVideo()
      window3.remove()
    }
    // keeping this code in case there are changes in how the video should be presented
/*
    if (tabindex >= 0) {
      window3.style.top = 100 + tabindex % 10 * 33 + 'px' // decided to open the video ofset the other two windows
      window3.style.left = 100 + tabindex % 34 * 33 + 'px' // can be changed depending on preference
    }
    tabindex++
    console.log(tabindex) */

    var button3 = document.getElementById('button3')// once activated the button is disabled and opaque
    button3.disabled = true
    button3.style.opacity = 0.4
    button3.title = 'Only one video is allowed'
  }
  /**
   * button 4 reloads and empties local storage
   */
  function StartApp4 () {
    window.localStorage.setItem('setChatName', 'true')
    window.localStorage.setItem('username', '')
    document.location.reload()
  }
  /**
   * drag started on a window. What is the position and set window opaque.
   * @param  {} event
   */
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
  /**
   * drag stopped on the window. Sets the new position and the window is no longer opaque
   * @param  {} event
   */
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
    // console.log('Finished dragging the window. xEnd:' + xEnd + ' yEnd:' + yEnd + ' xPos:' + xPos + ' yPos:' + yPos)
  }
  /**
   * places the window clicked in front of other windows
   * @param  {} event
   */
  function WindowFocusin (event) {
    console.log('Element got focus ' + String(event.target.nodeName))
    event.target.style.zIndex = 100
    if (String(event.target.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.style.zIndex = 100
    } else {
      return
    }
    if (String(event.target.parentNode.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.parentNode.style.zIndex = 100
    } else {
      return
    }
    if (String(event.target.parentNode.parentNode.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.parentNode.parentNode.style.zIndex = 100
    }
  }
  /**
   * places the window behind the clicked window
   * @param  {} event
   */
  function WindowFocusout (event) {
    console.log('Element lost focus ' + String(event.target.nodeName))
    event.target.style.zIndex = 0
    if (String(event.target.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.style.zIndex = 0
    } else {
      return
    }
    if (String(event.target.parentNode.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.parentNode.style.zIndex = 0
    } else {
      return
    }
    if (String(event.target.parentNode.parentNode.parentNode.nodeName) !== 'BODY') {
      event.target.parentNode.parentNode.parentNode.style.zIndex = 0
    }
  }
}

module.exports = {
  desktop
}
