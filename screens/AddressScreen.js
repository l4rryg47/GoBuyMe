import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddressScreen({ navigation, route }) {
  const [addresses, setAddresses] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error('User is not authenticated');
          return;
        }

        const userId = user.uid;
        console.log('Fetching addresses for userId:', userId);

        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAddresses(userData.addresses || {});
          const defaultAddress = Object.entries(userData.addresses || {}).find(
            ([, address]) => address.isDefault
          );
          if (defaultAddress) {
            setSelectedAddress({ id: defaultAddress[0], ...defaultAddress[1] });
          }
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle address selection
  const handleSelectAddress = (id) => {
    const updatedAddresses = { ...addresses };
    Object.keys(updatedAddresses).forEach((key) => {
      updatedAddresses[key].isDefault = key === id;
    });
    setAddresses(updatedAddresses);
    setSelectedAddress({ id, ...updatedAddresses[id] });

    // Update Firestore
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updateDoc(doc(db, 'users', user.uid), { addresses: updatedAddresses });
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#FF521B" />
        </Pressable>
      </View>
      <Text style={styles.title}>Choose a delivery location</Text>
      <ScrollView>
        {Object.entries(addresses).map(([id, address]) => (
          <Pressable
            key={id}
            style={styles.addressContainer}
            onPress={() => handleSelectAddress(id)}
          >
            <View style={styles.checkbox}>
              {address.isDefault && <View style={styles.checkboxChecked} />}
            </View>
            <View>
              <Text style={styles.addressText}>{address.street}</Text>
              <Text style={styles.addressText}>
                {address.city}, {address.state}, {address.zipCode}
              </Text>
              <Text style={styles.addressText}>{address.country}</Text>
              {address.landmark && (
                <Text style={styles.addressText}>Landmark: {address.landmark}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        style={styles.nextButton}
        onPress={() => navigation.navigate('VendorList')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF0EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 5,
    backgroundColor: '#FFF9F7',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF521B',
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF521B',
    borderRadius: 4,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    backgroundColor: '#FF521B',
  },
  addressText: {
    fontSize: 16,
    color: '#2A324B',
  },
  nextButton: {
    backgroundColor: '#FF521B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});