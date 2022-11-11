import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from '../message/Messages';
import MessageInput from '../message/MessageInput';

import './App.css';

function App() {
    console.log(process.env.REACT_APP_PORT);
    const [socket, setSocket] = useState(null);
    const [value, setValue] = useState('');
    const port = process.env.PORT || process.env.REACT_APP_PORT || 3000;
    console.log(port);

    const username = sessionStorage.getItem('username') || '';

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('connectUser', value);
        sessionStorage.setItem('username', value);
        setValue('');
    };

    useEffect(() => {
        console.log(`https://${window.location.host}`);
        const newSocket = io(`https://${window.location.host}`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    if (username != '') {
        return (
            <div className="App">
                <header className="app-header">
                    React Chat
                </header>

                { socket ? (
                    <div>
                        <div className="chat-container">
                            <Messages socket={socket} />
                            <MessageInput socket={socket} username={username} />
                        </div>
                    </div>
                ) : (
                    <div>Not Connected</div>
                )}
            </div>
        );
    } else {
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
}

export default App;