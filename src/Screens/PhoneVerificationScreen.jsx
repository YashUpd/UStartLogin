import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import PhoneIllustration from '../components/PhoneIllustration';
import CountryPicker from '../components/CountryPicker';
import PhoneInput from '../components/PhoneInput';
import ContinueButton from '../components/ContinueButton';

const PhoneVerificationScreen = () => {
  const {t, i18n} = useTranslation();
  console.log('Current language:', i18n.language);
  const navigation = useNavigation();

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'India',
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const isPhoneValid =
    phoneNumber.trim().length === 10 && /^\d{10}$/.test(phoneNumber.trim());

  const handleContinue = () => {
    // Only called if valid, so no warning needed
    navigation.navigate('VerificationCode', {
      phoneNumber: phoneNumber,
      dialCode: selectedCountry.dialCode,
      countryName: selectedCountry.name,
    });
  };

  const changeLanguage = lng => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng).then(() => {
        setCurrentLanguage(lng); // force re-render
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{flex: 1}} />
        <View style={styles.langTogglePill}>
          <TouchableOpacity
            style={[
              styles.langToggleButton,
              currentLanguage === 'en' && styles.langToggleButtonActive,
              {borderTopLeftRadius: 16, borderBottomLeftRadius: 16},
            ]}
            onPress={() => changeLanguage('en')}>
            <Text
              style={[
                styles.langToggleText,
                currentLanguage === 'en' && styles.langToggleTextActive,
              ]}>
              {t('language_english')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.langToggleButton,
              currentLanguage === 'hi' && styles.langToggleButtonActive,
              {borderTopRightRadius: 16, borderBottomRightRadius: 16},
            ]}
            onPress={() => changeLanguage('hi')}>
            <Text
              style={[
                styles.langToggleText,
                currentLanguage === 'hi' && styles.langToggleTextActive,
              ]}>
              {t('language_hindi')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="always">
        <PhoneIllustration />

        <Text style={styles.title}>{t('verify_number')}</Text>

        <Text style={styles.subtitle}>{t('enter_phone')}</Text>

        <View style={styles.inputContainer}>
          <CountryPicker
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />
          <PhoneInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={t('enter_phone')}
            dialCode={selectedCountry.dialCode}
          />
        </View>

        <Text style={styles.disclaimer}>{t('disclaimer')}</Text>

        <ContinueButton onPress={handleContinue} disabled={!isPhoneValid} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  langTogglePill: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
    marginRight: 16,
    marginTop: 32, // increased from 8 to 32 for better visibility
  },
  langToggleButton: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langToggleButtonActive: {
    backgroundColor: '#1e3a8a',
  },
  langToggleText: {
    color: '#1e3a8a',
    fontWeight: '500',
    fontSize: 12,
  },
  langToggleTextActive: {
    color: '#fff',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 700,
    color: '#0C2353',
    marginTop: 40,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  disclaimer: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
});

export default PhoneVerificationScreen;
