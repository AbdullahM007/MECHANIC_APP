import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NewOrderPopUp = ({newOrder, onAccept, onDecline, distance, duration}) => {
  return (
    <View style={styles.root}>
      <Text
        style={{
          color: 'green',
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 120,
          alignSelf: 'center',
        }}>
        You have been Place the new Order
      </Text>
      <Pressable style={styles.declineButton} onPress={onDecline}>
        <Text style={styles.declineText}>Decline</Text>
      </Pressable>

      <Pressable onPress={onAccept} style={styles.popUpContainer}>
        <Text style={styles.declineText}>Accept</Text>

        {/* <View style={styles.row}>

        <Text style={styles.serviceType}>{newOrder.type}</Text>
        <View style={styles.userBg}>
            <FontAwesome name={"user"} color={"lightgrey"} size={30}/>
        </View>
        <Text style={styles.serviceType}>
            <AntDesign name={"star"}  size={18}/>
            {newOrder.user.rating}
            </Text>
            </View>
            <Text style={styles.minutes}>{duration} min,</Text>
            <Text style={styles.distance}>{distance} Km</Text> */}
      </Pressable>
    </View>
  );
};
export default NewOrderPopUp;
