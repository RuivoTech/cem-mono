import React from "react";
import { View, Text } from "@react-pdf/renderer";

const Column = ({ value, styles, size }) => {
    return (
        <View style={[styles.tcol, { width: `${size}vw` }]}>
            <Text style={styles.tcell}>{value}</Text>
        </View>
    )
}

export default Column;