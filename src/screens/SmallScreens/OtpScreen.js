import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');

  const handleOTPChange = (text) => {
    // Remove non-numeric characters from the input
    const numericOTP = text.replace(/[^0-9]/g, '');

    // Add two spaces after every digit
    const formattedOTP = numericOTP.replace(/(\d)(?=\d)/g, '$1  ');

    // Set the updated OTP value
    setOtp(formattedOTP);
  };

  const handleBackspace = () => {
    // Remove the last digit and spaces (if any) when the backspace is pressed
    setOtp((prevOtp) => prevOtp.replace(/\d?\s?$/, ''));
  };

  const handleVerifyOTP = () => {
    // Implement the logic for verifying the OTP here
    console.log('Verifying OTP:', otp);
    // Add your logic to validate the OTP and navigate to the next screen if it's correct
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={13} // Considering there will be 6 digits and 7 spaces (e.g., "1  2  3  4  5  6")
          value={otp}
          onChangeText={handleOTPChange}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace();
            }
          }}
        />
      </View>
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
    backgroundColor: 'black'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    color: 'white',
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
