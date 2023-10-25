import { Platform, Text } from "react-native";
import React from "react";
import { AlertDialog, Button, HStack, Spacer, VStack } from "native-base";
import { useState } from "react";
import {
    DateTimePickerAndroid,
    DateTimePicker,
} from "@react-native-community/datetimepicker";
import { ScaledSheet } from "react-native-size-matters";
import { useEffect } from "react";
import constants from "../../constants/constants";
import loggedUser from "../../objects/user";
import AlertError from "../Alerts/AlertError";
import AlertNotice from "../Alerts/AlertNotice";
import { useRef } from "react";
import DatePicker from "react-native-date-picker";

const SetUpExit = ({
    isOpen,
    onClose,
    patent,
    cancelRef,
    refresh,
    setHourExit,
    setModalVisible,
}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("time");
    const [show, setShow] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);

    const [open, setOpen] = useState(false);

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setHourExit(dateSelected);
        setIsOpenAlertNotice(!isOpenAlertNotice);
        onClose();
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    useEffect(() => {
        setDateSelected(null);
        setDate(new Date());
    }, [refresh]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        event.type == "set" ? setDateSelected(currentDate) : null;
    };

    const showMode = (currentMode) => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: currentMode,
                is24Hour: true,
                display: "spinner",
            });
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("time");
    };

    const setUpExit = async () => {
        if (dateSelected) {
            const hourEnd = formattHourEnd();
            console.log(hourEnd);
            await constants
                .AXIOS_INST({
                    method: "put",
                    url: "estacionamiento/programar/activar",
                    headers: {
                        Authorization: `bearer ${loggedUser.user.token}`,
                    },
                    data: {
                        estacionamiento: {
                            patente: patent,
                            horaFin: hourEnd,
                        },
                    },
                })
                .then((response) => {
                    setMessageAlertNotice(response.data.mensaje);
                    setIsOpenAlertNotice(true);
                })
                .catch((error) => {
                    setMessageAlertError(error.response.data.mensaje);
                    setIsOpenAlertError(true);
                });
        } else {
            setMessageAlertError("Hora de salida no definida");
            setIsOpenAlertError(true);
        }
    };

    const formattHourEnd = () => {
        const year = dateSelected.getFullYear();
        const month = dateSelected.getMonth() + 1;
        const day = dateSelected.getDate();
        const hours = dateSelected.getHours();
        const minutes = dateSelected.getMinutes();
        const formattHour = `${month
            .toString()
            .padStart(2, "0")}-${day}-${year} ${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        return formattHour;
    };

    const setProgrammedExitTime = (defectTime) => {
        const time = new Date(date);
        time.setMinutes(time.getMinutes() + defectTime);
        setDateSelected(time);
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={() => setModalVisible(false)}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton></AlertDialog.CloseButton>
                    <AlertDialog.Header>
                        <Text style={styles.textHeader}>Programar Salida</Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        <VStack space={"md"}>
                            <Text style={styles.textTitle}>
                                Patente: {patent}
                            </Text>
                            <HStack style={styles.containerTime} space={"2xl"}>
                                {dateSelected ? (
                                    <Text style={styles.textTime}>
                                        {dateSelected
                                            .getHours()
                                            .toString()
                                            .padStart(2, "0") +
                                            " : " +
                                            dateSelected
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0")}
                                    </Text>
                                ) : (
                                    <Text style={styles.textTime}>-- : --</Text>
                                )}
                                <Button
                                    onPress={() => {
                                        if (Platform.OS === "android") {
                                            showDatepicker();
                                        } else {
                                            setOpen(true);
                                        }
                                    }}
                                    style={styles.buttonSetTime}
                                >
                                    <Text style={styles.textButton}>
                                        Definir Hora
                                    </Text>
                                </Button>
                            </HStack>
                            <VStack space={3}>
                                <Button flex={3} style={styles.buttonsProgramedExit} onPress={() => setProgrammedExitTime(constants.PROGRAMMED_EXIT_FIRST_OPTION)}><Text style={styles.textButtonsProgrammedExit}>En 30 Minutos</Text></Button>
                                <Button flex={3} style={styles.buttonsProgramedExit} onPress={() => setProgrammedExitTime(constants.PROGRAMMED_EXIT_SECOND_OPTION)}><Text style={styles.textButtonsProgrammedExit}>En 1 Hora</Text></Button>
                                <Button flex={3} style={styles.buttonsProgramedExit} onPress={() => setProgrammedExitTime(constants.PROGRAMMED_EXIT_THIRD_OPTION)}><Text style={styles.textButtonsProgrammedExit}>En 2 Horas</Text></Button>
                            </VStack>
                            {Platform.OS === "android" ? (
                                show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )
                            ) : (
                                <DatePicker
                                    modal
                                    mode="time"
                                    open={open}
                                    date={date}
                                    onConfirm={(hourExit) => {
                                        setOpen(false);
                                        setDateSelected(hourExit);
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                    locale="es"
                                    confirmText="Aceptar"
                                    cancelText="Cancelar"
                                />
                            )}
                        </VStack>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Spacer></Spacer>
                        <Button
                            onPress={() => {
                                setUpExit();
                            }}
                            style={styles.buttonAcept}
                            flex={0.7}
                        >
                            <Text style={styles.textButton}>Aceptar</Text>
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <AlertError
                isOpen={isOpenAlertError}
                cancelRef={cancelRefAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
            ></AlertError>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                cancelRef={cancelRefAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
            ></AlertNotice>
        </>
    );
};

export default SetUpExit;

const styles = ScaledSheet.create({
    buttonAcept: {
        backgroundColor: "green",
        borderRadius: "30@ms",
    },
    buttonSetTime: {
        backgroundColor: "#77b5dc",
        borderRadius: "30@ms",
    },
    textButton: {
        color: "white",
        fontSize: "17@ms",
        fontWeight: "bold",
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: "20@ms",
        color: "#3f60af",
    },
    textTitle: {
        fontSize: "17@ms",
        fontWeight: "bold",
        color: "#3f60af",
    },
    textTime: {
        fontWeight: "bold",
        fontSize: "16@ms",
    },
    containerTime: {
        alignItems: "center",
        justifyContent: "center",
    },
    textButtonsProgrammedExit:{
        fontSize: "14@ms",
        color: "white",
        fontWeight: "bold"
    },
    buttonsProgramedExit:{
        borderRadius: "30@ms",
        backgroundColor: "#009FE3"
    },
});
