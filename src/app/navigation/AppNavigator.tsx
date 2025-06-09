/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PhoneVerificationScreen from '../../Screens/PhoneVerificationScreen';
import VerificationCodeScreen from '../../Screens/VerificationCodeScreen';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName="PhoneVerification"
      >
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
