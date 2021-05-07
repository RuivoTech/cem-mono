import React, { Children } from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

const PDF = ({ data, children = [] }) => {

    const renderValue = (field, item) => {
        const [grupo, subGrupo] = field.split(".");
        let returning = "";

        if (grupo && subGrupo) {
            returning = item[grupo][subGrupo];
        } else {
            returning = item[field];
        }

        return returning;
    }

    const checkIndexIsEven = (n) => {
        return n % 2 === 0;
    }

    return (
        <View style={styles.table}>
            <View style={styles.thead} fixed={true}>
                {children.map((child, index) => {
                    return (
                        <View style={[styles.tcol, { width: `${child.props.size}vw` }]} key={index}>
                            <Text style={styles.tcell}>{child.props.title}</Text>
                        </View>
                    )
                })}
            </View>
            {data.map((item, index) => {
                return (
                    <View key={index} style={checkIndexIsEven(index) ? styles.trow : styles.trowBackground}>
                        {Children.map(children, child => {
                            const value = child.props.body ? child.props.body(item) : renderValue(child.props.field, item);

                            return React.cloneElement(child, {
                                value,
                                styles,
                                size: child.props.size
                            })
                        })}
                    </View>
                )
            })}
        </View>
    )
}

export default PDF;