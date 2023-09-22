import { Platform, Text } from "react-native";
import React from "react";
import { AlertDialog, Button, HStack, Stack, VStack } from "native-base";
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

const EditExit = ({
    isOpen,
    onClose,
    patent,
    cancelRef,
    refresh,
    hourExit,
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

    const [isOpenAlertNoticeEdit, setIsOpenAlertNoticeEdit] = useState(false);
    const cancelRefAlertNoticeEdit = useRef(null);
    const onCloseAlertNoticeEdit = () => {
        setIsOpenAlertNoticeEdit(!isOpenAlertNoticeEdit);
        onClose();
    };
    const [messageAlertNoticeEdit, setMessageAlertNoticeEdit] = useState();

    const [isOpenAlertNoticeDelete, setIsOpenAlertNoticeDelete] =
        useState(false);
    const cancelRefAlertNoticeDelete = useRef(null);
    const onCloseAlertNoticeDelete = () => {
        setIsOpenAlertNoticeDelete(!isOpenAlertNoticeDelete);
        setHourExit(null);
        onClose();
    };
    const [messageAlertNoticeDelete, setMessageAlertNoticeDelete] = useState();

    useEffect(() => {
        setDateSelected(null);
        hourExit ? setDate(hourExit) : null;
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

    const editExit = async () => {
        if (dateSelected) {
            await deleteExit();
            await setUpExit();
        } else {
            setMessageAlertError("La hora es la misma");
            setIsOpenAlertError(true);
        }
    };

    const setUpExit = async () => {
        const hourEnd = formattHourEnd();
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
                setHourExit(dateSelected);
                setMessageAlertNoticeEdit(response.data.mensaje);
                setIsOpenAlertNoticeEdit(true);
            })
            .catch((error) => {
                setMessageAlertError(error.response.data.mensaje);
                setIsOpenAlertError(true);
            });
    };

    const deleteExit = async (showInfo) => {
        await constants
            .AXIOS_INST({
                method: "put",
                url: "estacionamiento/programar/cancelar",
                headers: {
                    Authorization: `bearer ${loggedUser.user.token}`,
                },
                data: {
                    estacionamiento: {
                        patente: patent,
                    },
                },
            })
            .then((response) => {
                if (showInfo) {
                    setMessageAlertNoticeDelete(response.data.mensaje);
                    setIsOpenAlertNoticeDelete(true);
                }
            })
            .catch((error) => {
                setMessageAlertError(error.response.data.mensaje);
                setIsOpenAlertError(true);
            });
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
                                    <Text style={styles.textTime}>
                                        {date
                                            .getHours()
                                            .toString()
                                            .padStart(2, "0") +
                                            " : " +
                                            date
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0")}
                                    </Text>
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
                        <Button
                            onPress={() => {
                                deleteExit(true);
                            }}
                            style={styles.buttonDelete}
                            flex={0.7}
                        >
                            <Text style={styles.textButton}>Eliminar</Text>
                        </Button>
                        <Stack flex={0.3}></Stack>
                        <Button
                            onPress={() => {
                                editExit();
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
                isOpen={isOpenAlertNoticeEdit}
                cancelRef={cancelRefAlertNoticeEdit}
                onClose={onCloseAlertNoticeEdit}
                message={messageAlertNoticeEdit}
            ></AlertNotice>
            <AlertNotice
                isOpen={isOpenAlertNoticeDelete}
                cancelRef={cancelRefAlertNoticeDelete}
                onClose={onCloseAlertNoticeDelete}
                message={messageAlertNoticeDelete}
            ></AlertNotice>
        </>
    );
};

export default EditExit;

const styles = ScaledSheet.create({
    buttonAcept: {
        backgroundColor: "green",
        borderRadius: "30@ms",
    },
    buttonDelete: {
        backgroundColor: "red",
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
});
