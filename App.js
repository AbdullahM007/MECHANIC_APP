import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/components/DrawerNavigation/RootNavigator';
import SignUpScreen from './src/screens/SmallScreens/SignupScreen';
import {Provider} from 'react-redux';
import {store} from './src/ReduxTollKit/store';
import HomeNavigator from './src/components/DrawerNavigation/Drawer';

const App = () => {
  const [isSignup, setIsSignup] = useState(false);

  // Function to handle user login
  const handleSignUp = () => {
    // Perform the login logic here, and if successful, set isLoggedIn to true
    setIsSignup(true);
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={'default'} />
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          {/* {isSignup ? (
          <RootNavigator />
        ) : (
          <SignUpScreen onSignup={() => handleSignUp()} />
        )} */}
          {/* <HomeNavigator /> */}
          <RootNavigator />
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
