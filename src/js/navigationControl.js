import './polyfills/unfetch';
import { el } from './utils/dom';
import Navigation from './components/navigation/Navigation';

(function navigationControl() {
  'use strict';

  var apiAddress = 'https://seulbinim.github.io/EDIYA/api/navigation.json';
  var appNavigationNode = null;
  var openButtonNode = null;

  function init() {
    fetchData(apiAddress);

    appNavigationNode = el('.app-navigation');
    openButtonNode = el('.button.is-open-menu');
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var navigationList = json.data;

        new Navigation(appNavigationNode, {
          list: navigationList,
          templateId: '#template-navigation-list',
          openButton: openButtonNode,
        });
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
