(function navigationControl() {
  'use strict';

  var appNavigationNode = null;

  function init() {
    appNavigationNode = document.querySelector('.app-navigation');

    fetchData();
  }

  function fetchData() {
    fetch('/api/navigation.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var navigationList = json.data;

        new Navigation(appNavigationNode, {
          list: navigationList,
          templateId: '#template-navigation-list',
        });
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
