var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      notesDirectory: 'foo' 
    };
  },

  onChange: function (event) {
    this.setState({ 
      notesDirectory: event.target.value 
    });
  },  

  render: function() {
    return (
      <div className="page">
        <form className="form-horizontal">
          <Input 
            type="text" 
            label="Notes Directory" 
            value={this.state.notesDirectory}
            onChange={this.onChange} 
            labelClassName="col-xs-2" 
            wrapperClassName="col-xs-8" />
        </form>
      </div>
    );
  }
});