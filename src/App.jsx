var React = require('react');
var Notes = require('./notes/index.jsx');
var About = require('./about/index.jsx');
var Router = require('./router.jsx');

//this navigation is used for configuring both the menu and the routing
var navigation = [
  { id: 1, route: 'notes', display: 'Notes', component: Notes },
  { id: 2, route: 'about', display: 'About', component: About }
];

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

//hook up route handlers
Router.addRoute('', getRouteHandler(0));
for (var i in navigation)
  Router.addRoute(navigation[i].route, getRouteHandler(i));

Router.start();