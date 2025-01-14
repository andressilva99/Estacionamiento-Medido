import { AppState, ScrollView, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Spacer,
    Stack,
    VStack,
    Image,
    Spinner,
    StatusBar,
    Skeleton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import loggedUser from "../objects/user";
import PatentCustom from "../components/PatentCustom";
import HeaderPage from "../components/HeaderPage";
import { newEnterVehicle } from "../objects/newEnterVehicle";
import constants from "../constants/constants";
import { saveUserInformation } from "../functions/saveUserInformation";

const ParkingScreen = ({ navigation }) => {
    const [isBalanceNegative, setIsBalanceNegative] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const [loading, setLoading] = useState(false);

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === "active"
                ) {
                    refreshData();
                }

                appState.current = nextAppState;
                console.log("AppState", appState.current);
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        const verifyBalanceNegative = () => {
            balance = parseFloat(loggedUser.user.balance);
            if (balance < 0) {
                setIsBalanceNegative(true);
            }
        };
        verifyBalanceNegative();
    }, [refresh]);

    useEffect(() => {
        const verifyChangePass = async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            if (loggedUser.user.changePass == 1) {
                navigation.navigate("ChangePassword");
            }
        };
        verifyChangePass();
    }, []);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu", { refreshParkingScreen });
    };

    const refreshParkingScreen = () => {
        setRefresh(!refresh);
        console.log("Parking screen actualizado");
    };

    const refreshData = async () => {
        setLoading(true);
        await constants
            .AXIOS_INST({
                method: "get",
                url: `usuario/obtener/${loggedUser.user.idUser}`,
                headers: {
                    Authorization: `bearer ${loggedUser.user.token}`,
                },
            })
            .then((response) => {
                FillUserData(response.data.mensaje);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error);
                }
                return;
            });
        setLoading(false);
    };

    const FillUserData = async (data) => {
        loggedUser.user.idUser = data.idUsuario;
        loggedUser.user.changePass = data.cambiarClave;
        loggedUser.user.documentNumber = data.numeroDocumento;
        loggedUser.user.email = data.email;
        loggedUser.user.firstName = data.nombrePersona;
        loggedUser.user.lastName = data.apellido;
        loggedUser.user.numberPhone = data.numeroTelefono;
        loggedUser.user.razonSocial = data.razonSocial;
        loggedUser.user.phoneCompany.idPhoneCompany =
            data.compania_telefono.idCompaniaTelefono;
        loggedUser.user.phoneCompany.name = data.compania_telefono.nombre;
        loggedUser.user.balance = data.saldo;
        loggedUser.user.vehicles = [];
        if (data.usuario_vehiculo != undefined) {
            data.usuario_vehiculo.forEach((vehicle) => {
                console.log(vehicle);
                loggedUser.user.vehicles.push({
                    mark: vehicle.vehiculo.marca.nombre,
                    model: vehicle.vehiculo.modelo.nombre,
                    patent: vehicle.vehiculo.patente,
                    color: vehicle.vehiculo.color.nombre,
                    idVehicle: vehicle.vehiculo.idVehiculo,
                    parked: vehicle.vehiculo.estacionado,
                    exitProgrammed: vehicle.vehiculo.salidaProgramada,
                });
            });
        }
        await saveUserInformation();
        refreshParkingScreen();
    };

    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={"default"}
                backgroundColor={"black"}
            ></StatusBar>
            <VStack
                space={"sm"}
                height="100%"
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage
                        onPress={handleButtonPressMenu}
                        navigation={navigation}
                        dissableButtonGoBack={true}
                    ></HeaderPage>
                </HStack>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <VStack space="sm">
                        <HStack>
                            <VStack style={styles.containerUser}>
                                <Text
                                    style={styles.textName}
                                >{`${loggedUser.user.lastName}, ${loggedUser.user.firstName}`}</Text>
                                <Text style={styles.textAccount}>
                                    Cuenta Nro: {loggedUser.user.idUser}
                                </Text>
                            </VStack>
                            {loading ? (
                                <Button
                                    variant={"ghost"}
                                    style={styles.buttonRefresh}
                                    isLoading
                                    spinnerPlacement="start"
                                    _spinner={{ color: "#3f60af", size: "lg" }}
                                ></Button>
                            ) : (
                                <Button
                                    variant={"ghost"}
                                    style={styles.buttonRefresh}
                                    onPress={refreshData}
                                >
                                    <FontAwesome
                                        name="refresh"
                                        style={styles.iconRefresh}
                                    />
                                </Button>
                            )}
                        </HStack>
                        <HStack style={styles.containerBalance}>
                            {loading ? (
                                <Skeleton
                                    startColor={
                                        isBalanceNegative ? "red" : "#17974c"
                                    }
                                    style={styles.skeletonBalanceComplete}
                                ></Skeleton>
                            ) : (
                                <>
                                    <AntDesign
                                        name="wallet"
                                        style={[
                                            styles.icon,
                                            { color: "#17974c" },
                                            isBalanceNegative
                                                ? styles.textBalanceNegative
                                                : null,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.textBalance,
                                            isBalanceNegative
                                                ? styles.textBalanceNegative
                                                : null,
                                        ]}
                                    >
                                        Saldo: $ {loggedUser.user.balance}
                                    </Text>
                                </>
                            )}
                        </HStack>
                        <Stack>
                            {loading ? (
                                <Skeleton
                                    style={styles.skeletonButtonRegisterVehicle}
                                    startColor={"#77b5dc"}
                                ></Skeleton>
                            ) : (
                                <Button
                                    startIcon={
                                        <FontAwesome5
                                            name="car"
                                            style={styles.icon}
                                        />
                                    }
                                    style={styles.enterVehicleButton}
                                    onPress={() => {
                                        newEnterVehicle.color = null;
                                        newEnterVehicle.model = null;
                                        newEnterVehicle.mark = null;
                                        navigation.navigate("EnterVehicle", {
                                            refreshParkingScreen,
                                        });
                                    }}
                                >
                                    <Text style={styles.textEnterVehicle}>
                                        Ingresar Nuevo Vehículo
                                    </Text>
                                </Button>
                            )}
                        </Stack>
                        <HStack space="md" style={styles.parking}>
                            {loading ? (
                                <Skeleton
                                    style={styles.skeletonTextVehicles}
                                    startColor={"#3f60af"}
                                ></Skeleton>
                            ) : (
                                <>
                                    <FontAwesome5
                                        name="car"
                                        style={[
                                            styles.icon,
                                            { color: "#3f60af" },
                                        ]}
                                    />
                                    <Text style={styles.textParkingVehicle}>
                                        Vehículos Registrados
                                    </Text>
                                </>
                            )}
                        </HStack>
                        {loading ? (
                            <VStack
                                space={"sm"}
                                minWidth={"85%"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Skeleton
                                    style={styles.skeletonPattent}
                                    startColor={"gray.300"}
                                ></Skeleton>
                                <Skeleton
                                    style={styles.skeletonButtons}
                                    startColor={"gray.300"}
                                ></Skeleton>
                            </VStack>
                        ) : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                            >
                                {loggedUser.user.vehicles
                                    ? loggedUser.user.vehicles.map(
                                          (vehicle, index) => (
                                              <PatentCustom
                                                  patent={vehicle.patent}
                                                  idVehicle={vehicle.idVehicle}
                                                  idButtonStart="start"
                                                  idButtonStop="stop"
                                                  key={vehicle.idVehicle}
                                                  idUser={
                                                      loggedUser.user.idUser
                                                  }
                                                  parked={vehicle.parked}
                                                  position={index}
                                                  setRefresh={
                                                      refreshParkingScreen
                                                  }
                                                  hourExitProgrammed={
                                                      vehicle.exitProgrammed
                                                  }
                                              ></PatentCustom>
                                          )
                                      )
                                    : null}
                            </ScrollView>
                        )}
                    </VStack>
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
        minHeight: "45@ms",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        paddingRight: "20@ms",
        backgroundColor: "#c4e5f8",
        flex: 1,
    },
    containerBalance: {
        minHeight: "45@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#f8f8f8",
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
        minHeight: "45@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#77b5dc",
        justifyContent: "flex-start",
    },
    parking: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        justifyContent: "center",
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
        color: "#3f60af",
    },
    icon: {
        color: "white",
        fontSize: "24@ms",
    },
    textBalanceNegative: {
        color: "red",
    },
    buttonRefresh: {
        flex: 0.3,
    },
    iconRefresh: {
        color: "#3f60af",
        fontSize: "35@ms",
    },
    textUpdateInfo: {
        color: "#3f60af",
        fontSize: "18@ms",
        fontWeight: "bold",
    },
    skeletonPattent: {
        height: "90@ms",
        width: "75%",
        borderRadius: "15@ms",
    },
    skeletonButtons: {
        minHeight: "50@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
    },
    skeletonBalance: {
        borderRadius: "30@ms",
        width: "130@ms",
        height: "25@ms",
        marginLeft: 15,
    },
    skeletonTextVehicles: {
        width: "75%",
        height: "25@ms",
        borderRadius: "30@ms",
    },
    skeletonButtonRegisterVehicle: {
        minHeight: "45@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
    },
    skeletonBalanceComplete: {
        width: "70%",
        height: "25@ms",
        borderRadius: "30@ms",
    },
});
