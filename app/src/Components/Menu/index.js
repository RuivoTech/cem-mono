import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faBars, faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/images/logo.png";

import { styles } from "./styles";

const Menu = ({ handleShowModal, isModal }) => {
    const navigation = useNavigation();
    const [newNotification, setNewNotification] = useState(false);

    function toggleDrawer() {
        navigation.toggleDrawer();
    }

    function goNotifications() {
        navigation.navigate("Notification");
    }

    return (
        <View style={styles.menu}>
            <View style={styles.bars}>
                {isModal ?
                    <TouchableOpacity onPress={() => handleShowModal()} style={styles.buttonBars}>
                        <FontAwesomeIcon icon={faArrowLeft} color="#f37835" size={30} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={toggleDrawer} style={styles.buttonBars}>
                        <FontAwesomeIcon icon={faBars} size={30} color="#f37835" />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.menuLogo}>
                <Image source={logo} width={5} height={5} style={styles.logo} />
            </View>
            <View style={styles.notifications}>
                <TouchableOpacity onPress={goNotifications}>

                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Menu;