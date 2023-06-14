import { Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Button,
    HStack,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Stack,
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

const { height } = Dimensions.get("screen");

const EnterVehicleScreen = ({route}) => {
    const { refreshScreen } = route.params;

    const { control, handleSubmit, watch } = useForm();

    const [enableModel, setEnableModel] = useState(false);
    const [enableColor, setEnableColor] = useState(false);

    const [listMark, setListMark] = useState([]);
    const [mark, setMark] = useState();

    const [listModel, setListModel] = useState([]);
    const [model, setModel] = useState();

    const [listColor, setListColor] = useState([]);
    const [color, setColor] = useState();

    const config = {
        headers: {
            Authorization: `bearer ${loggedUser.user.token}`,
        },
    };

    useEffect(() => {
        obtainMarks();
    }, []);

    const obtainMarks = async () => {
        try {
            const result = await constants.AXIOS_INST.get("marcas", config);
            const marks = result.data.mensaje.map(({ idMarca, nombre }) => ({
                id: idMarca,
                title: nombre,
            }));
            setListMark(marks);
        } catch (error) {
            console.error(error);
        }
    };

    const obtainModels = async () => {
        try {
            setEnableModel(false);
            setEnableColor(false);
            if (mark.id !== null) {
                const result = await constants.AXIOS_INST.get(
                    `modelos/${mark.id}`,
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
            console.error(error);
            setEnableModel(false);
            setEnableColor(false);
        }
    };

    const obtainColors = async () => {
        try {
            setEnableColor(false);
            const result = await constants.AXIOS_INST.get("colores", config);
            const colors = result.data.mensaje.map(({ idColor, nombre }) => ({
                id: idColor,
                title: nombre,
            }));
            setListColor(colors);
            setEnableColor(true);
        } catch (error) {
            console.error(error);
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
        const { patent } = data;
        const vehicleRegister = {
            vehiculo: {
                patente: patent,
                idUsuario: loggedUser.user.idUser,
                idMarca: mark.id,
                idModelo: model.id,
                idColor: color.id,
            },
        };

        await constants.AXIOS_INST.post(
            "vehiculo/registrar",
            vehicleRegister,
            config
        )
            .then((response) => {
                alert(response.data.mensaje);
                console.log(response.data.mensaje);
                saveVehicle(response.data.mensaje);
                refreshScreen();
            })
            .catch((error) => {
                alert(error.response.data.mensaje);
            });
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
        console.log(loggedUser.user.vehicles)
        saveUserInformation();
    };

    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView>
                {/* <ScrollView> */}
                <Stack
                    style={styles.backgroundContainer}
                    space="sm"
                    height={height}
                    alignItems="center"
                    safeAreaTop={true}
                >
                    <HStack maxW="90%">
                        <HeaderPage dissableButtonMenu={true}></HeaderPage>
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
                        ></InputControlled>
                    </HStack>
                    <HStack zIndex={999} marginX="5%" maxW="85%">
                        <EnterVehicleComboBox
                            setElement={setMark}
                            element={mark}
                            listElement={listMark}
                            label="Marca"
                            onBlur={() => {
                                mark ? EnableModel() : null;
                            }}
                            enable={true}
                            onClear={() => {
                                setEnableModel(false);
                                setEnableColor(false);
                            }}
                        ></EnterVehicleComboBox>
                    </HStack>
                    <HStack zIndex={998} marginX="5%" maxW="85%">
                        <EnterVehicleComboBox
                            setElement={setModel}
                            element={model}
                            listElement={listModel}
                            onBlur={() => {
                                model ? EnableColor() : null;
                            }}
                            label="Modelo"
                            enable={enableModel}
                            onClear={() => {
                                setEnableColor(false);
                            }}
                        ></EnterVehicleComboBox>
                    </HStack>
                    <HStack zIndex={997} marginX="5%" maxW="85%">
                        <EnterVehicleComboBox
                            setElement={setColor}
                            element={color}
                            listElement={listColor}
                            label="Color"
                            enable={enableColor}
                        ></EnterVehicleComboBox>
                    </HStack>
                    <Button
                        onPress={handleSubmit(RegisterVehicle)}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Ingresar vehículo</Text>
                    </Button>
                </Stack>
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
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
});
