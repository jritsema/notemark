var React = require('react');
var Bootstrap = require('react-bootstrap');
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;

module.exports = React.createClass({
  
  render: function () {
    return (
      <div>
        <div>
          <Button bsStyle="link" onClick={this.props.newNote}>New</Button>
        </div>
        <Input
          type="text"
          placeholder="Search"
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class" />

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
      </div>      
    );
  }
});