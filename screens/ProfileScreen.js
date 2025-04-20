import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { auth } from '../firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setName(docSnap.data().name || '');
        setPhone(docSnap.data().phone || '');
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name,
        phone
      });
      setIsEditing(false);
      setUserData({ ...userData, name, phone });
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <View style={styles.profileHeader}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.profileInfo}>
        {isEditing ? (
          <>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />

            <Text style={styles.label}>Phone:</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />

            <Pressable 
              style={[styles.button, { backgroundColor: '#4ECDC4' }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData?.name || 'Not set'}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{auth.currentUser?.email}</Text>

            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData?.phone || 'Not set'}</Text>

            <Pressable 
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
          </>
        )}
      </View>

      <Pressable 
        style={[styles.button, { backgroundColor: '#FF521B' }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF521B',
  },
  profileHeader: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
    marginTop: 15,
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF521B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});