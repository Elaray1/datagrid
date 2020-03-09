import React, { Component } from "react";

class Table extends Component {

  constructor(props) {
    super(props);
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
    };
    this.resetSortedColumns = {
      firstName: 0,
      lastName: 0,
      username: 0,
      email: 0,
      isWorking: 0,
      position: 0,
      state: 0,
    };
    this.positionColumnRef = React.createRef();
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

  sort = (column, e) => {
    const columnsArr = e.shiftKey ? this.state.sortedColumns : this.resetSortedColumns;
    switch (column) {
      case 0:
        this.state.sortedColumns.firstName === 2 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
              firstName: 0,
            }
          }
        }) :
        this.state.sortedColumns.firstName === 1 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
              firstName: 2,
            }
          }
        }) :
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
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
                ...columnsArr,
                lastName: 0,
              }
            }
          }) :
          this.state.sortedColumns.lastName === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                lastName: 2,
              }
            }
          }) :
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
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
                ...columnsArr,
                userName: 0,
              }
            }
          }) :
          this.state.sortedColumns.username === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                username: 2,
              }
            }
          }) :
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
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
                ...columnsArr,
                email: 0,
              }
            }
          }) :
          this.state.sortedColumns.email === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                email: 2,
              }
            }
          }) :
          this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  email: 1,
                }
              }
            });
            break;
          case 4:
            this.state.sortedColumns.isWorking === 2 ?
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  isWorking: 0,
                }
              }
            }) :
            this.state.sortedColumns.isWorking === 1 ?
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  isWorking: 2,
                }
              }
            }) :
            this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    isWorking: 1,
                  }
                }
              });
              break;
          case 5:
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  isWorking: this.positionColumnRef.current.value,
                }
              }
            });
            break;
            case 6:
              this.state.sortedColumns.state === 2 ?
              this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    state: 0,
                  }
                }
              }) :
              this.state.sortedColumns.state === 1 ?
              this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    state: 2,
                  }
                }
              }) :
              this.setState((prevState) => {
                  return {
                    sortedColumns: {
                      ...columnsArr,
                      state: 1,
                    }
                  }
                });
                break;
          default:
            throw new Error('Incorrect column');
    }
    const a = e.shiftKey;
    this.setState((prevState) => {
      return {
        priority: a ? [...this.state.priority, column] : [column]
      }
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority); });
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
            <th onClick={this.sort.bind(this, 4)}>
              Is working {(this.state.sortedColumns.isWorking === 1 && <>&#9660;</>) || (this.state.sortedColumns.isWorking === 2 && <>&#9650;</>)}
            </th>
            <th>
                <label htmlFor="positionSelect">Position</label>
                <select ref={this.positionColumnRef} className="form-control" id="positionSelect" onChange={this.sort.bind(this, 5)}>
                  <option value="-">-</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                </select>
            </th>
            <th onClick={this.sort.bind(this, 6)}>
              State {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
            </th>
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
