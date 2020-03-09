import { connect } from "react-redux";
import Faker from "faker";

import { setUsersAction } from "../store/actions/users";
import { sortUsersAction } from "../store/actions/sortUsers";

import Table from "./component";

let initialData = [];

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const setUsers = () => dispatch => {
  for (let i = 0; i < 10; i++) {
    initialData.push([
      Faker.name.firstName(),
      Faker.name.lastName(),
      Faker.internet.userName(),
      Faker.internet.email(),
      Faker.random.boolean().toString(),
      ['Junior', 'Middle', 'Senior'][randomInteger(0, 2)],
      Faker.address.state()
    ]);
  }

  dispatch(setUsersAction(initialData));
};

const sort = (sortedColumns, priorityArr) => dispatch => {
    let users = [].concat(initialData);
    let preColumnIndex = null;
    for (let columnIndex of priorityArr) {
      const column = Object.keys(sortedColumns)[columnIndex];
      if (preColumnIndex === null) {
        if (typeof sortedColumns[column] !== 'string') {
          switch (sortedColumns[column]) {
            case 1:
              users.sort((a, b) => a[priorityArr[0]] > b[priorityArr[0]] ? 1 : -1)
              break;
            case 2:
              users.sort((a, b) => a[priorityArr[0]] > b[priorityArr[0]] ? -1 : 1)
              break;
            default:
              break;
          }
        } else {
          if (sortedColumns[column] === '-') continue;
          users = users.filter((arr) => arr[5] === sortedColumns[column])
        }
      } else {
        const preColumnIndex2 = preColumnIndex;
          if (typeof sortedColumns[column] !== 'string') {
            switch (sortedColumns[column]) {
              case 1:
                users.sort((a, b) => {
                  if (a[preColumnIndex2] !== b[preColumnIndex2]) {
                    return 0;
                  };
                  return a[columnIndex] > b[columnIndex] ? 1 : -1
                });
                break;
              case 2:
                users.sort((a, b) => {
                  if (a[preColumnIndex2] !== b[preColumnIndex2]) {
                    return 0;
                  };
                  return a[columnIndex] > b[columnIndex] ? -1 : 1
                });
                break;
              default:
                break;
            }
          } else {
            if (sortedColumns[column] === '-') continue;
            users = users.filter((arr) => arr[5] === sortedColumns[column])
          }
        }
        preColumnIndex = columnIndex;
      }
    dispatch(sortUsersAction(users));
}

function mapStateToProps(store) {
  return {
    users: store.users.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUsersInfo: () => {
      dispatch(setUsers());
    },
    sortUsersInfo: (sortedColumns, priorityArr) => {
      dispatch(sort(sortedColumns, priorityArr));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
