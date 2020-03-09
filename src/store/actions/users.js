import { createAction } from "redux-actions";

export const SET_USERS = "SET_USERS";
export const SORT_USERS = "SORT_DATA";

export const setUsersAction = createAction(SET_USERS);
export const sortUsersAction = createAction(SORT_USERS);
