import React, { useState } from 'react';
import './Messages.css';

const NewMessage = ({socket}) => {
    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('message', value);
        setValue('');
    };

    return (
        <form id='message--form' onSubmit={submitForm}>
            <input id='message--input' autoFocus name='message' value={value} onChange={(e) => {setValue(e.currentTarget.value);}} placeholder='Enter the message' />
            <button id='message--button' type='submit'>Send message</button>
        </form>
    );
};

export default NewMessage;