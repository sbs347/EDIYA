/**
 ** 이메일 저장, 폼 인풋 컴포넌트 아키텍처 설계(Architecture Design)
 *
 * ![주의] 오류 발생 시, 의존성 모듈 확인
 * - utils/helper.js
 * - components/form/_formConstant.js
 */

;(function SaveEmailInputClass() {
  'use strict'

  /**
   * 패스워드 표시 버튼 컴포넌트
   * @constructor
   * @param {HTMLElmenet} elNode HTML 요소
   * @example
   * var saveEmailInputNode = document.querySelector('.member-form .save-email')
   * var saveEmailInputComponent = new SaveEmailInput(saveEmailInputNode).init()
   */
  function SaveEmailInputClass(elNode) {
    if (elNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.')
    }
    // 컴포넌트 객체 참조
    this.component = elNode
    this.input = this.component.querySelector('input')
    this.checkbox = this.component.querySelector('.checkbox')
    // 커스텀 이벤트 객체
    this.events = {}
    // 버튼 객체 상태
    // normal, focus, hover, click
    this.state = {
      checked: false,
      // 현재 상태: normal, hover, focus
      current: 'normal',
    }
  }

  /**
   * @memberof SaveEmailInputClass
   * @static
   */
  SaveEmailInputClass.STATES = FORM_STATE_CLASSES
  SaveEmailInputClass.mixins = mixins
  SaveEmailInputClass.defaultOptions = {
    on: {},
    debug: false,
  }

  /**
   * @memberof SaveEmailInputClass.prototype
   * @instance
   */
  var __proto__ = SaveEmailInputClass.prototype

  // init()
  Object.defineProperty(__proto__, 'init', {
    value: function(options) {
      options = SaveEmailInputClass.mixins(SaveEmailInputClass.defaultOptions, options)

      this.events = options.on
      this.debugMode = options.debug

      for (var eventType in this.events) {
        if (this.events.hasOwnProperty(eventType)) {
          var eventHandler = this.events[eventType]
          this.input.addEventListener(eventType, eventHandler.bind(this))
        }
      }

      this.bindEvents()

      return this
    },
  })

  // setState()
  Object.defineProperty(__proto__, 'setState', {
    value: function(newValue) {
      this.state = SaveEmailInputClass.mixins(this.state, newValue)
    },
  })

  // bindEvents()
  Object.defineProperty(__proto__, 'bindEvents', {
    value: function() {
      var _this = this
      var component = this.component
      var input = this.input

      input.addEventListener('click', this.handleToggleCheckedState.bind(this))

      input.addEventListener('mouseenter', function() {
        _this.setState({ current: 'hover' })
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      input.addEventListener('mouseleave', function() {
        _this.setState({ current: 'normal' })
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      input.addEventListener('focus', function() {
        _this.setState({ current: 'focus' })
        component.classList.add(SaveEmailInputClass.STATES.focus)
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      input.addEventListener('blur', function() {
        _this.setState({ current: 'normal' })
        component.classList.remove(SaveEmailInputClass.STATES.focus)
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
    },
  })

  // handleToggleCheckedState()
  Object.defineProperty(__proto__, 'handleToggleCheckedState', {
    value: function() {
      // 상태 변경
      this.setState({
        checked: !this.state.checked,
        current: 'click',
      })

      /* @debug */
      this.debugMode && console.log(this.component, this.state.current)
    },
  })

  window.SaveEmailInput = SaveEmailInputClass
})()
