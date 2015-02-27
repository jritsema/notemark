var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');

module.exports = React.createClass({  
  render: function() {
    return (     
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View />
      </div>
    );
  }
});