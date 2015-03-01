var React = require('react');
var Bootstrap = require('react-bootstrap');
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var Input = Bootstrap.Input;

module.exports = React.createClass({

  getInitialState: function () {
    return { selected: -1 };
  },

  handleSelect: function (selectedKey) {
    //state change caues re-render
    this.setState({ selected: selectedKey });

    //notify parent
    this.props.selectedNoteChanged(this.props.notes[selectedKey]);
  },
  
  render: function() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Search"
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class" />

        <Nav bsStyle="pills" stacked activeKey={this.state.selected} onSelect={this.handleSelect}>
          {this.props.notes.map(function(note) {
            return (
              <NavItem eventKey={note.id} title={note.name}>
                {note.name}
              </NavItem>
            );
          }, this)}        
        </Nav>
      </div>      
    );
  }
});