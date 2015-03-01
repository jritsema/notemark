var React = require('react');
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;
var marked = require('marked');

module.exports = React.createClass({

  render: function() {
    if (this.props.markdown && this.props.markdown.length > 0) {
      var rawMarkup = marked(this.props.markdown);
      return (
        <Panel>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </Panel>
      );
    }
    return <div/>
  }
});