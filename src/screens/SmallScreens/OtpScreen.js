import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useOtpConfirmationMutation} from '../../ReduxTollKit/Stepney/stepney';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {useDispatch} from 'react-redux';
import {storeData} from '../Async/AsyncStorage';
const OTPScreen = ({route}) => {
  const dispatch = useDispatch();
  const [
    otpConfirmation, // This is the mutation trigger
    {data, error, isLoading: isUpdating}, // This is the destructured mutation result
  ] = useOtpConfirmationMutation();
  const navigation = useNavigation();
  const [otp, setOtp] = useState(0);
  const phoneNumber = route?.params?.phNo;
  const handleOTPChange = text => {
    // Remove non-numeric characters from the input
    const numericOTP = text.replace(/[^0-9]/g, '');

    // Add two spaces after every digit
    const formattedOTP = numericOTP.replace(/(\d)(?=\d)/g, '$1  ');

    // Set the updated OTP value
    setOtp(formattedOTP);
  };

  const handleBackspace = () => {
    // Remove the last digit and spaces (if any) when the backspace is pressed
    setOtp(prevOtp => prevOtp.replace(/\d?\s?$/, ''));
  };

  const handleVerifyOTP = () => {
    if (otp) {
      otpConfirmation({contact: phoneNumber, otp: parseInt(otp)});
    }
    // Implement the logic for verifying the OTP here
    console.log('Verifying OTP:', otp);
    // Add your logic to validate the OTP and navigate to the next screen if it's correct
  };
  React.useEffect(() => {
    if (data) {
      // storeData('userToken', JSON.stringify(data?.token?.access_token));
      // dispatch(setToken());
      // navigation.navigate('RootNavigator');
    } else {
      Alert.alert('', 'Invalid otp');
    }
  }, [data, error]);
  console.log('DFASDFASD', data, error, otp);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={{height: 100}}>
        <OtpInputs
          handleChange={code => setOtp(code)}
          numberOfInputs={6}
          inputStyles={{
            height: 60,
            width: 50,
            borderWidth: 2,
            color: '#0A0A0A',
            marginEnd: 10,
            borderRadius: 10,
            fontSize: 26,
            borderColor: 'rgba(10, 10, 10, 0.2)',
          }}
          // style={{backgroundColor: 'green'}}
        />
      </View>
      {/* <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={10} // Considering there will be 6 digits and 7 spaces (e.g., "1  2  3  4  5  6")
          value={otp}
          onChangeText={handleOTPChange}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace();
            }
          }}
        />
      </View> */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    color: 'black',
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 18,
    width: 150, // Adjust the width as needed
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
