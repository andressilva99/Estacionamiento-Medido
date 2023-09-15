import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AlertDialog, Button, HStack, Modal, Spacer, VStack } from "native-base";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const SetUpExit = ({ isOpen, onClose, patent, cancelRef }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("time");
    const [show, setShow] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        // setDate(currentDate);
        setDateSelected(currentDate);
        // setDateSent(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: currentMode,
                is24Hour: true,
                display: "spinner"
            });
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("time");
    };

    return (
        <AlertDialog isOpen={isOpen} onClose={() => {onClose(); setDateSelected(null)}} leastDestructiveRef={cancelRef}>
            <AlertDialog.Content>
            <AlertDialog.CloseButton></AlertDialog.CloseButton>
            <AlertDialog.Header>Programar Salida</AlertDialog.Header>
            <AlertDialog.Body>
                <VStack>
                    <Text>Patente: {patent}</Text>
                    <HStack>
                        {dateSelected ? (<Text>{dateSelected.getHours().toString()+":"+dateSelected.getMinutes().toString()}</Text>): (<Text>--:--</Text>)}
                        <Button
                            onPress={() => {
                                showDatepicker();
                            }}
                        >
                            Definir Hora
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
                <Button onPress={()=> {onClose(false); setDateSelected(null)}}>Cancelar</Button>
                <Spacer></Spacer>
                <Button onPress={()=> {onClose(false); setDateSelected(null)}}>Aceptar</Button>
            </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default SetUpExit;

const styles = StyleSheet.create({});
