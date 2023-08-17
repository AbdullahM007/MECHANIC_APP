import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  const renderStars = (count, type) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <Text key={i} style={[styles.starIcon, type === 'filled' ? styles.filledStar : styles.emptyStar]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.starRatingContainer}>
      {renderStars(filledStars, 'filled')}
      {halfStar && <Text style={styles.starIcon}>✩</Text>}
      {renderStars(emptyStars, 'empty')}
    </View>
  );
};

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    fontSize: 16,
  },
  filledStar: {
    color: 'orange',
  },
  emptyStar: {
    color: 'grey',
  },
});

export default StarRating;
