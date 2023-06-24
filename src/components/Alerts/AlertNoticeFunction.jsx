import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    AlertDialog,
    Button,
    HStack,
    Spacer,
    Stack,
    VStack,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";

const AlertNoticeFunction = ({ onClose, cancelRef, isOpen, message, buttonColorAcept, onPressAccept }) => {
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialog.Content>
                <AlertDialog.CloseButton></AlertDialog.CloseButton>
                <AlertDialog.Header>
                    <Text style={styles.textHeader}>Advertencia</Text>
                </AlertDialog.Header>
                <AlertDialog.Body>
                    <VStack space="xl">
                        <Stack>
                            <Text style={styles.textBody}>
                                {message}
                            </Text>
                        </Stack>
                        <HStack justifyContent="center">
                            <Button
                                variant="ghost"
                                ref={cancelRef}
                                onPress={onClose}
                                flex={3}
                            >
                                <Text underline style={styles.textButtonCancel}>
                                    Cancelar
                                </Text>
                            </Button>
                            <Spacer></Spacer>
                            <Button style={[styles.button, buttonColorAcept]} flex={3} onPress={() => onPressAccept()}>
                                <Text style={styles.textButton}>Aceptar</Text>
                            </Button>
                        </HStack>
                    </VStack>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default AlertNoticeFunction;

const styles = ScaledSheet.create({
    button: {
        backgroundColor: "red",
        borderRadius: "30@ms",
    },
    textButton: {
        color: "white",
        fontSize: "17@ms",
        fontWeight: "bold",
    },
    textBody: {
        fontSize: "17@ms",
    },
    textHeader: {
        fontSize: "20@ms",
        fontWeight: "bold",
    },
    textButtonCancel: {
        fontSize: "17@ms",
        fontWeight: "bold",
    },
});
