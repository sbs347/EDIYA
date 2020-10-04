import { el } from './utils/dom';
import GoToTop from './components/goToTop/GoToTop';

function init() {
  var appHeader = el('.app-header');

  new GoToTop({
    targetTop: appHeader.getBoundingClientRect().bottom,
  });
}

window.addEventListener('DOMContentLoaded', init);
