var React = require('react');
var NoteList = require('./NoteList.jsx');

module.exports = React.createClass({

  render: function() {

    //show loading indicator
    var content = <span>Loading...</span>   
    if (this.props.notes.length > 0)
      content = <NoteList notes={this.props.notes} />

    return (
      <div className="starter-template">
        {content}
      </div>
    );
  }
});