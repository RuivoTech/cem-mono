import React, { useEffect, useMemo, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Context } from "./services/Context";
import { saveSessionStore, getSessionStore, saveSessionCart, getCartSession } from "./services/auth";

import Landing from "./pages/Landing";
import Store from "./pages/Store";
import Information from "./pages/Information";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import "./assets/styles/global.css";

const store = [
  {
    id: 1,
    title: "marmita individual",
    description: "Arroz, feijão, creme de milho, farofa, bisteca de porco e salada.",
    cost: 14.00,
    url: "https://img.itdg.com.br/tdg/images/blog/uploads/2016/09/eea481b040da9cb2f49288918e6d77f1-600x500.jpg"
  },
  {
    id: 2,
    title: "combo família",
    description: "Arroz, feijão, creme de milho, farofa, bisteca de porco e salada.",
    cost: 44.00,
    url: "https://www.familia.com.br/wp-content/uploads/2017/12/featuredImageId97833.jpg"
  }
]

function App() {
  const [cart, setCart] = useState([]);
  const [saveCart, setSaveCart] = useState(false);

  useEffect(() => {
    const saveStore = () => {
      saveSessionStore(store);
    }

    const cartSession = getCartSession();

    if (cartSession) {
      setCart(cartSession);
    }

    saveStore();
  }, []);

  useEffect(() => {
    if (!saveCart) {
      saveSessionCart(cart);
      setSaveCart(!saveCart);
    }
    // eslint-disable-next-line
  }, [saveCart]);

  const Provider = useMemo(() => {
    return {
      getStore: () => {
        return getSessionStore();
      },
      setItemCart: (item) => {
        setCart([
          ...cart,
          item
        ]);

        setSaveCart(!saveCart);

      },
      getCartItems: () => {
        return cart;
      },
      getQuantityCartItems: () => {
        let quantity = 0;
        cart.map(item => {
          return quantity += item.quantity
        });

        return quantity;
      }
    }
    // eslint-disable-next-line
  }, [cart]);

  return (
    <>
      <HashRouter>
        <Context.Provider value={Provider}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/loja" component={Store} />
            <Route path="/dados" component={Information} />
            <Route path="/item" component={Item} />
            <Route path="/carrinho" component={Cart} />
            <Route path="/pedidos" component={Orders} />
          </Switch>
        </Context.Provider>
      </HashRouter>
    </>
  );
}

export default App;
