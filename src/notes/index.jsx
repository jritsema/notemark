var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');

var data = [
  { id: 1, status: 'completed', text: '', description: 'item 1', created: new Date(), modified: new Date(), user: 'jritsema' },
  { id: 2, status: 'completed', text: '', description: 'item 2', created: new Date(), modified: new Date(), user: 'jritsema' }
];

module.exports = React.createClass({

  getInitialState: function() {
    return { data: [] };
  },  

  componentDidMount: function() {
    setTimeout(function () {
      this.setState( { data: data } );
    }.bind(this), 2000);
  },  

  render: function() {
    return (
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View data={this.state.data} />
      </div>
    );
  }
});