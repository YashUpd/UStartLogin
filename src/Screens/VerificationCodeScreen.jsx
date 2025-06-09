import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';

// Components
import VerificationIllustration from '../components/VerificationIllustration';
import OTPInput from '../components/OTPInput';
import ContinueButton from '../components/ContinueButton';

const VerificationCodeScreen = ({route}) => {
  const {t, i18n} = useTranslation();
  const {phoneNumber, dialCode} = route?.params || {
    phoneNumber: '9XXXXXXXX',
    dialCode: '+91',
  };

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      // Focus next input (you might need refs for this)
    }
  };

  const handleContinue = () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      Alert.alert('Error', t('otp_incomplete'));
      return;
    }

    // Simulate verification
    Alert.alert('Success', t('verification_success'));
  };

  const handleResendOTP = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '']);
      Alert.alert('Success', t('otp_resent'));
    }
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
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

        <VerificationIllustration />

        <Text style={styles.title}>{t('verification_code')}</Text>

        <Text style={styles.subtitle}>
          {t('otp_sent_message', {
            dialCode,
            phoneNumber,
          })}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <OTPInput
              key={index}
              value={digit}
              onChangeText={value => handleOTPChange(value, index)}
              index={index}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          {!canResend ? (
            <Text style={styles.timerText}>
              {t('resend_otp_in')} {timer} {t('seconds')}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.resendText}>{t('resend_otp')}</Text>
            </TouchableOpacity>
          )}
        </View>

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
  header: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 40,
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
    color: '#0C2353',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 32,
  },
  resendContainer: {
    marginBottom: 40,
  },
  timerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default VerificationCodeScreen;