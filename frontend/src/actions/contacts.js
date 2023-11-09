import axios from "axios";
import { myConfig } from "../helpers/config.js";
export const GET_Contacts = "contacts";
export function contacts() {
  return (dispatch) => {
    const request = axios
      .get(`${myConfig.ROOT_URL}/contacts`)
      .then((response) => {
        dispatch({
          type: GET_Contacts,
          payload: response
        });
        //callback("success");
      })
      .catch((error) => {
        // Error handling 
        console.log(error);
      });
  };
}

export function addContact(values, callback) {
  return (dispatch) => {
    const request = axios
      .post(`${myConfig.ROOT_URL}/contacts`, values,)
      .then((response) => {
        callback("success");
      })
      .catch((error) => {
        /*dispatch({
          type: NOTES_ERROR,
          payload: error.response
        });*/
      });
  };
}

export function addUpdateContact(id,values, callback) {
  return (dispatch) => {
    const request = axios
      .put(`${myConfig.ROOT_URL}/contacts/${id}`, values,)
      .then((response) => {
        callback("success");
      })
      .catch((error) => {
        /*dispatch({
          type: NOTES_ERROR,
          payload: error.response
        });*/
      });
  };
}

export function addDeleteContact(id,callback) {
  return (dispatch) => {
    const request = axios
      .delete(`${myConfig.ROOT_URL}/contacts/${id}`)
      .then((response) => {
        callback("success");
      })
      .catch((error) => {
        /*dispatch({
          type: NOTES_ERROR,
          payload: error.response
        });*/
      });
  };
}