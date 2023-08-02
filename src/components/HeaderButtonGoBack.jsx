import { BackHandler, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Button, Stack } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const HeaderButtonGoBack = ({ navigation, exitApp }) => {
    const goBack = () => {
        navigation.goBack();
    };

    const exitApplication = () => {
        BackHandler.exitApp();
    }
    return (
        <Stack style={styles.container}>
            <Button variant={"ghost"} onPress={() => {exitApp ? exitApplication() : goBack()}}>
                <AntDesign name="arrowleft" style={styles.iconBack} />
            </Button>
        </Stack>
    );
};

export default HeaderButtonGoBack;

const styles = ScaledSheet.create({
    container: {
        height: "50@ms",
        width: "100%",
        alignItems: "flex-start"
    },    
    iconBack: {
        color: "#3f60af",
        fontSize: "32@ms",
    },
});
