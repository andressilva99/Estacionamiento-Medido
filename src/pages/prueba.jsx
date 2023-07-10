import React from "react";
import { Button, View } from "react-native";
import loggedUser from "../objects/user";

const MyComponent = () => {
    return (
        <View>
            {loggedUser.user.tokenNotification ? (
                <Text>{loggedUser.user.tokenNotification}</Text>
            ) : (
                <Text>Sin Token</Text>
            )}
        </View>
    );
};

export default MyComponent;
