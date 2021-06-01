import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import './styles.css';

function Quantity({ handleChangeValue }) {
    const [value, setValue] = useState(1);

    useEffect(() => {
        handleChangeValue(value);
        // eslint-disable-next-line
    }, [value]);

    const handleClick = (type) => {
        if (type === "-" && value > 1) {
            setValue(value - 1);
        } else if (type === "+" && value < 10) {
            setValue(value + 1);
        }
    }

    return (
        <div className="quantityContainer">
            <FontAwesomeIcon
                icon={faMinus}
                color={value === 1 ? "#b2b2b2" : "#00BBAE"}
                size="1x"
                onClick={() => handleClick("-")}
                className="quantityClick"
            />
            <span className="quantityNumber">{value}</span>
            <FontAwesomeIcon
                icon={faPlus}
                color={value < 10 ? "#00BBAE" : "#b2b2b2"}
                size="1x"
                onClick={() => handleClick("+")}
                className="quantityClick"
            />
        </div>
    );
}

export default Quantity;