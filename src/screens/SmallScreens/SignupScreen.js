import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSignUpUserMutation} from '../../ReduxTollKit/Stepney/stepney';
import {launchImageLibrary} from 'react-native-image-picker';
import {setLocation, setLocationaccess} from '../../ReduxTollKit/Slices/slice';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [granted, setGranted] = useState(false);
  const location = useSelector(state => state.useData.location);
  console.log('Location: ' + JSON.stringify(location), 'PERMISSIONS', granted);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+92');
  const [Service, setService] = useState('');
  const [city, setCity] = useState('');
  const [value, setValue] = useState(null);
  const [signUpUser, {data, error}] = useSignUpUserMutation();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isfront, setIsfront] = useState(false);
  const navigation = useNavigation();
  const handleSignUp = () => {
    // Add sign-up logic here using APIs, registration, etc.
    // For simplicity, we're not implementing any logic.

    // Example validation: Ensure all required fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !phoneCountryCode ||
      !Service ||
      !city ||
      !front ||
      !back
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    // Example validation: Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    signUpUser({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirm_password: confirmPassword,
      contact: phoneCountryCode + phoneNumber,
      city: city,
      specialization: Service,
      latitude: location?.lat,
      longitude: location?.lon,
      verification_picture1: front,
      verification_picture2: back,
    });
    // Example: Navigate to HomeScreen after successful sign-up
    // navigation.navigate('LoginScreen.js');
  };
  console.log('data', data, JSON.stringify(error));
  const handlePickImage = React.useCallback(async () => {
    const result = await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    setFront(result.assets?.[0]?.base64 || '');
  }, [front]);
  const handlePickImageBack = React.useCallback(async () => {
    const result = await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    setBack(result.assets?.[0]?.base64 || '');
  }, [back]);
  const Services = [
    {label: 'Mechanical', value: 'Mechanic'},
    {label: 'Electrical', value: 'Electrician'},
    {label: 'Car Towing', value: 'Car Tower'},
    // { label: 'Mechanical & Electrical', value: ['Mechanic', 'Electrician'] },
    // { label: 'All Services', value: ['Mechanic', 'Electrician', 'Tower'] },
  ];
  const Cities = [
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Gujranwala', value: 'Gujranwala'},
    {label: 'Gujrat', value: 'Gujrat'},
  ];

  const requestLocationPermission = async () => {
    console.log('TRY');
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          'PermissionsAndroid.RESULTS.GRANTED',
          PermissionsAndroid.RESULTS.GRANTED,
        );
        console.log('PERMISSIONS');
        setGranted(true);
      } else {
        setGranted(false);
        dispatch(setLocationaccess(false));
        Alert.alert('Location permission denied');
      }
    } catch (err) {
      setGranted(false);
      dispatch(setLocationaccess(false));
      // console.warn(err);
      console.log('Erros', err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // getLocation();
      requestLocationPermission();
    }, []),
  );
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('DATA', position);
        // dispatch(
        // setUserLocation({
        //   lat: position.coords.latitude,
        //   lon: position.coords.longitude,
        // }),
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        );
        // );
      },
      error => {
        // See error code charts below.

        console.error('dfdgdg', error.code, error.message);
        dispatch(setLocationaccess(false));
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  }
  console.log('PERMISSIONS', granted);

  useEffect(() => {
    if (granted) {
      getLocation();
    }
  }, [granted]);

  const CountryCodes = [{label: '(+92)', value: '+92'}];
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  useEffect(() => {
    if (data) {
      navigation.navigate('OTPScreen', {email: email});
    }
  }, [data]);

  return (
    <ScrollView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{height: 1224, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={'black'}
          value={firstName}
          onChangeText={text => setFirstName(text.replace(/[^a-zA-Z ]/g, ''))}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={'black'}
          value={lastName}
          onChangeText={text => setLastName(text.replace(/[^a-zA-Z ]/g, ''))}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={'black'}
          // secureTextEntry={true}
          value={address}
          onChangeText={text => setAddress(text)}
        /> */}
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={styles.countryCode}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // data={'+92'}
            maxHeight={300}
            labelField="label"
            placeholderTextColor={'black'}
            // valueField="value"
            // placeholder="Select Country code"
            // placeholderTextColor="black"
            value={phoneCountryCode}
            // onChange={item => {
            //   setPhoneCountryCode(item.value);
            // }}
            // renderItem={renderItem}
          />

          <TextInput
            style={styles.phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={'black'}
            value={phoneNumber}
            onChangeText={text =>
              setPhoneNumber(text.replace(/[^0-9]/g, '').substring(0, 10))
            }
            keyboardType="phone-pad"
          />
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={Services}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Service you can provide"
          searchPlaceholder="Search..."
          placeholderTextColor="black"
          value={Service}
          onChange={item => {
            setService(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={Cities}
          search
          maxHeight={400}
          labelField="label"
          valueField="value"
          placeholder="Select City"
          searchPlaceholder="Search..."
          placeholderTextColor="black"
          value={city}
          onChange={item => {
            setCity(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
        />
        <TouchableOpacity
          style={styles.picUpload}
          onPress={() => {
            handlePickImage();
          }}>
          <Text style={styles.simpleText}>Upload Front CNIC</Text>
        </TouchableOpacity>
        {front && (
          <Image
            source={{
              uri: `data:image/png;base64,${front}`,
            }}
            // source={profilePic}
            style={styles.profilePic}
          />
        )}

        <TouchableOpacity
          style={styles.picUpload}
          onPress={() => {
            handlePickImageBack();
          }}>
          <Text style={styles.simpleText}>Upload Back CNIC</Text>
        </TouchableOpacity>
        {back && (
          <Image
            source={{
              uri: `data:image/png;base64,${back}`,
            }}
            // source={profilePic}
            style={styles.profilePic}
          />
        )}

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    color: 'black',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
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
    marginBottom: 10,
    marginTop: 40,
  },
  signInButton: {
    width: '80%',
    backgroundColor: '#007AFF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  simpleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneInputContainer: {
    borderRadius: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  countryCode: {
    width: '25%',
    borderRadius: 10,
    color: 'black',

    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  phoneNumber: {
    borderRadius: 10,
    width: '70%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  pickerContainer: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: 'black',
  },
  dropdown: {
    margin: 12,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  profilePic: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    marginLeft: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  picUpload: {
    width: '80%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignUpScreen;
