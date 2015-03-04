var React = require('react');
var marked = require('marked');

module.exports = React.createClass({

  render: function() {
    if (this.props.markdown && this.props.markdown.length > 0) {
      var rawMarkup = marked(this.props.markdown);
      return (
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      );
    }
    return <div />
  }
});