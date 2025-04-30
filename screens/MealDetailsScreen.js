import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Cart from './CartDetails';

export default function MealDetailsScreen({ route, navigation }) {
  const { mealId, mealName, mealPrice } = route.params; // Retrieve passed parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Details</Text>
      <Text style={styles.detail}>ID: {mealId}</Text>
      <Text style={styles.detail}>Name: {mealName}</Text>
      <Text style={styles.detail}>Price: ₦{mealPrice}</Text>
      <Pressable>
        <Text style={styles.detail}>Add to Cart</Text>
      </Pressable>
      <Pressable 
      style={styles.cartIcon}
      onPress={() => navigation.navigate(Cart)}
      >
        <FontAwesome name="shopping-basket" size={36} color="green" />
        <Text style={styles.cartTotal}>
          ₦ 0.00
        </Text>
      </Pressable>
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
  cartIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FAC9B8',
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 90,
    width: 80,
    paddingTop: 10,
  },
  cartTotal: {
    width: 80,
    backgroundColor: 'red',
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
    padding: 5,
    textAlign: 'center',
    borderRadiusLeft: 0,
    borderRadiusRight: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },  
});