import React from 'react';

import "./styles.css";

function Button({ className, label, onClick, ...rest }) {
    return (
        <button
            className={`${className} btn`}
            onClick={event => onClick(event)}
            {...rest}
        >
            {label}
        </button>
    );
}

export default Button;