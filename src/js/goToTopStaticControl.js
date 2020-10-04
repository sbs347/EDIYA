import { el } from './utils/dom'

(function buttonGoToTop() {
  'use strict';

  /**
   * GoToTop 버튼 상태(state)
   * @constant
   */
  var STATE = {
    activeClass: 'is--active',
    scrollMoving: 'smooth',
  };

  /**
   * 문서 객체(요소) 참조 변수
   * @variables
   */
  var button_GoToTop = null;
  var appHeaderContainer = null;
  // 목표 위치 변수
  var targetTop = 0;

  /**
   * GoToTop 버튼 초기화
   * @function
   */
  function init() {
    // 문서 객체(요소) 참조
    button_GoToTop = el('.button-goToTop');
    appHeaderContainer = el('.app-header-container');
    // 목표 위치 설정
    targetTop = appHeaderContainer.getBoundingClientRect().bottom;
    // 이벤트 핸들링(핸들러 연결)
    bindEvents();
  }

  /**
   * 이벤트 핸들링(이벤트 핸들러 연결)
   * @function
   */
  function bindEvents() {
    // 스크롤 이벤트 핸들링
    window.addEventListener('scroll', handleDisplayButtonGotoTop);
    // 클릭 이벤트 핸들링
    button_GoToTop.addEventListener('click', handleGoToTop);
  }

  /**
         * 이벤트 핸들러 - 조건에 따라 GoToTop 버튼 표시
         * @function
         */
  function handleDisplayButtonGotoTop(e) {
    // 브라우저 창 스크롤 Y축 위치
    var scrollTop = window.scrollY;
    // 조건 처리
    if (scrollTop > targetTop) {
      // 목표 위치보다 스크롤 위치가 클 경우
      // 활성 클래스 이름 추가
      button_GoToTop.classList.add(STATE.activeClass);
    }
    else {
      // 목표 위치보다 스크롤 위치가 작을 경우
      // 활성 클래스 이름 제거
      button_GoToTop.classList.remove(STATE.activeClass);
    }
  }

  /**
   * 이벤트 핸들러 - GoToTop 버튼 클릭 시, 페이지 상단 이동
   * @function
   */
  function handleGoToTop() {
    // 목표 위치까지 스크롤링(애니메이션 설정 가능)
    appHeaderContainer.scrollIntoView({ behavior: STATE.scrollMoving });
  }

  // 문서 콘텐츠 로드에 성공할 경우, GoToTop 버튼 인터랙션 초기화
  window.addEventListener('DOMContentLoaded', init);
})();
