import { StyleSheet, Text, View, Picker, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Button,
    Center,
    HStack,
    Input,
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
const { height, width } = Dimensions.get("screen");

const EnterVehicle = () => {
    const { control, handleSubmit, watch } = useForm();
    
    const [patent, setPatent] = useState(null);
    const [listMark, setListMark] = useState([]);
    const [mark, setMark] = useState();
    const [listModel, setListModel] = useState([]);
    const [model, setModel] = useState();
    const [listColor, setListColor] = useState([]);
    const [color, setColor] = useState();

    useEffect(() => {
        const obtainMarks = async () => {
            try {
                const result = await constants.AXIOS_INST.get("marcas");
                const marks = result.data.mensaje.map(
                    ({ idMarca, nombre }) => ({
                        id: idMarca,
                        title: nombre,
                    })
                );
                setListMark(marks);
            } catch (error) {
                console.error(error);
            }
        };
        obtainMarks();
    }, []);

    const patentToUpperCase = (inputText) => {
        setPatent(inputText.toUpperCase())
    }

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
            const colors = result.data.mensaje.map(
                ({ idColor, nombre }) => ({
                    id: idColor,
                    title: nombre,
                })
            );
            setListColor(colors);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NativeBaseProvider>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height={height}
                alignItems="center"
                safeAreaTop={true}
            >
                <HStack style={styles.containerHeader}>
                    <FontAwesome5 name="parking" size={24} color="white" />
                    <Spacer></Spacer>
                    <Text style={styles.textHeader}>
                        Estacionamiento medido
                    </Text>
                    <Spacer></Spacer>
                </HStack>
                <Stack flexDirection="row" style={styles.containerProfile}>
                    <FontAwesome5 name="car" size={24} color="#3f60af" />
                    <Text style={styles.textProfile}>Ingresar vehículo</Text>
                </Stack>
                <HStack>
                    <InputControlled name="patent" control={control}></InputControlled>
                </HStack>
                <HStack zIndex={999} marginX="5%">
                    <EnterVehicleComboBox
                        setElement={setMark}
                        element={mark}
                        listElement={listMark}
                        label="Marca"
                        onBlur={obtainModels}
                    ></EnterVehicleComboBox>
                </HStack>
                <HStack zIndex={998} marginX="5%">
                    <EnterVehicleComboBox
                        setElement={setModel}
                        element={model}
                        listElement={listModel}
                        label="Modelo"
                    ></EnterVehicleComboBox>
                </HStack>
                <HStack zIndex={997} marginX="5%">
                    <EnterVehicleComboBox
                        setElement={setColor}
                        element={color}
                        listElement={listColor}
                        onBlur={obtainColors}
                        label="Color"
                    ></EnterVehicleComboBox>
                </HStack>
            </Stack>
        </NativeBaseProvider>
    );
};

export default EnterVehicle;

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
});
