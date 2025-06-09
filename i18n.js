// src/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      language_english: 'English',
      language_hindi: 'Hindi',
      verify_number: 'VERIFY YOUR NUMBER',
      enter_phone: 'Please enter your country & your phone number to register',
      error_empty: 'Please enter your phone number',
      error_invalid: 'Please enter a valid phone number',
      verification_sending:
        'Sending verification code to {{dialCode}} {{phoneNumber}}',
      disclaimer:
        'The registered mobile number will be used for ride-related communications. You shall receive an SMS for verification code.',
      verification_code: 'VERIFICATION CODE',
      otp_sent_message:
        'Please wait. We will auto-verify the OTP sent to {{dialCode}} {{phoneNumber}}',
      resend_otp: 'Resend OTP',
      resend_otp_in: 'Resend OTP in',
      seconds: 'seconds',
      otp_incomplete: 'Please enter the complete OTP',
      verification_success: 'Verification successful!',
      otp_resent: 'OTP resent successfully!',
    },
  },
  hi: {
    translation: {
      language_english: 'अंग्रेज़ी',
      language_hindi: 'हिंदी',
      verify_number: 'अपना नंबर सत्यापित करें',
      enter_phone: 'कृपया पंजीकरण के लिए अपना देश और फ़ोन नंबर दर्ज करें',
      error_empty: 'कृपया अपना फ़ोन नंबर दर्ज करें',
      error_invalid: 'कृपया एक मान्य फ़ोन नंबर दर्ज करें',
      verification_sending:
        '{{dialCode}} {{phoneNumber}} पर सत्यापन कोड भेजा जा रहा है',
      disclaimer:
        'पंजीकृत मोबाइल नंबर का उपयोग यात्रा से संबंधित संवाद के लिए किया जाएगा। आपको सत्यापन कोड के लिए एक एसएमएस प्राप्त होगा।',
      verification_code: 'सत्यापन कोड',
      otp_sent_message:
        'कृपया प्रतीक्षा करें। हम {{dialCode}} {{phoneNumber}} पर भेजे गए ओटीपी को स्वचालित रूप से सत्यापित करेंगे',
      resend_otp: 'ओटीपी पुनः भेजें',
      resend_otp_in: 'ओटीपी पुनः भेजें',
      seconds: 'सेकंड',
      otp_incomplete: 'कृपया पूरा ओटीपी दर्ज करें',
      verification_success: 'सत्यापन सफल!',
      otp_resent: 'ओटीपी सफलतापूर्वक पुनः भेजा गया!',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
