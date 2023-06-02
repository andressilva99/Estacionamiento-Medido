import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, HStack, Image, NativeBaseProvider, Spacer } from "native-base";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";

const HeaderPage = ({onPress}) => {
    return (
        <NativeBaseProvider>
            <HStack style={styles.containerHeader}>
                <Image
                    source={constants.PARKING_ICON}
                    alt={"Parking"}
                    style={styles.icon}
                ></Image>
                <Spacer></Spacer>
                <Text style={styles.textHeader}>Estacionamiento medido</Text>
                <Spacer></Spacer>
                <Button variant="ghost" onPress={onPress}>
                    <Feather name="menu" size={30} color="white" />
                </Button>
            </HStack>
        </NativeBaseProvider>
    );
};

export default HeaderPage;

const styles = ScaledSheet.create({
    containerHeader: {
        minHeight: "45@ms",
        minWidth: "90%",
        borderRadius: "5@ms",
        paddingLeft: "15@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    textHeader: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "white",
    },
    icon: {
        width: "30@ms",
        height: "30@ms",
        borderRadius: "100@ms",
    },
});
