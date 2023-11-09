import { GET_Contacts } from "../actions/contacts";

const initialState = {
  contacts: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_Contacts:
      return { ...state, contacts: action.payload.data };
    default:
      return state;
  }
}
