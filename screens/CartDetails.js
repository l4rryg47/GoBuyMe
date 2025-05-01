import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useCart } from './CartContext';

export default function CartDetails({ route, navigation }) {
  const { restaurantId } = route.params;
  const { restaurantCarts } = useCart();
  const cart = restaurantCarts[restaurantId] || { total: 0, items: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.items.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>₦{item.price.toFixed(2)}</Text>
        </View>
      ))}
      <Pressable style={{ padding: 10, backgroundColor: '#FF521B', borderRadius: 5 }} onPress={() => navigation.navigate('Address')}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Proceed to Checkout
        </Text>
      </Pressable>
      <Text style={styles.total}>Total: ₦{cart.total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF9F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF521B',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDF4',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF521B',
    marginTop: 20,
  }
});