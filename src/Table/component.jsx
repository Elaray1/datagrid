import React, { Component } from "react";

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortedColumns: {
        firstName: 0,
        lastName: 0,
        username: 0,
        email: 0,
        isWorking: 0,
        position: 0,
        state: 0,
      },
      priority: [],
    }
  }

  renderUsers(user, index) {
    const tdInfo = user.map((el, i) => <td key={i + 100 * 10}>{el}</td>);
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        {tdInfo}
      </tr>
    );
  }

  componentWillMount() {
    this.props.setUsersInfo();
  }

  sort = (column) => {
    switch (column) {
      case 0:
        this.state.sortedColumns.firstName === 2 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...prevState.sortedColumns,
              firstName: 0,
            }
          }
        }) :
        this.state.sortedColumns.firstName === 1 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...prevState.sortedColumns,
              firstName: 2,
            }
          }
        }) :
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...prevState.sortedColumns,
              firstName: 1,
            }
          }
        });
        break;
    case 1:
      this.state.sortedColumns.lastName === 2 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            lastName: 0,
          }
        }
      }) :
      this.state.sortedColumns.lastName === 1 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            lastName: 2,
          }
        }
      }) :
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            lastName: 1,
          }
        }
      });
      break;
    case 2:
      this.state.sortedColumns.username === 2 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            userName: 0,
          }
        }
      }) :
      this.state.sortedColumns.username === 1 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            username: 2,
          }
        }
      }) :
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            username: 1,
          }
        }
      });
      break;
    case 3:
      this.state.sortedColumns.email === 2 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            email: 0,
          }
        }
      }) :
      this.state.sortedColumns.email === 1 ?
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            email: 2,
          }
        }
      }) :
      this.setState((prevState) => {
        return {
          sortedColumns: {
            ...prevState.sortedColumns,
            email: 1,
          }
        }
      });
      break;
      default:
        throw new Error('Incorrect column');
    }
    this.setState((prevState) => {
      return {
        priority: [...this.state.priority, column]
      }
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, [...this.state.priority, column]); });
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={this.sort.bind(this, 0)}>
              First Name {(this.state.sortedColumns.firstName === 1 && <>&#9660;</>) || (this.state.sortedColumns.firstName === 2 && <>&#9650;</>)}
            </th>
            <th onClick={this.sort.bind(this, 1)}>
              Last Name {(this.state.sortedColumns.lastName === 1 && <>&#9660;</>) || (this.state.sortedColumns.lastName === 2 && <>&#9650;</>)}
            </th>
            <th onClick={this.sort.bind(this, 2)}>
              Username {(this.state.sortedColumns.username === 1 && <>&#9660;</>) || (this.state.sortedColumns.username === 2 && <>&#9650;</>)}
            </th>
            <th onClick={this.sort.bind(this, 3)}>
              Email {(this.state.sortedColumns.email === 1 && <>&#9660;</>) || (this.state.sortedColumns.email === 2 && <>&#9650;</>)}
            </th>
            <th>Is working</th>
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
