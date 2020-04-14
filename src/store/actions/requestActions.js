import firebase from "../../utils/firebase";
//Utils
import EventBus from "js-event-bus";
const uuid = require("uuid/v4");

export const createRequest = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let uniqueId = uuid();
      await firebase.firestore().collection("requests").doc(uniqueId).set({
        id: uniqueId,
        name: credentials.name,
        state: credentials.state,
        quantity: credentials.quantity,
        facility: credentials.facility,
        address: credentials.address,
        phone: credentials.phone,
        makers: [],
        userId: firebase.auth().currentUser.uid,
      });
    } catch {}
  };
};

export const deleteRequest = (id) => {
  return async (dispatch, getState) => {
    try {
      let verifyRequest = firebase.firestore().collection("requests").doc(id);
      await verifyRequest.delete();
    } catch {}
  };
};
