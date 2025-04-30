// screens/VendorListScreen.js
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
            {/* Back Button */}
                  <Pressable 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.backButtonText}>← Back</Text>
                  </Pressable>
      <Text style={styles.title}>Confirmation Screen</Text>
      <Text>This screen will show detailed order for confirmation</Text>
      <Text>Address 1:</Text>
      <Text>Address 2:</Text>
      <Pressable onPress={() => navigation.navigate('PaymentOptions')}>
        <Text style={{ color: '#FF521B', fontSize: 18, marginTop: 20 }}>
          Proceed to Payment
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