import React, { useState } from 'react';
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
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RestaurantScreen({ navigation, route }) {
	const [isFavorited, setIsFavorited] = useState(false); // State to track favorite status

	const toggleFavorite = () => {
		setIsFavorited(!isFavorited); // Toggle the favorite state
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<MaterialIcons name="arrow-back" size={24} color="#FF521B" />
				</Pressable>
				<Text style={styles.locationText}>Owerri</Text>
				<View style={{ width: 24 }}>
					<AntDesign name="like1" size={22} color="#FF521B" />
				</View>
			</View>
			<View style={styles.restaurantCard}>
				<View style={styles.restaurantHeader}>
					<Text></Text>
					<Text style={{fontSize: 22}}>Restaurant Name</Text>
					<Pressable onPress={toggleFavorite}>
						<MaterialIcons
							name={isFavorited ? "favorite" : "favorite-border"} // Toggle icon
							size={24}
							color="#FF521B"
						/>
					</Pressable>
				</View>
        <View style={styles.restaurantDetails}>
          <View style={styles.restaurantImageContainer}>
            <Image
              source={require('../assets/restaurants2.jpg')} // Replace with your image URL
              style={{ width: '90%', height: '90%', borderRadius: 8 }}
            />
          </View>
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantInfoBar}>
              <Text style={{ fontSize: 16 }}>Payment Type</Text>
            </View>
            <View style={styles.restaurantInfoBar}>
              <Text style={{ fontSize: 16 }}>Minimum Order Amount</Text>
            </View>
            <View style={styles.restaurantInfoBar}>
              <Text style={{ fontSize: 16 }}>Opening Hours</Text>
            </View>
          </View>
        </View>
        <View style={styles.openingHours}></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// padding: 16,
		backgroundColor: '#FFF9F7',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#FF521B',
		marginBottom: 16,
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 300,
    flexDirection: 'column',
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#606C38',
    height: '20%',
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60%',
    backgroundColor: '#FEFAE0',
  },
  restaurantImageContainer: {
    width: '35%',
    height: '80%',
    backgroundColor: '#FF521B',
    flexdirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantInfo: {
    width: '65%',
    height: '100%',
    backgroundColor: '#91F9E5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  restaurantInfoBar: {
    width: '100%',
    height: '25%',
    backgroundColor: '#EAEFB1',
  },
  openingHours: {
    width: '100%',
    height: '20%',
    backgroundColor: '#FF521B',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  backText: {
    color: '#FF521B',
    fontWeight: 'bold',
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  restaurantImage: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },
  infoText: {
    fontSize: 16,
    width: '60%',
  },
  restaurantInfoBar: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
