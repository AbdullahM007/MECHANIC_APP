import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ForgotScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyEmail = () => {
    // Add logic for verifying email and sending OTP
    // For simplicity, we're not implementing any logic here.
    alert('Email verification request sent.');
  };

  const handleSignUp = () => {
    // Add sign-up logic here using APIs, registration, etc.
    // For simplicity, we're not implementing any logic here.
    alert('Sign-up successful!');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.emailInput}
          placeholder="Email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyEmail}>
          <AntDesign name="check" size={20} color="#fff" />
          <Text style={styles.verifyButtonText}>Verify Email</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        placeholderTextColor={'black'}
        value={otp}
        onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').substring(0, 6))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'black'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={'black'}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emailInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    flexDirection:'row'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#34C759',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotScreen;
