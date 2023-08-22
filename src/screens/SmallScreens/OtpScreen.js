import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useOtpConfirmationMutation } from '../../ReduxTollKit/Stepney/stepney';
import { useNavigation } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import { useDispatch } from 'react-redux';
import { storeData } from '../Async/AsyncStorage';

const OTPScreen = ({ route }) => {
  const dispatch = useDispatch();
  const [
    otpConfirmation, // This is the mutation trigger
    { data, error, isLoading: isUpdating }, // This is the destructured mutation result
  ] = useOtpConfirmationMutation();
  const navigation = useNavigation();
  const [otp, setOtp] = useState(0);
  const phoneNumber = route?.params?.phNo;

  const handleVerifyOTP = () => {
    if (otp) {
      otpConfirmation({ contact: phoneNumber, otp: parseInt(otp) });
    }
    // Implement the logic for verifying the OTP here
    console.log('Verifying OTP:', otp);
    // Add your logic to validate the OTP and navigate to the next screen if it's correct
  };

  // Define the success modal state and visibility
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  React.useEffect(() => {
    if (data) {
      // Show the success modal when OTP is successfully verified
      setIsSuccessModalVisible(true);
    } else if (error) {
      Alert.alert('', 'Invalid OTP');
    }
  }, [data, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={{ height: 100 }}>
        <OtpInputs
          handleChange={(code) => setOtp(code)}
          numberOfInputs={6}
          inputStyles={styles.otpInputStyles}
        />
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Your Information is submitted and will soon be verified by our Team support.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsSuccessModalVisible(false);
                navigation.navigate('NextScreen'); // Navigate to the next screen after verification
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles ...

  otpInputStyles: {
    height: 60,
    width: 50,
    borderWidth: 2,
    color: '#0A0A0A',
    marginEnd: 10,
    borderRadius: 10,
    fontSize: 26,
    borderColor: 'rgba(10, 10, 10, 0.2)',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
