import i18n from './i18n';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhoneVerificationScreen from './src/Screens/PhoneVerificationScreen';
import { I18nextProvider } from 'react-i18next';

const App = () => {
  return (
      <I18nextProvider i18n={i18n}>
        <PhoneVerificationScreen/>
      </I18nextProvider>
  );
}

export default App

const styles = StyleSheet.create({})