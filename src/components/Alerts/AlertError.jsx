import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AlertDialog, Button, HStack, Stack, VStack } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { ScaledSheet } from "react-native-size-matters";

const AlertError = ({ cancelRef, isOpen, onClose, message }) => {
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialog.Content>
                <AlertDialog.Body style={styles.containerAlert}>
                    <VStack space="lg">
                        <HStack space="sm">
                        <Entypo name="circle-with-cross"
                                style={styles.iconHeader}
                            />
                            <Text style={styles.textHeader}>ERROR</Text>
                        </HStack>
                        <Stack>
                            <Text style={styles.textContent}>{message}</Text>
                        </Stack>
                        <Stack alignItems={"center"}>
                        <Button ref={cancelRef} onPress={onClose} style={styles.buttonAlert}>
                            <Text style={styles.textButtonAlert}>OK</Text>
                        </Button>
                        </Stack>
                    </VStack>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default AlertError;

const styles = ScaledSheet.create({
    containerAlert: {
        backgroundColor: "red",
    },
    textHeader: {
        color: "white",
        fontSize: "25@ms",
        fontWeight: "bold",
    },
    iconHeader: {
        color: "white",
        fontSize: "30@ms",
    },
    textContent: {
        fontSize: "20@ms",
        color: "white",
    },
    buttonAlert: {
        backgroundColor: "white",
        borderRadius: "100@ms",
    },
    textButtonAlert: {
        color: "red",
        fontSize: "22@ms",
        fontWeight: "bold",
    }
});
