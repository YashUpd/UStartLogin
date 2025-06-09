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
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    const numeric = value.replace(/[^0-9]/g, '');
    if (numeric.length === 0) {
      // If deleting, update and focus previous
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
      return;
    }
    if (numeric.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = numeric;
      setOtp(newOtp);
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    } else if (numeric.length > 1) {
      // Paste or fast typing: fill all
      const arr = numeric.split('').slice(0, 4);
      setOtp(arr.concat(Array(4 - arr.length).fill('')));
      if (arr.length < 4) {
        inputRefs[arr.length].current.focus();
      } else {
        inputRefs[3].current.blur();
      }
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

  const [_, forceRerender] = useState(0);

  const changeLanguage = lng => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng).then(() => {
        forceRerender(x => x + 1); // force re-render
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.langToggleRow}>
        <View style={{flex: 1}} />
        <View style={styles.langTogglePill}>
          <TouchableOpacity
            style={[
              styles.langToggleButton,
              i18n.language === 'en' && styles.langToggleButtonActive,
              {borderTopLeftRadius: 16, borderBottomLeftRadius: 16},
            ]}
            onPress={() => changeLanguage('en')}>
            <Text
              style={[
                styles.langToggleText,
                i18n.language === 'en' && styles.langToggleTextActive,
              ]}>
              {t('language_english')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.langToggleButton,
              i18n.language === 'hi' && styles.langToggleButtonActive,
              {borderTopRightRadius: 16, borderBottomRightRadius: 16},
            ]}
            onPress={() => changeLanguage('hi')}>
            <Text
              style={[
                styles.langToggleText,
                i18n.language === 'hi' && styles.langToggleTextActive,
              ]}>
              {t('language_hindi')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
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
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[styles.otpInput, digit ? styles.filledInput : null]}
              value={digit}
              onChangeText={value => handleOTPChange(value, index)}
              keyboardType="numeric"
              maxLength={index === 0 ? 4 : 1}
              textAlign="center"
              selectTextOnFocus
              blurOnSubmit={false}
              onFocus={() => {
                // Only focus, do not call .select()
                inputRefs[index].current && inputRefs[index].current.focus();
              }}
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

        <ContinueButton onPress={handleContinue} style={{marginTop: 110}} />
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
  langToggleRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    marginBottom: -16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  langTogglePill: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
    marginRight: 16,
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
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '600',
    color: '#1e3a8a',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 4,
  },
  filledInput: {
    borderColor: '#1e3a8a',
    backgroundColor: '#f8fafc',
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
