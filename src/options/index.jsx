var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');
var NoteData = require('../NoteData.jsx');

module.exports = React.createClass({

  save: function (options) {
    NoteData.setNotesDirectory(options.notesDirectory);
  },

  render: function() {
    return (     
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View 
          notesDirectory={NoteData.getNotesDirectory()} 
          save={this.save} />
      </div>
    );
  }
});