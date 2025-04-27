import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure you have this configured

// Calculate grid item width based on screen width
const { width } = Dimensions.get('window');
const itemSize = (width - 32 - 16) / 3; // 32=padding, 16=gap

// Dummy meal data - replace with Firestore data later
const dummyMeals = [
  { id: '1', name: 'Jollof Rice', image: require('../assets/meal1.jpg') },
  { id: '2', name: 'Pounded Yam', image: require('../assets/meal2.jpg') },
  { id: '3', name: 'Fried Rice', image: require('../assets/meal3.jpg') },
  { id: '4', name: 'Egusi Soup', image: require('../assets/meal4.jpg') },
  { id: '5', name: 'Pepper Soup', image: require('../assets/meal5.jpg') },
  { id: '6', name: 'Suya', image: require('../assets/meal6.jpg') },
  { id: '7', name: 'Moi Moi', image: require('../assets/meal7.jpg') },
  { id: '8', name: 'Akara', image: require('../assets/meal8.jpg') },
  { id: '9', name: 'Amala', image: require('../assets/meal9.jpg') },
  { id: '10', name: 'Moi Moi', image: require('../assets/meal7.jpg') },
  { id: '11', name: 'Akara', image: require('../assets/meal8.jpg') },
  { id: '12', name: 'Amala', image: require('../assets/meal9.jpg') },
  { id: '13', name: 'Moi Moi', image: require('../assets/meal7.jpg') },
  { id: '14', name: 'Akara', image: require('../assets/meal8.jpg') },
  { id: '15', name: 'Amala', image: require('../assets/meal9.jpg') },
];

export default function VendorListScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [mealSearch, setMealSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [meals, setMeals] = useState([]); // New state for meals
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch restaurants
        const restaurantsSnapshot = await getDocs(collection(db, 'restaurants'));
        const restaurantsData = restaurantsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Fetch meals (only name and imageUrl)
        const mealsSnapshot = await getDocs(collection(db, 'meals'));
        const mealsData = mealsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
          restaurantId: doc.data().restaurantId // Keep reference if needed
        }));
        
        setRestaurants(restaurantsData);
        setMeals(mealsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter meals based on search
  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(mealSearch.toLowerCase())
  );

  // Render each meal item (updated for Firestore URLs)
  const renderMealItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/placeholder.jpg')} 
        style={styles.mealImage} 
      />
      <Text style={styles.mealName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  // Filter restaurants based on search
  const filteredRestaurants = restaurants.filter(restaurant => {
    const cuisine = String(restaurant.cuisine || '').toLowerCase(); // Handles all cases
    const name = String(restaurant.name || '').toLowerCase();
    const searchTerm = restaurantSearch.toLowerCase().trim();
  
    return (
      name.includes(searchTerm) || 
      cuisine.includes(searchTerm)
    );
  });

  // Render each restaurant item
  const renderRestaurantItem = ({ item }) => (
    <Pressable 
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
    >
      <Image 
        source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/placeholder.jpg')} 
        style={styles.restaurantImage} 
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine || 'Various cuisines'}</Text>
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
          </View>
          <Text style={styles.deliveryTime}>{item.deliveryTime || 'Time not specified'}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF521B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error loading restaurants: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#FF521B" />
        </Pressable>
        <Text style={styles.locationText}>Owerri</Text>
        <View style={{ width: 24 }}>
          <AntDesign name="like1" size={22} color="#FF521B" />
        </View>
      </View>

      {/* Tab Headers */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'restaurants' && styles.activeTab
          ]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'restaurants' && styles.activeTabText
          ]}>
            Restaurants
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'meals' && styles.activeTab
          ]}
          onPress={() => setActiveTab('meals')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'meals' && styles.activeTabText
          ]}>
            Meals
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'restaurants' ? (
          <View>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#777" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search restaurants..."
                value={restaurantSearch}
                onChangeText={setRestaurantSearch}
              />
            </View>
            {/* Restaurant list content */}
            <FlatList
              data={filteredRestaurants}
              renderItem={renderRestaurantItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.restaurantList}
              key="restaurant-list" // Unique key for this list
            />
          </View>
        ) : (
          <View>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#777" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search meals..."
                value={mealSearch}
                onChangeText={setMealSearch}
              />
            </View>
            
            {/* Meals Grid */}
            <FlatList
              data={filteredMeals}
              renderItem={renderMealItem}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.mealRow}
              contentContainerStyle={styles.mealGrid}
              key="meal-grid" // Unique key for this list
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F7',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
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
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF521B',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#FF521B',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 45,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  // Meal Grid Styles
  mealGrid: {
    paddingBottom: 20,
  },
  mealRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealItem: {
    width: itemSize,
    alignItems: 'center',
  },
  mealImage: {
    width: itemSize - 10,
    height: itemSize - 10,
    borderRadius: 8,
    backgroundColor: '#eee', // Fallback if image missing
  },
  mealName: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    width: itemSize - 10,
  },
  
  // Restaurant List Styles
  restaurantList: {
    paddingBottom: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    flex: 1,
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#FF521B',
  },
});