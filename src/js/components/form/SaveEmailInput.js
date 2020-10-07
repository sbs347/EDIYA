import Input from './Input';

/**
 * 패스워드 표시 버튼 컴포넌트
 * @class
 * @extends Input
 * @param {HTMLElmenet} domNode HTML 요소
 * @example
 * var saveEmailInputNode = document.querySelector('.member-form .save-email')
 * var saveEmailInputComponent = new SaveEmailInput(saveEmailInputNode).init()
 */
class SaveEmailInput extends Input {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode) {
    super(domNode);

    const { getNode } = SaveEmailInput;

    this.checkbox = getNode('.checkbox', this.component);

    // 컴포넌트 상태 업데이트
    this.setState({
      // 체크 상태 추가
      checked: false,
    });
  }

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  init(options) {
    const { mixins } = SaveEmailInput;

    // 수퍼 클래스인 Input 컴포넌트의 defaultOptions 속성
    const { defaultOptions } = super.constructor;

    // 옵션 설정(객체 합성)
    this.options = mixins(defaultOptions, options);

    // 컴포넌트 옵션 속성 추출
    const { on: userCustomEvents } = this.options;

    // 사용자 정의 옵션 설정
    // 수퍼 클래스인 Input 컴포넌트의 bindUserCustomEvents 메서드 실행
    super.bindUserCustomEvents(userCustomEvents);

    // 컴포넌트 이벤트 연결
    this._bindEvents();

    return this;
  }

  // 오버라이딩(Overriding)
  // 수퍼 클래스의 메서드를 상속하여 서브 클래스에서 동일한 메서드 이름으로 활용
  _bindEvents() {
    // 수퍼 클래스 Input의 _bindEvents 메서드 실행
    super._bindEvents();

    const { on } = SaveEmailInput;

    on(this.inputNode, 'click', this.handleToggleCheckedState.bind(this));
  }

  handleToggleCheckedState() {
    // 상태 변경
    this.setState({
      checked: !this.state.checked,
      current: 'click',
    });

    /* @debug */
    this.options.debug && console.log(this.component, this.state.current);
  }
}

export default SaveEmailInput;
