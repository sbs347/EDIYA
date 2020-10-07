import Component from '../Component';

/**
 * 카드 아이템 컴포넌트
 * @class
 * @extends Component
 */
class CardItem extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(itemData, templateId) {
    super();

    this.item = itemData;
    this.templateId = templateId;

    this.state = {
      open: false,
    };

    this._init();
  }

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _init() {
    const { getNode } = CardItem;
    const { templateId } = this;

    this.template = getNode(templateId).textContent;

    this.render();

    window.setTimeout(this._bindEvents.bind(this));
  }

  _bindEvents() {
    const { getNode, on } = CardItem;
    const { item: { id } } = this;

    this.itemNode = getNode(`[data-id="${id}"]`);

    this.button = getNode('[role="button"]', this.itemNode);

    on(this.button, 'click', this.handleOpen.bind(this));

    this.dialog = getNode('[role="dialog"]', this.itemNode);
    this.closeButton = getNode('.is-close-panel', this.dialog);
    on(this.closeButton, 'click', this.handleClose.bind(this));
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */

  render() {
    const { item } = this;
    const { id, figure, detail } = item;
    const { display_criteria: criteria } = detail;

    this.template = this.template.replace(/{id}/g, id);
    this.template = this.template.replace(/{figure.name}/g, figure.name);
    this.template = this.template.replace(/{figure.src}/g, figure.src);
    this.template = this.template.replace(/{figure.width}/g, figure.width);
    this.template = this.template.replace(/{figure.height}/g, figure.height);
    this.template = this.template.replace(/{detail.ko}/g, detail.ko);
    this.template = this.template.replace(/{detail.en}/g, detail.en);
    this.template = this.template.replace(/{detail.desc}/g, detail.desc);

    const startIndex = this.template.indexOf('{{for}}');
    const endIndex = this.template.indexOf('{{/for}}');

    const criteriaTemplate = this.template.slice(startIndex + 7, endIndex).replace(/\s/g, '');

    const criteriaCode = criteria.reduce((template, item) => {
      template += criteriaTemplate
        .replace(/{criteria.key}/g, item[0])
        .replace(/{criteria.value}/g, item[1]);
      return template;
    }, '');

    var beforeCriteriaCode = this.template.slice(0, startIndex);
    var afterCriteriaCode = this.template.slice(endIndex + 8);
    var renderCode = beforeCriteriaCode + criteriaCode + afterCriteriaCode;

    return renderCode;
  }

  handleOpen(e) {
    e.preventDefault();

    this.setState({ open: true });
    this.openDialog();
  }

  handleClose() {
    this.setState({ open: false });
    this.closeDialog();
  }

  openDialog() {
    const { attr, delay, addClass, show } = CardItem;
    const { button, dialog } = this;

    attr(button, 'aria-pressed', true);
    show(dialog);

    delay(() => addClass(dialog, 'is-active'));
  }

  closeDialog() {
    const { attr, delay, removeClass, hide } = CardItem;
    const { button, dialog } = this;

    attr(button, 'aria-pressed', false);
    removeClass(dialog, 'is-active');

    delay(() => hide(dialog), 400);
  }
}

export default CardItem;
