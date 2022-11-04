import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from '../message/Messages';
import MessageInput from '../message/MessageInput';

import './App.css';

function App() {
    const [socket, setSocket] = useState(null);
    const [value, setValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('connectUser', value);
        setValue('');
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

            { socket ? (
                <div>
                    <form id='users--form' onSubmit={submitForm}>
                        <input id='username' className='username' value={value} onChange={(e) => {setValue(e.currentTarget.value);}} />
                        <button id='users--button' type='submit'>Set Username</button>
                    </form>

                    <div className="chat-container">
                        <Messages socket={socket} username={value} />
                        <MessageInput socket={socket} />
                    </div>
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );
}

export default App;