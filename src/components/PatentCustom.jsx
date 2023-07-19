import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Center,
    Flex,
    HStack,
    NativeBaseProvider,
    Spacer,
    Stack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import constants from "../constants/constants";
import loggedUser from "../objects/user";
import AlertNoticeFunction from "./Alerts/AlertNoticeFunction";
import AlertNotice from "./Alerts/AlertNotice";
import AlertError from "./Alerts/AlertError";
import { saveUserInformation } from "../functions/saveUserInformation";
import notifee from "@notifee/react-native";

const PatentCustom = ({
    patent,
    idVehicle,
    idButtonStart,
    idButtonStop,
    idUser,
    parked,
    position,
    setRefresh,
}) => {
    const [buttonStart, setButtonStart] = useState(true);
    const [buttonStop, setButtonStop] = useState(false);

    useEffect(() => {
        setButtonStart(!parked);
        setButtonStop(parked);
        const repeatFunction = async () => {
            const now = new Date();
            if ((now.getHours() >= 20 || now.getHours() <= 7) && parked) {
                setButtonStart(true);
                setButtonStop(false);
                loggedUser.user.vehicles[position].parked = buttonStop;
                saveUserInformation();
                parked = false;
                setRefresh(true);
            }
        };

        repeatFunction();

        setInterval(repeatFunction, 5000); // 60000 ms = 1 minuto
    }, []);

    useEffect(() => {
        let intervalId;

        if (buttonStop) {
            // Si el vehículo está estacionado, configurar el intervalo para enviar notificaciones cada 12 minutos
            intervalId = setInterval(() => {
                enviarNotificacion();
            }, 12 * 60 * 1000); // 12 * 60 * 1000 = 12 minutos en milisegundos
        }

        // Al salir del componente o dejar de estar estacionado, limpiar el intervalo
        return () => {
            clearInterval(intervalId);
        };
    }, [buttonStop]);

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(!isOpenAlertNotice);
        saveUserInformation();
        setRefresh(true);
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
    };

    const enviarNotificacion = async() => {
        // Lógica para enviar la notificación
        // Aquí puedes llamar a tu función o librería para enviar la notificación
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: "default",
            name: "Default Channel",
        });

        // Display a notification
        await notifee.displayNotification({
            title: "Vehículo Estacionado",
            body: `Aviso el vehículo ${patent} sigue estacionado`,
            android: {
                channelId,
                largeIcon: constants.PARKING_ICON,
                // smallIcon: "ic_small_icon",
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: "default",
                },
            },
        });
        console.log('Notificación enviada');

      };

    const updateBalance = async () => {
        await constants.AXIOS_INST.get(
            `usuario/obtener/${loggedUser.user.idUser}`,
            config
        )
            .then((response) => {
                loggedUser.user.balance = response.data.mensaje.saldo;
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    setMessageAlertError(error.response.data.mensaje);
                    setIsOpenAlertError(true);
                } else if (error.request) {
                    console.log(error.request);
                    setMessageAlertError(
                        "No se ha obtenido respuesta, intente nuevamente"
                    );
                    setIsOpenAlertError(true);
                } else {
                    console.log(error);
                }
                return;
            });
    };

    const Parking = async (idButton) => {
        onCloseAlertNoticeFunction();
        const parking = {
            estacionamiento: {
                idVehiculo: idVehicle,
                idUsuario: idUser,
            },
        };
        if (idButton == "start") {
            const now = new Date();
            if (now.getHours() >= 8 && now.getHours() <= 19) {
                await constants
                    .AXIOS_INST({
                        method: "post",
                        url: "estacionamiento/activar",
                        headers: {
                            Authorization: `bearer ${loggedUser.user.token}`,
                        },
                        data: {
                            estacionamiento: {
                                idVehiculo: idVehicle,
                                idUsuario: idUser,
                            },
                        },
                    })
                    .then((response) => {
                        setMessageAlertNotice("Estacionameinto Activado");
                        setIsOpenAlertNotice(true);
                        setButtonStart(false);
                        setButtonStop(true);
                        loggedUser.user.vehicles[position].parked = buttonStart;
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                            setMessageAlertError(error.response.data.mensaje);
                            setIsOpenAlertError(true);
                        } else if (error.request) {
                            console.log(error.request);
                            setMessageAlertError(
                                "No se ha obtenido respuesta, intente nuevamente"
                            );
                            setIsOpenAlertError(true);
                        } else {
                            console.log(error);
                        }
                        return;
                    });
            } else {
                setMessageAlertError("No se puede estacionar fuera de horario");
                setIsOpenAlertError(true);
            }
        } else {
            await constants.AXIOS_INST.put(
                "estacionamiento/desactivar",
                parking,
                config
            )
                .then((response) => {
                    setMessageAlertNotice("Estacionamiento Desactivado");
                    setIsOpenAlertNotice(true);
                    setButtonStart(true);
                    setButtonStop(false);
                    loggedUser.user.vehicles[position].parked = buttonStart;
                    updateBalance();
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        setMessageAlertError(error.response.data.mensaje);
                        setIsOpenAlertError(true);
                    } else if (error.request) {
                        console.log(error.request);
                        setMessageAlertError(
                            "No se ha obtenido respuesta, intente nuevamente"
                        );
                        setIsOpenAlertError(true);
                    } else {
                        console.log(error);
                    }
                    return;
                });
        }
    };

    return (
        <NativeBaseProvider key={idVehicle}>
            <Flex mb={4}>
                <Flex direction="row" justifyContent="center">
                    <Stack minW="75%">
                        <ImageBackground
                            source={require("../image/patente-argentina.png")}
                            resizeMode="stretch"
                            style={{ flex: 1, minHeight: 90 }}
                        >
                            <Center minH="100%" pt={4}>
                                <Text style={styles.textPatent}>{patent}</Text>
                            </Center>
                        </ImageBackground>
                    </Stack>
                </Flex>
                <HStack style={styles.containerParking} marginTop={1}>
                    {/* <FontAwesome name="volume-up" size={24} color="black" />
                    <Spacer></Spacer> */}
                    <TouchableOpacity
                        style={
                            buttonStart
                                ? styles.playButtonActivate
                                : styles.buttonDesactivate
                        }
                        onPress={() => {
                            setIsOpenAlertNoticeFunction(true);
                        }}
                        disabled={!buttonStart}
                    >
                        <Text
                            style={
                                buttonStart
                                    ? styles.textActivateButton
                                    : styles.textDesactivateButton
                            }
                        >
                            Iniciar
                        </Text>
                        <AntDesign
                            name="play"
                            style={
                                buttonStart
                                    ? styles.iconActivate
                                    : styles.iconDesactivate
                            }
                        />
                    </TouchableOpacity>
                    <Spacer></Spacer>
                    <TouchableOpacity
                        style={
                            buttonStop
                                ? styles.stopButtonActivate
                                : styles.buttonDesactivate
                        }
                        onPress={() => {
                            setIsOpenAlertNoticeFunction(true);
                        }}
                        disabled={!buttonStop}
                    >
                        <Text
                            style={
                                buttonStop
                                    ? styles.textActivateButton
                                    : styles.textDesactivateButton
                            }
                        >
                            Parar
                        </Text>
                        <FontAwesome5
                            name="stop-circle"
                            style={
                                buttonStop
                                    ? styles.iconActivate
                                    : styles.iconDesactivate
                            }
                        />
                    </TouchableOpacity>
                </HStack>
            </Flex>
            {buttonStart ? (
                <AlertNoticeFunction
                    isOpen={isOpenAlertNoticeFunction}
                    cancelRef={cancelRefAlertNoticeFunction}
                    onClose={onCloseAlertNoticeFunction}
                    buttonColorAcept={{ backgroundColor: "green" }}
                    onPressAccept={() => Parking(idButtonStart)}
                    message={`¿Está seguro que desea INICIAR el estacionamiento para la patente ${patent}?`}
                ></AlertNoticeFunction>
            ) : (
                <AlertNoticeFunction
                    isOpen={isOpenAlertNoticeFunction}
                    cancelRef={cancelRefAlertNoticeFunction}
                    onClose={onCloseAlertNoticeFunction}
                    onPressAccept={() => Parking(idButtonStop)}
                    message={`¿Está seguro que desea PARAR el estacionamiento para la patente ${patent}?`}
                ></AlertNoticeFunction>
            )}
            <AlertNotice
                isOpen={isOpenAlertNotice}
                cancelRef={cancelRefAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
            ></AlertNotice>
            <AlertError
                isOpen={isOpenAlertError}
                cancelRef={cancelRefAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
            ></AlertError>
        </NativeBaseProvider>
    );
};

export default PatentCustom;

const styles = ScaledSheet.create({
    button: {
        borderTopStartRadius: "30@ms",
        borderBottomStartRadius: "30@ms",
    },
    textPatent: {
        fontSize: "30@ms",
        fontWeight: "bold",
    },
    containerParking: {
        minHeight: "50@ms",
        minWidth: "85%",
        borderRadius: "30@ms",
        paddingHorizontal: "20@ms",
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    playButtonActivate: {
        height: "60%",
        borderRadius: "100@ms",
        flexDirection: "row",
        backgroundColor: "#01a254",
        alignItems: "center",
        minWidth: "20%",
    },
    stopButtonActivate: {
        height: "60%",
        borderRadius: "100@ms",
        flexDirection: "row",
        backgroundColor: "#e81524",
        alignItems: "center",
        minWidth: "20%",
    },
    buttonDesactivate: {
        height: "60%",
        borderRadius: "100@ms",
        flexDirection: "row",
        backgroundColor: "#f4f3f1",
        alignItems: "center",
        minWidth: "20%",
    },
    textActivateButton: {
        fontSize: "17@ms",
        fontWeight: "bold",
        color: "white",
        marginLeft: "16@ms",
        marginRight: "20@ms",
    },
    textDesactivateButton: {
        fontSize: "17@ms",
        fontWeight: "bold",
        color: "#473a4b",
        marginLeft: "16@ms",
        marginRight: "20@ms",
    },
    iconActivate: {
        color: "white",
        fontSize: "30@ms",
    },
    iconDesactivate: {
        color: "#414141",
        fontSize: "30@ms",
    },
});
