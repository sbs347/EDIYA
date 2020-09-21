(function formStateControl() {
  'use strict';

  /**
   * @constant
   * 상태 클래스 이름
   */
  const STATE_CLASSES = {
    focus: 'is--focus',
    valid: 'is--valid',
    invalid: 'is--invalid',
  };

  /**
   * @constant
   * 폼 유효성 검사 상태
   */
  const validState = {
    email: false,
    password: false,
  };

  /**
   * @var
   * 모듈 내 접근 가능한 지역 변수
   */
  let memberInputWrappers = [];
  let buttonPassword = null;
  let buttonLogin = null;

  /**
   * 초기화 함수
   * @function
   */
  function init() {
    memberInputWrappers = Array.from(
      document.querySelectorAll('div[class*="member-"], div[class*="save-"]')
    );

    memberInputWrappers.forEach((wrapper) => {
      const input = wrapper.querySelector('input');
      input.addEventListener('focus', handleInputFocus.bind(wrapper));
      input.addEventListener('blur', handleInputBlur.bind(wrapper));
    });

    buttonPassword = document.querySelector('.button-password');
    buttonPassword.addEventListener('click', handleToggleButtonPassword);

    buttonLogin = document.querySelector('.button-login');
  }

  /**
   * 포커스 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputFocus(e) {
    const { target: input } = e;
    if (input.type.includes('email')) {
      input.setAttribute('placeholder', 'yamoo9.euid.dev');
    }
    if (!input.type.includes('checkbox')) {
      this.classList.add(STATE_CLASSES.focus);
    }
    if (input.type.includes('checkbox')) {
      input.nextElementSibling.style.cssText = `
        border-radius: 2px;
        box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.9)
      `;
    }
  }

  /**
   * 블러 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputBlur(e) {
    const { target: input } = e;
    const inputWrapper = input.parentNode;

    /* 유효성 검사 ------------------------------------------------------------------- */

    if (input.type.includes('email')) {
      input.removeAttribute('placeholder');
      if (!isValidEmailFormat(input)) {
        inputWrapper.classList.add('is--invalid');
        validState.email = false;
      }
      else {
        inputWrapper.classList.remove('is--invalid');
        inputWrapper.classList.add('is--valid');
        validState.email = true;
      }
    }

    if (input.type.includes('password')) {
      console.log(isValidPasswordFormat(input));
      if (!isValidPasswordFormat(input)) {
        inputWrapper.classList.add('is--invalid');
        inputWrapper.classList.remove('is--focus');
        validState.password = false;
      }
      else {
        inputWrapper.classList.remove('is--invalid');
        inputWrapper.classList.remove('is--focus');
        inputWrapper.classList.add('is--valid');
        validState.password = true;
      }
    }

    if (input.type.includes('checkbox')) {
      input.nextElementSibling.style.cssText = '';
    }

    if (input.value.length === 0) {
      this.classList.remove(STATE_CLASSES.focus);
    }

    /* 전송 버튼 활성/비활성 처리 ---------------------------------------------------------- */

    const isAllInputFilled = checkAllInputsFilled(
      memberInputWrappers.filter((input) => input.className.includes('member-'))
    );

    if (isAllInputFilled && validState.email && validState.password) {
      changeLoginButtonSubmitEnable();
    }
    else {
      changeLoginButtonSubmitDisable();
    }
  }

  /**
   * 이메일 유효성 검사 함수
   * @function
   * @param {HTMLInputElement} input 이메일 인풋 요소
   */
  function isValidEmailFormat(input) {
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

    return reg.test(input.value);
  }

  /**
   * 패스워드 유효성 검사 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   */
  function isValidPasswordFormat(input) {
    const reg = /(?=.*\d)(?=.*[a-z]).{6,}/;
    return reg.test(input.value);
  }

  /**
   * 로그인 전송 버튼 활성 상태로 변경하는 함수
   * @function
   */
  function changeLoginButtonSubmitEnable() {
    const buttonLoginWrapper = buttonLogin.parentNode;
    buttonLoginWrapper.classList.remove('is--disabled');
    buttonLogin.removeAttribute('disabled');
  }

  /**
   * 로그인 전송 버튼 비활성 상태로 변경하는 함수
   * @function
   */
  function changeLoginButtonSubmitDisable() {
    const buttonLoginWrapper = buttonLogin.parentNode;
    buttonLoginWrapper.classList.add('is--disabled');
    buttonLogin.setAttribute('disabled', 'disabled');
  }

  /**
   * 패스워드 표시/감춤 버튼 토글 컨트롤 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleToggleButtonPassword(e) {
    const passwordButton = this;

    const passwordWrapper = passwordButton.parentNode;
    const passwordInput = passwordWrapper.querySelector('input');

    passwordWrapper.classList.toggle('is--visible');
    if (passwordWrapper.classList.contains('is--visible')) {
      stateVisiblePassword(passwordInput, passwordButton);
    }
    else {
      stateInvisiblePassword(passwordInput, passwordButton);
    }
  }

  /**
   * 패스워드 표시 상태 변경 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   * @param {HTMLButtonElement} button 패스워드 표시/감춤 버튼 요소
   */
  function stateVisiblePassword(input, button) {
    input.type = 'text';
    button.setAttribute('aria-label', '패스워드 감추기');
  }

  /**
   * 패스워드 감춤 상태 변경 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   * @param {HTMLButtonElement} button 패스워드 표시/감춤 버튼 요소
   */
  function stateInvisiblePassword(input, button) {
    input.type = 'password';
    button.setAttribute('aria-label', '패스워드 보기');
  }

  /**
   * 이메일, 패스워드 값이 채워졌는지 검사하는 함수
   * @function
   * @param {HTMLDivElement} inputWrapper 이메일, 패스워드 래퍼 요소
   */
  function checkAllInputsFilled(inputWrapper) {
    return inputWrapper.every((wrapper) => {
      const input = wrapper.querySelector('input');
      return input.value;
    });
  }

  // 문서 요소에 접근 가능한 시점에 init 함수 실행
  document.addEventListener('DOMContentLoaded', init);
})();
