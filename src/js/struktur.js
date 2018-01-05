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

let img = document.createElement('img')
img.setAttribute('src', '../image/0.png')
img.setAttribute('alt', 'A memory brick')
img.addEventListener('focusin', WindowFocusin)
img.addEventListener('focusout', WindowFocusout)

anchor.appendChild(img)
