import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
  ScrollView,
	Image,
	ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

export default function RestaurantScreen({ navigation, route }) {
	const { restaurantId } = route.params; // Get ID from navigation
	const [restaurant, setRestaurant] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isFavorited, setIsFavorited] = useState(false);

	// Fetch restaurant data from Firestore
	useEffect(() => {
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

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#FF521B" />
			</View>
		);
	}

	if (!restaurant) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Restaurant not found</Text>
				<Pressable onPress={() => navigation.goBack()}>
					<Text style={styles.backText}>Go Back</Text>
				</Pressable>
			</View>
		);
	}

	const renderTodaysHoursWithStatus = () => {
		if (!restaurant?.openingHours) {
			return (
				<Text style={styles.noHoursText}>Opening hours not available</Text>
			);
		}

		// Day mapping (0=Sunday to 6=Saturday)
		const days = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		];
		const today = days[new Date().getDay()];
		const todaysHours = restaurant.openingHours[today];

		if (!todaysHours) {
			return <Text style={styles.noHoursText}>Closed today</Text>;
		}

		// Get hours in consistent format
		const { openTime, closeTime } =
			typeof todaysHours === 'string'
				? parseTimeString(todaysHours)
				: { openTime: todaysHours.open, closeTime: todaysHours.close };

		// Check if currently open
		const isOpen = checkIfOpen(openTime, closeTime);
		const hoursText = `${openTime} - ${closeTime}`;

		return (
			<View style={styles.hoursContainer}>
				<View style={styles.hoursRow}>
					<Text style={styles.todaysHoursText}>{hoursText}</Text>
					<View
						style={[
							styles.statusIndicator,
							isOpen ? styles.open : styles.closed,
						]}
					>
						<Text style={styles.statusText}>
							{isOpen ? 'OPEN NOW' : 'CLOSED'}
						</Text>
					</View>
				</View>
				<Text style={styles.todaysHoursLabel}>Today's Hours</Text>
			</View>
		);
	};

	// Helper function to parse time strings (e.g., "09:00 AM - 06:00 PM")
	const parseTimeString = (timeRange) => {
		const [open, close] = timeRange.split(' - ');
		return { openTime: open, closeTime: close };
	};

	// Helper function to check current time against opening hours
	const checkIfOpen = (openTime, closeTime) => {
		try {
			const now = new Date();
			const currentHours = now.getHours();
			const currentMinutes = now.getMinutes();

			// Convert opening hours to 24-hour format
			const open = convertTo24Hour(openTime);
			const close = convertTo24Hour(closeTime);

			// Create comparable time values
			const currentTime = currentHours * 60 + currentMinutes;
			const openTimeValue = open.hours * 60 + open.minutes;
			const closeTimeValue = close.hours * 60 + close.minutes;

			return currentTime >= openTimeValue && currentTime <= closeTimeValue;
		} catch {
			return false; // If any parsing fails
		}
	};

	// Convert "09:00 AM" to {hours: 9, minutes: 0}
	const convertTo24Hour = (timeStr) => {
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':').map(Number);

		return {
			hours:
				period === 'PM' && hours !== 12
					? hours + 12
					: period === 'AM' && hours === 12
					? 0
					: hours,
			minutes: minutes || 0,
		};
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<MaterialIcons name="arrow-back" size={24} color="#FF521B" />
				</Pressable>
				<Text style={styles.locationText}>
					{restaurant.location || 'Owerri'}
				</Text>
				<Pressable onPress={() => setIsFavorited(!isFavorited)}>
					<MaterialIcons
						name={isFavorited ? 'favorite' : 'favorite-border'}
						size={24}
						color="#FF521B"
					/>
				</Pressable>
			</View>

      <ScrollView style={styles.scrollContainer}>
			<View style={styles.restaurantCard}>
				<View style={styles.restaurantHeader}>
					<Text style={styles.restaurantName}>{restaurant.name}</Text>
				</View>

				<View style={styles.restaurantDetails}>
					<View style={styles.restaurantImageContainer}>
						<Image
							source={
								restaurant.imageUrl
									? { uri: restaurant.imageUrl }
									: require('../assets/placeholder.jpg')
							}
							style={styles.restaurantImage}
						/>
					</View>

					<View style={styles.restaurantInfo}>
						<View style={styles.restaurantInfoBar}>
							<Text style={styles.infoLabel}>Payment:</Text>
							<Text style={styles.infoText}>
								{restaurant.paymentMethods?.join(', ') || 'Cash, Card'}
							</Text>
						</View>

						<View style={styles.restaurantInfoBar}>
							<Text style={styles.infoLabel}>Delivery Time:</Text>
							<Text style={styles.infoText}>
								{restaurant.deliveryTime || '20-30 mins'}
							</Text>
						</View>

						<View style={styles.restaurantInfoBar}>
							<Text style={styles.infoLabel}>Min. Order:</Text>
							<Text style={styles.infoText}>
								₦{restaurant.minimumOrderAmount || '10'}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.openingHours}>
					<Text style={styles.sectionTitle}>Opening Hours</Text>
					{renderTodaysHoursWithStatus()}
				</View>
			</View>
			<View style={styles.menuDisplay}>
        <Text style={styles.menuHeader}>Customer Favorites</Text>
      </View>
      <ScrollView>
        
      </ScrollView>
      </ScrollView>
		</View>
	);
}

// Keep your existing styles (add/modify as needed)

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
  scrollContainer: {
    flex: 1,
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    shadowColor: '#2A324B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
	restaurantHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 16,
		height: '15%',
	},
	restaurantDetails: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '60%',
	},
	restaurantImageContainer: {
		width: '35%',
		height: '80%',
		flexdirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	restaurantInfo: {
		width: '65%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	restaurantInfoBar: {
		width: '100%',
		height: '25%',
	},
	openingHours: {
		paddingLeft: 16,
		paddingBottom: 16,
		backgroundColor: '#FFF',
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
		color: '#FF521B',
	},
	restaurantImage: {
		width: '100%',
		height: '100%',
		borderRadius: 8,
	},
	infoLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		width: '40%',
    color: '#2A324B',
	},
	infoText: {
		fontSize: 16,
		width: '60%',
    color: '#2A324B',
	},
	restaurantInfoBar: {
		width: '100%',
		height: '25%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#FF521B',
	},
	hoursContainer: {
		gap: 4,
	},
	hoursRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	todaysHoursText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#2A324B',
	},
	todaysHoursLabel: {
		fontSize: 14,
		color: '#2A324B',
	},
	statusIndicator: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
	},
	open: {
		backgroundColor: '#4CAF50',
	},
	closed: {
		backgroundColor: '#F44336',
	},
	statusText: {
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold',
	},
	noHoursText: {
		fontStyle: 'italic',
		color: '#777',
	},
  menuDisplay: {
    backgroundColor: '#EDEDF4',
    padding: 10,
    paddingLeft: 16,
    marginBottom: 16,
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A324B',
  },
});
