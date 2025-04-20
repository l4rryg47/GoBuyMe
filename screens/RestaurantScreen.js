// screens/RestaurantScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function RestaurantScreen({ route }) {
  // We'll use route.params later for dynamic data
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Details</Text>
      <Text>This will show details for: {route.params?.restaurantName || 'No restaurant'}</Text>
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
    marginBottom: 16,
  },
});