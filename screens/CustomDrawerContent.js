import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>GoBuyMe</Text>
      </View>

      {/* Scrollable Content */}
      <View style={styles.scrollContainer}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>

      {/* Fixed Footer with Sign Out */}
      <View style={styles.footer}>
        <Pressable 
          style={styles.logoutButton}
          onPress={() => console.log('Logout pressed')}
        >
          <MaterialIcons name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  scrollContainer: {
    flex: 1,  // Takes all available space between header and footer
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF6B6B',
  },
});

export default CustomDrawerContent;