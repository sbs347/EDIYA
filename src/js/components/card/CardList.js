import Component from '../Component';
import CardItem from './CardItem';

/**
 * 카드 리스트 컴포넌트
 * @class
 * @extends Component
 */

class CardList extends Component {
  /* 생성자 ---------------------------------------------------------------------- */

  constructor(domNode, options) {
    super();

    if (!domNode || domNode.nodeType !== 1) {
      throw new Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.component = domNode;

    options && this._init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  static defaultOptions = {
    list: [],
    templateId: 'template-id',
  };

  /* 인스턴스 멤버(비공개) ------------------------------------------------------------- */

  _init(options) {
    const { mixins, defaultOptions } = CardList;

    this.options = mixins(defaultOptions, options);
    this.render();
  }

  /* 인스턴스 멤버(공개) -------------------------------------------------------------- */
  render() {
    const { list, templateId } = this.options;

    const template = list.reduce((templ, item) => {
      const cardItem = new CardItem(item, templateId);
      return templ + cardItem.render();
    }, '');

    this.component.innerHTML = template;
  }
}

export default CardList;
