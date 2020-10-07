import { el } from '../utils/dom';
import fetchData from '../utils/fetchData';
import Navigation from '../components/navigation/Navigation';

/* -------------------------------------------------------------------------- */

const apiAddress = 'https://seulbinim.github.io/EDIYA/api/navigation.json';

// DOM 참조 변수
let appNavigationNode = null;
let openButtonNode = null;

// 초기화 함수
function init() {
  // 문서 객체 참조
  appNavigationNode = el('.app-navigation');
  openButtonNode = el('.button.is-open-menu');

  // 비동기 통신 요청
  fetchData(
    // API 설정
    apiAddress,
    // 통신 성공 시, 콜백
    ({ data: navigationList }) => {
      new Navigation(appNavigationNode, {
        list: navigationList,
        templateId: '#template-navigation-list',
        openButton: openButtonNode,
      });
    }
  );
}

// 문서 콘텐츠가 로딩되면 `초기화` 실행
window.addEventListener('DOMContentLoaded', init);
