module.exports = {
  playMemory: playMemory,
  shuffel: getPictureArray
}

function playMemory (rows, cols, container) {
 // var i
  var a
  var tiles = []
  var turn1
  var turn2
  var lastTile
  var pairs = 0
  var tries = 0

  tiles = getPictureArray(rows, cols)

  // container = document.getElementById(container)
  // container = document.getElementsByClassName(container)
  // console.log(container[0])
  // var templateDiv = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
  var templateDiv = container.childNodes[0].childNodes[0]

  var div = document.importNode(templateDiv, false)

  tiles.forEach(function (tile, index) {
    a = document.importNode(templateDiv.firstElementChild, true)
    a.firstElementChild.setAttribute('data-bricknumber', index)
    div.appendChild(a)

    if ((index + 1) % cols === 0) {
      div.appendChild(document.createElement('br'))
    }
  })

  div.addEventListener('click', function (event) {
    event.preventDefault()
    var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

    var index = parseInt(img.getAttribute('data-bricknumber'))
    turnBrick(tiles[index], index, img)
  })
  container.appendChild(div)

  function turnBrick (tile, index, img) {
    if (turn2) { return }
    img.src = 'image/' + tile + '.png'

    if (!turn1) {
      turn1 = img
      lastTile = tile
    } else {
      if (img === turn1) { return }

      tries += 1

      turn2 = img

      if (tile === lastTile) {
        console.log('pair')

        pairs += 1

        if (pairs === (cols * rows) / 2) {
          console.log('win on' + tries + 'number of tries')
        }
        window.setTimeout(function () {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')
          var window1 = turn2.parentNode.parentNode.parentNode.parentNode

          turn1 = null
          turn2 = null
          window.setTimeout(function () {
            console.log(window1)
            window1.style.zIndex = 100
          }, 0)
        }, 300)
      } else {
        window.setTimeout(function () {
          turn1.src = 'image/0.png'
          turn2.src = 'image/0.png'

          turn1 = null
          turn2 = null
        }, 500)
      }
    }
  }
}

function getPictureArray (row, cols) {
  var i
  var arr = []

  for (i = 1; i <= (row * cols) / 2; i += 1) {
    arr.push(i)
    arr.push(i)
  }
  for (i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}
