import Input from './Input';

/**
 * 패스워드 표시 버튼 컴포넌트
 * @class
 * @extends Input
 * @param {HTMLElmenet} domNode HTML 요소
 * @example
 * const passwordDisplayNode = document.querySelector('.member-password .button-password')
 * const passwordDisplayButtonComponent = new PasswordDisplayButton(passwordDisplayNode).init()
 */
class PasswordDisplayButton extends Input {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode) {
    super(domNode);

    // 컴포넌트 옵션
    this.options = {};

    // 컴포넌트 상태 업데이트
    this.setState({ visible: false });
  }

  /* 인스턴스 멤버 ------------------------------------------------------------------ */
  init(options) {
    const { mixins } = PasswordDisplayButton;

    // 수퍼 클래스인 Input 컴포넌트의 defaultOptions 속성
    const { defaultOptions: superDefaultOptions } = super.constructor;

    // 옵션 설정(객체 합성)
    this.options = mixins(superDefaultOptions, options);

    // 컴포넌트 옵션 속성 추출
    const { on: userCustomEvents } = this.options;

    // 사용자 정의 옵션 설정
    // 수퍼 클래스인 Input 컴포넌트의 bindUserCustomEvents 메서드 실행
    super.bindUserCustomEvents(userCustomEvents);

    return this;
  }

  // 오버라이딩(Overriding)
  // 수퍼 클래스의 메서드를 상속하여 서브 클래스에서 동일한 메서드 이름으로 활용
  _bindEvents() {
    // 수퍼 클래스 Input의 _bindEvents 메서드 실행
    super._bindEvents();

    const { on } = PasswordDisplayButton;
    on(this.component, 'click', this.handleToggleVisibleState.bind(this));
  }

  updateLabel(newLabel) {
    const { attr } = PasswordDisplayButton;
    attr(this.component, 'aria-label', newLabel);
  }

  handleToggleVisibleState() {
    if (this.state.pure) {
      this.setState({
        pure: false,
        visible: this.state.visible,
        current: 'click',
      });
    }
    else {
      // 상태 변경
      this.setState({
        visible: !this.state.visible,
        current: 'click',
      });
    }

    /* @debug */
    this.options.debug && console.log(this.component, this.state);
  }
}

export default PasswordDisplayButton;
