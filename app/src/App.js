import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OneSignal from "react-native-onesignal";

import { AuthContext } from "./context";

import Sidebar from "./Components/Sidebar";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Configuracoes from "./pages/Configuracoes";
import EditItem from './pages/EditItem';
import Entrar from "./pages/Entrar";
import Register from "./pages/Register";

const Drawer = createDrawerNavigator();

const App = () => {
    const linking = {
        prefixes: ['cem://'],
        config: {
            screens: {
                Home: 'Home',
                Eventos: 'Eventos',
            },
        },
    }
    const authContext = useMemo(() => {
        return {
            signIn: (login) => {
                console.log(login);
            },
            signOut: () => {
                console.log("Saindo");
            },
            isLoggedIn: () => {
                return false;
            },
            isEquals: (name) => {
                return name === "Febe Correa";
            }
        }
    });

    useEffect(() => {
        OneSignal.init("477cfd8d-88c6-4c33-b70a-88e7cddf7a3b");
        OneSignal.enableSound(true);
        OneSignal.addEventListener("opened", openedNotification);
    }, []);

    const openedNotification = (push) => {
        console.log(push.notification.payload);
    }

    return (
        <>
            <AuthContext.Provider value={authContext}>
                <StatusBar barStyle="dark-content" backgroundColor="rgb(49, 49, 51)" />
                <NavigationContainer linking={linking}>
                    <Drawer.Navigator
                        edgeWidth={-10}
                        initialRouteName="Home"
                        drawerContent={(props) => <Sidebar {...props} />}
                    >
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="EditItem" component={EditItem} />
                        <Drawer.Screen name="Eventos" component={Eventos} />
                        <Drawer.Screen name="Configuracoes" component={Configuracoes} />
                        <Drawer.Screen name="Entrar" component={Entrar} />
                        <Drawer.Screen name="Registrar" component={Register} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </>
    );
};

export default App;
