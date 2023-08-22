import {
  View,
  Text,
  Dimensions,
  Pressable,
  PermissionsAndroid,
  Alert,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {
  useOrderResponceMutation,
  useSetDeviceTokenMutation,
  useGetcurrentOrderQuery,
  useGetUserByIdQuery,
} from '../../ReduxTollKit/Stepney/stepneyUser';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewOrderPopUp from '../../components/NewOrderPopUp';
import {
  useGetallOrdersQuery,
  useUpdateLocationMutation,
} from '../../ReduxTollKit/Stepney/stepneyUser';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useUserStatusMutation} from '../../ReduxTollKit/Stepney/stepney';
import Geolocation from '@react-native-community/geolocation';
import {setLocationaccess, setLocation} from '../../ReduxTollKit/Slices/slice';

const origin = {latitude: 32.239815, longitude: 74.19445};
const destination = {latitude: 32.187691, longitude: 74.19445};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8';

const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [setDeviceToken, {data: setdeviceToken, error, TokenError}] =
    useSetDeviceTokenMutation();
  const [userStatus, {data: userStatue, error: isErros}] =
    useUserStatusMutation();
  const {data: allOrder, error: orderError} = useGetallOrdersQuery();
  const [custumerId, setCustumerId] = useState(null);
  const {data: usebyId, error: userError} = useGetUserByIdQuery({
    id: custumerId,
  });
  const UserId = useSelector(state => state.useData.userId);

  // console.log(JSON.stringify(allOrder), orderError);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateLocation, {data: updateUserLocation, error: locationError}] =
    useUpdateLocationMutation();
  const {data: currentOrder, error: currentOrderError} =
    useGetcurrentOrderQuery({id: UserId});
  console.log('USERID', UserId);
  console.log('currentOrder', currentOrder, JSON.stringify(currentOrderError));
  // console.log('userStatue', userStatue, isErros);
  const location = useSelector(state => state.useData.location);
  const [granted, setGranted] = useState(false);
  const navigateToEarningsScreen = () => {
    navigation.navigate('EarningsScreen');
  };
  console.log('location', location, 'updateLocation', updateUserLocation);
  const [notificationToken, setNotificationToken] = useState('');
  const [
    orderResponce,
    {data: responseData, error: responceError, isLoading: responceLoading},
  ] = useOrderResponceMutation();
  console.log('useGetUserByIdQuery', usebyId);
  console.log('responseData', responseData, responceError, responceLoading);
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: 0,
    type: 'Mechanic',

    originLatitude: 32.239803,
    origeinLongitude: 74.149197,

    destLatitude: 32.244493,
    destLongitude: 74.153164,

    user: {
      rating: 4.8,
      name: 'Hamza',
    },
  });
  const handleReject = item => {
    orderResponce({
      customer_id: item?.data?.customer,
      mechanic_id: UserId,
      mechanic_response: false,
    });
  };
  const handleAccept = item => {
    console.log('item,item', item?.data?.customer);
    setCustumerId(item?.data?.customer);
    orderResponce({
      customer_id: item?.data?.customer,
      mechanic_id: UserId,
      mechanic_response: true,
    });
  };
  useEffect(() => {
    // Iterate through the orders
    if (currentOrder) {
      // allOrder.orders.forEach(order => {
      if (
        currentOrder?.data?.status === 'pending' &&
        responceLoading === false
      ) {
        Alert.alert(
          'Confirm Action',
          'Do you want to accept or reject this order?',
          [
            {
              text: 'Reject',
              style: 'destructive',
              onPress: () => handleReject(currentOrder),
            },
            {
              text: 'Accept',
              onPress: () => handleAccept(currentOrder),
            },
          ],
        );
      } else if (
        currentOrder?.data?.status === 'accepted' &&
        responceLoading === false
      ) {
        setCustumerId(currentOrder?.data?.customer);
      }
      // });
    }
  }, [currentOrder]);
  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          'PermissionsAndroid.RESULTS.GRANTED',
          PermissionsAndroid.RESULTS.GRANTED,
        );
        handleListners();

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
  useEffect(() => {
    requestLocationPermission();
  }, []);
  console.log('LOCATION PERMISSION ERROR', location);
  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('DATA', position);
        // dispatch(
        // setUserLocation({
        //   lat: position.coords.latitude,
        //   lon: position.coords.longitude,
        // }),
        updateLocation({
          id: UserId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
  useEffect(() => {
    if (granted) {
      getLocation();
    }
  }, [granted]);
  const onDecline = () => {
    orderResponce({
      customer_id: 7,
      mechanic_id: UserId,
      mechanic_response: true,
    });
    setNewOrder(null);
  };

  const onAccept = newOrder => {
    orderResponce({
      customer_id: 7,
      mechanic_id: UserId,
      mechanic_response: true,
    });
    setOrder(newOrder);
    setNewOrder(null);
  };

  const onGoPress = () => {
    userStatus({id: parseInt(UserId)});
    setIsOnline(!isOnline);
  };
  const onUserLocationChange = event => {
    setMyPosition(event.nativeEvent.coordinate);
  };
  const onDirectionFound = event => {
    // console.log('Direction found: ', event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };
  const destinationLoc = {
    latitude: usebyId?.destLatitude,
    longitude: usebyId?.destLongitude,
  };
  const getDestination = () => {
    if (usebyId) {
      return {
        latitude: usebyId.destLatitude,
        longitude: usebyId.destLongitude,
      };
    }
    return {latitude: usebyId.destLatitude, longitude: usebyId.destLongitude};
  };

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#43A047',
              width: 200,
              height: 50,
              justifyContent: 'center',
              padding: 15,
              marginTop: 22,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Car is Fixed or Towed
            </Text>
          </View>
          <Text style={styles.bottomText}>{order.user.name} 's Car</Text>
        </View>
      );
    }
    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              paddingTop: 5,
            }}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min </Text>
            <View
              style={{
                backgroundColor: '#f00000',
                marginHorizontal: 10,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'lightgrey'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km </Text>
          </View>
          <Text style={styles.bottomText}>
            Fixing or Towing the car {order.user.name} 's Car
          </Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              paddingTop: 5,
            }}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min </Text>
            <View
              style={{
                backgroundColor: '#48d42a',
                marginHorizontal: 10,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'lightgrey'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km </Text>
          </View>
          <Text style={styles.bottomText}>
            Going to Repair {order.user.name} 's Car
          </Text>
        </View>
      );
    }
    if (isOnline) {
      return <Text style={styles.bottomText}>You will Online</Text>;
    }
    return <Text style={styles.bottomText}>You will Offline</Text>;
  };

  useEffect(() => {
    if (!notificationToken) return;
    SendNotificationstoServer();
  }, [notificationToken]);
  const SendNotificationstoServer = useCallback(() => {
    messaging()
      .getToken()
      .then(deviceToken =>
        setDeviceToken({
          id: UserId,
          device_token: deviceToken,
        }),
      );
  }, [notificationToken]);
  async function handleListners() {
    await PushNotification.configure({
      onRegister: function (token) {
        setNotificationToken(token?.token);
      },
      onNotification: function (notification: any) {
        const idd = notification.data;
        // dispatch(setShowRedIocn(true));
        if (notification?.data?.type === 'message') {
          // dispatch(setShowMessageRedIcon(true));
        }
        try {
          if (notification?.userInteraction) {
            if (notification?.data?.type === 'message') {
              navigation.navigate('ChatList');
            } else {
              navigation.navigate('IncomingNotifications');
            }
            // navigation.navigate("IncomingNotifications")
          }
          // else if ()
        } catch (err) {
          console.log('error while handling action', err);
        }
      },
    });

    // for foreground msg listner
    messaging().onMessage(async (remoteMessage: any) => {
      // console.log('Notification push arrived', remoteMessage);
      PushNotification.localNotification({
        channelId: 'custom_sound',
      });
    });
    // app opened from background state
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      // console.log('Notification push opened app', remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Notification push setBackgroun', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
        }
      });
  }

  // const pushNoti = async () => {
  //   const status = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.NOTIFICATIONS,
  //   );

  //   if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //     // Permission granted, you can call handleListeners here
  //     handleListners();
  //   } else {
  //     // Permission denied or not granted
  //     console.log('Notification permission denied');
  //   }
  // };
  // useEffect(() => {
  //   pushNoti();
  // }, []);

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 170}}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        // onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon,
          }}
        />
        {true && (
          <MapViewDirections
            origin={myPosition}
            // onReady={onDirectionFound}
            destination={getDestination}
            strokeWidth={5}
            strokeColor="black"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
      </MapView>

      <Pressable
        onPress={navigateToEarningsScreen}
        style={[styles.balanceButton]}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>RS</Text> 1000.00
        </Text>
      </Pressable>

      {/* <Pressable onPress={() => console.warn('Hey') } 
  style={[styles.roundButton, {top:10,left:10}  ]} >

  <Entypo name={"menu"} size={24} color='black' />

  </Pressable> */}

      {/* <Pressable onPress={() => console.warn('Hey') } 
  style={[styles.roundButton, {top:10,right:10}  ]} >

  <Entypo name={"menu"} size={24} color='black' />

  </Pressable> */}

      {/* <Pressable onPress={() => console.warn('Hey') } 
  style={[styles.roundButton, {bottom:110,left:10}  ]} >

  <Entypo name={"menu"} size={24} color='black' />

  </Pressable> */}

      {/* <Pressable onPress={() => console.warn('Hey') } 
  style={[styles.roundButton, {bottom:110,right:10}  ]} >

  <Entypo name={"menu"} size={24} color='black' />

  </Pressable> */}

      <Pressable onPress={onGoPress} style={[styles.goButton]}>
        <Text style={styles.goText}> {isOnline ? 'GO' : 'END'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        {/* <Ionicon name={"options"} size={30} color='rgb(255,0,89)' /> */}

        {renderBottomTitle()}

        {/* <Entypo name={"menu"} size={30} color='rgb(255,0,89)'/> */}
      </View>
      {/* 
      {newOrder && (
        <NewOrderPopUp
          newOrder={newOrder}
          duration={2}
          distance={0.2}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )} */}
    </View>
  );
};
export default HomeScreen;
