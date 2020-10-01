(function Navigation() {
  'use strict';

  /* 생성자 ---------------------------------------------------------------------- */

  function NavigationClass(navigationNode, options) {
    if (!navigationNode || navigationNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.component = navigationNode;

    if (options) {
      this.init(options);
    }
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  NavigationClass.mixins = mixins;
  NavigationClass.defaultOptions = {
    list: [],
    templateId: '#template-id',
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = NavigationClass.mixins(NavigationClass.defaultOptions, options);
    this.render();
  }

  function render() {
    var listData = this.options.list;
    var templateId = this.options.templateId;

    var navigationItemsCode = listData
      .map(function(itemData) {
        var itemComponent = new NavigationItem(itemData, templateId);
        return itemComponent.render();
      })
      .join('');

    this.component.querySelector('ul').innerHTML = navigationItemsCode;
  }

  Object.defineProperties(NavigationClass.prototype, {
    init: { value: init },
    render: { value: render },
  });

  window.Navigation = NavigationClass;
})();
