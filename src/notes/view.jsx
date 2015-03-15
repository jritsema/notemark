var React = require('react');
var NoteList = require('./NoteList.jsx');
var NoteDetail = require('./NoteDetail.jsx');
var PleaseWait = require('../PleaseWait.jsx');

//the view component renders the note search/listing and note contents panels
//syncs selected note with NoteDetail
module.exports = React.createClass({

  getInitialState: function() {
    return { 
      selectedNoteIndex: -1, 
      markdown: undefined, 
      note: undefined 
    };
  },

  selectedNoteChanged: function (selectedIndex) {
    //ask parent to fetch new selected note's contents
    //and then update state to cause child NoteList and NoteDetail to re-render
    var note = this.props.notes[selectedIndex];
    this.props.getNoteContents(note, function (contents) {

      this.setState({ 
        selectedNoteIndex: selectedIndex,
        markdown: contents, 
        note: note 
      });

    }.bind(this));
  },

  saveNoteContents: function (newMarkdown) {
    //save note, and when complete, update state which causes 
    //NoteDetail component to re-render with new markdown
    if (this.state.note.isNew || (this.state.markdown !== newMarkdown)) {
      this.props.saveNoteContents(this.state.note, newMarkdown, function() {
        this.setState({ markdown: newMarkdown, note: this.state.note });
      }.bind(this));
    }
  },

  newNote: function () {
    //notify parent, then select new note
    this.props.newNote();
    this.selectedNoteChanged(0);
  },

  deleteNote: function () {
    this.props.deleteNote(this.state.note);
    this.selectedNoteChanged(0);
  },

  render: function() {

    //is this a new note
    var isNew = false;
    if (this.state.note)
      isNew = this.state.note.isNew;

    //show loading indicator
    var content = <PleaseWait />

    //when there's data...
    if (this.props.notes.length > 0) {
      content = 
      <div className="row">
        <div className="col-md-4">
          <NoteList 
            notes={this.props.notes} 
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectedNoteChanged={this.selectedNoteChanged}
            newNote={this.newNote} />
        </div>
        <div className="col-md-8">
          <NoteDetail 
            markdown={this.state.markdown} 
            note={this.state.note}
            saveNoteContents={this.saveNoteContents}
            isNew={isNew}
            onDelete={this.deleteNote} />
        </div>
      </div> 
    }

    return (
      <div className="page">
        {content}
      </div>
    );
  }
});