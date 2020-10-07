import ellipsisText from '../../utils/ellipsisText';
import Component from '../Component';
import SearchForm from './SearchForm';
import Pagination from './Pagination';

import ediyaTableThumbImgPath from '../../../images/ediya-table-thumb.jpg';

/* 템플릿 ---------------------------------------------------------------------- */

// 테이블
const templateTable = /*html*/ `
  <div class="news__press-container">
    {searchForm}
    <table class="news__press-table">
      <caption class="a11y-hidden">{caption}</caption>
      <colgroup>
        {tableCols}
      </colgroup>
      <thead>
        <tr>
          {tableHeaders}
        </tr>
      </thead>
      <tbody>{tableDatas}</tbody>
    </table>
  </div>
`;

// 테이블 셀 제목 (반복 처리)
const templateTableHeader = /*html*/ `<th scope="col">{header}</th>`;

// 테이블 셀 내용 (반복 처리)
const templateTableData = /*html*/ `
  <tr>
    <td>{data.no}</td>
    <td>
      <a class="press-link" href="{data.link}" target="_blank" rel="noopener noreferrer">
        <figure class="press-thumbnail">
          <img src="{data.image}" alt="" />
        </figure>
        <dl class="press-article">
          <dt>{data.title}</dt>
          <dd>{data.content}</dd>
        </dl>
      </a>
    </td>
    <td><time class="press-date" datetime="{data.publishedAt}T17:30:45">{data.publishedAt}</time></td>
  </tr>
`;

// 테이블 빈 셀 내용
const templateTableBlankData = /*html */ `
  <tr>
    <td><div class="blank" role="none"></div></td>
    <td><div class="blank" role="none"></div></td>
    <td><div class="blank" role="none"></div></td>
  </tr>
`;

/* 지역 변수, 함수 ---------------------------------------------------------------- */

const ORIGINAL_TEXT_KEY = 'data-original-text';

// 텍스트 벡업
function backupText(pressArticles) {
  pressArticles.forEach((article) => {
    let title = article.querySelector('dt');
    let desc = article.querySelector('dd');
    title.setAttribute(ORIGINAL_TEXT_KEY, title.textContent);
    desc.setAttribute(ORIGINAL_TEXT_KEY, desc.textContent);
  });
}

// 텍스트 복구
function restoreText(titleEl, descEl) {
  if (titleEl.getAttribute(ORIGINAL_TEXT_KEY)) {
    titleEl.textContent = titleEl.getAttribute(ORIGINAL_TEXT_KEY);
    descEl.textContent = descEl.getAttribute(ORIGINAL_TEXT_KEY);
  }
}

// 텍스트 드로잉
function drawText(pressArticles, settingEllipsis, isMobile) {
  pressArticles.forEach((article) => {
    let title = article.querySelector('dt');
    let desc = article.querySelector('dd');

    if (isMobile) {
      title.textContent = ellipsisText(title.textContent, settingEllipsis.mobile.title);
      desc.textContent = ellipsisText(desc.textContent, settingEllipsis.mobile.desc);
    }
    else {
      restoreText(title, desc);
      title.textContent = ellipsisText(title.textContent, settingEllipsis.desktop.title);
      desc.textContent = ellipsisText(desc.textContent, settingEllipsis.desktop.desc);
    }
  });
}

function handleResize(e) {
  const { innerWidth: viewportWidth } = window;
  const { breakpoint, settingEllipsis } = this.options;
  const { pressArticles } = this;

  viewportWidth >= breakpoint
    ? drawText(pressArticles, settingEllipsis)
    : drawText(pressArticles, settingEllipsis, 'mobile');
}

/**
 * 데이터 테이블 컴포넌트
 * @class
 * @extends Component
 */
class DataTable extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(containerNode, options) {
    super();

