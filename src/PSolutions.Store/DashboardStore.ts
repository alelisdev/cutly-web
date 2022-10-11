import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux"
import { RootReducer } from "../PSolutions.State";

const enhancers: any = [];
const initialState: any = {};

const persistConfig = {
  key: '@app-state',
  storage: storage,
  whitelist: ['app', 'currentLocation'],
}

const middleware = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(persistedReducer, initialState, composedEnhancers);

let persistor = persistStore(store);

// Exports
export { store, persistor };