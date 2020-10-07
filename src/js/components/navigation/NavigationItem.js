import Component from '../Component';

const { location } = window;

/**
 * 앱 내비게이션 아이템 컴포넌트
 * @class
 * @extends Component
 */
class NavigationItem extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(itemData, templateId, activeClass = 'is--selected') {
    super();

    this.data = itemData;
    this.templateId = templateId;
    this.activeClass = activeClass;

    this._init();
  }

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _init() {
    const { getNode } = NavigationItem;

    this.template = getNode(this.templateId).textContent.trim();

    return this;
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  render() {
    const { id, link, text } = this.data;

    this.template = this.template.replace(/{item.id}/g, id);
    this.template = this.template.replace(/{item.link}/g, link);
    this.template = this.template.replace(/{item.text}/g, text);

    if (this.isCurrentPage()) {
      this.template = this.template.replace(/\<li/, `<li class="${this.activeClass}"`);
    }

    return this.template;
  }

  isCurrentPage() {
    return location.href.includes(this.data.link);
  }
}

export default NavigationItem;
