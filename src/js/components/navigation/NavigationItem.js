import mixins from '../../utils/mixins';

var location = window.location;

/* 생성자 ---------------------------------------------------------------------- */

function NavigationItemClass(itemData, templateId) {
  this.data = itemData;
  this.templateId = templateId;
  this.init();
}

/* 클래스 멤버 ------------------------------------------------------------------- */

NavigationItemClass.mixins = mixins;
NavigationItemClass.defaultOptions = {};

/* 인스턴스 멤버 ------------------------------------------------------------------ */

function init() {
  this.template = document.querySelector(this.templateId).textContent.trim();
  return this;
}

function render() {
  var item = this.data;

  this.template = this.template.replace(/{item.id}/g, item.id);
  this.template = this.template.replace(/{item.link}/g, item.link);
  this.template = this.template.replace(/{item.text}/g, item.text);

  if (this.isCurrentPage()) {
    this.template = this.template.replace(/\<li/, '<li class="is--selected"');
  }

  return this.template;
}

function isCurrentPage() {
  return location.href.indexOf(this.data.link) > -1;
}

Object.defineProperties(NavigationItemClass.prototype, {
  init: { value: init },
  render: { value: render },
  isCurrentPage: { value: isCurrentPage },
});

export default NavigationItemClass;
