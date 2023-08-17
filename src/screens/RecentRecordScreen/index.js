import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetallOrdersQuery} from '../../ReduxTollKit/Stepney/stepneyUser';
const RecordScreen = () => {
  const {data, error, isLoading} = useGetallOrdersQuery();
  // Sample data for recent rides
  console.log('DATA', JSON.stringify(data), error, isLoading);
  const [recents, setRecents] = React.useState();
  React.useEffect(() => {
    if (data) {
      setRecents(data?.orders);
    }
  }, [data]);

  const [recentRides, setRecentRides] = useState([
    {
      id: '1',
      date: '2023-07-20',
      startLocation: 'Location A',
      endLocation: 'Location B',
      fare: '1500 Rs',
      rating: 4,
      feedback: 'Great ride!',
    },
    {
      id: '2',
      date: '2023-07-18',
      startLocation: 'Location C',
      endLocation: 'Location D',
      fare: '1200 Rs',
      rating: 5,
      feedback: 'Excellent service!',
    },
    {
      id: '3',
      date: '2023-07-16',
      startLocation: 'Location E',
      endLocation: 'Location F',
      fare: '2000 Rs',
      rating: 3,
      feedback: 'Could be better.',
    },
  ]);

  const bounceValue = useRef(new Animated.Value(-100)).current;

  // Reset the animation value and trigger bounce-in animation when the screen gains focus
  useFocusEffect(() => {
    startBounceInAnimation();
    return () => {
      // Cleanup function to reset animation value when the screen loses focus
      bounceValue.setValue(-100);
    };
  });

  const startBounceInAnimation = () => {
    // Start the bounce-in animation
    Animated.timing(bounceValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderStars = rating => {
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <MaterialCommunityIcons key={i} name="star" size={20} color="gold" />,
      );
    }

    if (halfStars > 0) {
      stars.push(
        <MaterialCommunityIcons
          key="half"
          name="star-half"
          size={20}
          color="gold"
        />,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          size={20}
          color="gold"
        />,
      );
    }

    return stars;
  };

  const renderRecentRideItem = ({item}) => {
    const animatedStyle = {
      transform: [{translateX: bounceValue}],
    };

    return (
      <TouchableOpacity onPress={startBounceInAnimation}>
        <Animated.View style={[styles.rideItemContainer, animatedStyle]}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text
            style={styles.locationText}>{`From: ${item.startLocation}`}</Text>
          <Text style={styles.locationText}>{`To: ${item.endLocation}`}</Text>
          <Text style={styles.fareText}>{`Fare: ${item.fare}`}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <View style={styles.starContainer}>{renderStars(item.rating)}</View>
          </View>
          <Text
            style={styles.feedbackText}>{`Feedback: ${item.feedback}`}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/7.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <FlatList
          data={recents}
          renderItem={renderRecentRideItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setRecentRides([])}>
          <Text style={styles.buttonText}>Clear Recent Rides</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  rideItemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  locationText: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  fareText: {
    fontSize: 16,
    color: 'green',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 16,
    color: 'orange',
  },
  feedbackText: {
    fontSize: 16,
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 16,
    color: 'orange',
    marginRight: 4,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 16, // Adjust the width and height as needed for your star icons
    height: 16,
    marginRight: 4,
  },
});

export default RecordScreen;
