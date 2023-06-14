import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
    Button,
    Flex,
    HStack,
    NativeBaseProvider,
    Select,
    Spacer,
    Stack,
    StatusBar,
    VStack,
} from "native-base";
import InputDate from "../../components/InputDate";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import loggedUser from "../../objects/user";
import HeaderPage from "../../components/HeaderPage";
import constants from "../../constants/constants";

const { height } = Dimensions.get("screen");

const RechargesHistoryScreen = ({ navigation }) => {
    const [dateInitial, setDateInitial] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [consult, setConsult] = useState(false);

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const SearchHistory = async () => {
        const yearInitial = dateInitial.getFullYear();
        const monthInitial = String(dateInitial.getMonth() + 1).padStart(
            2,
            "0"
        );
        const dayInitial = String(dateInitial.getDate()).padStart(2, "0");
        const formattedDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}`;

        const yearEnd = dateEnd.getFullYear();
        const monthEnd = String(dateEnd.getMonth() + 1).padStart(2, "0");
        const dayEnd = String(dateEnd.getDate()).padStart(2, "0");
        const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`;

        const config = {
            headers: {
                Authorization: `bearer ${loggedUser.user.token}`,
            },
        };

        const see = {
            estacionamiento: {
                fechaInicio: formattedDateInitial,
                fechaFin: formattedDateEnd,
                idUsuario: loggedUser.user.idUser,
            },
        };
        await constants.AXIOS_INST.get("historial/recargas", config, see)
            .then((response) => {
                console.log(response.data.mensaje);
                setConsult(!consult);
            })
            .catch((error) => {
                alert(error.response.data.mensaje);
            });
    };

    return (
        <NativeBaseProvider>
            <StatusBar></StatusBar>
            <VStack
                height={height}
                alignItems={"center"}
                style={styles.backgroundContainer}
                space="sm"
            >
                <HStack maxW="90%">
                    <HeaderPage onPress={handleButtonPressMenu}></HeaderPage>
                </HStack>
                <HStack alignItems="flex-start" minW="85%">
                    <Text>Regargas</Text>
                </HStack>
                {consult ? (
                    <>
                        <VStack space="sm">
                            <HStack minW="85%">
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerLeft,
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
                            <ScrollView style={styles.scrollView}>
                                <HStack minW="85%">
                                    <Stack
                                        style={[
                                            styles.tableContainer,
                                            styles.tableContainerLeft,
                                        ]}
                                    >
                                        <Text style={styles.textTableItems}>
                                            11/03/2023
                                        </Text>
                                    </Stack>
                                    <Stack
                                        style={[
                                            styles.tableContainer,
                                            styles.tableContainerRight,
                                        ]}
                                    >
                                        <Text style={styles.textTableItems}>
                                            11/03/2023
                                        </Text>
                                    </Stack>
                                </HStack>
                            </ScrollView>
                            <Button
                                style={styles.button}
                                onPress={SearchHistory}
                            >
                                <Text style={styles.textButton}>
                                    Volver a consultar
                                </Text>
                            </Button>
                        </VStack>
                    </>
                ) : (
                    <>
                        <HStack maxW="85%">
                            <InputDate
                                text="Desde"
                                setDateSent={setDateInitial}
                            ></InputDate>
                        </HStack>
                        <HStack maxW="85%">
                            <InputDate
                                text="Hasta"
                                setDateSent={setDateEnd}
                            ></InputDate>
                        </HStack>
                        <Button style={styles.button} onPress={SearchHistory}>
                            <Text style={styles.textButton}>Consultar</Text>
                        </Button>
                    </>
                )}
            </VStack>
        </NativeBaseProvider>
    );
};

export default RechargesHistoryScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerVehicle: {
        minWidth: "85%",
        backgroundColor: "#7bb6de",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
    },
    text: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "white",
        paddingLeft: "10@ms",
    },
    icon: {
        color: "white",
        fontSize: "24@ms",
    },
    select: {
        minWidth: "85%",
        backgroundColor: "#bbbcc0",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        minHeight: "6%",
    },
    button: {
        minWidth: "85%",
        backgroundColor: "#c4e5f6",
        borderWidth: 1,
        borderColor: "#dadadc",
        borderRadius: 30,
        minHeight: "6%",
    },
    textButton: {
        color: "#1290c0",
        fontSize: "19@ms",
        fontWeight: "bold",
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
        borderWidth: 1,
        borderRightWidth: 0,
    },
    tableContainerLeft: {
        borderWidth: 1,
        borderRadius: 0,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderRightWidth: 0,
    },
    tableContainerRight: {
        borderWidth: 1,
        borderRadius: 0,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
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
});
