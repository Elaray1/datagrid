import { SET_USERS, SORT_USERS } from "../actions";

const initialState = {
  users: []
};

export default function usersInfo(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };
    case SORT_USERS:
      return { ...state, users: [].concat(payload) };
    default:
      return state;
  }
}
