import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../pages/ProfileScreen';
import RegisterStep1Screen from '../pages/RegisterStep1Screen';
import RegisterStep2Screen from '../pages/RegisterStep2Screen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(undefined);
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? (<Stack.Screen name='Profile' component={ProfileScreen}></Stack.Screen>) : (<>
                <Stack.Screen name='Register1' component={RegisterStep1Screen}></Stack.Screen>
                <Stack.Screen name='Register2' component={RegisterStep2Screen}></Stack.Screen>
            </>)}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})