import {
    clearSessionCart,
    getSessionCart,
    getSessionOrders,
    getSessionStore,
    saveSessionCart,
    saveSessionOrder,
    saveSessionStore
} from "./auth";

export const provider = {
    getStore: () => {
        return getSessionStore();
    },
    setCartItem: (item) => {
        saveSessionCart(item);
    },
    setStore: (storeItems) => {
        saveSessionStore(storeItems);
    },
    getCartItems: () => {
        const cartItems = getSessionCart();
        return cartItems;
    },
    removeCartItem: (keyItem) => {
        const cart = getSessionCart();
        clearSessionCart();

        cart.map((item, key) => {
            return key !== keyItem ? saveSessionCart(item) : null
        })
    },
    clearCart: () => {
        clearSessionCart();
    },
    getQuantityCartItems: () => {
        let quantity = 0;
        const cart = getSessionCart();

        if (cart) {
            cart.map(item => {
                return quantity += item.quantity
            });
        }

        return quantity;
    },
    setOrder: (order) => {
        saveSessionOrder(order);
    },
    getOrders: () => {
        const orders = getSessionOrders();
        return orders;
    }
}