import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'index.scss';
import App from 'App';
import reportWebVitals from './reportWebVitals';

import { store, persistor } from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate
                loading={<p>Initializing app</p>}
                persistor={persistor}
            >
                <HashRouter>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        closeOnClick
                        pauseOnHover
                        draggable
                        bodyClassName="App__Toast"
                        hideProgressBar
                        theme="dark"
                    />
                    <App />
                </HashRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
