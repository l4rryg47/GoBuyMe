import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login'); // Redirect to login screen after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Default drawer items */}
      {props.state.routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate(route.name)}
        >
          <Text style={styles.drawerText}>{route.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout button at the bottom */}
      <TouchableOpacity
        style={[styles.drawerItem, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={[styles.drawerText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 'auto', // Pushes to bottom
    backgroundColor: '#f8f8f8',
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;