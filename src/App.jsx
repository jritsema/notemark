var React = require('react');
var Notes = require('./notes/index.jsx');
var About = require('./about/index.jsx');
var Navigator = require('./Navigator.jsx');

//this navigation is used for configuring both the menu and the routing
var navigation = [
  { id: 1, route: 'notes', display: 'Notes', component: Notes },
  { id: 2, route: 'about', display: 'About', component: About }
];

Navigator.setNavigation(navigation);