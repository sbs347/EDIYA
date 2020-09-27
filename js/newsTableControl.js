;(function newsTableControls() {
  'use strict'

  /* 지역 변수 -------------------------------------------------------------------- */
  
  // DOM 객체 참조 변수
  var table = null
  var mediaContents = null

  // 설정 옵션
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

  /* 함수 ----------------------------------------------------------------------- */

  /**
   * 초기 실행
   * @function
   */
  function init() {
    table = document.querySelector('.ediya-media-news')
    mediaContents = Array.from(table.querySelectorAll('.media-content'))

    backupContents()
    bindEvents()
  }

  /**
   * 이벤트 연결
   * @function
   */
  function bindEvents() {
    handleResize()
    window.addEventListener('resize', handleResize)
  }

  /**
   * 개별 뉴스 콘텐츠 초기 텍스트 값 저장
   * @function
   */
  function backupContents() {
    mediaContents.forEach(function(content) {
      var title = content.querySelector('dt')
      var desc = content.querySelector('dd')

      title.setAttribute('data-original-text', title.textContent)
      desc.setAttribute('data-original-text', desc.textContent)
    })
  }

  /**
   * 개별 뉴스 콘텐츠 초기 텍스트 값으로 복구
   * @function
   * @param {HTMLDtElement} title <dt> 요소
   * @param {HTMLDdElement} desc <dd> 요소
   */
  function restoreContent(title, desc) {
    if (title.getAttribute('data-original-text')) {
      title.textContent = title.getAttribute('data-original-text')
      desc.textContent = desc.getAttribute('data-original-text')
    }
  }

  /**
   * 리사이즈 이벤트 핸들러
   * @function
   */
  function handleResize() {
    if (window.innerWidth >= breakpoint) { render() }
    else { render('mobile') }
  }

  /**
   * UI 렌더링
   * @function
   * @param {Boolean} isMobile 모바일 환경 유무
   */
  function render(isMobile) {
    mediaContents.forEach(function(content) {
      var title = content.querySelector('dt')
      var desc = content.querySelector('dd')

      if (isMobile) {
        renderEllipseText(title, settingEllipsis.mobile.title)
        renderEllipseText(desc, settingEllipsis.mobile.desc)
      }
      else {
        restoreContent(title, desc)
        renderEllipseText(title, settingEllipsis.desktop.title)
        renderEllipseText(desc, settingEllipsis.desktop.desc)
      }
    })
  }

  /**
   * 텍스트 생략 처리
   * @function
   * @param {HTMLElement} el <dt> 또는 <dd> 요소
   * @param {Number} limitCount 제한 개수
   */
  function renderEllipseText(el, limitCount) {
    var text = el.textContent

    if (text.length > limitCount) {
      var slicedText = text.slice(0, limitCount - 1)
      el.textContent = slicedText + '...'
    }
  }

  // DOM 콘텐츠가 준비되면 init() 실행
  window.addEventListener('DOMContentLoaded', init)
})()
