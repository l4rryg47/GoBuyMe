import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


export default function MealDetailsScreen({ route, navigation }) {
  const { mealId, mealName, mealPrice, restaurantId, mealImageUrl } = route.params;
  const { addToCart, getCartTotal, getCartItemCount } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Initialize cart total when restaurantId changes
  useEffect(() => {
    setCartTotal(getCartTotal(restaurantId));
    setCartItemCount(getCartItemCount(restaurantId));

    const fetchRestaurant = async () => {
          try {
            const docRef = doc(db, 'restaurants', restaurantId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              setRestaurant(docSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching restaurant:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRestaurant();
  }, [restaurantId]);

  const handleAddToCart = () => {
    addToCart(restaurantId, mealPrice);
    setCartTotal(prev => prev + parseFloat(mealPrice));
    setCartItemCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#FF521B" />
        </Pressable>
        <Text style={styles.locationText}>
          {restaurant?.location || 'Owerri'}
        </Text>
        <Pressable onPress={() => setIsFavorited(!isFavorited)}>
          <MaterialIcons
            name={isFavorited ? 'favorite' : 'favorite-border'}
            size={24}
            color="#FF521B"
          />
        </Pressable>
      </View>
      <View style={styles.restaurantCard}>
      <Image
        source={
          mealImageUrl
            ? { uri: mealImageUrl } // Use the imageUrl from the database
            : require('../assets/placeholder.jpg') // Fallback image
        }
        style={styles.mealImage}
      />
        <Text style={styles.title}>Meal Details</Text>
        <Text style={styles.detail}>ID: {mealId}</Text>
        <Text style={styles.detail}>Name: {mealName}</Text>
        <Text style={styles.detail}>Price: ₦{mealPrice}</Text>
      </View>
      
      <Pressable onPress={handleAddToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCart}>Add to Cart</Text>
      </Pressable>
      
      <Pressable 
        style={styles.cartIcon}
        onPress={() => navigation.navigate('Cart', { restaurantId })}
      >
        <FontAwesome name="shopping-basket" size={42} color="#2e1e0f" />
        <Text style={styles.cartTotal}>
          ₦ {cartTotal.toFixed(2)}
        </Text>
        {cartItemCount > 0 && (
          <View style={styles.cartItemCount}>
            <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
          </View>
        )}
      </Pressable>
      {console.log('Meal Image URL:', mealImageUrl)}
    </View>
  );
}

// Keep your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF521B',
    marginBottom: 16,
  },
  detail: {
    fontSize: 18,
    color: '#2A324B',
    marginBottom: 8,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#A2A79E',
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 90,
    width: 110,
    paddingTop: 10,
  },
  cartTotal: {
    width: 110,
    backgroundColor: '#FF521B',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
    padding: 5,
    textAlign: 'center',
    borderRadiusLeft: 0,
    borderRadiusRight: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cartItemCount: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF521B',
    borderRadius: '50%',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 5,
    backgroundColor: '#FFF9F7',
    padding: 16,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    shadowColor: '#2A324B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#FF521B',
    padding: 16,
    margin: 'auto',
    marginTop: 20,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCart: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});