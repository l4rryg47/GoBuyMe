// screens/VendorListScreen.js
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function PaymentOptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
            {/* Back Button */}
                  <Pressable 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.backButtonText}>← Back</Text>
                  </Pressable>
      <Text style={styles.title}>Payment Screen</Text>
      <Text>This screen will show payment options</Text>
      <Text>Card</Text>
      <Text>Cash</Text>
      <Text>Transfer</Text>
      <Text>Wallet</Text>
      <Text>Cash on Delivery</Text>
      
      <Pressable onPress={() => navigation.navigate('Confirmation')}>
        <Text style={{ color: '#FF521B', fontSize: 18, marginTop: 20 }}>
          Proceed
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF9F7',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF521B',
    marginBottom: 16,
  },
});