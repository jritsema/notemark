var React = require('react');
var NoteList = require('./NoteList.jsx');
var NoteDetail = require('./NoteDetail.jsx');

//the view component renders the note search/listing and note contents panels
//syncs selected note with NoteDetail
module.exports = React.createClass({

  getInitialState: function() {
    return { 
      selectedNoteIndex: -1, 
      markdown: undefined, 
      note: undefined,
      deleting: false
    };
  },

  noteStateChange: function (notes, selectedIndex) {
    //ask parent for selected note's contents and then update state
    if (notes) {
      var note = notes[selectedIndex];
      if (note) {
        this.props.getNoteContents(note, function (err, contents) {
          if (err) {
            alert("Sorry, there was a problem reading the note: " + err);
            return;
          }
          this.setState({ 
            selectedNoteIndex: selectedIndex,
            markdown: contents, 
            note: note,
            deleting: false
          });
        }.bind(this));        
      }
    }
  },  

  componentWillReceiveProps: function (nextProps) {
    //when the note list changes (search results, add, delete, etc.), 
    //automatically select the first note in the list
    //note that this event should only fire for note list changes
    //since notes in the only data in props
    this.noteStateChange(nextProps.notes, 0);
  },

  //raised by NoteList component when user selects a new note from the list
  selectedNoteChanged: function (selectedIndex) {
    this.noteStateChange(this.props.notes, selectedIndex);
  },

  saveNoteContents: function (newMarkdown, encrypt) {
    //save note, and when complete, update state which causes 
    //NoteDetail component to re-render with new markdown
    if (this.state.note.isNew || 
      ((this.state.markdown !== newMarkdown 
        || this.state.note.encrypted !== encrypt
        || encrypt))) {
      this.props.saveNoteContents(this.state.note, newMarkdown, encrypt, function() {
        this.setState({ markdown: newMarkdown, note: this.state.note });
      }.bind(this));
    }
  }, 

  deleteNote: function () {    
    //HACK: update deleting state (should only be in this state until note list changes, 
    //which happens right after delete (next))
    //should use flux pattern instead
    this.setState({ 
      selectedNoteIndex: this.state.selectedIndex,
      markdown: this.state.contents, 
      note: this.state.note,
      deleting: true
    });

    //bubble up
    this.props.deleteNote(this.state.note);    
  },

  render: function() {

    //is this a new note
    var isNew = false;
    if (this.state.note)
      isNew = this.state.note.isNew;

    return (
      <div className="page">
        <div className="row">
          <div className="col-md-4">
            <NoteList 
              notes={this.props.notes}
              selectedNoteIndex={this.state.selectedNoteIndex}
              selectedNoteChanged={this.selectedNoteChanged}
              newNote={this.props.newNote}
              onSearchTextChanged={this.props.onSearchTextChanged}
              deleting={this.state.deleting}
            />
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
      </div>
    );
  }
});