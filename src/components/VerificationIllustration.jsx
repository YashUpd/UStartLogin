import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const VerificationIllustration = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/VerificationIllustration.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 232,
    height: 232,
  },
});

export default VerificationIllustration;
