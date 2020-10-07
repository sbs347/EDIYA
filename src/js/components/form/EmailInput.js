import Input from './Input';

/**
 * 이메일 인풋 컴포넌트
 * @class
 * @extends Input
 * @param {HTMLElmenet} domNode HTML 요소
 * @example
 * const emailInputNode = document.querySelector('.member-id')
 * const emailInputComponent = new EmailInput(emailInputNode).init({ placeholderText: '야무@이듬.run' })
 */
class EmailInput extends Input {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode) {
    // 수퍼 클래스 Input 컴포넌트 실행
    // super 키워드는 부모 오브젝트의 함수를 호출할 때 사용됩니다.
    // super.prop 와 super[expr] 표현식은 클래스와 객체리터럴의 어떠한 메서드 정의 방법에서도 유효합니다.
    super(domNode);

    const { getNode } = EmailInput;

    // 레이블 객체 참조
    this.labelNode = getNode('label', this.component);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static isValidEmailFormat(input) {
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

    return reg.test(input.value);
  }

  static defaultOptions = {
    placeholderText: '야무@euid.dev',
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  init(options) {
    const { mixins, defaultOptions } = EmailInput;

    // 수퍼 클래스인 Input 컴포넌트의 defaultOptions 속성
    const { defaultOptions: superDefaultOptions } = super.constructor;

    // 옵션 설정(객체 합성)
    this.options = mixins(superDefaultOptions, defaultOptions, options);

    // 컴포넌트 옵션 속성 추출
    const { on: userCustomEvents } = this.options;

    // 사용자 정의 옵션 설정
    // 수퍼 클래스인 Input 컴포넌트의 bindUserCustomEvents 메서드 실행
    super.bindUserCustomEvents(userCustomEvents);

    // 컴포넌트 이벤트 연결
    // this._bindEvents();

    // 컴포넌트 인스턴스 반환
    return this;
  }

  // 오버라이딩(Overriding)
  // 수퍼 클래스의 메서드를 상속하여 서브 클래스에서 동일한 메서드 이름으로 활용
  _bindEvents() {
    // 수퍼 클래스 Input의 _bindEvents 메서드 실행
    super._bindEvents();

    const { on } = EmailInput;

    on(this.inputNode, 'input', () => {
      this.setState({ current: 'input', pure: false });
      this.checkEmailFormat();
      this.render();
      /* @debug */
      this.options.debug && console.log(this.component, '컴포넌트 상태: ', this.state);
    });
  }

  checkEmailFormat() {
    const { isValidEmailFormat } = EmailInput;
    const { inputNode } = this;

    !isValidEmailFormat(inputNode)
      ? this.setState({ current: 'invalid', valid: false })
      : this.setState({ current: 'valid', valid: true });
  }
}

export default EmailInput;
