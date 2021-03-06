var React = require('react');
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var RenderMarkdown = require('../RenderMarkdown.jsx');
var EditMarkdown = require('./EditMarkdown.jsx');
var os = window.requireNode('os');

module.exports = React.createClass({

  getInitialState: function() {
    return { view: true, lock: false };
  },

  //reset the initial state (switch back to view mode) when 
  //the input data changes (i.e., this.props.markdown)
  //except, default to edit mode for new notes
  componentWillReceiveProps: function (nextProps) {
    if (nextProps) {
      if (nextProps.isNew) {
        this.setState({ view: false });
      }
      else if (nextProps.note) {
        //bind lock state to note's encrypted property
        this.setState({ lock: nextProps.note.encrypted });
      }
    }
    else
      this.setState(this.getInitialState());
  },

  onModeChange: function() {
    //save note when changing from edit back to view mode
    if (!this.state.view) {
      //get edited content and raise event
      var newMarkdown = this.refs.editor.getValue();
      this.props.saveNoteContents(newMarkdown, this.state.lock);
    }

    //toggle state    
    this.setState({ view: !this.state.view});
  },

  onDelete: function () {
    if (confirm('are you sure?'))
      this.props.onDelete();
  },

  onInfo: function () {
    var note = this.props.note;
    alert(
      'name: ' + note.name + os.EOL + os.EOL +
      'path: ' + note.path + os.EOL + os.EOL +
      'created: ' + note.created + os.EOL + os.EOL +
      'modified: ' + note.modified + os.EOL + os.EOL +
      'encrypted: ' + note.encrypted
    );
  },

  onLock: function() {
    this.setState({ lock: !this.state.lock });
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

      //lock icon is only enabled when in edit mode
      return (
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={this.onModeChange}>{modeButton}</Button>
              <Button onClick={this.onDelete}><Glyphicon glyph="trash" /></Button>
              <Button onClick={this.onInfo}><Glyphicon glyph="info-sign" /></Button>
              <Button disabled={this.state.view} active={this.state.lock} onClick={this.onLock}><Glyphicon glyph="lock" /></Button>
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