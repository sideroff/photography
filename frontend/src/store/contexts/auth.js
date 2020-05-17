import { createState } from "../utils";
import { toast } from "react-toastify";

const cookieParser = (cookie) => {
  const obj = {};
  const cookies = cookie.split(";");
  cookies.forEach((c) => {
    const parts = c.split("=");
    obj[parts[0].trim()] = parts[1].trim();
  });

  return obj;
};

const UPDATE_IS_AUTHENTICATED = "UPDATE_IS_AUTHENTICATED";
// const UPDATE_ROLE = "UPDATE_ROLE";

export const roles = {
  admin: 3,
  guest: 0,
};

const cookies = cookieParser(document.cookie);

const DEFAULT_STATE = {
  isAuthenticated: !!cookies.token,
  role: cookies.role || roles.guest,
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

const updateIsAuthenticated = (payload) => ({
  type: UPDATE_IS_AUTHENTICATED,
  payload,
});
// 'Content-Type': 'application/x-www-form-urlencoded',
const actions = {
  login: (body) => {
    return (dispatch) => {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response && response.status === 200) {
            toast(response && response.data);
            dispatch(updateIsAuthenticated(response.data));
          } else {
            toast(response && response.data);
          }
        })
        .catch((error) => {
          toast("A network error occured");
        });
    };
  },
  updateIsAuthenticated,
};

const [AuthContext, AuthProvider, AuthConsumer] = createState(
  DEFAULT_STATE,
  actions,
  reducer
);

export { AuthContext, AuthProvider, AuthConsumer };
