import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	Image,
	FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import logoImg from '../assets/logo.png';
const PLACEHOLDER_IMAGE = require('../assets/placeholder.jpg'); // Use your placeholder image path

function EmartScreen({ navigation }) {
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<MaterialIcons name="arrow-back" size={24} color="#FF521B" />
				</Pressable>
				<Text style={styles.locationText}>eMart</Text>
				<View style={{ width: 24 }} />
			</View>

			{/* Store Card */}
			<View style={styles.emartCard}>
				<View style={styles.cardContainer}>
					<Image
						style={styles.storeImageContainer}
						source={logoImg}
						resizeMode="contain"
					/>
					<View style={styles.storeDetails}>
						<View>
							<Text style={styles.emartInfoTitle}>Payment: </Text>
							<Text style={styles.emartInfDesc}>
								Bank Transfer, Cards and Cash on Delivery
							</Text>
						</View>
						<View>
							<Text style={styles.emartInfoTitle}>Average Delivery Time: </Text>
							<Text style={styles.emartInfDesc}>45mins</Text>
						</View>
						<View>
							<Text style={styles.emartInfoTitle}>Minimum Order Amount: </Text>
							<Text style={styles.emartInfDesc}>N3000</Text>
						</View>
					</View>
				</View>
				<View>
					<Text style={styles.openingHours}>Opening Hours</Text>
					{/* REnder opening hours here */}
				</View>
			</View>
			<View style={styles.searchContainer}>
				<MaterialIcons
					name="search"
					size={20}
					color="#777"
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search eMart..."
				/>
			</View>

			{/* Categories Grid */}
			<View></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF0EB',
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
	emartCard: {
		// justifyContent: 'space-between',
		alignItems: 'start',
		padding: 16,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#F0F0F0',
	},
	storeImageContainer: {
		width: '40%',
		aspectRatio: 1,
	},
	storeDetails: {
		width: '60%',
		justifyContent: 'space-between',
	},
	cardContainer: {
		width: '100%',
		flexDirection: 'row',
		padding: 8,
	},
	openingHours: {
		fontWeight: 'bold',
	},
	emartInfoTitle: {
		fontWeight: 'bold',
	},
	emartInfDesc: {
		fontStyle: 'italic',
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
});

export default EmartScreen;
