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
import CartDetails from './screens/CartDetails';
import FavoritesScreen from './screens/FavoritesScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Cards from './screens/Cards';
import OffersScreen from './screens/OffersScreen';
import MealCardScreen from './screens/MealCardScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import PaymentOptionsScreen from './screens/PaymentOptionsScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
      <Stack.Screen name="MealCard" component={MealCardScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Cart" component={CartDetails} />
      <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
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
          drawerInactiveTintColor: '#555',
          drawerLabelStyle: {
            marginLeft: 5,
            fontSize: 15,
            fontWeight: '500',
          },
          drawerStyle: {
            width: 300,
          },
          drawerItemStyle: {
            borderRadius: 8,
            paddingLeft: 5,
          },
          drawerIconContainerStyle: {
            marginRight: -20,  // This creates space between icon and text
            marginLeft: 10,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="home" size={22} color={color} />
            ),
          }}/>        
        <Stack.Screen name="My Profile" component={ProfileScreen} options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="person" size={22} color={color} />
            ),
          }} />
        <Stack.Screen name="My Addresses" component={AddressScreen} options={{
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="location-dot" size={20} color={color} />
            ),
          }} />
        <Stack.Screen name="My Payment Cards" component={Cards} options={{
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="money-bill" size={20} color={color} />
            ),
          }} />
        <Stack.Screen name="Awoof Packages" component={OffersScreen} options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="local-offer" size={20} color={color} />
            ),
          }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={20} color={color} />
            ),
          }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}