var React = require('react');
var NoteList = require('./NoteList.jsx');

module.exports = React.createClass({

  render: function() {

    // //show loading indicator
    // var content;
    // if (this.props.data.length > 0)
    //   content = <View1Table data={this.props.data} />
    // else
    //   content = <span>Loading...</span>    

    return (
      <div className="starter-template">
        <NoteList />
      </div>
    );
  }
});