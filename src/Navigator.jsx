module.exports = (function () {
  'use strict';

  var React = require('react');
  var Router = require('./router.jsx');

  var navigation;

  function renderNav(item) {
    React.render(
      React.createElement(item.component, { 
        navigation: navigation,
        selected: item.route
      }),
      document.body
    );  
  }

  function getRouteHandler(i) {
    return function() { renderNav(navigation[i]); }
  }

  function setNavigation (nav) {
    navigation = nav;

    //hook up route handlers
    Router.addRoute('', getRouteHandler(0));
    for (var i in navigation)
      Router.addRoute(navigation[i].route, getRouteHandler(i));

    Router.start();    
  }

  return {
    setNavigation: setNavigation  
  }

}());