export const TOKEN_KEY = "@DeliveryCEM:Information";
const CART_TOKEN = "@DeliveryCEM:Cart";
const STORE_TOKEN = "@DeliveryCEM:Store";

export const saveInformation = (usuario) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
}

export const getInformation = () => {
    const session = localStorage.getItem(TOKEN_KEY);

    return JSON.parse(session);
}

export const saveSessionStore = (store) => {
    sessionStorage.setItem(STORE_TOKEN, JSON.stringify(store));
};

export const getSessionStore = () => {
    const sessionStore = sessionStorage.getItem(STORE_TOKEN);
    return JSON.parse(sessionStore);
}

export const saveSessionCart = (cart) => {
    sessionStorage.setItem(CART_TOKEN, JSON.stringify(cart));
}

export const getCartSession = () => {
    const cart = sessionStorage.getItem(CART_TOKEN);

    return JSON.parse(cart);
}