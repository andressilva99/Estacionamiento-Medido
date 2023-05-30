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
import { saveUserInformation } from "../functions/saveUserInformation";

const PatentCustom = ({
    patent,
    idVehicle,
    idButtonStart,
    idButtonStop,
    idUser,
    parked,
    position,
}) => {
    const [buttonStart, setButtonStart] = useState(true);
    const [buttonStop, setButtonStop] = useState(false);

    useEffect(() => {
        setButtonStart(!parked);
        setButtonStop(parked);
    }, []);

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [isOpenAlertNotice, setIsOpenAlertNotice] =
        useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () =>
        setIsOpenAlertNotice(!isOpenAlertNotice);
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
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
            await constants.AXIOS_INST.post(
                "estacionamiento/activar",
                parking,
                config
            )
                .then((response) => {
                    setMessageAlertNotice(response.data.mensaje);
                    setIsOpenAlertNotice(true);
                    setButtonStart(false);
                    setButtonStop(true);
                    loggedUser.user.vehicles[position].parked = buttonStart;
                })
                .catch((error) => {
                    alert(error.response.data.mensaje);
                });
        } else {
            await constants.AXIOS_INST.put(
                "estacionamiento/desactivar",
                parking,
                config
            )
                .then((response) => {
                    setMessageAlertNotice(response.data.mensaje);
                    setIsOpenAlertNotice(true);
                    setButtonStart(true);
                    setButtonStop(false);
                    loggedUser.user.vehicles[position].parked = buttonStart;
                })
                .catch((error) => {
                    alert(error.response.data.mensaje);
                });
        }
        saveUserInformation();
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
                    <FontAwesome name="volume-up" size={24} color="black" />
                    <Spacer></Spacer>
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
                    message={`¿Está seguro de que quiere iniciar el estacionamiento para la patente ${patent}?`}
                ></AlertNoticeFunction>
            ) : (
                <AlertNoticeFunction
                    isOpen={isOpenAlertNoticeFunction}
                    cancelRef={cancelRefAlertNoticeFunction}
                    onClose={onCloseAlertNoticeFunction}
                    onPressAccept={() => Parking(idButtonStop)}
                    message={`¿Está seguro de que quiere detener el estacionamiento para la patente ${patent}?`}
                ></AlertNoticeFunction>
            )}
            <AlertNotice
                isOpen={isOpenAlertNotice}
                cancelRef={cancelRefAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}></AlertNotice>
        </NativeBaseProvider>
    );
};

export default PatentCustom;

const styles = ScaledSheet.create({
    button: {
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
    },
    textPatent: {
        fontSize: 30,
        fontWeight: "bold",
    },
    containerParking: {
        minHeight: 50,
        minWidth: "85%",
        borderRadius: 30,
        paddingHorizontal: 20,
        backgroundColor: "#dbdcde",
        alignItems: "center",
    },
    playButtonActivate: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#01a254",
        alignItems: "center",
        minWidth: "20%",
    },
    stopButtonActivate: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#e81524",
        alignItems: "center",
        minWidth: "20%",
    },
    buttonDesactivate: {
        height: "60%",
        borderRadius: 100,
        flexDirection: "row",
        backgroundColor: "#f4f3f1",
        alignItems: "center",
        minWidth: "20%",
    },
    textActivateButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        marginLeft: 16,
        marginRight: 20,
    },
    textDesactivateButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#473a4b",
        marginLeft: 16,
        marginRight: 20,
    },
    iconActivate: {
        color: "white",
        fontSize: 30,
    },
    iconDesactivate: {
        color: "#414141",
        fontSize: 30,
    },
});
