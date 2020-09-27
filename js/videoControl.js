;(function videoControl() {
  'use strict'

  var video = null
  var noti = null

  var noti = {
    elNode: null,
    style: `
      position: fixed; 
      z-index: 10000; 
      top: 80px; 
      right: -50vw; 
      width: 210px; 
      padding: 1.2rem; 
      line-height: 1.5; 
      background: rgba(0,0,0,0.3); 
      color: #fff; 
      font-size: 12px; 
      border-radius: 4px; 
      backdrop-filter: blur(10px); 
      transition: all 1.4s cubic-bezier(0.62,-0.27,0.26,1.07);
    `,
    content: 'ESC 키를 누르면 비디오를 일시정지 하거나, 다시 재생할 수 있습니다.',
    hideTime: 4000,
    autoHide: false,
    confirmButton: null,
    confirmButtonStyle: `
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      border: 0;
      width: 100%;
      padding: 0.8em 0;
      line-height: 1;
      background: #101010;
      color: #fff;
    `
  }

  function init() {
    video = document.querySelector('video')

    bindEvents()

    if (!window.localStorage.getItem('confirm-esc-key-toggle-video-noti')) {
      showNoti()
    }
  }

  function bindEvents() {
    window.addEventListener('keyup', handleKeyUp)
  }

  function handleKeyUp(e) {
    if (e.key.toLowerCase() === 'escape') {
      video.paused ? video.play() : video.pause()
    }
  }

  function showNoti() {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div class="noti-video-control" style="' + noti.style + '">' + noti.content + '<button type="button" style="'+ noti.confirmButtonStyle +'">확인</button></div>'
    )

    window.setTimeout(function() {
      noti.elNode = document.querySelector('.noti-video-control')
      noti.confirmButton = noti.elNode.querySelector('button')

      noti.elNode.style.right = '30px'

      noti.confirmButton.addEventListener('click', saveStorage)
    })

    if (noti.autoHide) {
      window.setTimeout(hideNoti, noti.hideTime)
    }
  }

  function hideNoti() {
    noti.elNode.style.transition = 'all 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)'
    noti.elNode.style.transform = 'scale(0)'
  }

  function saveStorage() {
    window.localStorage.setItem('confirm-esc-key-toggle-video-noti', true)
    hideNoti()
  }

  window.addEventListener('DOMContentLoaded', init)
})()
