import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeBaseProvider, Input } from "native-base";
import { Controller } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons';

const InputControlled = ({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
    width,
    keyboardType,
}) => {
    return (
        <NativeBaseProvider>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                }) => (
                    <>
                        <Input
                            keyboardType={keyboardType}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            borderColor={error ? "#f11c22" : "#b9b9bb"}
                            style={styles.input}
                            minW={width}
                            borderRadius={30}
                        ></Input>
                        {error && (
                            <Text
                                style={styles.errores}
                            >
                                <Ionicons name="warning-outline" size={24} style={styles.errores}/>
                                {error.message || " Error"}
                            </Text>
                        )}
                    </>
                )}
            ></Controller>
        </NativeBaseProvider>
    );
};

export default InputControlled;

const styles = StyleSheet.create({
    input: {
        minHeight: "7%",
        backgroundColor: "white",
        paddingLeft: "6%",
    },
    errores: {
        color: "red",
    },
});
