/**
 ** 패스워드 표시, 버튼 컴포넌트 아키텍처 설계(Architecture Design)
 *
 * ![주의] 오류 발생 시, 의존성 모듈 확인
 * - utils/helper.js
 * - components/form/_formConstant.js
 */

;(function PasswordDisplayButtonClass() {
  'use strict'

  /**
   * 패스워드 표시 버튼 컴포넌트
   * @constructor
   * @param {HTMLElmenet} elNode HTML 요소
   * @example
   * var passwordDisplayNode = document.querySelector('.member-password .button-password')
   * var passwordDisplayButtonComponent = new PasswordDisplayButton(passwordDisplayNode).init()
   */
  function PasswordDisplayButtonClass(elNode) {
    if (elNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.')
    }
    // 컴포넌트 객체 참조
    this.component = elNode
    // 커스텀 이벤트 객체
    this.events = {}
    // 버튼 객체 상태
    // normal, focus, hover, click
    this.state = {
      visible: false,
      // 현재 상태: normal, hover, focus
      current: 'normal',
    }
  }

  /**
   * @memberof PasswordDisplayButtonClass
   * @static
   */
  PasswordDisplayButtonClass.STATES = FORM_STATE_CLASSES
  PasswordDisplayButtonClass.mixins = mixins
  PasswordDisplayButtonClass.defaultOptions = {
    on: {},
    debug: false,
  }

  /**
   * @memberof PasswordDisplayButtonClass.prototype
   * @instance
   */
  var __proto__ = PasswordDisplayButtonClass.prototype

  // init()
  Object.defineProperty(__proto__, 'init', {
    value: function(options) {
      options = PasswordDisplayButtonClass.mixins(
        PasswordDisplayButtonClass.defaultOptions,
        options
      )

      this.events = options.on
      this.debugMode = options.debug

      for (var eventType in this.events) {
        if (this.events.hasOwnProperty(eventType)) {
          var eventHandler = this.events[eventType]
          this.component.addEventListener(eventType, eventHandler.bind(this, this.state))
        }
      }

      this.bindEvents()

      return this
    },
  })

  // setState()
  Object.defineProperty(__proto__, 'setState', {
    value: function(newValue) {
      this.state = PasswordDisplayButtonClass.mixins(this.state, newValue)
    },
  })

  // updateLabel()
  Object.defineProperty(__proto__, 'updateLabel', {
    value: function(newLabel) {
      this.component.setAttribute('aria-label', newLabel)
    },
  })

  // bindEvents()
  Object.defineProperty(__proto__, 'bindEvents', {
    value: function() {
      var _this = this
      var component = this.component

      component.addEventListener('click', this.handleToggleVisibleState.bind(this))

      component.addEventListener('mouseenter', function() {
        _this.setState({ current: 'hover' })
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      component.addEventListener('mouseleave', function() {
        _this.setState({ current: 'normal' })
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      component.addEventListener('focus', function() {
        _this.setState({ current: 'focus' })
        component.classList.add(PasswordDisplayButtonClass.STATES.focus)
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
      component.addEventListener('blur', function() {
        _this.setState({ current: 'normal' })
        component.classList.remove(PasswordDisplayButtonClass.STATES.focus)
        /* @debug */
        _this.debugMode && console.log(component, _this.state.current)
      })
    },
  })

  // handleToggleVisibleState()
  Object.defineProperty(__proto__, 'handleToggleVisibleState', {
    value: function() {
      // 상태 변경
      this.setState({
        visible: !this.state.visible,
      })
      this.setState({ current: 'click' })
      /* @debug */
      this.debugMode && console.log(this.component, this.state.current)
    },
  })

  window.PasswordDisplayButton = PasswordDisplayButtonClass
})()
