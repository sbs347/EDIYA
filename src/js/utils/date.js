/* -----------------------------------------------------
 * 날짜,시간 헬퍼 함수 */

export const getYear = (format = '') => new Date().getFullYear() + format;

export const getMonth = (format = '') => new Date().getMonth() + 1 + format;

export const getDate = (format = '') => new Date().getDate() + format;

export const getDay = (format = '') => {
  let day = new Date().getDay();

  switch (day) {
    case 0: day = '일'; break;
    case 1: day = '월'; break;
    case 2: day = '화'; break;
    case 3: day = '수'; break;
    case 4: day = '목'; break;
    case 5: day = '금'; break;
    case 6: day = '토';
  }

  return day + format;
};

export const getHours = (format = '', ampm) => {
  let hour = Number(new Date().getHours());

  if (ampm) {
    ampm = !ampm ? '' : hour < 12 ? 'AM ' : 'PM ';
    hour = hour >= 12 ? hour - 12 : 12 - hour > 3 ? '0' + hour : hour;
  }
  else { ampm = ''; }

  return ampm + hour + format;
};

export const getMinutes = (format = '') => new Date().getMinutes() + format;

export const getSeconds = (format = '') => new Date().getSeconds() + format;

export const getMilliseconds = (format = '') => new Date().getMilliseconds() + format;

export const getISOString = (format = '') => new Date().toISOString() + format;
