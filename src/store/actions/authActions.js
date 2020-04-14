import firebase from "../../utils/firebase";
//Utils
import EventBus from "js-event-bus";
const eventBus = EventBus();

export const createFrontliner = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
      let userUUID = createdUser.user.uid;

      await firebase.firestore().collection("users").doc(userUUID).set({
        id: userUUID,
        email: credentials.email,
        type: "frontliners",
        name: credentials.name,
      });

      eventBus.emit("create-success");
    } catch (err) {
      eventBus.emit("create-error", null, err);
    }
  };
};

export const createMaker = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
      let userUUID = createdUser.user.uid;

      await firebase.firestore().collection("users").doc(userUUID).set({
        id: userUUID,
        email: credentials.email,
        type: "makers",
        name: credentials.name,
      });

      eventBus.emit("create-success");
    } catch (err) {
      eventBus.emit("create-error", null, err);
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    try {
      await firebase.auth().signOut();
    } catch {}
  };
};

export const signIn = (credentials) => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      eventBus.emit("create-success");
    } catch (err) {
      eventBus.emit("create-error", null, err);
    }
  };
};
