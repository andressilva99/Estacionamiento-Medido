import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
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
import { ScaledSheet } from "react-native-size-matters";
import loggedUser from "../objects/user";
import PatentCustom from "../components/PatentCustom";
import HeaderPage from "../components/HeaderPage";

const ParkingScreen = ({ navigation }) => {
    const [isBalanceNegative, setIsBalanceNegative] = useState(false);
    
    useEffect(() => {
       const verifyBalanceNegative = () => {
        balance = parseFloat(loggedUser.user.balance);
        if (balance < 0) {
            setIsBalanceNegative(true);
        }
       }
       verifyBalanceNegative();
    }, []);

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
                    <AntDesign name="wallet" style={[styles.icon, {color: "#17974c"}, isBalanceNegative ? styles.textBalanceNegative : null]} />
                    <Text style={[styles.textBalance, isBalanceNegative ? styles.textBalanceNegative : null]}>
                        Saldo: $ {loggedUser.user.balance}
                    </Text>
                </HStack>
                <Stack>
                    <Button
                        startIcon={
                            <FontAwesome5 name="car" style={styles.icon} />
                        }
                        style={styles.enterVehicleButton}
                        onPress={() => navigation.navigate("EnterVehicle")}
                    >
                        <Text style={styles.textEnterVehicle}>
                            Ingresar Nuevo Vehículo
                        </Text>
                    </Button>
                </Stack>
                <HStack style={styles.parking}>
                    <FontAwesome5 name="car" style={styles.icon} />
                    <Text style={styles.textParkingVehicle}>Estacionar</Text>
                    <Spacer></Spacer>
                    <FontAwesome name="chevron-down" style={[styles.icon, {paddingRight: "6%"}]}/>
                </HStack>
                <ScrollView>
                    {loggedUser.user.vehicles
                        ? loggedUser.user.vehicles.map((vehicle, index) => (
                              <PatentCustom
                                  patent={vehicle.patent}
                                  idVehicle={vehicle.idVehicle}
                                  idButtonStart="start"
                                  idButtonStop="stop"
                                  key={vehicle.idVehicle}
                                  idUser={loggedUser.user.idUser}
                                  parked={vehicle.parked}
                                  position={index}
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
    textPatent: {
        fontSize: "30@ms",
        fontWeight: "bold",
    },
    containerUser: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#c4e5f8",
    },
    containerBalance: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },
    containerParking: {
        minHeight: "50@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingHorizontal: "20@ms",
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    textName: {
        fontWeight: "bold",
        fontSize: "21@ms",
        color: "#4c75a1",
    },
    textAccount: {
        fontSize: "15@ms",
        fontWeight: "bold",
        color: "#5a7485",
    },
    textBalance: {
        fontWeight: "bold",
        fontSize: "25@ms",
        color: "#17974c",
        marginLeft: 15,
    },
    background: {
        backgroundColor: "#f2f2f4",
    },
    enterVehicleButton: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#77b5dc",
        justifyContent: "flex-start",
    },
    parking: {
        minHeight: "7%",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#53be88",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textEnterVehicle: {
        fontWeight: "bold",
        fontSize: "20@ms",
        color: "white",
        marginLeft: "8@ms",
    },
    textParkingVehicle: {
        fontWeight: "bold",
        fontSize: "20@ms",
        color: "white",
        marginLeft: "15@ms",
    },
    icon: {
        color: "white",
        fontSize: "24@ms",
    },
    textBalanceNegative: {
        color: "red",
    }
});
