var React = require('react');
var Menu = require('../menu.jsx');
var View = require('./view.jsx');
var NoteData = require('./NoteData.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return { notes: [] };
  },  

  componentDidMount: function() {
    this.setState({ notes: NoteData.getNotes() });
  },  

  render: function() {
    return (
      <div>
        <Menu navigation={this.props.navigation} selected={this.props.selected} />
        <View notes={this.state.notes} />
      </div>
    );
  }
});