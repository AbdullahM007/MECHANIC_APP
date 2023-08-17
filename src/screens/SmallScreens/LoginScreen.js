import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {storeData} from '../../Async/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useUserLogInMutation} from '../../ReduxTollKit/Stepney/stepney';
import {setToken} from '../../ReduxTollKit/Slices/slice';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [
    userLogIn, // This is the mutation trigger
    {data, error, isLoading}, // This is the destructured mutation result
  ] = useUserLogInMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const useData = useSelector(state => state.useData.value);
  console.log('usedetail', useData);
  const handleLogin = () => {
    // storeData('userToken', JSON.stringify('JAMI'));

    userLogIn({
      email: email,
      password: password,
    });
    // Add login logic here using APIs, authentication, etc.
    // For simplicity, we're just navigating to the SignUp screen.
  };
  // console.log('datadata:', data?.token?.access_token);

  React.useEffect(() => {
    if (data && !error) {
      storeData('userToken', data?.token?.access_token);
      console.log('CALLSLogIn');

      dispatch(setToken(true));
      // navigation.navigate('RootNavigator');
    } else if (error) {
      Alert.alert('invalid details');
    }
  }, [data, error]);

  const handleForgotPassword = () => {
    // Add navigation logic for the Forgot Password screen here.
    // For example, you can navigate to a "ForgotPassword" screen.
    navigation.navigate('Forgot');
  };
  console.log('sdkjfksd', JSON.stringify(data), error);
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 150,
          height: 150,
          marginBottom: 20,
          // borderRadius: 300,
          resizeMode: 'cover',
        }}
        // source={require('../assets/Images/electric-car.png')}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000" // Set the placeholder text color to black
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000" // Set the placeholder text color to black
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {isLoading == true ? (
          <ActivityIndicator size="small" color={'#fff'} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}>
        <Text style={[styles.buttonText, {color: 'orange', fontSize: 12}]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000', // Set the text color to black
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#007AFF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  signupButton: {
    width: '90%',
    backgroundColor: '#34C759',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  forgotPasswordButton: {
    width: '90%',
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
