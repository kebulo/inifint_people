import React, { useState } from 'react';
import './Messages.css';

const NewMessage = (props) => {
    const socket = props.socket;
    const username = sessionStorage.getItem('username');

    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('message', value, username);
        setValue('');
    };

    return (
        <form id='message--form' onSubmit={submitForm}>
            <input id='message--input' autoFocus name='message' value={value} onChange={(e) => {setValue(e.currentTarget.value);}} placeholder='Enter the message' />
        </form>
    );
};

export default NewMessage;