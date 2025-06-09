// src/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      language_english: 'English',
      language_hindi: 'Hindi',
      verify_number: 'Verify Your Number',
      enter_phone: 'Please enter your country & your phone number to register',
      error_empty: 'Please enter your phone number',
      error_invalid: 'Please enter a valid phone number',
      verification_sending: 'Sending verification code to {{dialCode}} {{phoneNumber}}',
      disclaimer:
        'The registered mobile number will be used for ride-related communications. You shall receive an SMS for verification code.',
    },
  },
  hi: {
    translation: {
      language_english: 'अंग्रेज़ी',
      language_hindi: 'हिंदी',
      verify_number: 'अपना नंबर सत्यापित करें',
      enter_phone: 'पंजीकरण के लिए कृपया अपना देश और फ़ोन नंबर दर्ज करें',
      error_empty: 'कृपया अपना फ़ोन नंबर दर्ज करें',
      error_invalid: 'कृपया एक मान्य फ़ोन नंबर दर्ज करें',
      verification_sending: '{{dialCode}} {{phoneNumber}} पर सत्यापन कोड भेजा जा रहा है',
      disclaimer:
        'पंजीकृत मोबाइल नंबर का उपयोग सवारी से संबंधित संचार के लिए किया जाएगा। आपको सत्यापन कोड के लिए एक एसएमएस प्राप्त होगा।',
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
