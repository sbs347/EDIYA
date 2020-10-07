import { el } from '../utils/dom';
import fetchData from '../utils/fetchData';
import CardList from '../components/card/CardList';

/* -------------------------------------------------------------------------- */

// 설정 변수
const apiAddress = 'https://seulbinim.github.io/EDIYA/api/beverages.json';

// DOM 참조 변수
let ediyaMenuList = null;

// 초기화 함수
function init() {
  // 문서 객체 참조
  ediyaMenuList = el('.ediya-menu');

  // 비동기 통신 요청
  fetchData(
    // API 설정
    apiAddress,
    // 통신 성공 시, 콜백
    (json) => render(json.data)
  );
}

// 렌더링
function render(beverages) {
  // 카드 리스트 생성
  new CardList(
    /* 카드 리스트 컴포넌트로 설정한 DOM 노드 */
    ediyaMenuList,
    /* 옵션 설정 */
    {
      list: beverages,
      templateId: '#template-ediya-menu__item',
    }
  );
}

// 문서 콘텐츠가 로딩되면 `초기화` 실행
window.addEventListener('DOMContentLoaded', init);
