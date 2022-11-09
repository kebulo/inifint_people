import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages(props) {
    const socket = props.socket;
    const username = sessionStorage.getItem('username') || '';

    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                newMessages[message.id] = message;
                return newMessages;
            });
        };
      
        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                delete newMessages[messageID];
                return newMessages;
            });
        };
      
        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    return (
        <div className="message-list">
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <div className='message-container'>
                        <div
                            key={message.id}
                            className={(username == message.user.name)? "message-container--align-right" : "message-container--align-left"}
                            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                        >
                            <small className="user">{message.user.name}:</small>
                            <span className="message">{message.value}</span>
                            <small className="date">{new Date(message.time).toLocaleTimeString()}</small>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Messages;