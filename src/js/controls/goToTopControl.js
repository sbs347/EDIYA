import { el } from '../utils/dom';
import GoToTop from '../components/goToTop/GoToTop';

/* -------------------------------------------------------------------------- */

// 초기화 함수
function init() {
  // 문서 객체 참조
  const appHeader = el('.app-header');

  // 페이지 상단 이동 버튼 컴포넌트 생성
  new GoToTop({
    // 목표 높이 설정
    targetTop: appHeader.getBoundingClientRect().bottom,
  });
}

// 문서 콘텐츠가 로딩되면 `초기화` 실행
window.addEventListener('DOMContentLoaded', init);
