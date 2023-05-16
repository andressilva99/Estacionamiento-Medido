import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, Input } from "native-base";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

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
}) => {
    const [changeText, setChangeText] = useState(false);
    
    return (
        <NativeBaseProvider>
            <Controller
                control={control}
                name={name}
                rules={!changeText && (defaultValue != null) ? null : rules}
                render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                }) => (
                    <View>
                        <Input
                            keyboardType={keyboardType}
                            value={changeText ? value : defaultValue}
                            onChangeText={changeText ? onChange : () => {onChange; setChangeText(true)}}
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
                        ></Input>
                        {error && (
                            <Text style={styles.errores}>
                                <Ionicons
                                    name="warning-outline"
                                    size={24}
                                    style={styles.errores}
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
