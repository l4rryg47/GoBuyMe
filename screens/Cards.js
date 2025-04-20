// screens/VendorListScreen.js
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Cards({ navigation }) {
  return (
    <View style={styles.container}>
            {/* Back Button */}
                  <Pressable 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.backButtonText}>← Back</Text>
                  </Pressable>
      <Text style={styles.title}>Customer Support Screen</Text>
      <Text>This screen will show chat with customer support</Text>
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