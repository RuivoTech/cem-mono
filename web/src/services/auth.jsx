export const TOKEN_KEY = "@BibliotecaDD:token";

export const onSignIn = (usuario) => {
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
}

export const onSignOut = () => {
  sessionStorage.removeItem(TOKEN_KEY);
}

export const isSignedIn = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);

  return token !== null ? true : false;
};

export const getSession = () => {
  const session = sessionStorage.getItem(TOKEN_KEY);

  return JSON.parse(session);
}