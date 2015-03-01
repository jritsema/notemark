var React = require('react');
var Bootstrap = require('react-bootstrap');
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;

module.exports = React.createClass({

  getInitialState: function () {
    return { selected: 0 };
  },

  handleSelect: function (selectedKey) {
    this.setState({ selected: selectedKey });
  },
  
  render: function() {
    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.selected} onSelect={this.handleSelect}>
        {this.props.notes.map(function(note) {
          return (
            <NavItem eventKey={note.id} title="Item">
              {note.name}
            </NavItem>
          );
        }, this)}        
      </Nav>      
    );
  }
});