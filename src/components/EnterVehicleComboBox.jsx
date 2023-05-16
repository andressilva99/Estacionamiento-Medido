import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, NativeBaseProvider, Spacer, Stack } from "native-base";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { ScaledSheet } from "react-native-size-matters";

const EnterVehicleComboBox = ({
    setElement,
    element,
    listElement,
    label,
    onBlur,
}) => {
    const handleSelectItem = () => {
        console.log(element);
    };

    return (
        <NativeBaseProvider>
            <HStack style={styles.container}>
                <HStack flex={2} alignItems="center">
                    <Text style={styles.label}>{label}</Text>
                    <Spacer></Spacer>
                    <Text style={styles.slash}>l</Text>
                </HStack>
                <Stack flex={4}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        onSelectItem={setElement}
                        dataSet={element ? listElement : []}
                        onChangeText={setElement}
                        showChevron={false}
                        onBlur={onBlur}
                        EmptyResultComponent={<Text>Sin resultados</Text>}
                        containerStyle={styles.autocompleteDropdown}
                        suggestionsListContainerStyle={{
                            maxWidth: "80%",
                            alignItems: "center",
                        }}
                        inputContainerStyle={styles.inputContainer}
                    ></AutocompleteDropdown>
                </Stack>
            </HStack>
        </NativeBaseProvider>
    );
};

export default EnterVehicleComboBox;

const styles = ScaledSheet.create({
    container: {
        minHeight: "7%",
        alignItems: "center",
        backgroundColor: "#eaeaec",
        borderRadius: 30,
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
    },
    label: {
        fontSize: "18@ms",
        color: "#656a6e",
        marginLeft: "15@ms",
    },
    inputContainer: {
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: "#eaeaec",
    },
    autocompleteDropdown: {
        alignItems: "center",
    },
    slash: {
        fontSize: "30@ms",
        color: "#656a6e",
        fontWeight: "bold",
    },
});
