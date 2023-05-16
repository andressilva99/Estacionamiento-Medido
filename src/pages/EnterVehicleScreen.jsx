import {
    StyleSheet,
    Text,
    View,
    Picker,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    Button,
    Center,
    HStack,
    Input,
    KeyboardAvoidingView,
    NativeBaseProvider,
    Select,
    Spacer,
    Stack,
    VStack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import EnterVehicleComboBox from "../components/EnterVehicleComboBox";
import InputControlled from "../components/InputControlled";
import { useForm } from "react-hook-form";
import loggedUser from "../objects/user";
import HeaderPage from "../components/HeaderPage";

const { height, width } = Dimensions.get("screen");

const EnterVehicleScreen = () => {
    const { control, handleSubmit, watch } = useForm();

    const [listMark, setListMark] = useState([]);
    const [mark, setMark] = useState();
    const [listModel, setListModel] = useState([]);
    const [model, setModel] = useState();
    const [listColor, setListColor] = useState([]);
    const [color, setColor] = useState();

    useEffect(() => {
        obtainMarks();
    }, []);

    const obtainMarks = async () => {
        try {
            const result = await constants.AXIOS_INST.get("marcas");
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
            if (mark.id !== null) {
                const result = await constants.AXIOS_INST.get(
                    `modelos/${mark.id}`
                );
                const models = result.data.mensaje.map(
                    ({ idModelo, nombre }) => ({
                        id: idModelo,
                        title: nombre,
                    })
                );
                setListModel(models);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const obtainColors = async () => {
        try {
            const result = await constants.AXIOS_INST.get("colores");
            const colors = result.data.mensaje.map(({ idColor, nombre }) => ({
                id: idColor,
                title: nombre,
            }));
            setListColor(colors);
        } catch (error) {
            console.error(error);
        }
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

        await constants.AXIOS_INST.post("vehiculo/registrar", vehicleRegister)
            .then((response) => {
                alert(response.data.mensaje);
            })
            .catch((error) => {
                alert(error.response.data.mensaje);
            });
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
                            {/* onPress={handleButtonPressMenu} */}
                            <HeaderPage></HeaderPage>
                        </HStack>
                        <Stack
                            flexDirection="row"
                            style={styles.containerProfile}
                        >
                            <FontAwesome5
                                name="car"
                                size={24}
                                color="#3f60af"
                            />
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
                                onBlur={obtainModels}
                            ></EnterVehicleComboBox>
                        </HStack>
                        <HStack zIndex={998} marginX="5%" maxW="85%">
                            <EnterVehicleComboBox
                                setElement={setModel}
                                element={model}
                                listElement={listModel}
                                onBlur={obtainColors}
                                label="Modelo"
                            ></EnterVehicleComboBox>
                        </HStack>
                        <HStack zIndex={997} marginX="5%" maxW="85%">
                            <EnterVehicleComboBox
                                setElement={setColor}
                                element={color}
                                listElement={listColor}
                                label="Color"
                            ></EnterVehicleComboBox>
                        </HStack>
                        <Button onPress={handleSubmit(RegisterVehicle)} style={styles.button}>
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
    containerHeader: {
        minHeight: "7%",
        minWidth: "90%",
        borderRadius: "5@ms",
        paddingLeft: "20@ms",
        backgroundColor: "#3f60af",
        alignItems: "center",
    },
    textHeader: {
        fontSize: "18@ms",
        fontWeight: "bold",
        color: "white",
    },
    containerProfile: {
        minHeight: "5%",
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
        minHeight: "7%",
        minWidth: "85%",
    },
    textButton: {
        fontWeight: "bold",
        color: "white",
        fontSize: "18@ms",
    },
});
