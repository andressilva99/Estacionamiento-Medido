import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, NativeBaseProvider, Stack, VStack } from "native-base";
import EnterVehicleComboBox from "../components/EnterVehicleComboBox";
import { ScaledSheet } from "react-native-size-matters";

const { height } = Dimensions.get("screen");

const VehiclePropertyScreen = ({ navigation, route }) => {
    const { setElement, listElement, label, onBlur, enable, onClear, element } =
        route.params;

    const selectedItem = (elem) => {
        if (elem != undefined) {
            setElement(elem);
            navigation.goBack();
            onBlur();
        }
    };

    return (
        <NativeBaseProvider>
            <VStack height={height} alignItems={"center"} space={"lg"}>
                <Stack style={styles.container}>
                    <Text>*Nota: Escriba y seleccione</Text>
                </Stack>
                <HStack maxW={"90%"}>
                    <EnterVehicleComboBox
                        setElement={(elem) => selectedItem(elem)}
                        listElement={listElement}
                        label={label}
                        onBlur={onBlur}
                        enable={true}
                        onClear={onClear}
                    ></EnterVehicleComboBox>
                </HStack>
            </VStack>
        </NativeBaseProvider>
    );
};

export default VehiclePropertyScreen;

const styles = ScaledSheet.create({
    container: {
        marginTop: "35@ms",
        maxWidth: "90%",
    },
});
