import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {useOtpConfirmationMutation} from '../../ReduxTollKit/Stepney/stepney';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {useDispatch} from 'react-redux';
import {storeData} from '../Async/AsyncStorage';

const OTPScreen = ({route}) => {
  const dispatch = useDispatch();
  const [otpConfirmation, {data, error, isLoading: isUpdating}] =
    useOtpConfirmationMutation();
  const navigation = useNavigation();
  const [otp, setOtp] = useState();
  const email = route?.params?.email;
  console.log('email', email);
  const handleVerifyOTP = () => {
    if (otp) {
      otpConfirmation({email: email, otp: parseInt(otp)});
    }
    console.log('Verifying OTP:', otp);
  };

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  React.useEffect(() => {
    if (data) {
      setIsSuccessModalVisible(true);
    } else if (error) {
      Alert.alert('', 'Invalid OTP');
    }
  }, [data, error]);
  console.log('JSON.stringify(error)', JSON.stringify(error));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <OtpInputs
        handleChange={code => setOtp(code)}
        numberOfInputs={6}
        inputStyles={styles.otpInputStyles}
        keyboardType="number-pad"
        secureTextEntry
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSuccessModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Your information is submitted and will soon be verified by our
              support team.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsSuccessModalVisible(false);
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text color
  },
  otpInputStyles: {
    height: 60,
    width: 50,
    borderWidth: 2,
    color: '#333', // Dark gray text color
    marginEnd: 10,
    borderRadius: 10,
    fontSize: 26,
    borderColor: 'rgba(10, 10, 10, 0.2)',
    backgroundColor: '#fff', // White background for inputs
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
    color: '#333', // Dark gray text color
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
