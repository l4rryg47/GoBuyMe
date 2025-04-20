import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace('Login');
  }, 3000);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>GoBuyMe</Text>
      <Text style={styles.subtitle}>Food delivered at your command!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});