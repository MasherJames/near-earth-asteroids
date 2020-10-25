import * as firebase from "firebase/app";
import "firebase/auth";

const state = {
  isAuthenticated: false,
  currentUser: {},
  authLoading: { isLoading: false, type: null },
  authStatus: { message: "", type: null },
};

const mutations = {
  setIsAuthenticated: (state, isAuthenticated) => {
    state.isAuthenticated = isAuthenticated;
  },
  setCurrentUser: (state, currentUser) => {
    state.currentUser = currentUser;
  },
  setAuthLoading: (state, loadingData) => {
    state.authLoading = loadingData;
  },
  setAuthStatus: (state, status) => {
    state.authStatus = status;
  },
};

const actions = {
  registerUser: ({ commit }, payload) => {
    const { email, password, router } = payload;

    // setAuthLoading to true
    commit("setAuthLoading", { isLoading: true, type: "register" });
    // trigger signup
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // if successful, go to all asteroids
        router.push({ path: "all_asteroids" });
        commit("setAuthStatus", {
          message: "Account created successfully !!",
          type: "success",
        });
      })
      .catch((error) => {
        // handle on error and show the error
        commit("setAuthStatus", { message: error.message, type: "error" });
      })
      .finally(() => {
        // handle on a settled promise
        commit("setAuthLoading", { isLoading: false, type: "register" });
      });
  },
  loginUser: ({ commit }, payload) => {
    const { email, password, router } = payload;

    // setAuthLoading to true
    commit("setAuthLoading", { isLoading: true, type: "login" });
    // trigger login
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // handle success
        router.push({ path: "saved_asteroids" });
        commit("setAuthStatus", {
          message: "Successfully LoggedIn !!",
          type: "success",
        });
      })
      .catch((error) => {
        // handle error
        const message =
          error.code === "auth/user-not-found"
            ? "User does not exist !"
            : error.code === "auth/wrong-password"
            ? "Incorrect Password"
            : error.message;

        commit("setAuthStatus", { message, type: "error" });
      })
      .finally(() => {
        // handle as ettled promise
        commit("setAuthLoading", { isLoading: false, type: "login" });
      });
  },
  signOutUser: ({ commit }, router) => {
    // trigger logout
    firebase
      .auth()
      .signOut()
      .then(() => {
        // redirect to login
        router.push({ path: "/login" });
        commit("setAuthStatus", {
          message: "Successfully logged out !!",
          type: "success",
        });
      })
      .catch((error) => {
        commit("setAuthStatus", { message: error.message, type: "error" });
      });
  },
  authStateChange: ({ commit }) => {
    // Watch for auth state anywhere in the app
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit("setIsAuthenticated", true);
        commit("setCurrentUser", user);
      } else {
        commit("setIsAuthenticated", false);
      }
    });
  },
};
const getters = {
  getCurrentUser: (state) => state.currentUser,
  isAuthenticated: (state) => state.isAuthenticated,
  authLoading: (state) => state.authLoading,
  authStatus: (state) => state.authStatus,
};

export default { state, mutations, actions, getters };
