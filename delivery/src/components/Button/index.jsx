import React, { useState } from 'react';

import "./styles.css";

function Button({ className, label, onClick, showLoading = false, ...rest }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = (event) => {
        if (isLoading) return;

        setIsLoading(!isLoading);
        if (showLoading) {
            setTimeout(() => {
                onClick(event);
                setIsLoading(false);
            }, 2000);
        } else {
            onClick(event);
        }
    };

    return (
        <button
            className={`${isLoading ? "loading " : className}`}
            onClick={handleOnClick}
            {...rest}
        >
            {showLoading ? <div className="spinner" /> : null}
            <p className="text">{label}</p>
        </button>
    );
}

export default Button;