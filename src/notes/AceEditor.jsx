var React = require('react');
var ace = require('brace');

require('brace/theme/monokai');
require('brace/theme/github');
require('brace/theme/tomorrow');
require('brace/theme/kuroir');
require('brace/theme/twilight');
require('brace/theme/xcode');
require('brace/theme/textmate');
require('brace/theme/terminal');
require('brace/theme/solarized_dark');
require('brace/theme/solarized_light');

//include as many of the libraries
require('brace/mode/javascript');
require('brace/mode/java');
require('brace/mode/php');
require('brace/mode/python');
require('brace/mode/xml');
require('brace/mode/ruby');
require('brace/mode/sass');
require('brace/mode/markdown');
require('brace/mode/mysql');
require('brace/mode/json');
require('brace/mode/html');
require('brace/mode/handlebars');
require('brace/mode/golang');
require('brace/mode/csharp');
require('brace/mode/coffee');
require('brace/mode/css');

module.exports = React.createClass({

  propTypes: {
    mode  : React.PropTypes.string,
    theme : React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      name: 'brace-editor',
      mode: 'javascript',
      theme: 'monokai',
      height: '500px',
      width: '500px',
      tabSize: 2,
      fontSize: '12px',
      highlightActiveLine: true,
      showPrintMargin: true,
      wordWrap: false,
      value: ''
    };
  },

  //called once
  componentDidMount: function() {

    //activate the editor
    var editor = ace.edit(this.props.name);

    //set initial text value
    editor.setValue(this.props.value);

    //apply our props to ace library
    this.setAceProps(editor, this.props);
  },

  //called after initial render when props change
  componentWillReceiveProps: function (nextProps) {
    //update ace's state here when parent updates properties
    //since the underlying ace library is outside of react
    var editor = ace.edit(this.props.name);
    this.setAceProps(editor, nextProps);
  },

  setAceProps: function (editor, values) {
    var session = editor.getSession();    
    editor.setTheme('ace/theme/' + values.theme);
    session.setMode('ace/mode/' + values.mode);
    editor.setHighlightActiveLine(values.highlightActiveLine);
    session.setTabSize(values.tabSize);
    session.setUseWrapMode(values.wordWrap);
  },  

  //todo: add or replace with valueChanged event
  getValue: function () {
    var editor = ace.edit(this.props.name);
    return editor.getValue();
  },

  render: function() {
    var style = {
      width: this.props.width, 
      height: this.props.height,
      fontSize: this.props.fontSize
    };
    return (
      <div id={this.props.name} style={style} />
    );
  }
});
