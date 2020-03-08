import { SET_DATA } from "../actions";

const initialState = {
  users: []
};

export default function usersInfo(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DATA:
      return { ...state, users: payload };
    default:
      return state;
  }
}
