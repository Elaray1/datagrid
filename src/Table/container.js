import { connect } from "react-redux";
import Faker from "faker";

import { setUsersAction } from "../store/actions/users";

import Table from "./component";

const setUsers = () => dispatch => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push([
      Faker.name.firstName(),
      Faker.name.lastName(),
      Faker.internet.userName(),
      Faker.internet.email(),
      Faker.random.boolean().toString(),
      "kekw",
      Faker.address.state()
    ]);
  }

  dispatch(setUsersAction(users));
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
