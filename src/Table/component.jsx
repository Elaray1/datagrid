import React, { Component } from "react";
import Select from 'react-select';
import ToggleButton from 'react-toggle-button';

import { FixedSizeList } from 'react-window';


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReactWindow: true,
      toggleButton: false,
      prePositionInfo: ['Junior', 'Middle', 'Senior'].map((el) => {
        return { value: el, label: el };
      }),
      textFilter: '',
      sortedColumns: {
        firstName: 0,
        lastName: 0,
        username: 0,
        email: 0,
        isWorking: 0,
        position: ['Junior', 'Middle', 'Senior'],
        state: 0,
      },
      priority: [],
      searchOptions: ['0'],
    };
    this.resetSortedColumns = {
      firstName: 0,
      lastName: 0,
      username: 0,
      email: 0,
      isWorking: 0,
      position: ['Junior', 'Middle', 'Senior'],
      state: 0,
    };
    this.defaultSearchOptions = [ { value: 'firstName', label: 'firstName' } ];
    this.positionColumnRef = React.createRef();
    this.searchSelectRef = React.createRef();
    this.positionsSelectRef = React.createRef();
    this.searchInputRef = React.createRef();
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

  getColumnsArr = () => {
    const arr = [];
    for (let key in this.state.sortedColumns) {
      arr.push(key);
    }
    const options = arr.map((el, i) => {
      return { value: i, label: el };
    });
    return options;
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
                username: 0,
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
                  position: this.positionColumnRef.current.value,
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
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton); });
  }

  textFilterChange = (event) => {
    this.setState({
      textFilter: event.target.value,
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton) });
  }

  isInputBlocked = (event) => {
    if (event === null) {
      this.setState({
        textFilter: '',
        searchOptions: event
      }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton) });
      this.searchInputRef.current.setAttribute('disabled', true);
      return;
    }
    this.searchInputRef.current.removeAttribute('disabled');
    this.setState({
      searchOptions: event.map((obj) => obj.value)
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton) });
  }

  selectPositions = (event) => {
    if (event !== null) {
      this.resetSortedColumns = {
        ...this.resetSortedColumns,
        position: event.map((el) => el.value)
      }
      this.setState({
        prePositionInfo: event,
        sortedColumns: {
          ...this.state.sortedColumns,
          position: event.map((el) => el.value)
        },
      }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton) });
    }
  }

  render() {
    const items = this.props.users

    const Row = ({ index, style }) => (
        <tr key={index} style={style} className="tableRow">
          <th scope="row">{index + 1}</th>
          {items[index].map((el, i) => <td key={i + 100 * 10}>{el}</td>)}
        </tr>
    );

    const ListComponent = () => (
      <FixedSizeList
        height={400}
        width={1000}
        itemSize={40}
        itemCount={items.length}
      >
        {Row}
      </FixedSizeList>
    );

    const TableContent = () => {
      return !this.state.isReactWindow ?
      <table className="table table-hover">
        <thead>
          <tr className="tableRow">
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
            <th onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Is working {(this.state.sortedColumns.isWorking === 1 && <>&#9660;</>) || (this.state.sortedColumns.isWorking === 2 && <>&#9650;</>)}
            </th>
            <th>
              Position
            </th>
            <th onClick={this.sort.bind(this, 6)}>
              State {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
            </th>
          </tr>
        </thead>
        <tbody>
          {!this.props.users ? null
            : this.props.users.map((user, i) => this.renderUsers(user, i))}
        </tbody>
      </table>
      :
      <>
      <table className="table table-hover">
        <thead>
          <tr className="tableRow">
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
            <th onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Is working {(this.state.sortedColumns.isWorking === 1 && <>&#9660;</>) || (this.state.sortedColumns.isWorking === 2 && <>&#9650;</>)}
            </th>
            <th>
              Position
            </th>
            <th onClick={this.sort.bind(this, 6)}>
              State {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
            </th>
          </tr>
        </thead>
      </table>
      <table className="table table-hover">
        <tbody>
          <ListComponent />
        </tbody>
      </table>
      </>
    }
    return (
      <div>
        <div>
          <label>
            Text filter:
          <input
            ref={this.searchInputRef}
            type="text"
            value={this.state.textFilter}
            onChange={this.textFilterChange}
          />
          </label>
          <Select
            ref={this.searchSelectRef}
            isMulti
            defaultValue={[this.getColumnsArr()[0]]}
            name="columns"
            options={this.getColumnsArr()}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.isInputBlocked}
          />
        </div>
        <ToggleButton
          inactiveLabel={'OFF'}
          activeLabel={'ON'}
          value={this.state.toggleButton}
          onToggle={(value) => {
            this.setState({
              toggleButton: !this.state.toggleButton,
              sortedColumns: {
                ...this.state.sortedColumns,
                isWorking: 0,
              }
            }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton) });
          }} />
          <ToggleButton
            inactiveLabel={'OFF'}
            activeLabel={'ON'}
            value={this.state.isReactWindow}
            onToggle={(value) => {
              this.setState({
                isReactWindow: !this.state.isReactWindow,
              });
            }} />
          <Select
            ref={this.positionsSelectRef}
            isMulti
            name="position"
            options={['Junior', 'Middle', 'Senior'].map((el) => {
              return { value: el, label: el };
            })}
            value={this.state.prePositionInfo}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.selectPositions}
          />
          <TableContent />
      </div>
    );
  }
}

export default Table;
