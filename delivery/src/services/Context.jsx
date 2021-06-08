import React, { createContext } from "react";

import { getCartSession, getSessionStore, saveSessionCart, saveSessionStore } from "./auth";

export const Context = createContext({});

const provider = {
    getStore: () => {
        return getSessionStore();
    },
    setCartItem: (item) => {
        saveSessionCart([item]);
    },
    setStore: (storeItems) => {
        saveSessionStore(storeItems);
    },
    saveCartItems: (items) => {
        saveSessionCart(items);
    },
    getCartItems: () => {
        const cartItems = getCartSession();
        return cartItems;
    },
    removeCartItem: (keyItem) => {
        const cart = getCartSession();
        const filteredCartItems = cart.filter((_, key) => {
            return key !== keyItem
        });

        saveSessionCart(filteredCartItems);
    },
    getQuantityCartItems: () => {
        let quantity = 0;
        const cart = getCartSession();

        if (cart) {
            cart.map(item => {
                return quantity += item.quantity
            });
        }

        return quantity;
    }
}

function Provider({ children }) {
    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    )
}

export default Provider