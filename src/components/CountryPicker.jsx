import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';

const countries = [
  {name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳'},
  {name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸'},
  {name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧'},
  {name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦'},
  {name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺'},
  {name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪'},
  {name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷'},
  {name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵'},
  {name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳'},
  {name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷'},
];

const CountryPicker = ({selectedCountry, onCountrySelect}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchText.toLowerCase()) ||
    country.dialCode.includes(searchText)
  );

  const selectCountry = country => {
    onCountrySelect(country);
    setModalVisible(false);
    setSearchText('');
  };

  const renderCountryItem = ({item}) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => selectCountry(item)}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.dialCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search country or dial code"
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />

            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={item => item.code}
              style={styles.countriesList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    width: 80,
  },
  flag: {
    fontSize: 20,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 20,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  countriesList: {
    paddingHorizontal: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 15,
  },
  dialCode: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default CountryPicker;