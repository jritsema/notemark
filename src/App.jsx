var React = require('react');
var Navigator = require('./Navigator.jsx');
var Notes = require('./notes/index.jsx');
var About = require('./about/index.jsx');
var Options = require('./options/index.jsx');

//this navigation is used for configuring both the menu and the routing
var navigation = [
  { id: 1, route: 'notes', display: 'Notes', component: Notes },
  { id: 2, route: 'options', display: 'Options', component: Options },
  { id: 3, route: 'about', display: 'About', component: About }  
];

Navigator.setNavigation(navigation);