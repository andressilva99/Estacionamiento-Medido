import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Image, NativeBaseProvider, Spacer } from "native-base";
import { ScaledSheet } from "react-native-size-matters";

const PressableCustom = ({ styleTouchable, text, icon, iconRight, styleText, onPress, id, disabled }) => {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.touchable, styleTouchable]} onPress={() => onPress(id)} disabled={disabled}>
                    {iconRight ? (
                        <HStack space="md" paddingRight="3%">
                            <Text style={[styles.text, styleText]}>{text}</Text>
                            <Spacer></Spacer>
                            <Image
                                source={icon}
                                alt={text}
                                style={styles.icon}
                            ></Image>
                        </HStack>
                    ) : (
                        <HStack space="md">
                            <Image
                                source={icon}
                                alt={text}
                                style={styles.icon}
                            ></Image>
                            <Text style={[styles.text, styleText]}>{text}</Text>
                        </HStack>
                    )}
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    );
};

export default PressableCustom;

const styles = ScaledSheet.create({
    container: {
        alignItems: "center",
    },
    touchable: {
        borderRadius: "30@ms",
        minHeight: "50@ms",
        justifyContent: "center",
        minWidth: "85%",
        paddingLeft: "20@ms",
    },
    icon: {
        width: "30@ms",
        height: "30@ms",
        borderRadius: "100@ms",
    },
    text: {
        fontSize: "18@ms",
        color: "white",
    },
});
