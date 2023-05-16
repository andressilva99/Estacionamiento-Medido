import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Spacer,
    Stack,
    VStack,
    Image,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import constants from "../constants/constants";
import { ScaledSheet } from "react-native-size-matters";
import loggedUser from "../objects/user";
import PatentCustom from "../components/PatentCustom";
import HeaderPage from "../components/HeaderPage";

const ParkingScreen = ({ navigation }) => {
    const [buttonState, setButtonState] = useState(true);
    // useEffect(() => {
    //    console.log(loggedUser.user.vehicles)
    // }, []);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    return (
        <NativeBaseProvider>
            <VStack
                space="sm"
                height="100%"
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <VStack style={styles.containerUser}>
                    <Text
                        style={styles.textName}
                    >{`${loggedUser.user.lastName}, ${loggedUser.user.firstName}`}</Text>
                    <Text style={styles.textAccount}>
                        Cuenta Nro: {loggedUser.user.idUser}
                    </Text>
                </VStack>
                <HStack style={styles.containerBalance}>
                    <AntDesign name="wallet" size={24} color="#17974c" />
                    <Text style={styles.textBalance}>Saldo: $ {loggedUser.user.balance}</Text>
                </HStack>
                <Stack>
                    <Button
                        startIcon={
                            <FontAwesome5 name="car" size={24} color="white" />
                        }
                        style={styles.enterVehicleButton}
                        onPress={() => navigation.navigate("EnterVehicle")}
                    >
                        <Text style={styles.textEnterVehicle}>
                            Ingresar Nuevo Vehículo
                        </Text>
                    </Button>
                </Stack>
                <Stack>
                    <Button
                        startIcon={
                            <FontAwesome5 name="car" size={24} color="white" />
                        }
                        style={styles.parkingButton}
                        endIcon={
                            <FontAwesome
                                name="chevron-down"
                                size={24}
                                color="white"
                            />
                        }
                    >
                        <Text style={styles.textParkingVehicle}>
                            Estacionar
                        </Text>
                    </Button>
                </Stack>
                <ScrollView>
                    {loggedUser.user.vehicles
                        ? loggedUser.user.vehicles.map((vehicle) => (
                              <PatentCustom
                                  patent={vehicle.patent}
                                  idVehicle={vehicle.idVehicle}
                                  idButtonStart="start"
                                  idButtonStop="stop"
                                  key={vehicle.idVehicle}
                                  idUser={loggedUser.user.idUser}
                              ></PatentCustom>
                          ))
                        : null}
                </ScrollView>
            </VStack>
        </NativeBaseProvider>
    );
};

export default ParkingScreen;

const styles = ScaledSheet.create({
    button: {
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
    },
    textPatent: {
        fontSize: 30,
        fontWeight: "bold",
    },
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: 5,
        paddingLeft: "15@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    textHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "white",
    },
    containerUser: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#c4e5f8",
    },
    containerBalance: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },
    containerParking: {
        minHeight: 50,
        minWidth: "85%",
        borderRadius: 30,
        paddingHorizontal: 20,
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    textName: {
        fontWeight: "bold",
        fontSize: 21,
        color: "#4c75a1",
    },
    textAccount: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#5a7485",
    },
    textBalance: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#17974c",
        marginLeft: 15,
    },
    background: {
        backgroundColor: "#f2f2f4",
    },
    enterVehicleButton: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#77b5dc",
        justifyContent: "flex-start",
    },
    parkingButton: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: 30,
        paddingLeft: 20,
        backgroundColor: "#53be88",
        justifyContent: "flex-start",
    },
    textEnterVehicle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginLeft: 8,
    },
    textParkingVehicle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginLeft: 8,
        marginRight: 100,
    },
    playButton: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#01a254",
        alignItems: "center",
        minWidth: "20%",
    },
    stopButton: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#f4f3f1",
        alignItems: "center",
        minWidth: "20%",
    },
    textPlayButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginLeft: 16,
        marginRight: 20,
    },
    textStopButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#473a4b",
        marginLeft: 16,
        marginRight: 20,
    },
    icon: {
        width: "30@ms",
        height: "30@ms",
        borderRadius: "100@ms",
    },
});
