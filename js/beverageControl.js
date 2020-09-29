;(function beverageControl() {
  'use strict'

  var ediyaMenuList = null

  function init() {
    ediyaMenuList = document.querySelector('.ediya-menu')

    fetchData('https://seulbinim.github.io/EDIYA/api/ediya.json')
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        var beverage = json.data.beverages
        render(beverage)
      })
      .catch(function(error) {
        console.error(error.message)
      })
  }

  function render(beverages) {
    new CardList(ediyaMenuList, {
      list: beverages,
      templateId: '#template-ediya-menu__item',
    })
  }

  window.addEventListener('DOMContentLoaded', init)
})()
