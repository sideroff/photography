// import React, { createContext, useEffect } from "react";
// import { createReducer } from "react-use";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// import reducers from "./contexts";
// import { INIT_STATE } from "./actionTypes";

// const reducerNames = Object.keys(reducers);

// reducerNames.reduce((accumulator, current) => {
//   const Context = createContext();

//   accumulator[current] = {};
// });

// // create a wrapper reducer that can use middlewares
// export const StoreContext = createContext();

// export default (props) => {
//   const [store, dispatch] = useReducerWithMiddleware(
//     appReducer,
//     appReducer(undefined, { type: INIT_STATE })
//   );

//   useEffect(() => {
//     dispatch({ type: INIT_STATE });
//   }, []);

//   return (
//     <StoreContext.Provider value={{ store, dispatch }}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };
