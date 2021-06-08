import React, { useEffect, useState } from 'react';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

function Quantity({ handleChangeValue, update = false, item }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (item.quantity) {
            setQuantity(item.quantity);
        }
    }, [item]);

    const handleClick = (type) => {
        if (type === "-") {
            setQuantity(quantity - 1);
            handleChangeValue(quantity - 1);
        } else if (type === "+" && quantity < 10) {
            setQuantity(quantity + 1);
            handleChangeValue(quantity + 1);
        }
    }

    return (
        <div className="quantityContainer">
            <FontAwesomeIcon
                icon={faMinus}
                color={(quantity === 1 || update) && quantity === 0 ? "#b2b2b2" : "#00BBAE"}
                size="1x"
                onClick={() => handleClick("-")}
                className="quantityClick"
            />
            <span className="quantityNumber">{quantity}</span>
            <FontAwesomeIcon
                icon={faPlus}
                color={quantity < 10 ? "#00BBAE" : "#b2b2b2"}
                size="1x"
                onClick={() => handleClick("+")}
                className="quantityClick"
            />
        </div>
    );
}

export default Quantity;