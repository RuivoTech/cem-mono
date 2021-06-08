import React, { useContext, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Context } from "./services/Context";
import api from "./services/api";

import Landing from "./pages/Landing";
import Store from "./pages/Store";
import Information from "./pages/Information";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import "./assets/styles/global.css";

function App() {
    const context = useContext(Context);
    useEffect(() => {
        const request = async () => {
            const store = await api.get("/store");

            context.setStore(store.data);
        }

        request();
    }, [context]);

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
