import DataTable from '../components/dataTable/DataTable';
import fetchData from '../utils/fetchData';

/* -------------------------------------------------------------------------- */

const apiAddress = 'https://seulbinim.github.io/EDIYA/api/press.json';
let dataTableContainer = null;

// 초기화 함수
function init() {
  dataTableContainer = document.querySelector('#newsPanel02');
  fetchData(
    //
    apiAddress,
    //
    // 테이블 렌더링
    ({ data: tableData }) => renderDataTable(tableData)
  );
}

function renderDataTable(tableData) {
  // 데이터 테이블 컴포넌트 생성(렌더링)
  new DataTable(dataTableContainer, {
    data: tableData,
    displayItemCount: 5,
    current: 1,
    caption: '이디야 소식 안내',
    headers: '순서, 내용, 날짜'.split(', '),
    selectOptions: [
      { value: 'title', text: '제목' },
      { value: 'content', text: '내용' },
      // { value: 'test', text: '테스트' },
    ],
  });
}

// DOM 콘텐츠가 준비되면 `초기화` 실행
window.addEventListener('DOMContentLoaded', init);
