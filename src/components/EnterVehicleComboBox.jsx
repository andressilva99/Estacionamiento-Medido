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
    enable,
    onChangeText,
}) => {
    const handleSelectItem = () => {
        console.log(element);
    };

    return (
        <NativeBaseProvider>
            {enable ? (
                <HStack style={styles.containerEnabled}>
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
            ) : <HStack style={styles.containerDisabled}>
                    <HStack flex={2} alignItems="center">
                        <Text style={styles.label}>{label}</Text>
                        <Spacer></Spacer>
                        <Text style={styles.slash}>l</Text>
                    </HStack>
                    <Stack flex={4}>
                    </Stack>
                </HStack>}
        </NativeBaseProvider>
    );
};

export default EnterVehicleComboBox;

const styles = ScaledSheet.create({
    containerDisabled: {
        minHeight: "45@ms",
        alignItems: "center",
        backgroundColor: "#eaeaec",
        borderRadius: "30@ms",
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
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
    inputContainer: {
        borderBottomRightRadius: "30@ms",
        borderTopRightRadius: "30@ms",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: "white",
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
