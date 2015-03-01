var React = require('react');
var Bootstrap = require('react-bootstrap');

module.exports = React.createClass({

  render: function() {
    return (
      <pre>{this.props.markdown}</pre>
    );
  }
});