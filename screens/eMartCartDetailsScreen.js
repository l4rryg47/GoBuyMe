import React from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
} from 'react-native';

function eMartCartDetailsScreen({ navigation, route }) {
	// Expecting cartItems as an array of { name, imgUrl, price, size, quantity }
	const cartItems = route?.params?.cartItems || [];
	const [cartItemsState, setCartItemsState] = React.useState(cartItems);

	const total = cartItemsState.reduce(
		(sum, item) =>
			sum + parseFloat(item.price) * (parseInt(item.quantity, 10) || 0),
		0
	);

	const removeFromCart = (index) => {
    setCartItemsState(prev => prev.filter((_, i) => i !== index));
};

	const renderCartItem = ({ item, index }) => (
		<View style={styles.cartItem}>
			<Image
				source={
					item.imgUrl
						? { uri: item.imgUrl }
						: require('../assets/placeholder.jpg')
				}
				style={styles.cartImage}
			/>
			<View style={styles.cartDetails}>
				<Text style={styles.cartName}>{item.name}</Text>
				<Text style={styles.cartSize}>{item.size}</Text>
				<Text style={styles.cartPrice}>
					₦{item.price} x {item.quantity}
				</Text>
			</View>
			<View style={styles.delete}>
				<Pressable onPress={() => removeFromCart(index)}>
					<Text style={styles.deleteText}>Remove from cart</Text>
				</Pressable>
				<Text style={styles.cartItemTotal}>
				₦
				{(
					parseFloat(item.price) * (parseInt(item.quantity, 10) || 0)
				).toLocaleString()}
			</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>My Basket</Text>
			<FlatList
				data={cartItemsState}
				renderItem={renderCartItem}
				keyExtractor={(item, idx) => item.name + idx}
				contentContainerStyle={{ paddingBottom: 24 }}
				ListEmptyComponent={
					<Text style={{ textAlign: 'center', color: '#aaa', marginTop: 24 }}>
						Your cart is empty.
					</Text>
				}
			/>
			<View style={styles.summary}>
				<Text style={styles.totalLabel}>Total:</Text>
				<Text style={styles.totalValue}>₦{total.toLocaleString()}</Text>
			</View>
			<View style={styles.buttons}>
				<Pressable
					style={styles.checkoutButton}
					onPress={() => navigation.goBack()}
				>
					<Text style={styles.checkoutText}>Continue Shopping</Text>
				</Pressable>
				<Pressable
					style={styles.checkoutButton2}
					onPress={() => {
						/* handle checkout */
					}}
				>
					<Text style={styles.checkoutText}>Proceed to Checkout</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF0EB',
		padding: 16,
	},
	header: {
		fontSize: 18,
		// fontWeight: 'bold',
		color: '#FF521B',
		marginBottom: 16,
		textAlign: 'center',
		marginTop: 40,
	},
	cartItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: 10,
		padding: 12,
		marginBottom: 10,
		elevation: 1,
	},
	cartImage: {
		width: 54,
		height: 54,
		borderRadius: 8,
		marginRight: 12,
		backgroundColor: '#F0F0F0',
	},
	cartDetails: {
		flex: 1,
	},
	cartName: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#0B3948',
	},
	cartSize: {
		fontSize: 13,
		color: '#888',
		marginVertical: 2,
	},
	cartPrice: {
		fontSize: 13,
		color: '#FF521B',
	},
	cartItemTotal: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FF521B',
		marginLeft: 10,
	},
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
		paddingVertical: 12,
		borderTopWidth: 1,
		borderColor: '#eee',
	},
	totalLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#0B3948',
	},
	totalValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#FF521B',
	},
	checkoutButton: {
		backgroundColor: '#00b2ca',
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 8,
		alignItems: 'center',
		marginTop: 12,
	},
		checkoutButton2: {
		backgroundColor: '#21A179',
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 8,
		alignItems: 'center',
		marginTop: 12,
	},
	checkoutText: {
		color: '#fff',
		fontSize: 16,
	},
  buttons: {
    flexDirection: 'row',
	justifyContent: 'space-between'
  },
  delete: {
	height: 60,
	flexDirection: 'column',
	justifyContent: 'space-between',
	// backgroundColor: 'grey',
	alignItems: 'flex-end'
  },
  deleteText: {
	fontSize: 12
  }
});

export default eMartCartDetailsScreen;
