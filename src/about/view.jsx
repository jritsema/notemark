var React = require('react');
var RenderMarkdown = require('../RenderMarkdown.jsx');
var fs = window.requireNode('fs');

module.exports = React.createClass({

  getInitialState: function() {
    return { markdown: '' };
  },

  componentDidMount: function () {
    //read readme.md markdown to be rendered
    var markdown = fs.readFileSync('./readme.md', { encoding: 'utf-8' });
    this.setState({ markdown: markdown });
  },

  render: function() {
    return (
      <div className="starter-template">
        <RenderMarkdown markdown={this.state.markdown} />
      </div>
    );
  }
});