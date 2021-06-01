import React, { useState } from 'react';

import "./styles.css";

function Input({ className, label, description, onChange, required, ...rest }) {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target);
    }

    return (
        <>
            <div id="input">
                <div className="inputLabel">{label}:{required ? <sup className="inputRequired">*</sup> : null}</div>
                <input
                    className={`inputField${className ? " " + className : ''}`}
                    type="text"
                    placeholder={description}
                    onChange={event => handleChange(event)}
                    value={value}
                    required={required}
                    {...rest}
                />
            </div>
        </>
    );
}

export default Input;