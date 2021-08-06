import {
    clearSessionCart,
    getSessionCart,
    getSessionOrders,
    getSessionCampaign,
    saveSessionCart,
    saveSessionOrder,
    saveSessionCampaign
} from "./auth";

export const provider = {
    getCampaign: () => {
        return getSessionCampaign();
    },
    setCampaign: (campaign) => {
        saveSessionCampaign(campaign);
    },
    setCartItem: (item) => {
        saveSessionCart(item);
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