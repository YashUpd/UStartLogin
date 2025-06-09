import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ContinueButton = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0C2353',
    paddingVertical: 11,
    paddingHorizontal: 140,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    marginTop: 140,
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default ContinueButton;
