;(function loginFormControl() {
  'use strict'

  /**
   * !주의
   * 헬퍼(header.js)에 의존 함
   * el(), els() 유틸리티 함수 사용
   */

  /**
   * @constant
   * 상태 클래스 이름
   */
  const STATE_CLASSES = {
    focus: 'is--focus',
    valid: 'is--valid',
    invalid: 'is--invalid',
    disabled: 'is--disabled',
  }

  const EMAIL_PLACEHOLDER_TEXT = 'yamoo9.euid.dev'

  const A11Y_CHECKBOX_FOCUS_STYLE = `
    border-radius: 2px;
    box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.9)
  `

  /**
   * @constant
   * 로그인 폼 유효성 검사 상태
   */
  const loginState = {
    email: false,
    password: false,
    passwordInputPure: true,
    passwordButtonPure: true,
  }

  /**
   * @var
   * 모듈 내 접근 가능한 지역 변수
   */
  let loginControlWrappers = []
  let buttonPassword = null
  let buttonLogin = null
  let memberForm = null

  /**
   * 초기화 함수
   * @function
   */
  function init() {
    // 로그인 컨트롤 요소 집합(배열) 참조
    // - 이메일 인풋 래퍼
    // - 패스워드 인풋 래퍼
    // - 이메일 저장 인풋 래퍼
    loginControlWrappers = Array.from(els('.member-id, .member-password, .save-email'))

    // 래퍼 집합 순환 처리
    loginControlWrappers.forEach((wrapper) => {
      // 래퍼 내부에서 input 참조
      const input = el('input', wrapper)
      input.addEventListener('focus', handleInputFocus.bind(wrapper))
      input.addEventListener('blur', handleInputBlur.bind(wrapper))
    })

    // 패스워드 표시/감춤 버튼 참조
    buttonPassword = el('.button-password')
    buttonPassword.addEventListener('click', handleToggleButtonPassword)
    buttonPassword.addEventListener('blur', handleRenderPassword)

    // 로그인 버튼 요소 참조
    buttonLogin = el('.button-login')

    // 로그인 폼 요소 참조
    memberForm = el('.member-form')
    memberForm.addEventListener('submit', handleLoginSubmit)
  }

  /**
   * 로그인 전송 핸들링 함수
   * @function
   * @param {EventObject} e 이벤트 객체
   */
  function handleLoginSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    formData.append('userEmail', el('input#userEmail', e.target).value)
    formData.append('userPassword', el('input#userPassword', e.target).value)
    formData.append('userEmailSave', el('input#userEmailSave', e.target).checked)

    const formDataJSON = convertFormDataToJSON(formData)
    console.log(formDataJSON)

    changeLoginButtonLoading()
  }

  /**
   * 폼 데이터 → JSON 포멧 변경 함수
   * @function
   * @param {FormData} formData 폼 데이터 객체
   */
  function convertFormDataToJSON(formData) {
    const formDataObj = {}
    for (var keyValue of formData.entries()) {
      formDataObj[keyValue[0]] = keyValue[1]
    }
    return JSON.stringify(formDataObj, null, '  ')
  }

  /**
   * 포커스 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputFocus({ target: input }) {
    const inputType = input.type

    // 이메일 인풋 컨트롤
    if (inputType.includes('email')) {
      input.setAttribute('placeholder', EMAIL_PLACEHOLDER_TEXT)
    }

    // 패스워드 인풋 컨트롤
    if (inputType.includes('password')) {
      buttonPassword.setAttribute('tabindex', 0)
    }

    // 체크박스 인풋 컨트롤(접근성)
    if (inputType.includes('checkbox')) {
      const checkboxEl = el('.checkbox', input.parentNode)
      checkboxEl.style.cssText = A11Y_CHECKBOX_FOCUS_STYLE
    }

    // 이메일, 패스워드 인풋 컨트롤
    if (!inputType.includes('checkbox')) {
      this.classList.add(STATE_CLASSES.focus)
    }
  }

  /**
   * 블러 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputBlur({ target: input }) {
    const inputType = input.type

    /* 유효성 검사 ------------------------------------------------------------------- */

    // 이메일
    if (inputType.includes('email')) {
      renderValidationEmail(input)
    }

    // 패스워드
    if (inputType.includes('password')) {
      renderValidationPassword(input)
      buttonPassword.setAttribute('tabindex', -1)
    }

    // 체크박스 인풋 컨트롤(접근성)
    if (inputType.includes('checkbox')) {
      const checkboxEl = el('.checkbox', input.parentNode)
      checkboxEl.style.cssText = ''
    }

    if (input.value.length === 0) {
      // 포커스 상태(클래스 추가 된) 제거
      this.classList.remove(STATE_CLASSES.focus)
    }

    /* 전송 버튼 활성/비활성 처리 ---------------------------------------------------------- */
    renderAllInputsFilled()
  }

  /**
   * 모든 인풋이 채워졌는지 검사 후, UI 렌더링 함수
   * @function
   */
  function renderAllInputsFilled() {
    const isAllInputFilled = checkAllInputsFilled(
      loginControlWrappers.filter((input) => input.className.includes('login-'))
    )

    if (isAllInputFilled && loginState.email && loginState.password) {
      changeLoginButtonSubmitEnable()
    }
    else {
      changeLoginButtonSubmitDisable()
    }
  }

  /**
   * 이메일 유효성 검사 후, UI 렌더링 함수
   * @function
   * @param {HTMLInputElement} input 이메일 인풋 요소
   */
  function renderValidationEmail(input) {
    const inputWrapper = input.parentNode
    input.removeAttribute('placeholder')

    if (!isValidEmailFormat(input)) {
      inputWrapper.classList.add('is--invalid')
      input.setAttribute('aria-invalid', true)
      loginState.email = false
    }
    else {
      inputWrapper.classList.remove('is--invalid')
      inputWrapper.classList.add('is--valid')
      input.setAttribute('aria-invalid', false)
      loginState.email = true
    }
  }

  /**
   * 패스워드 유효성 검사 후, UI 렌더링 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   */
  function renderValidationPassword(input) {
    const inputWrapper = input.parentNode

    // 입력 `순수` → `불순` 상태 업데이트
    if (loginState.passwordInputPure) {
      loginState.passwordInputPure = false
      // ! 임시
      // 패스워드 인풋 초기 상태에서 패스워드 표시/감춤 버튼을 사용하지 않은 상태에서
      // 로그인 버튼 활성화를 위한 임시 방편
      loginState.password = true
    }
    else {
      if (!isValidPasswordFormat(input)) {
        inputWrapper.classList.add('is--invalid')
        inputWrapper.classList.remove('is--focus')
        loginState.password = false
      }
      else {
        inputWrapper.classList.remove('is--invalid')
        inputWrapper.classList.remove('is--focus')
        inputWrapper.classList.add('is--valid')
        loginState.password = true
      }
    }
  }

  /**
   * 패스워드 표시/감춤 버튼 블러 이벤트 핸들링
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleRenderPassword({ target: button }) {
    renderValidationPassword(el('input', button.parentNode))
    renderAllInputsFilled()
  }

  /**
   * 이메일 유효성 검사 함수
   * @function
   * @param {HTMLInputElement} input 이메일 인풋 요소
   */
  function isValidEmailFormat(input) {
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi

    return reg.test(input.value)
  }

  /**
   * 패스워드 유효성 검사 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   */
  function isValidPasswordFormat(input) {
    const reg = /(?=.*\d)(?=.*[a-z]).{6,}/
    return reg.test(input.value)
  }

  /**
   * 로그인 전송 버튼 활성 상태로 변경하는 함수
   * @function
   */
  function changeLoginButtonSubmitEnable() {
    const buttonLoginWrapper = buttonLogin.parentNode
    buttonLoginWrapper.classList.remove('is--disabled')
    buttonLogin.removeAttribute('disabled')
  }

  /**
   * 로그인 전송 버튼 비활성 상태로 변경하는 함수
   * @function
   */
  function changeLoginButtonSubmitDisable() {
    const buttonLoginWrapper = buttonLogin.parentNode
    buttonLoginWrapper.classList.add('is--disabled')
    buttonLogin.setAttribute('disabled', 'disabled')
  }

  /**
   * 로그인 전송 버튼 로딩 상태로 변경하는 함수
   * @function
   */
  function changeLoginButtonLoading() {
    const buttonLoginWrapper = buttonLogin.parentNode
    buttonLoginWrapper.classList.add('is--loading')
    buttonLogin.setAttribute('disabled', 'disabled')
    window.setTimeout(() => {
      buttonLoginWrapper.classList.remove('is--loading')
      buttonLogin.removeAttribute('disabled')
    }, 2500)
  }

  /**
   * 패스워드 표시/감춤 버튼 토글 컨트롤 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleToggleButtonPassword(e) {
    const passwordButton = this

    const passwordWrapper = passwordButton.parentNode
    const passwordInput = el('input', passwordWrapper)

    passwordWrapper.classList.toggle('is--visible')
    if (passwordWrapper.classList.contains('is--visible')) {
      stateVisiblePassword(passwordInput, passwordButton)
    }
    else {
      stateInvisiblePassword(passwordInput, passwordButton)
    }

    // 상태 업데이트
    loginState.passwordButtonPure = false
  }

  /**
   * 패스워드 표시 상태 변경 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   * @param {HTMLButtonElement} button 패스워드 표시/감춤 버튼 요소
   */
  function stateVisiblePassword(input, button) {
    input.type = 'text'
    button.setAttribute('aria-label', '패스워드 감추기')
  }

  /**
   * 패스워드 감춤 상태 변경 함수
   * @function
   * @param {HTMLInputElement} input 패스워드 인풋 요소
   * @param {HTMLButtonElement} button 패스워드 표시/감춤 버튼 요소
   */
  function stateInvisiblePassword(input, button) {
    input.type = 'password'
    button.setAttribute('aria-label', '패스워드 보기')
  }

  /**
   * 이메일, 패스워드 값이 채워졌는지 검사하는 함수
   * @function
   * @param {HTMLDivElement} inputWrapper 이메일, 패스워드 래퍼 요소
   */
  function checkAllInputsFilled(inputWrapper) {
    return inputWrapper.every((wrapper) => {
      const input = el('input', wrapper)
      return input.value
    })
  }

  // 문서 요소에 접근 가능한 시점에 init 함수 실행
  init()
})()
