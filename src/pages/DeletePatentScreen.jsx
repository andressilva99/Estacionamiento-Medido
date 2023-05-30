import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import {
    AlertDialog,
    Button,
    Center,
    HStack,
    NativeBaseProvider,
    ScrollView,
    Spacer,
    Stack,
    VStack,
    Text,
} from "native-base";
import HeaderPage from "../components/HeaderPage";
import { ScaledSheet } from "react-native-size-matters";
import loggedUser from "../objects/user";
import DeletePatentModule from "../components/DeletePatentModule";

const { height } = Dimensions.get("screen");

const DeletePatentScreen = ({ navigation }) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const cancelRef = useRef(null);
    // const onClose = () => setIsOpen(!isOpen);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height={height}
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Text style={styles.textProfile}>Eliminar patentes</Text>
                </Stack>
                <ScrollView>
                    {loggedUser.user.vehicles
                        ? loggedUser.user.vehicles.map((vehicle) => (
                              <DeletePatentModule
                                  patent={vehicle.patent}
                                  id={vehicle.idVehicle}
                              ></DeletePatentModule>
                          ))
                        : null}
                </ScrollView>
            </Stack>
        </NativeBaseProvider>
    );
};

export default DeletePatentScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerProfile: {
        minHeight: "5%",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "3%",
    },
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    containerPatent: {
        minHeight: "7%",
        minWidth: "85%",
        backgroundColor: "#eaeaec",
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
        borderRadius: "30@ms",
        alignItems: "center",
    },
    textPatent: {
        fontSize: "17@ms",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "red",
        borderRadius: "30@ms",
    },
    textButton: {
        color: "white",
        fontSize: "17@ms",
        fontWeight: "bold",
    },
    textBody: {
        fontSize: "15@ms",
    },
    textHeader: {
        fontSize: "20@ms",
        fontWeight: "bold",
    },
    textButtonCancel: {
        fontSize: "17@ms",
        fontWeight: "bold",
    },
});
