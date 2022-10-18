import React, { useState } from 'react';
import { Navigate } from 'react-router';
import CustomFooter from './componentes/CustomFooter';

import CustomMenu from "./componentes/CustomMenu";
import Sidebar from "./componentes/Sidebar";
import { getSession } from './services/authStorage';

function PrivateRoute({ group, children }) {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    function switchSidebar() {
        setSidebarOpened(!sidebarOpened)
    }

    if (!Boolean(getSession())) {
        return <Navigate to="/" />
    }

    return (
        <>
            <CustomMenu name={group} switchSidebar={switchSidebar} />
            <Sidebar sidebarIsOpened={sidebarOpened} switchSidebar={switchSidebar} />
            {children}
            <CustomFooter />
        </>
    );
}

export default PrivateRoute;