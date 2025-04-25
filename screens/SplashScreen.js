import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace('Login');
  }, 5000);

  return (
    <ImageBackground
      source={require('../assets/platter.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>GoBuyMe</Text>
      <Text style={styles.subtitle}>Food delivered at your command!</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  subtitle: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 10,
  },
});