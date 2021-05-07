import React, { useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, View, Image, StatusBar } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context";

import logo from "../../assets/images/logo.png";

import { styles } from "./styles";

const Sidebar = ({ navigation, ...props }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <View style={styles.sidebar}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} width={70} height={70} />
                    <Text style={styles.headerText}>Centro Evangélico de Maringá</Text>
                </View>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Text style={styles.title}>Olá, {isLoggedIn() ? "Richieri Negri" : "Visitante"}</Text>
                                <Text style={styles.caption}>seja bem-vindo(a)!</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.drawerSection}>
                        <DrawerItem
                            style={styles.drawerItem}
                            labelStyle={styles.drawerItemText}
                            label="Devocional / Reflexão"
                            onPress={() => { navigation.navigate('Home') }}
                            activeBackgroundColor="#464646"
                        />
                        <DrawerItem
                            style={styles.drawerItem}
                            label="Agenda de Eventos"
                            labelStyle={styles.drawerItemText}
                            onPress={() => { navigation.navigate('Eventos') }}
                            activeBackgroundColor="#464646"
                        />
                        <DrawerItem
                            style={styles.drawerItem}
                            label="Ao vivo / Vídeos"
                            labelStyle={styles.drawerItemText}
                            onPress={() => { navigation.navigate('Midia') }}
                            activeBackgroundColor="#464646"
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <Text style={styles.drawerSectionText}>
                            Configurações
                        </Text>
                        <DrawerItem
                            style={styles.drawerItem}
                            labelStyle={styles.drawerItemText}
                            label="Perfil"
                            onPress={() => { navigation.navigate("Perfil") }}
                            activeBackgroundColor="#464646"
                        />
                        <DrawerItem
                            style={styles.drawerItem}
                            labelStyle={styles.drawerItemText}
                            label="Aplicativo"
                            onPress={() => { navigation.navigate("Aplicativo") }}
                            activeBackgroundColor="#464646"
                        />
                        <DrawerItem
                            style={styles.drawerItem}
                            labelStyle={styles.drawerItemText}
                            label="Sobre"
                            onPress={() => { navigation.navigate("Sobre") }}
                            activeBackgroundColor="#464646"
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    style={[styles.drawerItem, { borderWidth: 0 }]}
                    labelStyle={styles.drawerItemText}
                    icon={({ focused, size, color }) => {
                        return <FontAwesomeIcon icon={isLoggedIn() ? faSignOutAlt : faSignInAlt} color={isLoggedIn() ? "red" : "green"} size={size} />
                    }}
                    label={isLoggedIn() ? "Sair" : "Entrar"}
                    onPress={() => { isLoggedIn() ? signOut() : navigation.navigate("Entrar") }}
                />
            </View>
        </View>
    )
}

export default Sidebar;