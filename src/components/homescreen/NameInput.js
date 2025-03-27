import React from 'react';
import './HomeScreen.css'

function NameInput() {
    return (
        <div className="container-name-input">
            <input type="text" placeholder="name" autoComplete="off" translate="no" />
        </div>
    );
}

export default NameInput;