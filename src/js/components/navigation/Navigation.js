import Component from '../Component';
import NavigationItem from './NavigationItem';

/**
 * 앱 내비게이션 컴포넌트
 * @class
 * @extends Component
 */
class Navigation extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(navigationNode, options) {
    super();

    if (!navigationNode || navigationNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.component = navigationNode;
    this.openButton = null;
    this.closeButton = null;

    options && this._init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static defaultOptions = {
    list: [],
    openMen: null,
    breakpoint: 768,
    templateId: '#template-id',
    activeClass: 'is-active',
  };

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _init(options) {
    const { mixins, defaultOptions } = Navigation;

    // 옵션 설정 (객체 병합)
    this.options = mixins(defaultOptions, options);

    this.render();
    this.renderingDevice();
  }

  _bindEvents() {
    const { getNode, on } = Navigation;

    this.openButton = this.options.openButton;
    this.closeButton = getNode('.button.is-close-menu', this.component);

    on(this.openButton, 'click', this.open.bind(this));
    on(this.closeButton, 'click', this.close.bind(this));
    on(window, 'resize', this.renderingDevice.bind(this));
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  render() {
    const { getNode } = Navigation;
    const { list: listData } = this.options;
    const navigationItemsCode = listData.map(this.renderItemFromData.bind(this)).join('');

    getNode('ul', this.component).innerHTML = navigationItemsCode;

    this._bindEvents();
    this.a11y();
  }

  renderingDevice() {
    const { show } = Navigation;
    const { innerWidth: viewportWidth } = window;
    const { breakpoint } = this.options;

    viewportWidth >= breakpoint && show(this.component);
  }

  renderItemFromData(itemData) {
    const itemComponent = new NavigationItem(itemData, this.options.templateId);
    return itemComponent.render();
  }

  open() {
    const { show, attr, delay, addClass } = Navigation;
    const { component, openButton, options } = this;

    show(component);
    attr(openButton, 'disabled', 'disabled');

    delay(addClass(component, options.activeClass, 10));
  }

  close() {
    const { removeClass, delay, hide, removeAttr } = Navigation;
    const { component, openButton, options } = this;

    removeClass(component, options.activeClass);

    delay(() => {
      hide(component);
      removeAttr(openButton, 'disabled');
    }, 400);
  }

  a11y() {
    const { innerWidth: viewportWidth } = window;
    const { getNodeList, on } = Navigation;
    const { breakpoint } = this.options;
    const { component } = this;

    const nav_focusables = getNodeList('a, button', component);
    const nav_focusable_first = nav_focusables[0];
    const nav_focusable_last = nav_focusables[nav_focusables.length - 1];

    const escCloseMenu = (e) => {
      // 모바일 환경에서만 작동되도록 조건 처리
      if (e.keyCode === 27 && viewportWidth < breakpoint) {
        this.close();
      }
    };

    const navFirstFocus = (e) => {
      if (!e.shiftKey && e.keyCode === 9 /* Tab */) {
        e.preventDefault();
        nav_focusable_first.focus();
      }
    };

    const navLastFocus = (e) => {
      if (document.activeElement === e.target && e.shiftKey && e.keyCode === 9 /* Tab */) {
        e.preventDefault();
        nav_focusable_last.focus();
        on(nav_focusable_last, 'keydown', navFirstFocus);
      }
    };

    on(window, 'keyup', escCloseMenu);
    on(nav_focusable_first, 'keydown', navLastFocus);
    on(nav_focusable_last, 'keydown', navFirstFocus);
  }
}

export default Navigation;
