var React = require('react');
var Bootstrap = require('react-bootstrap');
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var PleaseWait = require('../PleaseWait.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return { searchText: '' };
  },

  componentWillReceiveProps: function(nextProps) {
    //HACK: get delete event message from parent and clear search text
    //need to rewrite using flux pattern
    if (nextProps.deleting)
      this.setState({ searchText: '' });
  },

  onSearchTextChange: function (event) {
    //update ui
    var searchText = event.target.value;
    this.setState({ searchText: searchText });

    //bubble up event
    this.props.onSearchTextChanged(searchText);
  },

  newNote: function () {
    //clear search text and bubble up
    this.setState({ searchText: '' });
    this.props.newNote();
  },

  render: function () {

    //this.props.notes is undefined while component is loading
    //this.props.notes.length === 0, if no notes are found in the notes directory
    //or no notes matching the search criteria
    var noteListing = <PleaseWait />
    if (this.props.notes) {
      if (this.props.notes.length > 0) {
        noteListing = (
          <Nav 
            bsStyle="pills" 
            stacked 
            activeKey={this.props.selectedNoteIndex} 
            onSelect={this.props.selectedNoteChanged}>

            {this.props.notes.map(function(note) {
              return (
                <NavItem key={note.id} eventKey={note.id} title={note.path}>
                  {note.name}
                </NavItem>
              );
            }, this)}        
          </Nav>
        );
      }
      else
        noteListing = <span>No notes found</span>
    }

    return (
      <div>

        <div>
          <Button bsStyle="link" onClick={this.newNote}>New</Button>
        </div>

        <Input
          type="text"
          placeholder="Search"
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class"
          value={this.state.searchText}
          onChange={this.onSearchTextChange}
        />

        {noteListing}

      </div>      
    );
  }
});