    if (!containerNode || containerNode.nodeType !== 1) {
      throw new Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.container = containerNode;

    this.component = null;
    this.searchFormAndTable = null;
    this.searchForm = null;
    this.tableColsCode = null;
    this.tableHeadersCode = null;
    this.pressArticles = null;

    // 컴포넌트 상태
    this.state = {
      data: [],
      filteredData: [],
      currentPage: 1,
      displayItemCount: 1,
      totalItemCount: 1,
    };

    // 컴포넌트 초기화
    this._init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static defaultOptions = {
    data: [],
    current: 1,
    displayItemCount: 5,
    caption: '',
    headers: [],
    selectOptions: [],

    // 설정 옵션
    breakpoint: 768,
    settingEllipsis: {
      desktop: {
        title: 30,
        desc: 60,
      },
      mobile: {
        title: 18,
        desc: 32,
      },
    },
  };

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */
  _init(options) {
    const { mixins, defaultOptions } = DataTable;

    // 옵션 설정(객체 합성)
    this.options = mixins(defaultOptions, options);

    const { data, current, displayItemCount } = this.options;

    // 상태 업데이트
    this.setState({
      data: data.reverse(),
      totalItemCount: data.length,
      filteredData: [],
      currentPage: current,
      displayItemCount,
    });

    this.render();
  }

  _bindEvents() {
    const { attr, hasClass, on, off } = DataTable;

    // 검색 시 처리할 동작
    this.searchForm.onSearch((category, keyword) => this.renderSearchResult(category, keyword));

    // 페이지네이션 버튼 클릭 시 처리할 동작
    this.pagination.onClick((
      /* 페이지네이션 상태(paginationState) */
      { currentPage, previousPage, nextPage },
      /* 이벤트 객체 */
      e
    ) => {
      const { target } = e;
      const targetTagName = target.nodeName.toLowerCase();

      switch (targetTagName) {
        case 'button':
          // 버튼에 disabled 속성이 없을 경우
          if (!attr(target, 'disabled')) {
            // 이전 또는 다음 페이지를 현재 페이지로 설정
            currentPage = hasClass(target, 'button-prev') ? previousPage : nextPage;
          }
          break;

        case 'a':
          e.preventDefault();
          currentPage = Number(target.textContent);
          break;

        default:
        // svg, button, a가 아닌 다른 요소를 클릭한 경우 무시
      }

      // 렌더링
      this.render(currentPage);
    }, true);

    // 이전 연결된 이벤트 헨들러 제거
    off(window, 'resize', handleResize.bind(this));

    // 다시 이벤트 핸들러 설정
    on(window, 'resize', handleResize.bind(this));
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  // 테이블 컴포넌트 렌더링
  render(current) {
    // 이전 렌더 결과 제거
    this.removeRendered();

    // ----------------------------------------------------------------------------

    // 검색 폼 + 테이블 렌더링
    this.renderSearchFormAndTable(current);

    // 페이지네이션 렌더링
    this.renderPagination();

    // 컨테이너 DOM 요소에 검색 폼 + 테이블, 페이지네이션 삽입
    this.appendDOM();

    // ----------------------------------------------------------------------------

    // 반응형 텍스트 줄임(ellipsis) 처리
    this.responsiveEllipsisText();

    // 이벤트 연결
    this._bindEvents();
  }

  // 검색 폼 + 테이블 렌더링
  renderSearchFormAndTable(current) {
    let template = templateTable;

    // 검색 폼 렌더링
    template = template.replace(/{searchForm}/, this.renderSearchForm());

    // 테이블 캡션 렌더링
    template = template.replace(/{caption}/, this.renderTableCaption());

    // 테이블 콜(col) 렌더링
    template = template.replace(/{tableCols}/, this.renderTableCols());

    // 테이블 셀 헤더(th) 렌더링
    template = template.replace(/{tableHeaders}/, this.renderTableHeaders());

    // 현재 페이지에 렌더링 할 아이템 필터링 후,
    // 테이블 셀 내용(td) 렌더링
    template = template.replace(
      /{tableDatas}/,
      this.renderTableDatas(this.renderFiltered(current))
    );

    this.searchFormAndTable = template;
  }

  // 현재 페이지에 렌더링 할 데이터 필터링
  renderFiltered(current) {
    let filteredItems = [];

    // CASE 1. current 값이 undefined인 경우
    if (!current) {
      current = this.state.currentPage;
    }

    // CASE 2. current 값이 숫자인 경우
    if (typeof current === 'number') {
      filteredItems = this.filterCurrentItems(current);

      // 상태 업데이트
      this.setState({ currentPage: current });
    }

    // CASE 3. current 값이 배열인 경우 (검색)
    if (Array.isArray(current)) {
      filteredItems = current; // 검색 필터링 된 아이템 배열(searchedItems)
      current = 1;

      // 상태 업데이트
      this.setState({
        currentPage: current,
        filteredData: filteredItems,
        totalItemCount: filteredItems.length,
      });

      filteredItems = this.filterCurrentItems(current, filteredItems);
    }

    return filteredItems;
  }

  // 검색 폼 렌더링
  renderSearchForm() {
    // 캐싱
    if (!this.searchForm) {
      this.searchForm = new SearchForm({ selectOptions: this.options.selectOptions });
    }

    return this.searchForm.render();
  }

  // 테이블 캡션 렌더링
  renderTableCaption() {
    return this.options.caption;
  }

  // 테이블 셀 헤더 개수만큼 콜(col) 렌더링
  renderTableCols() {
    const { headers } = this.options;

    // 캐싱
    if (!this.tableColsCode) {
      const colsCode = headers.map(() => '<col />').join('');
      this.tableColsCode = colsCode;
    }

    return this.tableColsCode;
  }

  // 테이블 셀 헤더(th) 렌더링
  renderTableHeaders() {
    const { headers } = this.options;

    // 캐싱
    if (!this.tableHeadersCode) {
      const headersCode = headers
        .map((header) => templateTableHeader.replace(/{header}/g, header))
        .join('');

      this.tableHeadersCode = headersCode;
    }

    return this.tableHeadersCode;
  }

  // 테이블 셀 내용(td) 렌더링
  renderTableDatas(data) {
    const { displayItemCount } = this.options;

    let tableDatasCode = '';

    tableDatasCode = data.map((
      /* data */
      { no, link, image, title, content, publishedAt }
    ) => {
      let template = templateTableData;

      template = template.replace(/{data.no}/g, no);
      template = template.replace(/{data.link}/g, link);
      template = template.replace(/{data.image}/g, image || ediyaTableThumbImgPath);
      template = template.replace(/{data.title}/g, title);
      template = template.replace(/{data.content}/g, content);
      template = template.replace(/{data.publishedAt}/g, publishedAt);

      return template.trim();
    });

    // 테이블 데이터(td) 개수가 표시될 개수보다 작을 경우
    if (tableDatasCode.length < displayItemCount) {
      const loopCount = displayItemCount - tableDatasCode.length;
      const blankTableDatasCode = templateTableBlankData.repeat(loopCount);

      tableDatasCode.push(blankTableDatasCode);
    }

    return tableDatasCode.join('');
  }

  // 페이지네이션 렌더링
  renderPagination() {
    const { currentPage: current, displayItemCount, totalItemCount } = this.state;

    this.pagination = new Pagination({
      current,
      displayItemCount,
      totalItemCount,
    });
  }

  // 컨테이너 DOM 요소에 테이블, 페이지네이션 삽입
  appendDOM() {
    const { append, getNode, getNodeList } = DataTable;
    const { container, searchFormAndTable, pagination } = this;

    // 컨테이너 안에 테이블 템플릿 삽입
    append(container, searchFormAndTable);
    // 페이지네이션 삽입
    append(getNode('.news__press-container', container), pagination.render());
    // pressArticles 참조
    this.pressArticles = Array.from(getNodeList('.press-article', container));
  }

  // 반응형 텍스트 줄임(ellipsis) 처리
  responsiveEllipsisText() {
    // 초기 텍스트 백업
    backupText(this.pressArticles);
    // handleResize 함수의 this 참조로 DataTable 인스턴스 설정
    handleResize.call(this);
  }

  // 입력된 검색어 처리 후 렌더링
  renderSearchResult(category, keyword) {
    // 입력된 검색어(카테고리, 키워드)를 통해 데이터 필터링
    const searchedItems = this.searchKeywordItems(category, keyword);

    // 렌더링
    this.render(searchedItems);
  }

  // 입력된 검색어(카테고리, 키워드)를 통해 데이터 필터링
  searchKeywordItems(category, keyword) {
    const { data } = this.options;

    // 키워드가 빈 공백일 경우, 데이터 그대로 반환
    if (keyword.trim().length === 0) return data;

    // 키워드가 있을 경우, 데이터 필터링 하여 반환
    return data.filter((item) => item[category].match(new RegExp(keyword, 'ig')));
  }

  filterCurrentItems(current, data) {
    const { data: optionData, displayItemCount } = this.options;

    data = data || optionData;

    const currentIndex = current - 1;
    const startIndex = currentIndex > 0 ? displayItemCount * currentIndex : 0;

    let endIndex = startIndex + displayItemCount - 1;
    let dataLength = data.length;

    endIndex = endIndex >= dataLength ? dataLength - 1 : endIndex;

    // 현재 페이지 아이템 필터링
    return data.filter((item, index) => index >= startIndex && index <= endIndex);
  }

  // 렌더링 된 데이터 테이블 제거
  removeRendered() {
    const { getNode } = DataTable;
    const oldPressTableContailerEl = getNode('.news__press-container', this.container);

    oldPressTableContailerEl && oldPressTableContailerEl.remove();
  }
}

export default DataTable;
