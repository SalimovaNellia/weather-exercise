import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';
import App from "./components/App";
import {createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'),
);
serviceWorker.unregister();
