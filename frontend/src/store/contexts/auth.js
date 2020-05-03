import { createState } from "../utils";

const UPDATE_IS_AUTHENTICATED = "UPDATE_IS_AUTHENTICATED";
// const UPDATE_ROLE = "UPDATE_ROLE";

export const roles = {
  admin: 3,
  guest: 0,
};

// TODO: remove mocked auth
const DEFAULT_STATE = {
  isAuthenticated: true,
  role: "guest",
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};
// 'Content-Type': 'application/x-www-form-urlencoded',
const actions = {
  login: (body) => {
    console.log("login action");
    return (dispatch) => {
      console.log("login thunk action");
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("login response", response);
        });
    };
  },

  updateIsAuthenticated: (payload) => ({
    type: UPDATE_IS_AUTHENTICATED,
    payload,
  }),
};

const [AuthContext, AuthProvider, AuthConsumer] = createState(
  DEFAULT_STATE,
  actions,
  reducer
);

export { AuthContext, AuthProvider, AuthConsumer };
