import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen/index';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/SmallScreens/LoginScreen';
import SignUpScreen from '../../screens/SmallScreens/SignupScreen';
import EarningsScreen from '../../screens/HomeScreen/EarningsScreen';

const Stack = createStackNavigator();
const HomeNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={"SplashScreen"} component={SplashScreen} /> */}
      {/* <Stack.Screen name={"Intro"} component={Intro}/> */}

      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
      <Stack.Screen name={'EarningsScreen'} component={EarningsScreen} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
