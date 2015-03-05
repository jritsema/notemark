var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');
var NoteData = require('./NoteData.jsx');

//the page component renders the menu and the view and handles data access
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

  saveNoteContents: function (note, newMarkdown, callback) {
    NoteData.saveNoteContents(note, newMarkdown, callback);
  },

  //pass data down into child components (note list and methods to get/save note contents)
  render: function() {
    return (
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View 
          notes={this.state.notes} 
          getNoteContents={this.getNoteContents} 
          saveNoteContents={this.saveNoteContents} />
      </div>
    );
  }
});