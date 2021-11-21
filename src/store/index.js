import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const logger = store => {
    return next => {
        return action => {
            if (process.env.NODE_ENV === 'development') {
                console.log('[Dispatching]', action);
            }

            next(action);
        };
    };
};

const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(
    logger,
    thunk
)));

export const persistor = persistStore(store);

