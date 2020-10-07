import Component from '../Component';

/* 템플릿 ---------------------------------------------------------------------- */

const templateSearchForm = /* html */ `
  <form class="news__press-form" action="#" method="GET">
    <fieldset>
      <legend>{legend}</legend>
      <div class="press-search-container">
        <select name="newSelect" id="newsSelect" aria-label="{selectLabel}">
          {selectOptions}
        </select>
        <div class="keyword-container">
          <input type="search" name="newsKeyword" id="newsKeyword" class="keyword" placeholder="{placeholder}" aria-required="true" aria-label="{inputLabel}" />
        </div>
        <button type="submit" class="button-search" aria-label="{buttonLabel}"><span class="icon-search"></span></button>
      </div>
    </fieldset>
  </form>
`;

const templateOptions = /* html */ `<option value="{option.value}">{option.text}</option>`;

/**
 * 검색 폼 컴포넌트
 * @class
 * @extends Component
 */
class SearchForm extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(options) {
    super();

    this.isRendered = false;
    this.renderCode = '';

    this._init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static defaultOptions = {
    legend: '언론 속 이디야 검색',
    selectLabel: '검색 범위 선택',
    inputLabel: '검색어',
    buttonLabel: '검색',
    selectOptions: [ { value: 'title', text: '제목' } ],
    placeholder: '검색어 입력(예: 이디야)',
  };

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _init(options) {
    const { mixins, defaultOptions } = SearchForm;

    // 옵션 설정(객체 합성)
    this.options = mixins(defaultOptions, options);
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  render() {
    const { legend, selectLabel, inputLabel, buttonLabel, placeholder } = this.options;

    // 캐싱
    if (!this.isRendered) {
      let template = templateSearchForm;

      template = template.replace(/{legend}/g, legend);
      template = template.replace(/{selectLabel}/g, selectLabel);
      template = template.replace(/{inputLabel}/g, inputLabel);
      template = template.replace(/{buttonLabel}/g, buttonLabel);
      template = template.replace(/{placeholder}/g, placeholder);

      const selectOptionsCode = this.renderSelectOptions();
      template = template.replace(/{selectOptions}/g, selectOptionsCode);

      this.isRendered = true;
      this.renderCode = template.trim();
    }

    return this.renderCode;
  }

  renderSelectOptions() {
    const { selectOptions: options } = this.options;

    const optionsCode = options.map((option) =>
      templateOptions
        .replace(/{option.value}/g, option.value)
        .replace(/{option.text}/g, option.text)
    );

    return optionsCode.join('');
  }

  onSearch(callback) {
    const { getNode, on } = SearchForm;

    // DOM 노드 참조
    const form = getNode('form.news__press-form');
    const select = getNode('select', form);
    const input = getNode('input[type="search"]', form);
    const button = getNode('button[type="submit"]', form);

    // 이벤트 연결
    on(button, 'click', (e) => callback(select.value, input.value, e));
  }
}

export default SearchForm;
