import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { cities } from "../reducers/cities";
import { locale } from "../reducers/locale";

const logger = createLogger();
const rootReducer = combineReducers({
  cities,
  locale
});

const initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  });

  return store;
}
