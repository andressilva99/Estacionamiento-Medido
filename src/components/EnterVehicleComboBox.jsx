import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, NativeBaseProvider } from "native-base";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { ScaledSheet } from "react-native-size-matters";

const EnterVehicleComboBox = ({ setElement, element, listElement, label, onBlur }) => {
    const handleSelectItem = () => {
        console.log(element)
    }
    
    return (
        <NativeBaseProvider>
            <HStack style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.slash}>l</Text>
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
            </HStack>
        </NativeBaseProvider>
    );
};

export default EnterVehicleComboBox;

const styles = ScaledSheet.create({
    container: {
        minHeight: "7%",
        minWidth: "90%",
        alignItems: "center",
        backgroundColor: "#eaeaec",
        borderRadius: 30,
        borderColor: "#9d9ca1",
        borderWidth: "1@ms",
    },
    label: {
        fontSize: "18@ms",
        color: "#656a6e",
        marginLeft: "15@ms"
    },
    inputContainer: {
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: "#fff",
    },
    autocompleteDropdown: {
        minWidth: "72.5%",
        alignItems: "center"
    },
    slash: {
        fontSize: "30@ms",
        color: "#656a6e",
        fontWeight: "bold",
        marginHorizontal: "5@ms"
    },
});
