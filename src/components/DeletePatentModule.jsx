import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import AlertError from "./Alerts/AlertError";
import AlertNotice from "./Alerts/AlertNotice";

const DeletePatentModule = ({ patent, id, index, refreshScreen }) => {
    useEffect(() => {
        loggedUser.user.tickets.forEach((ticket) => {
            if (ticket.patent === patent) {
                setHaveTicket(true);
            }
        });
        // const FindTickets = () => {
        //     loggedUser.user.tickets = [];
        //     if (loggedUser.user.vehicles != []) {
        //         loggedUser.user.vehicles.forEach(async (vehicle) => {
        //             await constants
        //                 .AXIOS_INST({
        //                     method: "post",
        //                     url: "ticket/mostrar",
        //                     headers: {
        //                         Authorization: `bearer ${loggedUser.user.token}`,
        //                     },
        //                     data: {
        //                         ticket: {
        //                             patente: vehicle.patent,
        //                         },
        //                     },
        //                 })
        //                 .then((resp) => {
        //                     const listTickets = resp.data.mensaje;
        //                     if (listTickets != undefined) {
        //                         listTickets.forEach((ticket) => {
        //                             if (ticket.estado == 0) {
        //                                 const dateString = ticket.fecha;
        //                                 const dateObject = new Date(dateString);
        //                                 const day = dateObject.getDate();
        //                                 const month = dateObject.getMonth() + 1;
        //                                 const year = dateObject.getFullYear();
        //                                 const timeString = dateString.slice(
        //                                     11,
        //                                     16
        //                                 );
        //                                 const formattedDate = `${day}-${month}-${year} ${timeString}`;
        //                                 loggedUser.user.tickets.push({
        //                                     id: ticket.idTicket,
        //                                     patent: vehicle.patent,
        //                                     amount: ticket.importe,
        //                                     date: formattedDate,
        //                                 });
        //                             }
        //                         });
        //                     }
        //                 })
        //                 .catch((error) => {
        //                     console.log(error.response.data);
        //                 });
        //         });
        //     }
        // };
        // FindTickets();
    }, []);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(!isOpenAlertNotice);
        refreshScreen();
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [isOpenAlertNoticeFunction, setIsOpenAlertNoticeFunction] =
        useState(false);
    const cancelRefAlertNoticeFunction = useRef(null);
    const onCloseAlertNoticeFunction = () =>
        setIsOpenAlertNoticeFunction(!isOpenAlertNoticeFunction);

    const [haveTicket, setHaveTicket] = useState(false);

    const deletePatent = async () => {
        onCloseAlertNoticeFunction();

        const vehicleSelected = loggedUser.user.vehicles.find(
            (vehicle) => vehicle.patent === patent
        );

        if (!vehicleSelected.parked && !haveTicket) {
            await constants
                .AXIOS_INST({
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
                    setMessageAlertNotice("Vehículo Eliminado");
                    setIsOpenAlertNotice(true);
                })
                .catch((error) => {
                    setMessageAlertError(error.response.data.mensaje);
                    setIsOpenAlertError(true);
                    console.error(error.response.data.mensaje);
                });
        } else {
            if (haveTicket) {
                setMessageAlertError(
                    "No se puede eliminar un vehículo con un Ticket emitido"
                );
                setIsOpenAlertError(true);
            } else {
                setMessageAlertError(
                    "No se puede eliminar un vehículo estacionado"
                );
                setIsOpenAlertError(true);
            }
        }
    };

    const deleteVehicle = () => {
        const list = loggedUser.user.vehicles.filter(
            (vehicle) => vehicle.patent !== patent
        );
        loggedUser.user.vehicles = [];
        loggedUser.user.vehicles = list;
        saveUserInformation();
    };

    return (
        <>
            <HStack
                style={styles.containerPatent}
                marginBottom="5%"
                key={index}
            >
                <Spacer></Spacer>
                <Text style={styles.textPatent}>{patent}</Text>
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
                message={`¿Está seguro que desea eliminar la patente "${patent}"?`}
                onPressAccept={deletePatent}
            ></AlertNoticeFunction>
            <AlertError
                isOpen={isOpenAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
                cancelRef={cancelRefAlertError}
            ></AlertError>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
                cancelRef={cancelRefAlertNotice}
            ></AlertNotice>
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
