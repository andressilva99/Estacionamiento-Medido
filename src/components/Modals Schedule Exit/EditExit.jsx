import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, HStack, Modal, Spacer, VStack } from "native-base";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const EditExit = ({ isOpen, onClose, patent }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("time");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
            <Modal.CloseButton></Modal.CloseButton>
            <Modal.Header>Programar Salida</Modal.Header>
            <Modal.Body>
                <VStack>
                    <Text>Patente: {patent}</Text>
                    <HStack>
                        <Text>{date.getHours().toString()+":"+date.getMinutes().toString()}</Text>
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
            </Modal.Body>
            <Modal.Footer>
                <Button onPress={()=> onClose(false)}>Cancelar</Button>
                <Spacer></Spacer>
                <Button onPress={()=> onClose(false)}>Aceptar</Button>
            </Modal.Footer>
            <Modal.Footer><Button>Eliminar</Button></Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default EditExit;

const styles = StyleSheet.create({});