import firebase from "../../utils/firebase";
//Utils
import EventBus from "js-event-bus";
const uuid = require("uuid/v4");

export const createFund = (credentials) => {
  return async (dispatch, getState) => {
    try {
      console.log(credentials);
      let uniqueId = uuid();
      await firebase.firestore().collection("funds").doc(uniqueId).set({
        id: uniqueId,
        amount: credentials.amount,
        request: credentials.request,
        product: credentials.product,
        image: credentials.image,
        funders: [],
        userId: firebase.auth().currentUser.uid,
      });
    } catch (err) {}
  };
};

export const deleteFund = (id) => {
  return async (dispatch, getState) => {
    try {
      let verifyFund = firebase.firestore().collection("funds").doc(id);
      await verifyFund.delete();
    } catch {}
  };
};
