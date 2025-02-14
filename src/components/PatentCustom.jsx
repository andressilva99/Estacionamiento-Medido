import { ImageBackground, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Center, Flex, HStack, Spacer, Stack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import constants from "../constants/constants";
import loggedUser from "../objects/user";
import AlertNoticeFunction from "./Alerts/AlertNoticeFunction";
import AlertNotice from "./Alerts/AlertNotice";
import AlertError from "./Alerts/AlertError";
import { saveUserInformation } from "../functions/saveUserInformation";
import SetUpExit from "./Modals Schedule Exit/SetUpExit";
import EditExit from "./Modals Schedule Exit/EditExit";

const PatentCustom = ({
    patent,
    idVehicle,
    idButtonStart,
    idButtonStop,
    idUser,
    parked,
    position,
    setRefresh,
    hourExitProgrammed,
}) => {
    const [buttonStart, setButtonStart] = useState(true);
    const [buttonStop, setButtonStop] = useState(false);

    const [hourExit, setHourExit] = useState(() => {
        console.log(hourExitProgrammed);
        if (hourExitProgrammed) {
            return new Date(hourExitProgrammed);
        } else {
            return null;
        }
    });

    useEffect(() => {
        setButtonStart(!parked);
        setButtonStop(parked);
    }, []);

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(false);
        setRefresh(true);
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [modalVisibleSetUp, setModalVisibleSetUp] = useState(false);
    const cancelRefModalSetUp = useRef(null);

    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const cancelRefModalEdit = useRef(null);

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
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
                    console.log(response);
                    setMessageAlertNotice(response.data.mensaje);
                    setIsOpenAlertNotice(true);
                    setButtonStart(false);
                    setButtonStop(true);
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
                })
                .finally(() => {
                    loggedUser.user.vehicles[position].parked = buttonStart;
                });
        } else {
            await constants.AXIOS_INST.put(
                "estacionamiento/desactivar",
                parking,
                config
            )
                .then(async (response) => {
                    setMessageAlertNotice(response.data.mensaje);
                    setIsOpenAlertNotice(true);
                    setButtonStart(true);
                    setButtonStop(false);
                    loggedUser.user.vehicles[position].parked = buttonStart;
                    await updateBalance();
                    saveUserInformation();
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
        <>
            <Flex mb={4} key={idVehicle}>
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
                {buttonStop ? (
                    hourExit ? (
                        <HStack style={styles.containerParking} marginTop={1}>
                            <Stack style={styles.containerTextProgram}>
                                <Text style={styles.textProgram}>Salida</Text>
                            </Stack>
                            <Stack style={styles.containerTextProgram}>
                                <Text style={styles.textProgram}>
                                    {hourExit
                                        .getHours()
                                        .toString()
                                        .padStart(2, "0") +
                                        " : " +
                                        hourExit
                                            .getMinutes()
                                            .toString()
                                            .padStart(2, "0")}
                                </Text>
                            </Stack>
                            <Button
                                onPress={() => {
                                    console.log("Aprete el boton de editar");
                                    setModalVisibleEdit(true);
                                }}
                                style={styles.buttonProgram}
                            >
                                <Text
                                    style={[
                                        styles.textProgram,
                                        { color: "white" },
                                    ]}
                                >
                                    Editar
                                </Text>
                            </Button>
                            <EditExit
                                isOpen={modalVisibleEdit}
                                onClose={() => setModalVisibleEdit(false)}
                                patent={patent}
                                cancelRef={cancelRefModalEdit}
                                setHourExit={setHourExit}
                                hourExit={hourExit}
                                setModalVisible={setModalVisibleEdit}
                            ></EditExit>
                        </HStack>
                    ) : (
                        <HStack style={styles.containerParking} marginTop={1}>
                            <Stack style={styles.containerTextProgram}>
                                <Text style={styles.textProgram}>Salida</Text>
                            </Stack>
                            <Stack style={styles.containerTextProgram}>
                                <Text style={styles.textProgram}>-- : --</Text>
                            </Stack>
                            <Button
                                onPress={() => {
                                    console.log("Aprete el boton de programar");
                                    setModalVisibleSetUp(true);
                                }}
                                style={styles.buttonProgram}
                            >
                                <Text
                                    style={[
                                        styles.textProgram,
                                        { color: "white" },
                                    ]}
                                >
                                    Programar
                                </Text>
                            </Button>
                            <SetUpExit
                                isOpen={modalVisibleSetUp}
                                onClose={() => setModalVisibleSetUp(false)}
                                patent={patent}
                                cancelRef={cancelRefModalSetUp}
                                setHourExit={setHourExit}
                                setModalVisible={setModalVisibleSetUp}
                            ></SetUpExit>
                        </HStack>
                    )
                ) : null}
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
        </>
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
        justifyContent: "center",
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
    buttonProgram: {
        backgroundColor: "#3f60af",
        flex: 1,
        borderRadius: "30@ms",
    },
    containerTextProgram: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textProgram: {
        fontWeight: "bold",
        fontSize: "14@ms",
    },
});
