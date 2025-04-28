import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MealDetailsScreen({ route }) {
  const { mealId, mealName, mealPrice } = route.params; // Retrieve passed parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Details</Text>
      <Text style={styles.detail}>ID: {mealId}</Text>
      <Text style={styles.detail}>Name: {mealName}</Text>
      <Text style={styles.detail}>Price: ₦{mealPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF9F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF521B',
    marginBottom: 16,
  },
  detail: {
    fontSize: 18,
    color: '#2A324B',
    marginBottom: 8,
  },
});