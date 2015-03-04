var React = require('react');
var Bootstrap = require('react-bootstrap');
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var RenderMarkdown = require('./RenderMarkdown.jsx');
var EditMarkdown = require('./EditMarkdown.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return { view: true };
  },

  //reset the initial state when the input data changes (i.e., this.props.markdown)
  componentWillReceiveProps: function (nextProps) {
    this.setState(this.getInitialState());
  },

  onModeChange: function() {
    this.setState({ view: !this.state.view});
  },

  onDelete: function () {
    alert('delete');
  },

  onInfo: function () {
    alert('info');
  },

  render: function() {

    if (this.props.markdown && this.props.markdown.length > 0) {

      //view
      var modeComponent = <RenderMarkdown markdown={this.props.markdown} />
      var modeButton = <Glyphicon glyph="edit" />

      //edit
      if (!this.state.view) {
        modeComponent = <EditMarkdown markdown={this.props.markdown} />
        modeButton = <Glyphicon glyph="save" />
      }

      return (
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={this.onModeChange}>{modeButton}</Button>
              <Button onClick={this.onDelete}><Glyphicon glyph="trash" /></Button>
              <Button onClick={this.onInfo}><Glyphicon glyph="info-sign" /></Button>
            </ButtonGroup>
          </ButtonToolbar>
          <br/>
          {modeComponent}
        </div>
      );
    }

    //no markdown supplied, just show blank
    return <div />
  }

});