var React = require('react');
var AceEditor = require('./AceEditor.jsx');

module.exports = React.createClass({

  getValue: function() {
    return this.refs.noteEditor.getValue();
  },

  render: function() {
    return (
      <AceEditor
        ref="noteEditor" 
        name="noteEditor"
        theme="textmate"
        mode="markdown"
        tabSize="2"
        fontSize="18px"
        width="700px"
        height="550px"        
        highlightActiveLine={false}
        wordWrap={true}
        value={this.props.markdown}
      />      
    );
  }
});