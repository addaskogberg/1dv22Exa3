var config = require('./config.json')
var username = window.localStorage.getItem('username')

/**
 *
 * @param  {} container
 */
function Chat (container) {
  this.socket = null
  var chatContainer = container.childNodes[3]
  var template = container.childNodes[4]
  this.chatDiv = template.childNodes[0]

  this.chatDiv.addEventListener('keypress', function (event) {
    // listen for enter key
    if (event.keyCode === 13) {
      // send a message
      this.sendMessage(event.target.value)
      // empty textarea
      event.target.value = ''
      event.preventDefault()
    }
  }.bind(this))
  chatContainer.appendChild(this.chatDiv)
}
/**
 * connects to server
 */
Chat.prototype.connect = function () {
  return new Promise(function (resolve, reject) {
    if (this.socket && this.socket.readyState === 1) {
      resolve(this.socket)
      return
    }
    this.socket = new window.WebSocket(config.address)

    this.socket.addEventListener('open', function () {
      resolve(this.socket)
    }.bind(this))

    this.socket.addEventListener('error', function () {
      reject(new Error('could not connect'))
    })

    this.socket.addEventListener('message', function (event) {
      var message = JSON.parse(event.data)
      if (message.type === 'message') {
        this.printMessage(message)
      }
    }.bind(this))
  }.bind(this))
}
/**
 * sends the data including the message written
 * @param  {} text
 */
Chat.prototype.sendMessage = function (text) {
  var data = {
    type: 'message',
    data: text,
    username: username,
    channel: '',
    key: config.key
  }
  this.connect().then(function (socket) {
    socket.send(JSON.stringify(data))
    console.log('sending message', text)
  }).catch(function (error) {
    console.log('something wrong', error)
  })
}
/**
 * creates the elements for the message and username and adds them
 * @param  {} message
 */
Chat.prototype.printMessage = function (message) {
  let messageDiv = document.createElement('div')
  messageDiv.setAttribute('class', 'message')

  let pText = document.createElement('p')
  pText.setAttribute('class', 'text')
  messageDiv.appendChild(pText)

  let pAuthor = document.createElement('p')
  pAuthor.setAttribute('class', 'author')
  messageDiv.appendChild(pAuthor)

  messageDiv.childNodes[0].textContent = message.data
  messageDiv.childNodes[1].textContent = message.username

  this.chatDiv.childNodes[0].insertBefore(messageDiv, this.chatDiv.childNodes[0].childNodes[0])
}
/**
 * @param  {} name
 */
Chat.prototype.setUsername = function (name) {
  username = name
  console.log(username)
}

module.exports = Chat
