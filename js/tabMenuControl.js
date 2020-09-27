;(function tabMenuControl() {
  'use strict'

  var location = window.location
  var activeClass = 'is--selected'
  var newsTabMenu = null
  var newsContents = []

  function init() {
    // 뉴스 탭 메뉴 찾기
    newsTabMenu = document.querySelector('.news-tab')
    // 뉴스 콘텐츠 수집(배열화)
    newsContents = Array.from(document.querySelectorAll('.news'))

    // 이벤트 연결
    bindEvents()

    // 페이지 로딩 시, 해시 값 분석
    handleAnalysisHash()
  }

  function bindEvents() {
    newsTabMenu.addEventListener('click', handleTabClick)
    window.addEventListener('hashchange', handleAnalysisHash)
  }

  function handleTabClick(e) {
    var target = e.target
    if (target.nodeName === 'A') {
      renderTab(target)
    }
  }

  function renderTab(target) {
    var activatedTab = newsTabMenu.querySelector('[aria-selected="true"]')
    activatedTab && activatedTab.setAttribute('aria-selected', false)
    target && target.setAttribute('aria-selected', true)
  }

  function handleAnalysisHash() {
    var hash = location.hash
    switch (hash) {
      case '#notice':
        render('.ediya-notice')
        break
      case '#awards':
        render('.ediya-award')
        break
      case '#promotion':
        render('.ediya-video')
        break
      case '#press':
      default:
        location.hash = 'press'
        render('.ediya-media')
    }
  }

  function render(visibleSelector) {
    var visibleContent = document.querySelector(visibleSelector)
    var actibatedContent = findNewsContent(newsContents, activeClass)
    actibatedContent && actibatedContent.classList.remove(activeClass)

    visibleContent.classList.add(activeClass)

    renderTab(document.querySelector('a[href="' + location.hash + '"]'))
  }

  function findNewsContent(contents, activeSelector) {
    return contents.find(function(content) {
      return content.classList.contains(activeSelector)
    })
  }

  // DOM 콘텐츠가 준비되면 init() 실행
  window.addEventListener('DOMContentLoaded', init)
})()
