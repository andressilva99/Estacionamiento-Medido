import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Button,
    HStack,
    NativeBaseProvider,
    Select,
    Spacer,
    Stack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";

const EnterVehicle = () => {
    const [listModeles, setListModeles] = useState([]);
    const [model, setModel] = useState();

    useEffect(() => {
        const obtainModels = async () => {
            try {
                const result = await constants.AXIOS_INST.get("modelos");
                const models = result.data.mensaje.map(
                    ({ idModelo, nombre }) => ({
                        value: idModelo,
                        label: nombre,
                    })
                );
                setListModeles(models);
            } catch (error) {
                console.error(error);
            }
        };
        obtainModels();
    }, []);

    return (
        <NativeBaseProvider>
            <Stack
                style={styles.backgroundContainer}
                space="sm"
                height="100%"
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
                    <Text style={styles.textProfile}>Perfil</Text>
                </Stack>
                <Select selectedValue={model} onValueChange={setModel} minW="85%">
                    {listModeles.map((model) => (
                        <Select.Item
                            key={model.value}
                            value={model.value}
                            label={model.label}
                        ></Select.Item>
                    ))}
                </Select>
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
