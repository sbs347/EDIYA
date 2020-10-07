import { FORM_CLASSES } from '../../constants/classNames';
import Component from '../Component';

/**
 * 인풋 컴포넌트
 * @class
 * @extends Component
 */
class Input extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode) {
    super();

    if (!domNode || domNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    // 컴포넌트 객체 참조
    this.component = domNode;

    const { getNode } = Input;

    // 인풋 객체 참조
    this.inputNode = getNode('input', this.component);

    // 컴포넌트 옵션
    this.options = {};

    // 컴포넌트 상태
    this.state = {
      // 순수 입력 상태
      pure: true,
      // 유효 성태
      valid: false,
      // 현재 상태: normal, hover, focus, valid, invalid
      current: 'normal',
    };

    // 기본 이벤트 연결
    this._bindEvents();
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static defaultOptions = {
    placeholderText: '',
    debug: false,
    on: {},
  };

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _bindEvents() {
    const { on, attr, addClass, removeClass, removeAttr } = Input;
    const { component, inputNode } = this;
    const { placeholderText, debug: debugMode } = this.options;

    on(component, 'mouseenter', () => {
      this.setState({ current: 'hover' });
      /* @debug */
      debugMode && console.log(component, this.state.current);
    });

    on(component, 'mouseleave', () => {
      this.setState({ current: 'normal' });
      /* @debug */
      debugMode && console.log(component, this.state.current);
    });

    on(inputNode, 'focus', () => {
      this.setState({ current: 'focus' });
      attr(inputNode, 'placeholder', placeholderText);
      addClass(component, FORM_CLASSES.focus);
      /* @debug */
      debugMode && console.log(component, this.state.current);
    });

    on(inputNode, 'blur', () => {
      this.setState({ current: 'normal' });
      removeAttr(inputNode, 'placeholder');
      removeClass(component, FORM_CLASSES.focus);
      /* @debug */
      debugMode && console.log(component, this.state.current);
    });
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  render() {
    const { addClass, removeClass, attr } = Input;
    const { component, inputNode } = this;

    switch (this.state.current) {
      case 'invalid':
        addClass(component, FORM_CLASSES.invalid);
        attr(inputNode, 'aria-invalid', true);
        break;

      case 'valid':
        removeClass(component, FORM_CLASSES.invalid);
        addClass(component, FORM_CLASSES.valid);
        attr(inputNode, 'aria-invalid', false);
    }
  }

  // 사용자 정의 옵션 설정
  bindUserCustomEvents(userCustomEvents) {
    const { on } = Input;

    // 사용자 정의 옵션 설정
    for (const eventType in userCustomEvents) {
      if (userCustomEvents.hasOwnProperty(eventType)) {
        const eventHandler = userCustomEvents[eventType];
        on(this.inputNode || this.component, eventType, eventHandler.bind(this));
      }
    }
  }

  // 입력 초기화
  reset() {
    const { removeClass } = Input;
    removeClass(this.component, FORM_CLASSES.valid);
  }
}

export default Input;
