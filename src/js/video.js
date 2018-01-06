module.exports = {
  startVideo: startVideo
}
function startVideo () {
// Grab elements, create settings, etc.
  var video = document.getElementById('video')

// access camera, microphone and loudspeakers
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  }
}
