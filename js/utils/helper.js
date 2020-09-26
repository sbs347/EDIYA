/* -----------------------------------------------------
 * DOM 선택 헬퍼 함수 */

function els(selector, context) {
  if (typeof selector !== 'string' || selector.trim().length === 0) {
    return null
  }
  context = !context ? document : context.nodeType === 1 ? context : el(String(context))
  return context.querySelectorAll(selector)
}

function el(selector, context) {
  if (typeof selector !== 'string' || selector.trim().length === 0) {
    return null
  }
  context = !context ? document : context.nodeType === 1 ? context : el(String(context))
  return context.querySelector(selector)
}

/* -----------------------------------------------------
 * 날짜,시간 헬퍼 함수 */

function getYear(format) {
  return new Date().getFullYear() + (format || '')
}

function getMonth(format) {
  return new Date().getMonth() + 1 + (format || '')
}

function getDate(format) {
  return new Date().getDate() + (format || '')
}

function getDay(format) {
  var day = new Date().getDay()
  switch (day) {
    case 0:
      day = '일'
      break
    case 1:
      day = '월'
      break
    case 2:
      day = '화'
      break
    case 3:
      day = '수'
      break
    case 4:
      day = '목'
      break
    case 5:
      day = '금'
      break
    case 6:
      day = '토'
  }
  return day + (format || '')
}

function getHours(format, ampm) {
  var hour = Number(new Date().getHours())
  if (ampm) {
    ampm = !ampm ? '' : hour < 12 ? 'AM ' : 'PM '
    hour = hour >= 12 ? hour - 12 : 12 - hour > 3 ? '0' + hour : hour
  }
  else {
    ampm = ''
  }
  return ampm + hour + (format || '')
}

function getMinutes(format) {
  return new Date().getMinutes() + (format || '')
}

function getSeconds(format) {
  return new Date().getSeconds() + (format || '')
}

function getMilliseconds(format) {
  return new Date().getMilliseconds() + (format || '')
}

function getISOString(format) {
  return new Date().toISOString() + (format || '')
}

// ECMAScript 2015(ES6) 폴리필
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
    var toInteger = function(value) {
      var number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    var maxSafeInteger = Math.pow(2, 53) - 1
    var toLength = function(value) {
      var len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike)

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined')
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined
      var T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function')
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len)

      // 16. Let k be 0.
      var k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
        }
        else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  })()
}
