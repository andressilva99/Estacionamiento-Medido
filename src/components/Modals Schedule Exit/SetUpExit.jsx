import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    AlertDialog,
    Button,
    HStack,
    Modal,
    Spacer,
    VStack,
} from "native-base";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ScaledSheet } from "react-native-size-matters";
import { useEffect } from "react";
import constants from "../../constants/constants";
import loggedUser from "../../objects/user";

const SetUpExit = ({ isOpen, onClose, patent, cancelRef, refresh }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("time");
    const [show, setShow] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);

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
                //Alerta de exito
            })
            .catch((error) => {
                //Alerta de error
            });
    };

    const formattHourEnd = () => {
        const year = dateSelected.getFullYear();
        const month = dateSelected.getMonth() + 1;
        const day = dateSelected.getDate();
        const hours = dateSelected.getHours();
        const minutes = dateSelected.getMinutes();
        const formattHour = `${day}-${month
            .toString()
            .padStart(2, "0")}-${year} ${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        return formattHour;
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={() => {
                onClose();
            }}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialog.Content>
                <AlertDialog.CloseButton></AlertDialog.CloseButton>
                <AlertDialog.Header>
                    <Text style={styles.textHeader}>Programar Salida</Text>
                </AlertDialog.Header>
                <AlertDialog.Body>
                    <VStack space={"md"}>
                        <Text style={styles.textTitle}>Patente: {patent}</Text>
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
                                    showDatepicker();
                                }}
                                style={styles.buttonSetTime}
                            >
                                <Text style={styles.textButton}>
                                    Definir Hora
                                </Text>
                            </Button>
                        </HStack>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={onChange}
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
});
