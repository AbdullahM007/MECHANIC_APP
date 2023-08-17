import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EarningsScreen = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [ridesData, setRidesData] = useState([
    { id: '1', date: '2023-08-07', time: '08:30 AM', earnings: 60 },
    { id: '2', date: '2023-08-07', time: '10:15 AM', earnings: 30 },
    { id: '3', date: '2023-08-08', time: '01:45 PM', earnings: 40 },
    { id: '4', date: '2023-08-08', time: '04:20 PM', earnings: 20 },
  ]);

  // Calculate total earnings
  const calculateTotalEarnings = () => {
    let total = 0;
    for (const ride of ridesData) {
      total += ride.earnings;
    }
    setTotalEarnings(total);
  };

  // Call the calculation function initially
  React.useEffect(() => {
    calculateTotalEarnings();
  }, [ridesData]);

  // Render each ride item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.rideInfo}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.earnings}>Rs {item.earnings}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalEarnings}>Total Earnings: Rs {totalEarnings}</Text>
      </View>
      <FlatList
        data={ridesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#64DD17',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalEarnings: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  rideInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
  earnings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default EarningsScreen;
