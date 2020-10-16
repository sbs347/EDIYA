/**
 * 컴포넌트
 * @class
 */
class Component {
  /* -------------------------------------------------------------------------- */
  /* 생성자                                                                       */
  /* -------------------------------------------------------------------------- */

  constructor() {
    // 상태
    this.state = {};
  }

  /* -------------------------------------------------------------------------- */
  /* 클래스 멤버                                                                   */
  /* -------------------------------------------------------------------------- */

  // 기본 옵션
  static defaultOptions = {};

  // 정확한 타입 감지
  static typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  // DOM 객체 참조
  static getNodeList(selector, context = document) {
    if (typeof selector !== 'string') {
      throw Error('CSS 선택자(문자)를 전달해야 합니다.');
    }

    const contextType = context.nodeType; // 9: DOCUMENT_NODE, 1: ELEMENT_NODE

    if (!context || (contextType !== 1 && contextType !== 9)) {
      throw Error('컨텍스트는 document 또는 DOM 객체를 설정해야 합니다.');
    }
    return context.querySelectorAll(selector);
  }

  static getNode(selector, context) {
    return Component.getNodeList(selector, context)[0];
  }

  // 타임아웃(지연)
  static delay(callback, timeout = 100) {
    window.setTimeout(callback, timeout);
  }

  // 이벤트 설정
  static on(domNode, eventType, eventHandler, options = false) {
    domNode && domNode.addEventListener(eventType, eventHandler, options);
  }

  static off(domNode, eventType, eventHandler, options = false) {
    domNode && domNode.removeEventListener(eventType, eventHandler, options);
  }

  // 클래스 속성 설정
  static addClass(domNode, className) {
    domNode && domNode.classList.add(className);
  }

  static removeClass(domNode, className) {
    domNode && domNode.classList.remove(className);
  }

  static hasClass(domNode, className) {
    return domNode.classList.contains(className);
  }

  static toggleClass(domNode, className) {
    domNode && domNode.classList.toggle(className);
  }

  // 표시 설정
  static hide(domNode) {
    domNode.hidden = true;
  }

  static show(domNode) {
    domNode.hidden = false;
  }

  // 속성 설정
  static attr(domNode, key, value) {
    if (!value) {
      return domNode.getAttribute(key);
    }
    else {
      domNode.setAttribute(key, value);
    }
  }

  static removeAttr(domNode, key) {
    domNode.removeAttribute(key);
  }

  // CSS 설정
  static css(domNode, key, value, pseudo = null) {
    if (!value && value !== 0) {
      return window.getComputedStyle(domNode, pseudo)[key];
    }
    else {
      domNode.style[key] = value;
    }
  }

  // 삽입 설정
  static insertContent(domNode, position, content) {
    const method = typeof content === 'string' ? 'insertAdjacentHTML' : 'insertAdjacentElement';
    domNode[method](position, content);
  }

  static prepend(domNode, content) {
    Component.insertContent(domNode, 'afterbegin', content);
  }

  static append(domNode, content) {
    Component.insertContent(domNode, 'beforeend', content);
  }

  static insertBefore(domNode, content) {
    Component.insertContent(domNode, 'beforebegin', content);
  }

  static insertAfter(domNode, content) {
    Component.insertContent(domNode, 'afterend', content);
  }

  // 객체 합성
  static mixins(...objectArray) {
    return objectArray.reduce((mixin, o) => {
      for (const key in o) {
        if (o.hasOwnProperty(key)) {
          const value = o[key];
          const valueType = Component.typeOf(value);
          if (mixin[key] && valueType.match(/(array|object)/)) {
            mixin[key] =
              valueType === 'object'
                ? Component.mixins(mixin[key], value)
                : Array.from(new Set([ ...mixin[key], ...value ]));
          }
          else {
            mixin[key] = value;
          }
        }
      }
      return mixin;
    }, {});
  }

  /* -------------------------------------------------------------------------- */
  /* 인스턴스 멤버                                                                  */
  /* -------------------------------------------------------------------------- */

  // 초기화
  _init() {
    console.log('초기화');
  }

  // 이벤트 연결
  _bindEvents() {}

  // 상태 변경
  setState(newState) {
    this.state = Component.mixins(this.state, newState);
  }

  // 렌더링
  render() {}
}

/* -------------------------------------------------------------------------- */
/* 컴포넌트 공개                                                                  */
/* -------------------------------------------------------------------------- */

export default Component;
