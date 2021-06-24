import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import Store from "./pages/Store";
import Information from "./pages/Information";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import "./assets/styles/global.css";
import { getInformation, saveInformation } from "./services/auth";

function App() {
    useEffect(() => {
        const informations = getInformation();

        if (!informations) {
            saveInformation({});
        }

    }, []);
    return (
        <>
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/loja" component={Store} />
                    <Route path="/dados" component={Information} />
                    <Route path="/item" component={Item} />
                    <Route path="/carrinho" component={Cart} />
                    <Route path="/pedidos" component={Orders} />
                </Switch>
            </HashRouter>
        </>
    );
}

export default App;
