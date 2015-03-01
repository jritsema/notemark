var React = require('react');

module.exports = React.createClass({
  
  render: function() {
    return (
      <ul>
        {this.props.notes.map(function(note) {
          return <li>{note.name}</li>
        })}
      </ul>
    );
  }
});