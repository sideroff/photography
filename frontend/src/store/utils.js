import React, { createContext } from "react";
import { createReducer } from "react-use";
import logger from "redux-logger";

const useReducerWithMiddleware = createReducer(logger);

export const createState = (defaultState, actions, reducer) => {
  const Context = createContext({
    state: defaultState,
    actions: {},
  });

  const Provider = ({ children, initState }) => {
    const [state, dispatch] = useReducerWithMiddleware(
      reducer,
      initState || defaultState
    );

    const dispatchableActions = {};
    Object.keys(actions).forEach((name) => {
      dispatchableActions[name] = (...args) => {
        const action = actions[name];
        const result = action(...args);

        // implementing thunk
        if (typeof result === "function") {
          result(dispatch);
        } else {
          dispatch(result);
        }
      };
    });

    const value = { state, actions: dispatchableActions };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return [Context, Provider, Context.Consumer];
};
