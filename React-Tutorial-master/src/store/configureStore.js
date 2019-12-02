
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createBrowserHistory as createHistory } from 'history'
import rootReducer from './reducers';
//import initialState from './initialState';
//import { isDevelopmentEnvironment } from '../environment';

export const history = createHistory();

const enhancers = [];
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage
};

const defaultConfig = "cool config";
const data = "yieaah some data";

const initialState = {
    //config: defaultConfig, 
    //customData: data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//if (isDevelopmentEnvironment()) {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
//}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);


export default () => {
  const store = createStore(persistedReducer, initialState, composedEnhancers);
  return { store, persistor: persistStore(store) };
};

/*
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {
        store,
        persistor
    }
}
*/