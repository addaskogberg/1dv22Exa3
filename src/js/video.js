module.exports = {
  startVideo: startVideo,
  stopVideo: stopVideo
}
var videoStream
var video = document.getElementById('video')
function startVideo () {
// access camera, microphone and loudspeakers, WEBRTC
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
      videoStream = stream
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  }
}
// stop video and audio
function stopVideo () {
  let tracks = videoStream.getTracks()
  tracks.forEach(function (track) {
    track.stop()
  })
  video.srcObject = null
}
