import { el } from './utils/dom';
import CardList from './components/card/CardList';

(function beverageControl() {
  'use strict';

  var apiAddress = 'https://seulbinim.github.io/EDIYA/api/beverages.json';
  var ediyaMenuList = null;

  function init() {
    ediyaMenuList = el('.ediya-menu');
    fetchData(apiAddress);
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var beverages = json.data;
        render(beverages);
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  function render(beverages) {
    new CardList(ediyaMenuList, {
      list: beverages,
      templateId: '#template-ediya-menu__item',
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
