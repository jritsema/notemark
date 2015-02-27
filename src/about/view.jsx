var React = require('react');
var gui = window.requireNode('nw.gui');

module.exports = React.createClass({

  getInitialState: function() {
    var manifest = gui.App.manifest;
    return { 
      name: manifest.name,
      description: manifest.description,
      appVersion:  manifest.version
    };
  },

  render: function() {
    return (
      <div className="starter-template">
        <h3>{this.state.name} {this.state.appVersion}</h3>
        <p>{this.state.description}</p>
      </div>
    );
  }
});