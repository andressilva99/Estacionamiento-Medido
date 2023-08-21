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

const ParkingHistoryScreen = ({ navigation }) => {
    const [dateInitial, setDateInitial] = useState(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDay() - constants.PREVIOUS_DAYS);
        return currentDate;
    });
    const [dateEnd, setDateEnd] = useState(new Date());
    const [patentSelected, setPatentSelected] = useState();
    const [consult, setConsult] = useState(false);

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [listParking, setListParking] = useState([]);

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

        if (patentSelected != undefined) {
            await constants
                .AXIOS_INST({
                    method: "post",
                    url: "historial/estacionamiento",
                    headers: {
                        Authorization: `bearer ${loggedUser.user.token}`,
                    },
                    data: {
                        estacionamiento: {
                            fechaInicio: formattedDateInitial,
                            fechaFin: formattedDateEnd,
                            idVehiculo: patentSelected,
                            idUsuario: loggedUser.user.idUser,
                        },
                    },
                })
                .then((resp) => {
                    completeListParking(resp);
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
        } else {
            setMessageAlertError("Patente no seleccionada");
            setIsOpenAlertError(true);
        }
        setLoaging(false);
    };

    const completeListParking = (response) => {
        const list = [];
        response.data.mensaje.forEach((parking) => {
            if (parking != null) {
                const dateString = parking.fecha;
                
                const day = dateString.slice(8, 10);
                const month = dateString.slice(5, 7);
                const year = dateString.slice(0, 4);
                const formattedDate = `${day}-${month}-${year}`;

                const hourInitString = parking.horaInicio;
                const formattedTimeInit = hourInitString.slice(0, 5);

                const hourFinishString = parking.horaFin;
                const formattedTimeFinish = hourFinishString.slice(0, 5);

                list.push({
                    date: formattedDate,
                    timeInit: formattedTimeInit,
                    timeFinish: formattedTimeFinish,
                    cost: parking.costo,
                    amount: parking.saldo,
                });
            }
        });
        if (list[0] != undefined) {
            list.reverse();
            setListParking(list);
            setConsult(!consult);
        } else {
            setIsOpenAlertNotice(true);
            setMessageAlertNotice("No se encontraron Estacionamientos");
        }
    };

    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={"default"}
                backgroundColor={"black"}
            ></StatusBar>
            <VStack
                height={height}
                alignItems={"center"}
                style={styles.backgroundContainer}
                space="sm"
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage onPress={handleButtonPressMenu} navigation={navigation}></HeaderPage>
                </HStack>
                <HStack alignItems="flex-start" minW="85%">
                    <FontAwesome5 name="parking" style={styles.parkingIcon} />
                    <Text style={styles.textProfile}>Estacionamientos</Text>
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
                                        Inicio
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerCenter,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Fin
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.tableContainer,
                                        styles.tableContainerRight,
                                    ]}
                                >
                                    <Text style={styles.textTableHeader}>
                                        Costo
                                    </Text>
                                </Stack>
                            </HStack>
                            <ScrollView
                                style={styles.scrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                <VStack space="sm">
                                    {listParking.map((parking, index) => (
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
                                                    {parking.date}
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
                                                    {parking.timeInit}
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
                                                    {parking.timeFinish}
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
                                                    {"$ " + parking.cost}
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
                        <Stack style={styles.select}>
                            <Select
                                borderWidth={0}
                                selectedValue={patentSelected}
                                style={styles.text}
                                marginX="5%"
                                onValueChange={setPatentSelected}
                                placeholderTextColor="white"
                                placeholder="Seleccionar patente"
                                dropdownIcon={
                                    <FontAwesome
                                        name="chevron-down"
                                        style={styles.icon}
                                    />
                                }
                            >
                                {loggedUser.user.vehicles.map((vehicle) => (
                                    <Select.Item
                                        key={vehicle.idVehicle}
                                        label={vehicle.patent}
                                        value={vehicle.idVehicle}
                                    ></Select.Item>
                                ))}
                            </Select>
                        </Stack>
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
                message={messageAlertError}
                onClose={onCloseAlertError}
                cancelRef={cancelRefAlertError}
                isOpen={isOpenAlertError}
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

export default ParkingHistoryScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    parkingIcon: {
        color: "#515ba3",
        fontSize: "25@ms",
        marginLeft: "15@ms",
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
        backgroundColor: "#7bb6de",
        borderWidth: "1@ms",
        borderColor: "#dadadc",
        borderRadius: "30@ms",
        minHeight: "45@ms",
    },
    button: {
        minWidth: "85%",
        backgroundColor: "#c4e5f6",
        borderWidth: "1@ms",
        borderColor: "#dadadc",
        borderRadius: "30@ms",
        minHeight: "45@ms",
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
        borderWidth: "1@ms",
        borderRightWidth: 0,
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
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
});
