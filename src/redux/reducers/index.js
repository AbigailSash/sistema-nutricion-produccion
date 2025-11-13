
// Un "root reducer" válido
import { combineReducers } from "redux";

// Crea aunque sea un reducer de relleno
function appReducer(state = { ready: true }, action) {
  switch (action.type) {
    default:
      return state; // ¡siempre devuelve el estado por defecto!
  }
}

const rootReducer = combineReducers({
  app: appReducer,   // <- el valor debe ser una función reducer
  // aquí irán otros reducers: auth, cart, etc.
});

export default rootReducer;
