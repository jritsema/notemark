var React = require('react');
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var RenderMarkdown = require('../RenderMarkdown.jsx');
var EditMarkdown = require('./EditMarkdown.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return { view: true };
  },

  //reset the initial state (switch back to view mode) when 
  //the input data changes (i.e., this.props.markdown)
  //except, default to edit mode for new notes
  componentWillReceiveProps: function (nextProps) {
    if (nextProps && nextProps.isNew)
      this.setState({ view: false });
    else
      this.setState(this.getInitialState());
  },

  onModeChange: function() {
    //save note when changing from edit back to view mode
    if (!this.state.view) {
      //get edited content and raise event
      var newMarkdown = this.refs.editor.getValue();
      this.props.saveNoteContents(newMarkdown);
    }

    //toggle state    
    this.setState({ view: !this.state.view});
  },

  onDelete: function () {
    if (confirm('are you sure?'))
      this.props.onDelete();
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
        modeComponent = <EditMarkdown ref="editor" markdown={this.props.markdown} />
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
          <br />
          <Panel>
            {modeComponent}
          </Panel>
        </div>
      );
    }

    //no markdown supplied, just show blank
    return <div />
  }
});