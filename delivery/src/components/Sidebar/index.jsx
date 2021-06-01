import React, { useEffect, useState } from 'react';
import { faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

import './styles.css';

function Sidebar({ show, handleClick }) {
    const [page, setPage] = useState("");
    const location = useLocation();

    useEffect(() => {
        setPage(location.pathname);
    }, [location]);

    return (
        <>
            <div className={`${show ? "show" : "hide"} sidebar`}>
                <div className="sidebarContent">
                    <div className="userInfo">
                        <p className="userName">Richieri Negri</p>
                        <p className="userPhone">(44) 99858-8635</p>
                    </div>
                    <Link className={`sidebarLink ${page === "/dados" ? "active" : null}`} to="/dados">
                        <FontAwesomeIcon icon={faUser} color="var(--color-text-primary)" size="1x" />
                        <span>Perfil</span>
                    </Link>
                    <Link className={`sidebarLink ${page === "/pedidos" ? "active" : null}`} to="/pedidos">
                        <FontAwesomeIcon icon={faUtensils} color="var(--color-text-primary)" size="1x" />
                        <span>Pedidos</span>
                    </Link>
                </div>
            </div>
            <div className="sidebarBackground" onClick={() => handleClick()}></div>
        </>
    );
}

export default Sidebar;