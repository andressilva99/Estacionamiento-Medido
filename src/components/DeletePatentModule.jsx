import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import {
    AlertDialog,
    Button,
    HStack,
    Spacer,
    Stack,
    Text,
    VStack,
} from "native-base";
import { ScaledSheet } from "react-native-size-matters";

const DeletePatentModule = ({ patent, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef(null);
    const onClose = () => setIsOpen(!isOpen);

    return (
        <>
            <HStack style={styles.containerPatent} marginBottom="5%">
                <Spacer></Spacer>
                <Text key={id} style={styles.textPatent}>
                    {patent}
                </Text>
                <Spacer></Spacer>
                <Button
                    style={styles.button}
                    flex={2}
                    onPress={() => setIsOpen(true)}
                >
                    <Text style={styles.textButton}>Eliminar</Text>
                </Button>
            </HStack>
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
                                    ¿Está seguro de que desea eliminar la
                                    patente "{patent}"?
                                </Text>
                            </Stack>
                            <HStack justifyContent="center">
                                <Button
                                    variant="ghost"
                                    ref={cancelRef}
                                    onPress={onClose}
                                    flex={3}
                                >
                                    <Text
                                        underline
                                        style={styles.textButtonCancel}
                                    >
                                        Cancelar
                                    </Text>
                                </Button>
                                <Spacer></Spacer>
                                <Button style={styles.button} flex={3}>
                                    <Text style={styles.textButton}>
                                        Aceptar
                                    </Text>
                                </Button>
                            </HStack>
                        </VStack>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    );
};

export default DeletePatentModule;

const styles = ScaledSheet.create({
    containerPatent: {
        minHeight: "7%",
        minWidth: "85%",
        backgroundColor: "#eaeaec",
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
        borderRadius: "30@ms",
        alignItems: "center",
    },
    textPatent: {
        fontSize: "17@ms",
        fontWeight: "bold",
    },
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
        fontSize: "15@ms",
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
