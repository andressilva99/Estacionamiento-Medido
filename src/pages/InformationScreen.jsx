import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Spacer,
    Stack,
    VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import HeaderPage from "../components/HeaderPage";

const { height } = Dimensions.get("screen");

const InformationScreen = ({navigation}) => {
    const handleButtonPressMenu = () => {
        // console.log(`Pressed button `);
        navigation.navigate("Menu");
    };
    return (
        <NativeBaseProvider>
            <Stack
                space="sm"
                height={height}
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <HStack justifyItems="flex-start" minW="85%">
                    <Ionicons
                        name="information-circle-outline"
                        style={styles.iconInformation}
                    />
                    <Text style={styles.textBold}>A cerca de</Text>
                </HStack>
                <VStack space="sm">
                    <Stack>
                        <Text style={styles.textBold}>Oficina</Text>
                        <Text style={styles.textNormal}>Iturraspe 2345</Text>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Teléfono</Text>
                        <Text style={styles.textNormal}>3564 / 435890</Text>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Correo</Text>
                        <Text style={styles.textNormal}>estacionamientomedido@em.com</Text>
                    </Stack>
                    <Stack>
                        <Text style={styles.textBold}>Horario</Text>
                        <Text style={styles.textNormal}>Lunes a Viernes</Text>
                        <Text style={styles.textNormal}>de 7.30 a 12.30 hs.</Text>
                    </Stack>
                </VStack>
            </Stack>
        </NativeBaseProvider>
    );
};

export default InformationScreen;

const styles = ScaledSheet.create({
    background: {
        backgroundColor: "#f2f2f4",
    },
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: 5,
        paddingLeft: "15@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    icon: {
        width: "30@ms",
        height: "30@ms",
        borderRadius: "100@ms",
    },
    textHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
    },
    iconInformation:{
        fontWeight: "bold",
        color: "#3f60af",
        fontSize: "25@ms",
        paddingRight: "10@ms"
    },
    textBold: {
        fontWeight: "bold",
        color: "#3f60af",
        fontSize: "20@ms",
    },
    textNormal: {
        color: "#3f60af",
        fontSize: "15@ms",
    },
});
