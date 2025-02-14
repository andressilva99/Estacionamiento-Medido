import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HStack, NativeBaseProvider, Spacer, Stack } from "native-base";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";

const InputDateEndIOS = ({ text, setDateSent }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
        <NativeBaseProvider>
            <HStack minW="85%" alignItems="center">
                <HStack style={styles.containerText}>
                    <AntDesign name="calendar" style={styles.icon} />
                    <Text style={styles.text}>{text}</Text>
                    <Spacer></Spacer>
                </HStack>
                <TouchableOpacity
                    onPress={() => {
                        setOpen(true);
                    }}
                    style={styles.touchable}
                >
                    <Text style={styles.textDate}>
                        {date.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
            </HStack>
            <Stack>
                <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                        setDateSent(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    locale="es"
                    confirmText="Aceptar"
                    cancelText="Cancelar"
                />
            </Stack>
        </NativeBaseProvider>
    );
};

export default InputDateEndIOS;

const styles = ScaledSheet.create({
    containerText: {
        flex: 1,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: "#dadadc",
        paddingHorizontal: "5%",
        paddingVertical: "3%",
        borderRightWidth: 0,
    },
    touchable: {
        flex: 2,
        alignItems: "center",
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderColor: "#dadadc",
        paddingVertical: "3%",
    },
    text: {
        fontSize: "19@ms",
        fontWeight: "bold",
        color: "#515ba3",
        paddingLeft: "10@ms",
    },
    textDate: {
        fontSize: "19@ms",
        color: "#605a5c",
    },
    icon: {
        color: "#515ba3",
        fontSize: "24@ms",
    },
});
