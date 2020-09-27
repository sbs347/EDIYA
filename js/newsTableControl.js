;(function newsTableControls() {
  'use strict'

  var table = null
  var mediaContents = null
  var breakpoint = 768
  var settingEllipsis = {
    desktop: {
      title: 30,
      desc: 60,
    },
    mobile: {
      title: 18,
      desc: 32,
    },
  }

  function init() {
    table = document.querySelector('.ediya-media-news')
    mediaContents = Array.from(table.querySelectorAll('.media-content'))

    mediaContents.forEach(function(content) {
      var title = content.querySelector('dt')
      var desc = content.querySelector('dd')

      title.setAttribute('data-orginal-text', title.textContent)
      desc.setAttribute('data-orginal-text', desc.textContent)
    })

    handleResize()

    window.addEventListener('resize', handleResize)
  }

  function handleResize() {
    if (window.innerWidth >= breakpoint) {
      render()
    }
    else {
      render('mobile')
    }
  }

  function render(isMobile) {
    mediaContents.forEach(function(content) {
      var title = content.querySelector('dt')
      var desc = content.querySelector('dd')

      if (isMobile) {
        renderEllipseText(title, settingEllipsis.mobile.title)
        renderEllipseText(desc, settingEllipsis.mobile.desc)
      }
      else {
        if (title.getAttribute('data-orginal-text')) {
          title.textContent = title.getAttribute('data-orginal-text')
          desc.textContent = desc.getAttribute('data-orginal-text')
        }
        renderEllipseText(title, settingEllipsis.desktop.title)
        renderEllipseText(desc, settingEllipsis.desktop.desc)
      }
    })
  }

  function renderEllipseText(el, limitCount) {
    var text = el.textContent

    if (text.length > limitCount) {
      var slicedText = text.slice(0, limitCount - 1)
      el.textContent = slicedText + '...'
    }
  }

  // 초기화 실행
  window.addEventListener('DOMContentLoaded', init)
})()
