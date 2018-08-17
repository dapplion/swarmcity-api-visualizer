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

        socket.emit('joinDebug', {}, (res) => {
            console.log('Joined debug room', res)
        })
        
        socket.emit('getAllDb', {}, (res) => {
            let db = res.data
            console.log('All db', db)
            store.dispatch({ type: 'UPDATE_DB', db })
        })

        let cache = '';
        setInterval(() => {
            socket.emit('getRooms', {}, (res) => {
                let rooms = res.data;
                let dataString = JSON.stringify(rooms)
                if (dataString !== cache) {
                    cache = dataString 
                    // rooms: {
                    //     debug: {
                    //         {sockets: {…}, length: 1}
                    //     },
                    //     eArFIHnEIJg1xVEUAAAC: {
                    //         length: 1
                    //         sockets: {
                    //             eArFIHnEIJg1xVEUAAAC: true
                    //         }
                    //     }
                    // }
                    let roomsArray = Object.keys(rooms)
                    .map(roomName => {
                        let sockets = rooms[roomName].sockets || {}
                        if (Object.keys(sockets).includes(roomName)) {
                            return null
                        } else {
                            return {
                                name: roomName,
                                sockets: Object.keys(sockets).map(socketName => ({
                                    name: socketName,
                                    on: sockets[socketName]
                                }))
                            }
                        }
                    })
                    .filter(room => room) || []
                    console.log('rooms', roomsArray, rooms)
                    store.dispatch({ type: 'UPDATE_ROOMS', rooms: roomsArray })
                }
            })
        }, 500)

        socket.on('dbChange', (key, data) => {
            console.log('db changed - key:', key, 'data:', data)
            socket.emit('getAllDb', {}, (res) => {
                let db = res.data
                store.dispatch({ type: 'UPDATE_DB', db })
            })
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
