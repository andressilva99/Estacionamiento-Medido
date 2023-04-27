import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Image, NativeBaseProvider } from "native-base";
import constants from "../constants/constants";
import { AntDesign } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";

const PressableCustom = ({ style, text }) => {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.touchable, style]}>
                    <HStack space="md" >
                        <AntDesign
                            name="close"
                            style={styles.icon}
                        />
                        <Text style={styles.text}>Cerrar sesión</Text>
                    </HStack>
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    );
};

export default PressableCustom;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    touchable: {
        borderRadius: 30,
        minHeight: "7%",
        justifyContent: "center",
        maxWidth: "90%",
        backgroundColor: "blue",
        paddingLeft: "20@ms"
    },
    icon: {
        color: "#04467C",
        fontSize: "30@ms",
        backgroundColor: "white",
        borderRadius: "100@ms",
    },
    text: {
        fontSize: "20@ms",
        color: "white",
    },
});
