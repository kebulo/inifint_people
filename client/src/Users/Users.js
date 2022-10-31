import React, { useState } from 'react';
import './Users.css';

const Users = ({socket}) => {
    const [value, setValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('connectUser', value);
        setValue('');
    };

    return (
        <form id='users--form' onSubmit={submitForm}>
            <input id='username' className='username' value={value} onChange={(e) => {setValue(e.currentTarget.value);}} />
            <button id='users--button' type='submit'>Send message</button>
        </form>
    );
};

export default Users;