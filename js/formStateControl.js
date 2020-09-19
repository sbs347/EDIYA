;(function formStateControl() {
  'use strict'

  /**
   * @constant
   * 상태 클래스 이름
   */
  const STATE_CLASSES = {
    focus: 'is--focus',
    valid: 'is--valid',
    invalid: 'is--invalid',
  }

  /**
   * 초기화 함수
   * @function
   */
  function init() {
    const loginInputWrappers = document.querySelectorAll('div[class*="login-"], div[class*="save-"]')

    Array.from(loginInputWrappers).forEach((wrapper) => {
      const input = wrapper.querySelector('input')
      input.addEventListener('focus', handleInputFocus.bind(wrapper))
      input.addEventListener('blur', handleInputBlur.bind(wrapper))
    })

    const buttonPassword = document.querySelector('.button-password')
    buttonPassword.addEventListener('click', handleToggleButtonPassword)
  }

  /**
   * 포커스 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputFocus(e) {
    const { target: input } = e
    if (input.type.includes('email')) {
      input.setAttribute('placeholder', 'yamoo9.euid.dev')
    }
    if (!input.type.includes('checkbox')) {
      this.classList.add(STATE_CLASSES.focus)
    }
    if(input.type.includes('checkbox')) {
      input.nextElementSibling.style.cssText = `
        border-radius: 2px;
        box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.9)
      `
    }
  }

  /**
   * 블러 상태 제어 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleInputBlur(e) {
    const { target: input } = e

    if (input.type.includes('email')) {
      input.removeAttribute('placeholder')
    }
    
    if (input.value.length === 0) {
      this.classList.remove(STATE_CLASSES.focus)
    }
    
    if(input.type.includes('checkbox')) {
      input.nextElementSibling.style.cssText = ``
    }
  }

  /**
   * 패스워드 표시/감춤 버튼 토글 컨트롤 함수
   * @function
   * @param {Event Object} e 이벤트 객체
   */
  function handleToggleButtonPassword(e) {
    const passwordButton = this

    const passwordWrapper = passwordButton.parentNode
    const passwordInput = passwordWrapper.querySelector('input')

    passwordWrapper.classList.toggle('is--visible')
    if (passwordWrapper.classList.contains('is--visible')) {
      stateVisiblePassword(passwordInput, passwordButton)
    } else {
      stateInvisiblePassword(passwordInput, passwordButton)
    }
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

  document.addEventListener('DOMContentLoaded', init)
})()
