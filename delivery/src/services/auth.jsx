export const TOKEN_KEY = "@DeliveryCEM:Information";
const CART_TOKEN = "@DeliveryCEM:Cart";
const CAMPAIGN_TOKEN = "@DeliveryCEM:Campaign";
const ORDER_TOKEN = "@DeliveryCEM:Order";

export const saveInformation = (usuario) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
}

export const getInformation = () => {
    const session = localStorage.getItem(TOKEN_KEY);

    return JSON.parse(session);
}

export const saveSessionCampaign = (campaign) => {
    sessionStorage.setItem(CAMPAIGN_TOKEN, JSON.stringify(campaign));
};

export const getSessionCampaign = () => {
    const sessionCampaign = sessionStorage.getItem(CAMPAIGN_TOKEN);
    return JSON.parse(sessionCampaign);
}

export const clearSessionCart = () => {
    sessionStorage.setItem(CART_TOKEN, JSON.stringify([]));
}

export const saveSessionCart = (item) => {
    const cartItems = getSessionCart() ? getSessionCart() : [];
    cartItems.push(item ? item : undefined)
    sessionStorage.setItem(
        CART_TOKEN,
        JSON.stringify(cartItems)
    );
}

export const getSessionCart = () => {
    const cart = sessionStorage.getItem(CART_TOKEN);

    return JSON.parse(cart);
}

export const saveSessionOrder = (order) => {
    const orders = getSessionOrders() ? getSessionOrders() : [];

    orders.push(order);
    localStorage.setItem(
        ORDER_TOKEN,
        JSON.stringify(orders)
    );
}

export const getSessionOrders = () => {
    const orders = localStorage.getItem(ORDER_TOKEN);

    return JSON.parse(orders);
}