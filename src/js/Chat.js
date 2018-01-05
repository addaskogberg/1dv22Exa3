var config = require('./config.json')

function Chat (container) {
  this.socket = null
  var template = document.querySelector('#chat')
  this.chatDiv = document.importNode(template.content.firstElementChild, true)

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
  container.appendChild(this.chatDiv)
}

Chat.prototype.connect = function () {
  return new Promise(function (resolve, reject) {
    if (this.socket && this.socket.readyState === 1) {
      resolve(this.socket)
      return
    }
    this.socket = new window.WebSocket(config.address) // added window.

    this.socket.addEventListener('open', function () {
      resolve(this.socket)
    }.bind(this))

    this.socket.addEventListener('error', function () {
      reject(new Error('could not connect'))
    })

    this.socket.addEventListener('message', function (event) { // added event as parameter in function
      var message = JSON.parse(event.data)
      if (message.type === 'message') {
        this.printMessage(message)
      }
    }.bind(this))
  }.bind(this))
}

Chat.prototype.sendMessage = function (text) {
  var data = {
    type: 'message',
    data: text,
    username: 'as224wq',
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

Chat.prototype.printMessage = function (message) {
  var template = this.chatDiv.querySelectorAll('template')[0]

  var messageDiv = document.importNode(template.content.firstElementChild, true)

  messageDiv.querySelectorAll('.text')[0].textContent = message.data
  messageDiv.querySelectorAll('.author')[0].textContent = message.username

  this.chatDiv.querySelectorAll('.messages')[0].appendChild(messageDiv)
}

module.exports = Chat
