import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import {setToken} from '../../ReduxTollKit/Slices/slice';
import {removeStorageData} from '../../Async/AsyncStorage';
import {useDispatch} from 'react-redux';
const LanguageOptions = ({selectedLanguage, onChangeLanguage}) => {
  return (
    <View style={styles.languageContainer}>
      <Text style={styles.languageText}>Language:</Text>
      <View style={styles.languageButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedLanguage,
          ]}
          onPress={() => onChangeLanguage('en')}>
          <Text
            style={[
              styles.languageButtonText,
              selectedLanguage === 'en' && styles.selectedLanguageText,
            ]}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'ur' && styles.selectedLanguage,
          ]}
          onPress={() => onChangeLanguage('ur')}>
          <Text
            style={[
              styles.languageButtonText,
              selectedLanguage === 'ur' && styles.selectedLanguageText,
            ]}>
            Urdu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log('DON');
    await removeStorageData('userToken');
    dispatch(setToken(false));
  };

  const handleChangeLanguage = language => {
    // Implement your language change logic here
    // You can use a localization library like i18n to handle multiple languages.
    setSelectedLanguage(language);
    console.log(`Language changed to ${language}`);
  };

  const handleAboutPress = () => {
    setShowCompanyDetails(true);
  };

  const handleCloseModal = () => {
    setShowCompanyDetails(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/8.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Language Options */}
        <LanguageOptions
          selectedLanguage={selectedLanguage}
          onChangeLanguage={handleChangeLanguage}
        />

        {/* About Button */}
        <TouchableOpacity style={styles.aboutButton} onPress={handleAboutPress}>
          <Text style={styles.aboutButtonText}>About</Text>
        </TouchableOpacity>

        {/* Company Details Modal */}
        <Modal visible={showCompanyDetails} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.aboutText}>Company Details:</Text>
              <Text style={styles.aboutDetails}>
                Stepney
                {'\n'}Address: Uog Hafiz Hayat , Gujranwala/Gujrat
                {'\n'}Contact: +123456789
              </Text>
              <Button title="Close" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button title="Log Out" onPress={() => handleLogout()} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    // paddingRight:84
  },
  languageText: {
    fontSize: 16,
    marginRight: 10,
    padding: 20,
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: 'transparent',
  },
  selectedLanguage: {
    backgroundColor: '#007BFF',
  },
  languageButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  selectedLanguageText: {
    color: '#fff',
  },
  aboutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  aboutText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  aboutDetails: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20, // You can adjust the bottom value as per your layout requirements
  },
});

export default SettingScreen;
