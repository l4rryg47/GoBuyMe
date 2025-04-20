import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


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

      {/* Image and Address Container */}
      <View style={styles.imageAddressContainer}>
        {/* Image Content */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/burger-deal.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Address Section */}
        <Pressable 
          onPress={() => navigation.navigate('Address')}
          style={styles.addressContainer}
        >
          <View style={styles.addressContent}>
            <FontAwesome6 name="location-dot" size={24} color="black" />
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressText}>123 Main St, City, State</Text>
              <Text style={styles.addressText}>123-456-7890</Text>
            </View>
          </View>
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
        {/* New Order Button */}
      <Pressable
        style={styles.newOrderButton}
        onPress={() => navigation.navigate('VendorList')}
      >
        <Text style={styles.buttonText}>New Order</Text>
      </Pressable>
      </View>
      <Pressable style={styles.menuContainer}
        onPress={() => navigation.navigate('Chat')}>
        <View style={styles.menuContent}>
        <Entypo name="chat" size={24} color="#FF521B" />
        <Text>Chat with us</Text>
        </View>
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.menuContainer}
        onPress={() => navigation.navigate('Cart')}>
        <View style={styles.menuContent}>
        <FontAwesome name="shopping-basket" size={24} color="#FF521B" />
        <Text>My Basket</Text>
        </View>
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.menuContainer}
        onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.menuContent}>
        <AntDesign name="like1" size={24} color="#FF521B" />
        <Text>My Favorites</Text>
        </View>
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.menuContainer}
        onPress={() => navigation.navigate('OrderHistory')}>
        <View style={styles.menuContent}>
        <Feather name="list" size={24} color="#FF521B" />
        <Text>My Order History</Text>
        </View>
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
      <View style={{padding: 5}}></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDFD5',
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
  imageAddressContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 300, // Fixed height for image
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: 'black',
  },
  newOrderButton: {
    backgroundColor: '#FF521B',
    padding: 16,
    margin: 'auto',
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
});