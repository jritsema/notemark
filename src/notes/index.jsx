var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');
var NoteData = require('./NoteData.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return { notes: [] };
  },  

  componentDidMount: function() {
    NoteData.getNotes(function(notes) {
      this.setState({ notes: notes });
    }.bind(this));
  },

  getNoteContents: function (note, callback) {
    NoteData.getNoteContents(note, callback);
  },

  render: function() {
    return (
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View notes={this.state.notes} getNoteContents={this.getNoteContents} />
      </div>
    );
  }
});