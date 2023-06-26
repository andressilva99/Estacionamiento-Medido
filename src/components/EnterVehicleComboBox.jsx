import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { HStack, NativeBaseProvider, Spacer, Stack } from "native-base";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { ScaledSheet } from "react-native-size-matters";

const EnterVehicleComboBox = ({
    setElement,
    listElement,
    label,
    onBlur,
    enable,
    onClear,
    onFocus,
}) => {
    const [elem, setElem] = useState(null);
    // const [enableOnBlur, setEnableOnBlur] = useState(initialState);

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
                            dataSet={elem ? listElement : []}
                            onChangeText={setElem}
                            showChevron={false}
                            onBlur={onBlur}
                            EmptyResultComponent={
                                <Text style={styles.text}>Sin resultados</Text>
                            }
                            containerStyle={styles.autocompleteDropdown}
                            suggestionsListContainerStyle={{
                                alignItems: "center",
                            }}
                            inputContainerStyle={styles.inputContainer}
                            suggestionsListTextStyle={
                                styles.suggestionsListTextStyle
                            }
                            onClear={onClear}
                        ></AutocompleteDropdown>
                    </Stack>
                </HStack>
            ) : (
                <HStack style={styles.containerDisabled}>
                    <HStack flex={2} alignItems="center">
                        <Text style={styles.label}>{label}</Text>
                        <Spacer></Spacer>
                        <Text style={styles.slash}>l</Text>
                    </HStack>
                    <Stack flex={4}></Stack>
                </HStack>
            )}
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
    suggestionsListTextStyle: {
        fontSize: "15@ms",
    },
    text: {
        fontSize: "15@ms",
    },
});
