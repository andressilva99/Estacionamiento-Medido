import { Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    HStack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Spacer,
    Stack,
    StatusBar,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import constants from "../constants/constants";
import EnterVehicleComboBox from "../components/EnterVehicleComboBox";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";
import loggedUser from "../objects/user";
import HeaderPage from "../components/HeaderPage";
import { saveUserInformation } from "../functions/saveUserInformation";
import AlertNotice from "../components/Alerts/AlertNotice";
import AlertError from "../components/Alerts/AlertError";
import { newEnterVehicle } from "../objects/newEnterVehicle";

const { height } = Dimensions.get("screen");

const EnterVehicleScreen = ({ navigation, route }) => {
    const { control, handleSubmit, watch } = useForm();

    const { refreshParkingScreen } = route.params;

    const [enableModel, setEnableModel] = useState(false);
    const [enableColor, setEnableColor] = useState(false);

    const [listMark, setListMark] = useState([]);
    const [enableButton, setEnableButton] = useState(false);

    const [listModel, setListModel] = useState([]);

    const [listColor, setListColor] = useState([]);

    const [isOpenAlertNotice, setIsOpenAlertNotice] = useState(false);
    const cancelRefAlertNotice = useRef(null);
    const onCloseAlertNotice = () => {
        setIsOpenAlertNotice(!isOpenAlertNotice);
        navigation.goBack();
    };
    const [messageAlertNotice, setMessageAlertNotice] = useState();

    const [isOpenAlertError, setIsOpenAlertError] = useState(false);
    const cancelRefAlertError = useRef(null);
    const onCloseAlertError = () => setIsOpenAlertError(!isOpenAlertError);
    const [messageAlertError, setMessageAlertError] = useState();

    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
    };

    useEffect(() => {
        handleFocus();
        obtainMarks();
    }, []);

    const inputFocus = useRef(null);

    const handleFocus = () => {
        if (inputFocus.current) {
            inputFocus.current.focus();
        }
    };

    const obtainMarks = async () => {
        try {
            const result = await constants.AXIOS_INST.get("marcas", config);
            const marks = result.data.mensaje.map(({ idMarca, nombre }) => ({
                id: idMarca,
                title: nombre,
            }));
            setListMark(marks);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
            return;
        }
    };

    const obtainModels = async () => {
        console.log("Y luego busco");
        try {
            setEnableModel(false);
            setEnableColor(false);
            if (newEnterVehicle.mark != null) {
                const result = await constants.AXIOS_INST.get(
                    `modelos/${newEnterVehicle.mark.id}`,
                    config
                );
                const models = result.data.mensaje.map(
                    ({ idModelo, nombre }) => ({
                        id: idModelo,
                        title: nombre,
                    })
                );
                setListModel(models);
                setEnableModel(true);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
            setEnableModel(false);
            setEnableColor(false);
        }
    };

    const obtainColors = async () => {
        try {
            console.log("Y luego busco");
            setEnableColor(false);
            const result = await constants.AXIOS_INST.get("colores", config);
            const colors = result.data.mensaje.map(({ idColor, nombre }) => ({
                id: idColor,
                title: nombre,
            }));
            setListColor(colors);
            setEnableColor(true);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
            setEnableColor(false);
        }
    };

    const EnableModel = () => {
        obtainModels();
    };

    const EnableColor = () => {
        obtainColors();
    };

    const RegisterVehicle = async (data) => {
        setLoading(true);
        const { patent } = data;
        const vehicleRegister = {
            vehiculo: {
                patente: patent,
                idUsuario: loggedUser.user.idUser,
                idMarca: newEnterVehicle.mark.id,
                idModelo: newEnterVehicle.model.id,
                idColor: newEnterVehicle.color.id,
            },
        };

        await constants.AXIOS_INST.post(
            "vehiculo/registrar",
            vehicleRegister,
            config
        )
            .then((response) => {
                saveVehicle(response.data.mensaje);
                setMessageAlertNotice("Vehículo registrado");
                setIsOpenAlertNotice(true);
                refreshParkingScreen();
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
        setLoading(false);
    };

    const saveVehicle = (vehicle) => {
        vehicle.forEach((veh) => {
            loggedUser.user.vehicles.push({
                mark: veh.idMarca,
                model: veh.idModelo,
                patent: veh.patente,
                color: veh.idColor,
                idVehicle: veh.idVehiculo,
                parked: false,
            });
        });
        console.log(loggedUser.user.vehicles);
        saveUserInformation();
    };

    return (
        <NativeBaseProvider>
            <StatusBar
                barStyle={"default"}
                backgroundColor={"black"}
            ></StatusBar>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height={height}
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack>
                    <HeaderPage
                        dissableButtonMenu={true}
                        navigation={navigation}
                    ></HeaderPage>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <FontAwesome5 name="car" size={24} color="#3f60af" />
                    <Text style={styles.textProfile}>
                        Ingresar Nuevo Vehículo
                    </Text>
                </Stack>
                <HStack maxW="85%">
                    <InputControlled
                        name="patent"
                        control={control}
                        autoCapitalize="characters"
                        placeholder="Patente"
                        rules={{
                            required: " Patente Requerida",
                            pattern: {
                                value: /^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/,
                                message:
                                    ' La patente debe tener el formato "LLLNNN" o "LLNNNLL" (L: letra, N: número)',
                            },
                        }}
                        inputFocus={inputFocus}
                    ></InputControlled>
                </HStack>
                <Stack maxW={"85%"}>
                    <Text>*Formato ej.: "ABC123", "AB123CD"</Text>
                </Stack>
                <HStack style={styles.containerEnabled} maxW={"85%"}>
                    <HStack flex={2} alignItems="center">
                        <Text style={styles.label}>Marca</Text>
                        <Spacer></Spacer>
                        <Text style={styles.slash}>l</Text>
                    </HStack>
                    <Stack flex={4}>
                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={() => {
                                setEnableButton(false);
                                navigation.navigate("VehicleProperty", {
                                    type: "mark",
                                    listElement: listMark,
                                    label: "Marca",
                                    onBlur: () => {
                                        EnableModel();
                                    },
                                    enable: true,
                                    onClear: () => {
                                        setEnableModel(false);
                                        setEnableColor(false);
                                    },
                                });
                            }}
                        >
                            <Text style={styles.touchableOpacityLabel}>
                                {newEnterVehicle.mark != null
                                    ? newEnterVehicle.mark.title
                                    : "Seleccionar Marca"}
                            </Text>
                        </TouchableOpacity>
                    </Stack>
                </HStack>
                {enableModel ? (
                    <HStack style={styles.containerEnabled} maxW={"85%"}>
                        <HStack flex={2} alignItems="center">
                            <Text style={styles.label}>Modelo</Text>
                            <Spacer></Spacer>
                            <Text style={styles.slash}>l</Text>
                        </HStack>
                        <Stack flex={4}>
                            <TouchableOpacity
                                style={styles.touchableOpacity}
                                onPress={() => {
                                    setEnableButton(false);
                                    navigation.navigate("VehicleProperty", {
                                        type: "model",
                                        listElement: listModel,
                                        label: "Modelo",
                                        onBlur: () => {
                                            EnableColor();
                                        },
                                        enable: true,
                                        onClear: () => {
                                            setEnableColor(false);
                                        },
                                    });
                                }}
                            >
                                <Text style={styles.touchableOpacityLabel}>
                                    {newEnterVehicle.model != null
                                        ? newEnterVehicle.model.title
                                        : "Seleccionar Modelo"}
                                </Text>
                            </TouchableOpacity>
                        </Stack>
                    </HStack>
                ) : (
                    <HStack style={styles.containerDisabled} maxW={"85%"}>
                        <HStack flex={2} alignItems="center">
                            <Text style={styles.label}>Modelo</Text>
                            <Spacer></Spacer>
                            <Text style={styles.slash}>l</Text>
                        </HStack>
                        <Stack flex={4}></Stack>
                    </HStack>
                )}
                {enableColor ? (
                    <HStack style={styles.containerEnabled} maxW={"85%"}>
                        <HStack flex={2} alignItems="center">
                            <Text style={styles.label}>Color</Text>
                            <Spacer></Spacer>
                            <Text style={styles.slash}>l</Text>
                        </HStack>
                        <Stack flex={4}>
                            <TouchableOpacity
                                style={styles.touchableOpacity}
                                onPress={() => {
                                    setEnableButton(false);
                                    navigation.navigate("VehicleProperty", {
                                        type: "color",
                                        listElement: listColor,
                                        label: "Color",
                                        onBlur: () => {
                                            setEnableButton(true);
                                        },
                                        enable: true,
                                        onClear: () => {},
                                    });
                                }}
                            >
                                <Text style={styles.touchableOpacityLabel}>
                                    {newEnterVehicle.color != null
                                        ? newEnterVehicle.color.title
                                        : "Seleccionar Color"}
                                </Text>
                            </TouchableOpacity>
                        </Stack>
                    </HStack>
                ) : (
                    <HStack style={styles.containerDisabled} maxW={"85%"}>
                        <HStack flex={2} alignItems="center">
                            <Text style={styles.label}>Color</Text>
                            <Spacer></Spacer>
                            <Text style={styles.slash}>l</Text>
                        </HStack>
                        <Stack flex={4}></Stack>
                    </HStack>
                )}
                {loading ? (
                    <Button
                        isLoading
                        isLoadingText={
                            <Text style={styles.textButton}>
                                Ingresando vehículo
                            </Text>
                        }
                        style={styles.button}
                        spinnerPlacement="end"
                    ></Button>
                ) : (
                    <Button
                        isDisabled={!enableButton}
                        onPress={handleSubmit(RegisterVehicle)}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Ingresar vehículo</Text>
                    </Button>
                )}
            </Stack>
            <AlertNotice
                isOpen={isOpenAlertNotice}
                onClose={onCloseAlertNotice}
                message={messageAlertNotice}
                cancelRef={cancelRefAlertNotice}
            ></AlertNotice>
            <AlertError
                isOpen={isOpenAlertError}
                onClose={onCloseAlertError}
                message={messageAlertError}
                cancelRef={cancelRefAlertError}
            ></AlertError>
        </NativeBaseProvider>
    );
};

export default EnterVehicleScreen;

const styles = ScaledSheet.create({
    backgroundContainer: {
        backgroundColor: "#f2f2f4",
    },
    containerProfile: {
        minHeight: "45@ms",
        minWidth: "85%",
        alignItems: "center",
        paddingLeft: "3%",
    },
    textProfile: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "3%",
    },
    button: {
        backgroundColor: "#51be85",
        borderRadius: "30@ms",
        minHeight: "45@ms",
        minWidth: "85%",
    },
    textButton: {
        fontWeight: "bold",
        color: "white",
        fontSize: "18@ms",
    },
    textNote: {
        color: "#414241",
    },
    containerEnabled: {
        minHeight: "45@ms",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "30@ms",
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
    },
    label: {
        fontSize: "18@ms",
        color: "#656a6e",
        marginLeft: "15@ms",
    },
    slash: {
        fontSize: "30@ms",
        color: "#656a6e",
        fontWeight: "bold",
    },
    containerDisabled: {
        minHeight: "45@ms",
        alignItems: "center",
        backgroundColor: "#eaeaec",
        borderRadius: "30@ms",
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
    },
    touchableOpacity: {
        alignItems: "center",
    },
    touchableOpacityLabel: {
        fontSize: "18@ms",
        color: "#656a6e",
    },
});
