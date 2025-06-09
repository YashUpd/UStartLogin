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
    backgroundColor: '#0C2353',
    paddingVertical: 11,
    paddingHorizontal: 140,
    borderRadius: 7, 
    width: '100%',
    alignItems: 'center',
    marginTop: 140,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default ContinueButton;