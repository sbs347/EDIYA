;(function signUpVideo(global) {
  'use strict'

  const videoContaier = document.querySelector('.bg-video-container')
  const video = videoContaier.querySelector('video')
  const appMain = document.querySelector('.app-main')

  function renderVideoRatio() {
    const videoRatio = video.clientHeight / video.clientWidth
    const appMainRatio = appMain.clientHeight / appMain.clientWidth

    if (videoRatio >= appMainRatio) {
      videoContaier.style.width = '110vw'
      videoContaier.style.height = 'auto'
    }
    else {
      videoContaier.style.width = '2000px'
      videoContaier.style.height = 'auto'
    }
  }

  global.addEventListener('resize', renderVideoRatio)
  global.addEventListener('DOMContentLoaded', renderVideoRatio)
})(window)
