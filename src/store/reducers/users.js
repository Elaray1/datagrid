import { SET_DATA, SORT_DATA } from "../actions";

let initialState = {
  users: []
};

export default function usersInfo(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DATA:
      initialState = { ...state, users: payload };
      return { ...state, users: payload };
    case SORT_DATA:
      return { ...state, users:  [].concat(payload) };
    default:
      return state;
  }
}
