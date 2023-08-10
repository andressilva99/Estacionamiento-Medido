import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input } from "native-base";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";

const InputControlled = ({
    defaultValue,
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
    width,
    keyboardType,
    style,
    variant,
    autoCapitalize,
    isDisabled,
    autoComplete,
    inputFocus,
}) => {
    const [changeText, setChangeText] = useState(false);

    return (
        <NativeBaseProvider>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                }) => (
                    <View>
                        <Input
                            keyboardType={keyboardType}
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                            }}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            borderColor={error ? "#f11c22" : "#b9b9bb"}
                            style={style ? style : styles.input}
                            minW={width}
                            borderRadius={30}
                            variant={variant}
                            autoCapitalize={autoCapitalize}
                            isDisabled={isDisabled}
                            autoComplete={autoComplete}
                            ref={inputFocus}
                        ></Input>
                        {error && (
                            <Text style={styles.error}>
                                <Ionicons
                                    name="warning-outline"
                                    style={styles.iconError}
                                />
                                {error.message || " Error"}
                            </Text>
                        )}
                    </View>
                )}
            ></Controller>
        </NativeBaseProvider>
    );
};

export default InputControlled;

const styles = ScaledSheet.create({
    input: {
        minHeight: "45@ms",
        backgroundColor: "white",
        paddingLeft: "6%",
        fontSize: "15@ms",
    },
    error: {
        color: "red",
        fontSize: "15@ms",
    },
    iconError: {
        color: "red",
        fontSize: "24@ms",
    },
});
