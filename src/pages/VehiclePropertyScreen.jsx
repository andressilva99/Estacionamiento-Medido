import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, NativeBaseProvider, Stack, VStack } from "native-base";
import EnterVehicleComboBox from "../components/EnterVehicleComboBox";
import { ScaledSheet } from "react-native-size-matters";
import { newEnterVehicle } from "../objects/newEnterVehicle";

const { height } = Dimensions.get("screen");

const VehiclePropertyScreen = ({ navigation, route }) => {
    const { setElement, listElement, label, onBlur, enable, onClear, type } =
        route.params;

    const selectedItem = (elem) => {
        if (type == "mark") {
            if (elem != null) {
                newEnterVehicle.model = null
                newEnterVehicle.color = null
                newEnterVehicle.mark = elem;
                console.log("Yo me guardo primero");
                console.log(newEnterVehicle.mark);
                onBlur();
                navigation.goBack();
            }
        } else if (type == "model") {
            if (elem != null) {
                newEnterVehicle.color = null
                newEnterVehicle.model = elem;
                console.log("Yo me guardo primero");
                console.log(newEnterVehicle.model);
                onBlur();
                navigation.goBack();
            }
        } else {
            if (elem != null) {
                newEnterVehicle.color = elem;
                console.log("Y yo soy el ultimo en guardarme");
                console.log(newEnterVehicle.color);
                onBlur();
                navigation.goBack();
            }
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
