import {View, Text,Dimensions,Pressable} from 'react-native';
import React ,{useEffect, useState} from 'react';
import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from  "react-native-vector-icons/FontAwesome";
import NewOrderPopUp from '../../components/NewOrderPopUp';
import { useNavigation } from '@react-navigation/native';


const origin = {latitude: 32.239815, longitude: 74.194450};
const destination = {latitude: 32.187691, longitude: 74.194450};
const GOOGLE_MAPS_APIKEY='AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8'




const HomeScreen = (props) => {

  const navigation = useNavigation();

  // Function to navigate to EarningsScreen
  const navigateToEarningsScreen = () => {
    navigation.navigate('EarningsScreen');
  };
  const [isOnline,setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder,setNewOrder] = useState ( { 
    id:0,
    type:'Mechanic',

    originLatitude:32.239803,
    origeinLongitude:74.149197,

    destLatitude:32.244493,
    destLongitude:74.153164,

    user:{
      rating:4.8,
      name:'Hamza',
    }

  }  )

  const onDecline = () => {
    setNewOrder(null);
  }

  const onAccept = (newOrder) => {
    setOrder(newOrder);
    setNewOrder(null);
  };


  const onGoPress = () =>{ 
    setIsOnline (!isOnline); 
  }
  const onUserLocationChange=(event) =>{
   setMyPosition(event.nativeEvent.coordinate);
  }
  const onDirectionFound =(event)=>{
    console.log("Direction found: " , event);
    if(order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      })
    }
  }
  const getDestination =() =>{
    if(order &&  order.pickedUp){
      return{
        latitude: order.destLatitude,
            longitude: order.destLongitude,
      }
    }
    return{
            latitude: order.originLatitude,
            longitude: order.origeinLongitude,
           }
  }
  
  

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems:'center'}}>
  
          <View style={{flexDirection:'row',alignItems:'center',backgroundColor:"#43A047",width:200,height:50,justifyContent:'center' ,padding:15,marginTop:22 }}>
            
          <Text style={{color:"white",fontWeight:'bold',fontSize:15}} >Car is Fixed or Towed</Text>
          </View>
              <Text style={styles.bottomText}>{order.user.name} 's Car</Text> 
            
        </View>
      )}
    if (order && order.pickedUp) {
      return (
        <View style={{alignItems:'center'}}>
  
          <View style={{flexDirection:'row',alignItems:'center',paddingBottom:15,paddingTop:5 }}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min </Text>
          <View style={{backgroundColor:'#f00000',marginHorizontal:10, width:40, height:40,alignItems:'center',justifyContent:'center', borderRadius:20}}>
              <FontAwesome name={"user"} color={"lightgrey"} size={20}/>
          </View>
          <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km </Text>
          </View>
              <Text style={styles.bottomText}>Fixing or Towing the car {order.user.name} 's Car</Text> 
            
        </View>
      )}

    if (order) {
    return (
      <View style={{alignItems:'center'}}>

        <View style={{flexDirection:'row',alignItems:'center',paddingBottom:15,paddingTop:5 }}>
          <Text>{order.duration ? order.duration.toFixed(1) : '?'} min </Text>
        <View style={{backgroundColor:'#48d42a',marginHorizontal:10, width:40, height:40,alignItems:'center',justifyContent:'center', borderRadius:20}}>
            <FontAwesome name={"user"} color={"lightgrey"} size={20}/>
        </View>
        <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km </Text>
        </View>
            <Text style={styles.bottomText}>Going to Repair {order.user.name} 's Car</Text> 
          
      </View>
    )}
    if (isOnline) {
      return ( <Text style={styles.bottomText}>You're Online</Text> 
      ) }
    return (<Text style={styles.bottomText}>You're Offline</Text>);
  }
  
  return (
    <View>
        
      <MapView
      style={{width:'100%',height:Dimensions.get('window').height - 170}}
  
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      onUserLocationChange={onUserLocationChange}
      initialRegion={{
        latitude: 32.24469,
        longitude: 74.149092,
             latitudeDelta: 0.015,
             longitudeDelta: 0.0121,
  }}
  >
    {order &&(
     <MapViewDirections
     origin={myPosition}
     onReady={onDirectionFound}
     destination={getDestination()}
     strokeWidth={5}
     strokeColor='black'
     apikey={GOOGLE_MAPS_APIKEY}
   />
    )}

  
  </MapView>

 < Pressable onPress={navigateToEarningsScreen} style={[styles.balanceButton]}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'green' }}>RS</Text>
          {' '}
          1000.00
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

  <Pressable onPress={onGoPress}
  style={[styles.goButton,  ]} >

  <Text style={styles.goText}> { isOnline? 'End' : 'GO' }</Text>

  </Pressable>

  


  <View style={styles.bottomContainer}>

    {/* <Ionicon name={"options"} size={30} color='rgb(255,0,89)' /> */}
    
    {renderBottomTitle()}

    {/* <Entypo name={"menu"} size={30} color='rgb(255,0,89)'/> */}

  </View>

  {newOrder && (<NewOrderPopUp 
  
     newOrder={newOrder}
     duration={2}
    distance={0.2}
     onDecline={onDecline}
     onAccept={() => onAccept(newOrder) }
                        />) }

    </View>
  );
};
export default HomeScreen;
