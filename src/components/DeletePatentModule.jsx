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
import AlertNoticeFunction from "./Alerts/AlertNoticeFunction";
import loggedUser from "../objects/user";
import constants from "../constants/constants";
import { saveUserInformation } from "../functions/saveUserInformation";

const DeletePatentModule = ({ patent, id, index, refreshScreen }) => {
    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const deletePatent = async () => {
        onCloseAlertNoticeFunction();

        const vehicleSelected = loggedUser.user.vehicles.find((vehicle) => vehicle.patent === patent);

        if (!vehicleSelected.parked) {
            await constants.AXIOS_INST({
                method: "delete",
                url: "vehiculo/eliminar",
                headers: {
                    Authorization: `bearer ${loggedUser.user.token}`,
                },
                data: {
                    vehiculo: {
                        idUsuario: loggedUser.user.idUser,
                        patente: patent,
                    },
                },
            })
                .then((response) => {
                    deleteVehicle();
                    console.log(response.data.mensaje);
                })
                .catch((error) => {
                    console.error(error.response.data);
                });
        } else {
            alert("No se puede eliminar un vehículo estacionado");
        }
    };

    const deleteVehicle = () => {
        const list = loggedUser.user.vehicles.filter((vehicle) => vehicle.patent !== patent);
        loggedUser.user.vehicles = [];
        loggedUser.user.vehicles = list;
        saveUserInformation();
        refreshScreen();
    }

    return (
        <>
            <HStack style={styles.containerPatent} marginBottom="5%" key={index}>
                <Spacer></Spacer>
                <Text style={styles.textPatent}>
                    {patent}
                </Text>
                <Spacer></Spacer>
                <Button
                    style={styles.button}
                    flex={2}
                    onPress={() => setIsOpenAlertNoticeFunction(true)}
                >
                    <Text style={styles.textButton}>Eliminar</Text>
                </Button>
            </HStack>
            <AlertNoticeFunction
                isOpen={isOpenAlertNoticeFunction}
                cancelRef={cancelRefAlertNoticeFunction}
                onClose={onCloseAlertNoticeFunction}
                message={`¿Está seguro que quiere eliminar la patente "${patent}"?`}
                onPressAccept={deletePatent}
            ></AlertNoticeFunction>
            
        </>
    );
};

export default DeletePatentModule;

const styles = ScaledSheet.create({
    containerPatent: {
        minHeight: "45@ms",
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
        minHeight: "45@ms",
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
