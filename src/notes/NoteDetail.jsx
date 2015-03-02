var React = require('react');
var Bootstrap = require('react-bootstrap');
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var RenderMarkdown = require('./RenderMarkdown.jsx');

module.exports = React.createClass({

  getInitialState: function () {
    return { mode: 'view' };
  },

  render: function() {
    if (this.props.markdown && this.props.markdown.length > 0) {
      return (
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button><Glyphicon glyph="edit" /></Button>
              <Button><Glyphicon glyph="trash" /></Button>
              <Button><Glyphicon glyph="info-sign" /></Button>            
            </ButtonGroup>
          </ButtonToolbar>
          <br/>
          <RenderMarkdown markdown={this.props.markdown} />
        </div>
      );
    }
    return <div/>
  }

});