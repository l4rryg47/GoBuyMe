import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import OptionsScreen from './screens/OptionsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import VendorListScreen from './screens/VendorListScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ResetPasswordSuccessScreen from './screens/ResetPasswordSuccessScreen';
import SplashScreen from './screens/SplashScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';
import AddressScreen from './screens/AddressScreen';
import ChatScreen from './screens/ChatScreen';
import Cart from './screens/Cart';
import FavoritesScreen from './screens/FavoritesScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false // This hides the default stack header
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccessScreen} />
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="VendorList" component={VendorListScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
}

// function OptionsStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="OptionsMain" component={OptionsScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
      
//     </Stack.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#FF6B6B', // Optional: active item color
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        
        <Stack.Screen name="My Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}