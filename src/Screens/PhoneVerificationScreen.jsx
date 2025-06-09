import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import PhoneIllustration from '../components/PhoneIllustration';
import CountryPicker from '../components/CountryPicker';
import PhoneInput from '../components/PhoneInput';
import ContinueButton from '../components/ContinueButton';

const PhoneVerificationScreen = ({navigation}) => {
  const { t, i18n } = useTranslation();

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'India',
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', t('error_empty'));
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', t('error_invalid'));
      return;
    }

    navigation.navigate('VerificationCode', {
      phoneNumber: phoneNumber,
      dialCode: selectedCountry.dialCode,
      countryName: selectedCountry.name,
    });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        {/* Back button for navigation */}
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.header}>
            <TouchableOpacity
              style={[
                styles.languageText,
                currentLanguage === 'en' && styles.activeLanguage,
              ]}
              onPress={() => changeLanguage('en')}>
              <Text
                style={[
                  styles.languageLabel,
                  currentLanguage === 'en' && styles.activeText,
                ]}>
                {t('language_english')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageHindi,
                currentLanguage === 'hi' && styles.activeLanguage,
              ]}
              onPress={() => changeLanguage('hi')}>
              <Text
                style={[
                  styles.languageLabel,
                  currentLanguage === 'hi' && styles.activeText,
                ]}>
                {t('language_hindi')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <PhoneIllustration />

        <Text style={styles.title}>{t('verify_number')}</Text>

        <Text style={styles.subtitle}>
          {t('enter_phone')}
        </Text>

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

        <Text style={styles.disclaimer}>
          {t('disclaimer')}
        </Text>

        <ContinueButton onPress={handleContinue} />
      </View>
    </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
  },
  languageText: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  languageHindi: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  activeLanguage: {
    backgroundColor: '#1e3a8a',
  },
  languageLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeText: {
    color: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginTop: 40,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
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