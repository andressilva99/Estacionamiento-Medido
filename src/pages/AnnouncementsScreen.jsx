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
import loggedUser from "../objects/user"
import { findTickets } from "../functions/findTickets";

const AnnouncementsScreen = ({navigation}) => {
    const [haveTickets, setHaveTickets] = useState(false);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    useEffect(() => {
        findTickets();
        if (loggedUser.user.tickets[0] != undefined) {
            setHaveTickets(true)
        }
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
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <Feather
                        name="alert-circle"
                        style={styles.icon}
                        color="#3f60af"
                    />
                    <Text style={styles.textProfile}>Avisos</Text>
                </Stack>
                {haveTickets ? (<>
                        <VStack space="sm">
                            <HStack minW="85%">
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerLeft,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Patente
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
                                            <HStack minW="85%" key={index}>
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
                                                        {ticket.patent}
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
                    </>) : (<Stack style={styles.containerWithoutAnnouncements}>
                    <Text style={styles.textWithoutAnnouncements}>No hay avisos</Text>
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
        flex: "1@ms",
        borderColor: "#d3d3d3",
        paddingVertical: "3%",
    },
});
