import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeNavigator from './Drawer';
import HomeScreen from '../../screens/HomeScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../../screens/ProfileScreen';
import SettingScreen from '../../screens/SettingScreen';
import RecordScreen from '../../screens/RecentRecordScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const BottomTab = createMaterialBottomTabNavigator();

const RootNavigator = () => {
  return (
    // <NavigationContainer>
    <BottomTab.Navigator
      sceneAnimationEnabled={false}
      barStyle={{backgroundColor: 'black', height: 70}} // Customize the height here
      activeColor="#FF0000"
      inactiveColor="white"
      labeled={true}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator} // Use the HomeNavigator component here
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Recent"
        component={RecordScreen}
        options={{
          tabBarLabel: 'Recent',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="receipt" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => (
            <Feather name="settings" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
    // </NavigationContainer>
  );
};

export default RootNavigator;
