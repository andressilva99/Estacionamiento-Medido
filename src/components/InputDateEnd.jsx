import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HStack, NativeBaseProvider, Spacer, Stack } from "native-base";
import {
    DateTimePicker,
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

const InputDateEnd = ({text, setDateSent}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setDateSent(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: currentMode,
                is24Hour: true,
            });
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    return (
        <NativeBaseProvider>
            <HStack minW="85%" alignItems="center">
                <HStack style={styles.containerText}>
                    <AntDesign name="calendar" style={styles.icon} />
                    <Text style={styles.text}>{text}</Text>
                    <Spacer></Spacer>
                </HStack>
                <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.touchable}
                >
                    <Text style={styles.textDate}>
                        {date.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
            </HStack>
            <Stack>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </Stack>
        </NativeBaseProvider>
    );
};

export default InputDateEnd;

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