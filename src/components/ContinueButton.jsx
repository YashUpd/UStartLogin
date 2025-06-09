import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ContinueButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9ca3af',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8, 
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContinueButton;