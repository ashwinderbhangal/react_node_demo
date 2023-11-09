import { combineReducers } from "redux";

import Contacts from "./reducerContacts";

const rootReducer = combineReducers({
  Contacts: Contacts
});

export default rootReducer;
