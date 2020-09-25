;(function signUpVideo(global) {
  'use strict'

  /**
    제가 생각한 시나리오는 일단
    자바스크립트로 뷰포트 높이를 구한다.
    그 높이에서 푸터 높이를 뺀다
    연산한 값을 hegith에 할당한다. 
    height에 할당한 값을 기준으로 너비를 구한다. (px로 )
    그렇게 구한 값을 width에 할당한다.
   */

  const viewportHeight = global.innerHeight
  const appFooterHeight = document.querySelector('.app-footer').getBoundingClientRect().height
  const wishVideoContainerHeight = viewportHeight - appFooterHeight

  console.log(wishVideoContainerHeight)

  const videoContaier = document.querySelector('.bg-video-container')
  const video = videoContaier.querySelector('video')
  const videoRatio = video.clientWidth / video.clientHeight

  function renderVideoRatio() {
    videoContaier.style.height = wishVideoContainerHeight + 'px'
    videoContaier.style.width = wishVideoContainerHeight * videoRatio + 'px'
  }

  global.addEventListener('resize', renderVideoRatio)
  global.addEventListener('DOMContentLoaded', renderVideoRatio)
})(window)
