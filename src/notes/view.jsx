var React = require('react');
var NoteList = require('./NoteList.jsx');
var NoteDetail = require('./NoteDetail.jsx');

//the view component renders the note search/listing and note contents panels
module.exports = React.createClass({

  getInitialState: function() {
    return { markdown: undefined };
  },

  selectedNoteChanged: function (note) {
    //re-render markdown component with selected note's markdown
    this.props.getNoteContents(note, function (contents) {
      this.setState({ markdown: contents });
    }.bind(this));
  },

  render: function() {

    //show loading indicator
    var content = <span>Loading...</span>   

    //when there's data...
    if (this.props.notes.length > 0) {
      content = 
      <div className="row">
        <div className="col-md-4">
          <NoteList notes={this.props.notes} selectedNoteChanged={this.selectedNoteChanged} />
        </div>
        <div className="col-md-8">
          <NoteDetail markdown={this.state.markdown} />
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