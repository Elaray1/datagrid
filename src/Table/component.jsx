import React, { Component } from "react";
import Select from 'react-select';
import ToggleButton from 'react-toggle-button';

import { FixedSizeList } from 'react-window';


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleColumns: {
        '1': true,
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
      },
      color: '#E9967A',
      selectedColumns: [],
      columnsColors: ['white', 'white', 'white', 'white', 'white', 'white', 'white'],
      isReactWindow: false,
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
    if (e.ctrlKey) {
      e.target.classList.toggle('selected-column');
      let arr = this.state.selectedColumns;
      document.querySelectorAll('.selected-column').forEach((el) => (arr.push(+el.getAttribute('id').substr(7))));
      this.setState({
        selectedColumns: arr
      });
      arr.forEach((id) => {
        document.querySelectorAll(`td:nth-child(${id})`).forEach((el) => {
          el.setAttribute('style', 'color: red');
        })
      });
      return;
    } else {
      this.setState({
        selectedColumns: []
      });
      document.querySelectorAll('.selected-column').forEach((el) => {
        el.classList.toggle('selected-column');
      })
    }
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
            return
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

  changeColor = (e) => {
    this.setState({
      color: e.target.value
    });
  }

  changeColumnsColor = () => {
    this.state.selectedColumns.forEach((columnNumber) => {
      const arr = this.state.columnsColors;
      arr.splice(columnNumber, 1, this.state.color);
      this.setState({
        columnsColors: arr
      });
    });
  }

  changeCheckboxValue = (value) => {
    this.setState({
      visibleColumns: {
        ...this.state.visibleColumns,
        [value]: !this.state.visibleColumns[value],
      }
    });
  }

  render() {

    const renderUsers = (user, index) => {
      const tdInfo = user.map((el, i) => this.state.visibleColumns[i+1] ? <td className={i === 0 ? "row-firstName" : "kekw"} key={i + 100 * 10} style={{ color: this.state.columnsColors[i+1] }} >{el}</td> : null);
      return (
        <tr key={index}>
          <th className="row-index" scope="row">{index + 1}</th>
          {tdInfo}
        </tr>
      );
    }

    const items = this.props.users

    const Row = ({ index, style }) => (
        <tr key={index} style={style} className="tableRow">
          <th className="row-index" scope="row">{index + 1}</th>
          {items[index].map((el, i) => this.state.visibleColumns[i+1] ? <td className={i === 0 ? "row-firstName" : "kekw"} key={i + 100 * 10} style={{ color: this.state.columnsColors[i+1] }} >{el}</td> : null)}
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
            <th className="row-index z-index-100">#</th>
            {this.state.visibleColumns['1'] ? <th className="row-index row-firstName z-index-100" id="column-1" style={{ color: this.state.selectedColumns.indexOf(1) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 0)}>
              First Name {(this.state.sortedColumns.firstName === 1 && <>&#9660;</>) || (this.state.sortedColumns.firstName === 2 && <>&#9650;</>)}
            </th> : null}
            {this.state.visibleColumns['2'] ? <th id="column-2" style={{ color: this.state.selectedColumns.indexOf(2) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 1)}>
              Last Name {(this.state.sortedColumns.lastName === 1 && <>&#9660;</>) || (this.state.sortedColumns.lastName === 2 && <>&#9650;</>)}
            </th> : null}
            {this.state.visibleColumns['3'] ? <th id="column-3" style={{ color: this.state.selectedColumns.indexOf(3) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 2)}>
              Username {(this.state.sortedColumns.username === 1 && <>&#9660;</>) || (this.state.sortedColumns.username === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['4'] ? <th id="column-4" style={{ color: this.state.selectedColumns.indexOf(4) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 3)}>
              Email {(this.state.sortedColumns.email === 1 && <>&#9660;</>) || (this.state.sortedColumns.email === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['5'] ? <th id="column-5" style={{ color: this.state.selectedColumns.indexOf(5) !== -1 ? 'red' : 'inherit' }} onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Is working {(this.state.sortedColumns.isWorking === 1 && <>&#9660;</>) || (this.state.sortedColumns.isWorking === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['6'] ? <th id="column-6" style={{ color: this.state.selectedColumns.indexOf(6) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 999)}>
              Position
            </th> : null }
            {this.state.visibleColumns['7'] ? <th id="column-7" style={{ color: this.state.selectedColumns.indexOf(7) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 6)}>
              State {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
            </th> : null }
          </tr>
        </thead>
        <tbody>
          {!this.props.users ? null
            : this.props.users.map((user, i) => renderUsers(user, i, this.state.columnsColors))}
        </tbody>
      </table>
      :
      <>
      <table className="table table-hover">
        <thead>
          <tr className="tableRow">
            <th className="row-index z-index-100">#</th>
            {this.state.visibleColumns['1'] ? <th className="row-index row-firstName z-index-100" id="column-1" style={{ color: this.state.selectedColumns.indexOf(1) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 0)}>
              First Name {(this.state.sortedColumns.firstName === 1 && <>&#9660;</>) || (this.state.sortedColumns.firstName === 2 && <>&#9650;</>)}
            </th> : null}
            {this.state.visibleColumns['2'] ? <th id="column-2" style={{ color: this.state.selectedColumns.indexOf(2) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 1)}>
              Last Name {(this.state.sortedColumns.lastName === 1 && <>&#9660;</>) || (this.state.sortedColumns.lastName === 2 && <>&#9650;</>)}
            </th> : null}
            {this.state.visibleColumns['3'] ? <th id="column-3" style={{ color: this.state.selectedColumns.indexOf(3) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 2)}>
              Username {(this.state.sortedColumns.username === 1 && <>&#9660;</>) || (this.state.sortedColumns.username === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['4'] ? <th id="column-4" style={{ color: this.state.selectedColumns.indexOf(4) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 3)}>
              Email {(this.state.sortedColumns.email === 1 && <>&#9660;</>) || (this.state.sortedColumns.email === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['5'] ? <th id="column-5" style={{ color: this.state.selectedColumns.indexOf(5) !== -1 ? 'red' : 'inherit' }} onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Is working {(this.state.sortedColumns.isWorking === 1 && <>&#9660;</>) || (this.state.sortedColumns.isWorking === 2 && <>&#9650;</>)}
            </th> : null }
            {this.state.visibleColumns['6'] ? <th id="column-6" style={{ color: this.state.selectedColumns.indexOf(6) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 999)}>
              Position
            </th> : null }
            {this.state.visibleColumns['7'] ? <th id="column-7" style={{ color: this.state.selectedColumns.indexOf(7) !== -1 ? 'red' : 'inherit' }} onClick={this.sort.bind(this, 6)}>
              State {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
            </th> : null }
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
          {this.state.selectedColumns.length ?
              <div>
                <input type="color" value={this.state.color} onChange={this.changeColor} />
                <button type="button" className="btn btn-success" onClick={this.changeColumnsColor}>Change color</button>
              </div>
             : null}
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="firstNameCheckbox" id="firstNameCheckbox" onChange={this.changeCheckboxValue.bind(this, '1')} checked={this.state.visibleColumns['1']} />
               <label className="form-check-label" htmlFor="firstNameCheckbox">First Name</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="lastNameCheckbox" id="lastNameCheckbox" onChange={this.changeCheckboxValue.bind(this, '2')} checked={this.state.visibleColumns['2']} />
               <label className="form-check-label" htmlFor="lastNameCheckbox">Last Name</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="usernameCheckbox" id="usernameCheckbox" disabled checked/>
               <label className="form-check-label" htmlFor="usernameCheckbox">Username</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="emailCheckbox" id="emailCheckbox" onChange={this.changeCheckboxValue.bind(this, '4')} checked={this.state.visibleColumns['4']} />
               <label className="form-check-label" htmlFor="emailCheckbox">Email</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="isWorkingCheckbox" id="isWorkingCheckbox" onChange={this.changeCheckboxValue.bind(this, '5')} checked={this.state.visibleColumns['5']} />
               <label className="form-check-label" htmlFor="isWorkingCheckbox">IsWorking</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="positionCheckbox" id="positionCheckbox" onChange={this.changeCheckboxValue.bind(this, '6')} checked={this.state.visibleColumns['6']} />
               <label className="form-check-label" htmlFor="positionCheckbox">Position</label>
             </div>
             <div className="form-check form-check-inline">
               <input className="form-check-input" type="checkbox" name="stateCheckbox" id="stateCheckbox" onChange={this.changeCheckboxValue.bind(this, '7')} checked={this.state.visibleColumns['7']} />
               <label className="form-check-label" htmlFor="stateCheckbox">State</label>
             </div>
          <TableContent />
      </div>
    );
  }
}

export default Table;
