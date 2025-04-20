import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

// SIMPLE TEST VERSION - we'll add carousel after this works
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={28} color="#FF521B" />
        </Pressable>
        <Text style={styles.logoText}>GoBuyMe</Text>
        <Pressable onPress={() => console.log('Call pressed')}>
          <FontAwesome name="phone" size={24} color="#FF521B" />
        </Pressable>
      </View>

      {/* Simple Content */}
      <View style={styles.content}>
        <Text>Home Screen Content</Text>
      </View>

      {/* New Order Button */}
      <Pressable
        style={styles.newOrderButton}
        onPress={() => navigation.navigate('VendorList')}
      >
        <Text style={styles.buttonText}>New Order</Text>
      </Pressable>
    </View>
  );
}

// Define styles AFTER the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newOrderButton: {
    backgroundColor: '#FF521B',
    padding: 16,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});