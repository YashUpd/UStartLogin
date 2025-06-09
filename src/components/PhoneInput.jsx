import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const PhoneInput = ({ value, onChangeText, placeholder, dialCode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dialCodeContainer}>
        <Text style={styles.dialCodeText}>{dialCode || '+91'}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChangeText}
        maxLength={15}
        editable={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  dialCodeContainer: {
    marginRight: 8,
  },
  dialCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
});

export default PhoneInput;
