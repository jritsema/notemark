var React = require('react');
var NoteList = require('./NoteList.jsx');
var NoteDetail = require('./NoteDetail.jsx');
var PleaseWait = require('../PleaseWait.jsx');

//the view component renders the note search/listing and note contents panels
//syncs selected note with NoteDetail
module.exports = React.createClass({

  getInitialState: function() {
    return { markdown: undefined, note: undefined };
  },

  selectedNoteChanged: function (note) {
    //re-render NoteDetail component with selected note's markdown
    this.props.getNoteContents(note, function (contents) {
      this.setState({ markdown: contents, note: note });
    }.bind(this));
  },

  saveNoteContents: function (newMarkdown) {
    //save note, and when complete, update state which causes 
    //NoteDetail component to re-render with new markdown
    this.props.saveNoteContents(this.state.note, newMarkdown, function() {
      this.setState({ markdown: newMarkdown, note: this.state.note });
    }.bind(this));
  },

  render: function() {

    //show loading indicator
    var content = <PleaseWait />

    //when there's data...
    if (this.props.notes.length > 0) {
      content = 
      <div className="row">
        <div className="col-md-4">
          <NoteList 
            notes={this.props.notes} 
            selectedNoteChanged={this.selectedNoteChanged} />
        </div>
        <div className="col-md-8">
          <NoteDetail 
            markdown={this.state.markdown} 
            note={this.state.note}
            saveNoteContents={this.saveNoteContents} />
        </div>
      </div> 
    }

    return (
      <div className="starter-template">
        {content}
      </div>
    );
  }
});