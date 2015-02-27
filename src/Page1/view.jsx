var React = require('react');

var View1Table = React.createClass({
  render: function() {
    return (
      <table className="table table-bordered table-hover table-condensed">
        <thead>
          <tr>      
            <th>ID</th>
            <th>Status</th>
            <th>Text</th>       
            <th>Description</th>
            <th>Created</th>
            <th>Modified</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(function(row) {
            return <View1Row key={row.id} data={row} />
          })}
        </tbody>
      </table>
    );
  }
});

var View1Row = React.createClass({
  render: function() {
    return (
      <tr>
        <td><a href={"#/details/" + this.props.data.id}>{this.props.data.id}</a></td>
        <td>{this.props.data.status}</td>
        <td>{this.props.data.text}</td>
        <td>{this.props.data.description}</td>
        <td>{this.props.data.created}</td>
        <td>{this.props.data.modified}</td>
        <td>{this.props.data.user}</td>
      </tr>
    );
  }
});

module.exports = React.createClass({  
  render: function() {

    //show loading indicator
    var content;
    if (this.props.data.length > 0)
      content = <View1Table data={this.props.data} />
    else
      content = <span>Loading...</span>    

    return (
      <div className="starter-template">
        <h3>View 1</h3>
        {content}
      </div>
    );
  }
});