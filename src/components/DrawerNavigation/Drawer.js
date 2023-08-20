import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen/index';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/SmallScreens/LoginScreen';
import SignUpScreen from '../../screens/SmallScreens/SignupScreen';
import EarningsScreen from '../../screens/HomeScreen/EarningsScreen';
import OTPScreen from '../../screens/SmallScreens/OtpScreen';
import ForgotScreen from '../../screens/SmallScreens/ForgotScreen';
import {useDispatch, useSelector} from 'react-redux';
import {getStorageData} from '../../Async/AsyncStorage';
import RootNavigator from './RootNavigator';
import {setToken} from '../../ReduxTollKit/Slices/slice';
const Stack = createStackNavigator();
const HomeNavigator = props => {
  const dispatch = useDispatch();
  const useToken = useSelector(state => state.useData.userToken);

  const [staySignIn, setStaySignIn] = React.useState(['']);
  const handleStack = async () => {
    const userToken = await getStorageData('userToken');
    if (userToken !== null) {
      console.log('CALLS');
      dispatch(setToken(true));
    }
    // console.log(userToken);
    setStaySignIn(userToken);
  };
  React.useEffect(() => {
    handleStack();
  }, [staySignIn]);
  console.log('userTome', useToken);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={"SplashScreen"} component={SplashScreen} /> */}
      {/* <Stack.Screen name={"Intro"} component={Intro}/> */}

      {/* <Stack.Screen name={'Home'} component={HomeScreen} /> */}
      {!useToken ? (
        <Stack.Group>
          <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
          <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
          <Stack.Screen name={'OTPScreen'} component={OTPScreen} />
          <Stack.Screen name={'ForgotScreen'} component={ForgotScreen} />
          <Stack.Screen name={'EarningsScreen'} component={EarningsScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={'RootNavigator'} component={RootNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export default HomeNavigator;
