import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    HStack,
    NativeBaseProvider,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import HeaderPage from "../components/HeaderPage";
import { ScaledSheet } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import loggedUser from "../objects/user";
import constants from "../constants/constants";
import { findTickets } from "../functions/findTickets";

const AnnouncementsScreen = ({ navigation }) => {
    const [haveTickets, setHaveTickets] = useState(false);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    useEffect(() => {
        const FindTickets = () => {
            try {
                loggedUser.user.tickets = [];
                if (loggedUser.user.vehicles != []) {
                    loggedUser.user.vehicles.forEach(async (vehicle) => {
                        await constants
                            .AXIOS_INST({
                                method: "post",
                                url: "ticket/mostrar",
                                headers: {
                                    Authorization: `bearer ${loggedUser.user.token}`,
                                },
                                data: {
                                    ticket: {
                                        patente: vehicle.patent,
                                    },
                                },
                            })
                            .then((resp) => {
                                const listTickets = resp.data.mensaje;
                                if (listTickets != undefined) {
                                    listTickets.forEach((ticket) => {
                                        if (ticket.estado == 0) {
                                            const dateString = ticket.fecha;
                                            const dateObject = new Date(
                                                dateString
                                            );
                                            const day = dateObject.getDate();
                                            const month =
                                                dateObject.getMonth() + 1;
                                            const year =
                                                dateObject.getFullYear();
                                            const timeString = dateString.slice(
                                                11,
                                                16
                                            );
                                            const formattedDate = `${day}-${month}-${year} ${timeString}`;
                                            loggedUser.user.tickets.push({
                                                id: ticket.idTicket,
                                                patent: vehicle.patent,
                                                amount: ticket.importe,
                                                date: formattedDate,
                                            });
                                        }
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    console.log(error.response.data);
                                } else if (error.request) {
                                    console.log(error.request);
                                } else {
                                    console.log(error);
                                }
                                return;
                            })
                            .finally(() => {
                                if (loggedUser.user.tickets[0] != null) {
                                    setHaveTickets(false);
                                    setHaveTickets(true);
                                }
                            });
                    });
                }
            } catch (error) {}
        };
        FindTickets();
    }, []);

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <VStack
                space="sm"
                height="100%"
                alignItems="center"
                style={styles.background}
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage onPress={handleButtonPressMenu} navigation={navigation}></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Feather
                        name="alert-circle"
                        style={styles.icon}
                        color="#3f60af"
                    />
                    <Text style={styles.textProfile}>Avisos</Text>
                </Stack>
                {haveTickets ? (
                    <>
                        <VStack space="sm">
                            <HStack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerLeft,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Nº
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Patente
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Fecha
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerRight,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Importe
                                    </Text>
                                </Stack>
                            </HStack>
                            <ScrollView
                                style={styles.scrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                <VStack space="sm">
                                    {loggedUser.user.tickets.map(
                                        (ticket, index) => (
                                            <HStack minW="99%" key={index}>
                                                <Stack
                                                    style={[
                                                        styles.tableContainer,
                                                        styles.tableContainerLeft,
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            styles.textTableItems
                                                        }
                                                    >
                                                        {ticket.id}
                                                    </Text>
                                                </Stack>
                                                <Stack
                                                    style={[
                                                        styles.tableContainer,
                                                        styles.tableContainerCenter,
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            styles.textTableItems
                                                        }
                                                    >
                                                        {ticket.patent}
                                                    </Text>
                                                </Stack>
                                                <Stack
                                                    style={[
                                                        styles.tableContainer,
                                                        styles.tableContainerCenter,
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            styles.textTableItems
                                                        }
                                                    >
                                                        {ticket.date}
                                                    </Text>
                                                </Stack>
                                                <Stack
                                                    style={[
                                                        styles.tableContainer,
                                                        styles.tableContainerRight,
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            styles.textTableItems
                                                        }
                                                    >
                                                        {ticket.amount}
                                                    </Text>
                                                </Stack>
                                            </HStack>
                                        )
                                    )}
                                </VStack>
                            </ScrollView>
                        </VStack>
                    </>
                ) : (
                    <Stack style={styles.containerWithoutAnnouncements}>
                        <Text style={styles.textWithoutAnnouncements}>
                            No hay avisos
                        </Text>
                    </Stack>
                )}
            </VStack>
        </NativeBaseProvider>
    );
};

export default AnnouncementsScreen;

const styles = ScaledSheet.create({
    background: {
        backgroundColor: "#f2f2f4",
    },
    containerProfile: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "3%",
    },
    icon: {
        fontSize: "25@ms",
    },
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    containerWithoutAnnouncements: {
        borderRadius: "30@ms",
        backgroundColor: "white",
        borderColor: "red",
        borderWidth: "2@ms",
        minWidth: "85%",
        height: "45@ms",
        justifyContent: "center",
        paddingLeft: "30@ms",
    },
    textWithoutAnnouncements: {
        color: "red",
        fontSize: "23@ms",
        fontWeight: "bold",
    },
    tableContainerLeft: {
        borderWidth: "1@ms",
        borderRadius: 0,
        borderBottomLeftRadius: "30@ms",
        borderTopLeftRadius: "30@ms",
        borderRightWidth: 0,
    },
    tableContainerRight: {
        borderWidth: "1@ms",
        borderRadius: 0,
        borderBottomRightRadius: "30@ms",
        borderTopRightRadius: "30@ms",
    },
    textTableHeader: {
        fontSize: "16@ms",
        fontWeight: "bold",
        color: "#3f60af",
    },
    textTableItems: {
        fontSize: "13@ms",
        color: "#4c5564",
    },
    scrollView: {
        maxHeight: "68%",
    },
    tableContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderColor: "#d3d3d3",
        paddingVertical: "3%",
    },
    tableContainerCenter: {
        borderRadius: 0,
        borderWidth: "1@ms",
        borderRightWidth: 0,
    },
});
