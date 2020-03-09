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
    const users = [].concat(initialData);
    for (let column in sortedColumns) {
      switch (sortedColumns[column]) {
        case 1:
          users.sort((a, b) => a[priorityArr[priorityArr.length - 1]] > b[priorityArr[priorityArr.length - 1]] ? 1 : -1)
          break;
        case 2:
          users.sort((a, b) => a[priorityArr[priorityArr.length - 1]] > b[priorityArr[priorityArr.length - 1]] ? -1 : 1)
          break;
        default:
          break;
      }
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
