import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const OTPInput = ({value, onChangeText, index}) => {
  const inputRef = useRef(null);

  const handleChangeText = text => {
    // Only allow numeric input and single character
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 1) {
      onChangeText(numericText, index);
    }
  };

  const handleKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace' && !value) {
      // Move to previous input when backspace is pressed on empty field
      if (index > 0) {
        // You might want to implement focus management here
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[styles.input, value ? styles.filledInput : null]}
        value={value}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        keyboardType="numeric"
        maxLength={1}
        textAlign="center"
        selectTextOnFocus
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '600',
    color: '#1e3a8a',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  filledInput: {
    borderColor: '#1e3a8a',
    backgroundColor: '#f8fafc',
  },
});

export default OTPInput;