import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import rootReducer from './reducers'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import './App.css';
import PubSub from 'pubsub-js';
 
const options = {
	transports: ['websocket', 'xhr-polling'],
	path: '/api',
};

const store = createStore(rootReducer)

PubSub.subscribe('connect', (msg, url) => {
    const socket = io(url, options);
    socket.on('connect', () => {
        console.log('Connected!!')
        
        socket.emit('getAllDb', {}, (res) => {
          let db = res.data
          console.log('All db', db)
          store.dispatch({ type: 'UPDATE_DB', db })
        })
    });
});


render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
