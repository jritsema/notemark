var React = require('react');
var NoteList = require('./NoteList.jsx');

module.exports = React.createClass({

  render: function() {

    //show loading indicator
    var content = <span>Loading...</span>   

    //when there's data...
    if (this.props.notes.length > 0) {
      content = 
      <div className="row">
        <div className="col-md-4">
          <NoteList notes={this.props.notes} />
        </div>
        <div className="col-md-8">
          rendered markdown goes here
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