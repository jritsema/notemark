var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;

module.exports = React.createClass({
  render: function() {
    return (
      <Navbar brand="React Bootstrap App">
        <Nav>
          {this.props.navigation.map(function(item) {
            return (
              <NavItem key={item.id} eventKey={item.id} href={'#' + item.route} active={item.route === this.props.selected}>
                {item.display}
              </NavItem>
            );
          }, this)}
        </Nav>
      </Navbar>
    );
  }
});
