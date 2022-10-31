import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from '../message/Messages';
import MessageInput from '../message/MessageInput';
import Users from '../Users/Users';

import './App.css';

function App() {
    const [socket, setSocket] = useState(null);
    const [value, setValue] = useState('');
    
    const sendUsername = () => {
        console.log(value);
    };

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="App">
            <header className="app-header">
                React Chat
            </header>
            <div>
                <Users socket={socket} />
            </div>
            { socket ? (
                <div className="chat-container">
                  <Messages socket={socket} />
                  <MessageInput socket={socket} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );
}

export default App;