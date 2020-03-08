import React, { Component } from "react";

class Table extends Component {
  renderUsers(user, index) {
    const tdInfo = user.map((el, i) => <td key={i}>{el}</td>);
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        {tdInfo}
      </tr>
    );
  }

  componentWillMount() {
    this.props.setUsersInfo();
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Premium account</th>
            <th>Position</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {!this.props.users
            ? null
            : this.props.users.map((user, i) => this.renderUsers(user, i))}
        </tbody>
      </table>
    );
  }
}

export default Table;
