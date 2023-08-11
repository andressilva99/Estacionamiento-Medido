import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
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
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import loggedUser from "../../objects/user";
import HeaderPage from "../../components/HeaderPage";
import constants from "../../constants/constants";
import AlertError from "../../components/Alerts/AlertError";
import InputDateInitial from "../../components/InputDateInitial";
import InputDateEnd from "../../components/InputDateEnd";
import AlertNotice from "../../components/Alerts/AlertNotice";
import InputDateInitialIOS from "../../components/Inputs Date iOS/InputDateInitialIOS";
import InputDateEndIOS from "../../components/Inputs Date iOS/InputDateEndIOS";

const { height } = Dimensions.get("screen");

const RechargesHistoryScreen = ({ navigation }) => {
    const [dateInitial, setDateInitial] = useState(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDay() - 15);
        return currentDate;
    });
    const [dateEnd, setDateEnd] = useState(new Date());
    const [consult, setConsult] = useState(false);

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [listRecharges, setListRecharges] = useState([]);

    const [loaging, setLoaging] = useState(false);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => setIsOpenAlertNotice(!isOpenAlertNotice);
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const handleButtonPressMenu = () => {
        navigation.navigate("Menu");
    };

    const SearchHistory = async () => {
        setLoaging(true);
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

        await constants
            .AXIOS_INST({
                method: "post",
                url: "historial/recargas",
                headers: {
                    Authorization: `bearer ${loggedUser.user.token}`,
                },
                data: {
                    recarga: {
                        fechaInicio: formattedDateInitial,
                        fechaFin: formattedDateEnd,
                        idUsuario: loggedUser.user.idUser,
                    },
                },
            })
            .then((resp) => {
                completeListRecharges(resp);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    setMessageAlertError(error.response.data.mensaje);
                    setIsOpenAlertError(true);
                } else if (error.request) {
                    console.log(error.request);
                    setMessageAlertError(
                        "No se ha obtenido respuesta, intente nuevamente"
                    );
                    setIsOpenAlertError(true);
                } else {
                    console.log(error);
                }
                return;
            });
        setLoaging(false);
    };

    const completeListRecharges = (response) => {
        const list = [];
        response.data.mensaje.forEach((recharge) => {
            const dateString = recharge.fecha;
            const dateObject = new Date(dateString);
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            list.push({
                date: formattedDate,
                cost: recharge.importe,
                amount: recharge.saldo,
            });
        });
        if (list[0] != undefined) {
            list.reverse();
            setListRecharges(list);
            setConsult(!consult);
        } else {
            setIsOpenAlertNotice(true);
            setMessageAlertNotice("No se encontraron Recargas");
        }
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
                <HStack>
                    <HeaderPage
                        onPress={handleButtonPressMenu}
                        navigation={navigation}
                    ></HeaderPage>
                </HStack>
                <HStack alignItems="flex-start" minW="85%">
                    <MaterialCommunityIcons
                        name="hand-coin-outline"
                        style={styles.rechargeIcon}
                    />
                    <Text style={styles.textProfile}>Recargas</Text>
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
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Importe
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerRight,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Saldo
                                    </Text>
                                </Stack>
                            </HStack>
                            <ScrollView
                                style={styles.scrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                <VStack space="sm">
                                    {listRecharges.map((recharge, index) => (
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
                                                    {recharge.date}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerCenter,
                                                    {
                                                        alignItems: "flex-end",
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.textTableItems,
                                                        { paddingRight: 8 },
                                                    ]}
                                                >
                                                    {"$ " + recharge.cost}
                                                </Text>
                                            </Stack>
                                            <Stack
                                                style={[
                                                    styles.tableContainer,
                                                    styles.tableContainerRight,
                                                    {
                                                        alignItems: "flex-end",
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.textTableItems,
                                                        { paddingRight: 8 },
                                                    ]}
                                                >
                                                    {"$ " + recharge.amount}
                                                </Text>
                                            </Stack>
                                        </HStack>
                                    ))}
                                </VStack>
                            </ScrollView>
                            <Button
                                style={styles.button}
                                onPress={() => setConsult(!consult)}
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
                            {Platform.OS === "android" ? (
                                <InputDateInitial
                                    text="Desde"
                                    setDateSent={setDateInitial}
                                ></InputDateInitial>
                            ) : (
                                <InputDateInitialIOS
                                    text={"Desde"}
                                    setDateSent={setDateInitial}
                                ></InputDateInitialIOS>
                            )}
                        </HStack>
                        <HStack maxW="85%">
                            {Platform.OS === "android" ? (
                                <InputDateEnd
                                    text="Hasta"
                                    setDateSent={setDateEnd}
                                ></InputDateEnd>
                            ) : (
                                <InputDateEndIOS
                                    text="Hasta"
                                    setDateSent={setDateEnd}
                                ></InputDateEndIOS>
                            )}
                        </HStack>
                        {loaging ? (
                            <Button
                                isLoading
                                style={styles.button}
                                isLoadingText={
                                    <Text style={styles.textButton}>
                                        Consultando
                                    </Text>
                                }
                                spinnerPlacement="end"
                            ></Button>
                        ) : (
                            <Button
                                style={styles.button}
                                onPress={SearchHistory}
                            >
                                <Text style={styles.textButton}>Consultar</Text>
                            </Button>
                        )}
                    </>
                )}
            </VStack>
            <AlertError
                onClose={onCloseAlertError}
                message={messageAlertError}
                isOpen={isOpenAlertError}
                cancelRef={cancelRefAlertError}
            ></AlertError>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
                cancelRef={cancelRefAlertNotice}
            ></AlertNotice>
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
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    rechargeIcon: {
        color: "#515ba3",
        fontSize: "25@ms",
        marginLeft: "15@ms",
    },
});
