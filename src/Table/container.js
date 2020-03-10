import { connect } from "react-redux";
import Faker from "faker";

import { setUsersAction, sortUsersAction } from "../store/actions/users";

import Table from "./component";

let initialData = [];

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const setUsers = () => dispatch => {
  for (let i = 0; i < 10; i++) {
    initialData.push([
      Faker.name.firstName(),
      Faker.name.lastName(),
      Faker.internet.userName(),
      Faker.internet.email(),
      Faker.random.boolean().toString(),
      ["Junior", "Middle", "Senior"][randomInteger(0, 2)],
      Faker.address.state()
    ]);
  }

  dispatch(setUsersAction(initialData));
};

const sort = (sortedColumns, priorityArr, textFilter, searchOptions) => dispatch => {
  let users = [].concat(initialData);
  users = users.filter((el) => {
    let flag = false;
    searchOptions.forEach((i) => {
      if (el[i].toLowerCase().indexOf(textFilter.toLowerCase().trim()) !== -1) {
        flag = true;
        return;
      };
    })
    return flag;
  });
  if (sortedColumns.position !== "-") users = users.filter(arr => arr[5] === sortedColumns.position);
  let preColumnIndex = null;
  for (let columnIndex of priorityArr) {
    const column = Object.keys(sortedColumns)[columnIndex];
    if (preColumnIndex === null) {
      if (typeof sortedColumns[column] !== "string") {
        switch (sortedColumns[column]) {
          case 1:
            users.sort((a, b) =>
              a[priorityArr[0]] > b[priorityArr[0]] ? 1 : -1
            );
            break;
          case 2:
            users.sort((a, b) =>
              a[priorityArr[0]] > b[priorityArr[0]] ? -1 : 1
            );
            break;
          default:
            break;
        }
      }
    } else {
      const preColumnIndex2 = preColumnIndex;
      if (typeof sortedColumns[column] !== "string") {
        switch (sortedColumns[column]) {
          case 1:
            users.sort((a, b) => {
              if (a[preColumnIndex2] !== b[preColumnIndex2]) {
                return 0;
              }
              return a[columnIndex] > b[columnIndex] ? 1 : -1;
            });
            break;
          case 2:
            users.sort((a, b) => {
              if (a[preColumnIndex2] !== b[preColumnIndex2]) {
                return 0;
              }
              return a[columnIndex] > b[columnIndex] ? -1 : 1;
            });
            break;
          default:
            break;
        }
      }
    }
    preColumnIndex = columnIndex;
  }
  dispatch(sortUsersAction(users));
};

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
    sortUsersInfo: (sortedColumns, priorityArr, textFilter, searchOptions) => {
      dispatch(sort(sortedColumns, priorityArr, textFilter, searchOptions));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
