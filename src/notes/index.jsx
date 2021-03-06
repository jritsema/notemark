var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');
var NoteData = require('../NoteData.jsx');

//the page component renders the menu and the view and handles data access
module.exports = React.createClass({

  getInitialState: function() {
    return { notes: undefined };
  },

  updateNotes: function (notes) {
    this.setState({ notes: notes });
  },

  componentDidMount: function() {
    NoteData.getNotes(this.updateNotes);
  },

  newNote: function () {
    this.updateNotes(NoteData.addNote());
  },

  deleteNote: function (note) {
    this.updateNotes(NoteData.deleteNote(note));
  },

  onSearchTextChanged: function (searchText) {
    NoteData.search(searchText, this.updateNotes);
  },

  //pass data down into child components (note list and methods to get/save note contents)
  render: function() {
    return (
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View 
          notes={this.state.notes} 
          getNoteContents={NoteData.getNoteContents} 
          saveNoteContents={NoteData.saveNoteContents}
          newNote={this.newNote}
          deleteNote={this.deleteNote} 
          onSearchTextChanged={this.onSearchTextChanged}
        />
      </div>
    );
  }
});