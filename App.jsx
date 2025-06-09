import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppNavigator from './src/app/navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </I18nextProvider>
  );
};

export default App;
