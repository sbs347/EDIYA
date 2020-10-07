import Input from './Input';
import { FORM_CLASSES } from '../../constants/classNames';
import PasswordDisplayButton from './PasswordDisplayButton';

/**
 * 패스워드 인풋 컴포넌트
 * @class
 * @extends Input
 * @param {HTMLElmenet} domNode HTML 요소
 * @example
 * var passwordInputNode = document.querySelector('.member-password')
 * var passwordInputComponent = new PasswordInput(passwordInputNode).init()
 */
class PasswordInput extends Input {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode) {
    super(domNode);

    const { getNode } = PasswordInput;

    // 레이블 객체 참조
    this.labelNode = getNode('label', this.component);

    // 패스워드 디스플레이 버튼 객체 참조
    this.buttonNode = getNode('button', this.component);

    // 컴포넌트 옵션
    this.options = {};

    // 컴포넌트 상태 업데이트
    this.setState({
      visible: false,
    });
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */
  static defaultOptions = {
    confirm: false,
    compareInput: null,
  };

  static isValidPasswordFormat(input) {
    // 숫자, 영문 조합 6자리 이상 입력해야 유효함
    const reg = /(?=.*\d)(?=.*[a-z]).{6,}/;
    return reg.test(input.value);
  }

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  init(options) {
    const { mixins, defaultOptions, addClass, removeClass } = PasswordInput;

    // 수퍼 클래스인 Input 컴포넌트의 defaultOptions 속성
    const { defaultOptions: superDefaultOptions } = super.constructor;

    // 옵션 설정(객체 합성)
    this.options = mixins(superDefaultOptions, defaultOptions, options);

    // 컴포넌트 옵션 속성 추출
    const { on: userCustomEvents, debug } = this.options;

    const { component, inputNode, buttonNode } = this;

    // 패스워드 디스플레이 버튼 컴포넌트화
    new PasswordDisplayButton(buttonNode).init({
      debug,
      on: {
        click() {
          // this === PasswordDisplayButton 컴포넌트 인스턴스
          if (!this.state.visible) {
            inputNode.type = 'text';
            addClass(component, FORM_CLASSES.visible);
            this.updateLabel('패스워드 감추기');
          }
          else {
            inputNode.type = 'password';
            removeClass(component, FORM_CLASSES.visible);
            this.updateLabel('패스워드 보기');
          }
        },
      },
    });

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

    const { on } = PasswordInput;
    const { component, inputNode, state } = this;

    on(inputNode, 'input', () => {
      const { confirm, debug } = this.options;

      this.setState({ current: 'input', pure: false });

      !confirm ? this.checkPasswordFormat() : this.checkPasswordMatch();

      this.render();

      /* @debug */
      debug && console.log(component, '컴포넌트 상태: ', state);
    });
  }

  checkPasswordFormat() {
    const { inputNode } = this;
    const { isValidPasswordFormat } = PasswordInput;

    !isValidPasswordFormat(inputNode)
      ? this.setState({ current: 'invalid', valid: false })
      : this.setState({ current: 'valid', valid: true });
  }

  checkPasswordMatch() {
    const { inputNode, options: { compareInput } } = this;

    inputNode.value === compareInput.value
      ? this.setState({ current: 'valid', valid: true })
      : this.setState({ current: 'invalid', valid: false });
  }
}

export default PasswordInput;
