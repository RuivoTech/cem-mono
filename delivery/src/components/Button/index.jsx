import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";

function Button({ className, label, onClick, showLoading = false, status = "none", ...rest }) {

    const handleOnClick = (event) => {
        onClick(event);
    };

    return (
        <button
            className={`${status !== "none" ? status : className}`}
            onClick={handleOnClick}
            {...rest}
        >
            {showLoading ? <div className="spinner" /> : null}
            <div className="check">
                <FontAwesomeIcon icon={faCheck} color="#FFFFFF" size="lg" />
            </div>
            <p className="text">{label}</p>
        </button>
    );
}

export default Button;