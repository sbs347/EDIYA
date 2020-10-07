import { el } from '../utils/dom';

/* 지역 변수 -------------------------------------------------------------------- */

// 로컬라이제이션
const storage = window.localStorage;

// 스토리지 키
const STORAGE_KEY = 'confirm-esc-key-toggle-video-noti';

// DOM 객체 참조 변수
let video = null;

// 알림(Notification) 설정 옵션
const notiConfig = {
  elNode: null,
  style: `
    position: fixed; 
    z-index: 100; 
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
  `,
};

/* 함수 ----------------------------------------------------------------------- */

/**
 * 초기 실행
 * @function
 */
function init() {
  // 비디오 객체 참조
  video = el('video');

  // 이벤트 연결
  bindEvents();

  // 알림(Noti) 생성
  createNoti();

  // 로컬 스토리지 확인 후, 조건에 따라 알림(Noti) 표시 설정
  checkStorageAndNotify();
}

/**
 * 스토리지 확인 후, 조건에 따라 알림 표시
 * @function
 */
function checkStorageAndNotify() {
  storage.getItem(STORAGE_KEY) || showNoti();
}

/**
 * 이벤트 연결
 * @function
 */
function bindEvents() {
  window.addEventListener('keyup', handleKeyUp);
}

/**
 * 키업 이벤트 핸들러
 * @function
 * @param {EventObject} e 이벤트 객체
 */
function handleKeyUp(e) {
  if (e.key.toLowerCase() === 'escape') {
    // 비디오 재생, 일시정지 토글
    video.paused ? video.play() : video.pause();
  }
}

/**
 * 알림(Noti) 생성
 * @function
 */
function createNoti() {
  const { style, content, confirmButtonStyle } = notiConfig;

  document.body.insertAdjacentHTML(
    'afterbegin',
    /*html*/ `
    <div class="noti-video-control" style="${style}">
      ${content}
      <button type="button" style="${confirmButtonStyle}">확인</button>
    </div>`
  );

  notiConfig.elNode = document.querySelector('.noti-video-control');
  notiConfig.confirmButton = notiConfig.elNode.querySelector('button');
}

/**
 * 알림(Noti) 표시
 * @function
 */
function showNoti() {
  window.setTimeout(function() {
    notiConfig.elNode.style.right = '30px';
    notiConfig.confirmButton.addEventListener('click', saveStorage);
  });

  // 자동 감춤 설정
  if (notiConfig.autoHide) {
    window.setTimeout(hideNoti, notiConfig.hideTime);
  }
}

/**
 * 알림(Noti) 감춤
 * @function
 */
function hideNoti() {
  const { elNode } = notiConfig;
  elNode.style.transition = 'all 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)';
  elNode.style.transform = 'scale(0)';
}

/**
 * 스토리지에 키 저장
 * @function
 */
function saveStorage() {
  storage.setItem(STORAGE_KEY, true);
  hideNoti();
}

// DOM 콘텐츠가 준비되면 `초기화` 실행
window.addEventListener('DOMContentLoaded', init);
