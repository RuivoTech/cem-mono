export const TOKEN_KEY = "@SystemCEM:token";

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

export const onChangeTheme = () => {
  const themeInUse = getThemeInUse();
  console.log("onChangeTheme", themeInUse);
  themeInUse === "light" ? setThemeInUse("dark") : setThemeInUse("light");
  return themeInUse === "light" ? "dark" : "light";
}

export const setThemeInUse = (theme) => {
  console.log("setThemeInUse", theme)
  localStorage.setItem("@SystemCEM:theme", theme);
}

export const getThemeInUse = () => {
  const theme = localStorage.getItem("@SystemCEM:theme");

  return theme;
}