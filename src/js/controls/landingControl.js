import landingSvgImgPath from '../../images/landing-brand.svg';

/* -------------------------------------------------------------------------- */

// 템플릿
let templateLanding = /* html */ `
  <figure class="landing-cover" style="{landingStyle}">
    <img src="${landingSvgImgPath}" alt />
  </figure>
`;

/* -------------------------------------------------------------------------- */

const HIDE_TIME = 1400;

const { setTimeout } = window;

const landingStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  background: #24388D;
  transition: all 0.84s ease;
`;

let landingCover = null;

// 초기화 함수
function init() {
  templateLanding = templateLanding.replace(/{landingStyle}/, landingStyle);

  document.body.insertAdjacentHTML('afterbegin', templateLanding);
  landingCover = document.querySelector('.landing-cover');
}

function hideLandingCover() {
  landingCover.style.opacity = 0;
  landingCover.addEventListener('transitionend', handleRemoveLandingCover);
}

function handleRemoveLandingCover() {
  this.remove();
}

setTimeout(hideLandingCover, HIDE_TIME);

init();
