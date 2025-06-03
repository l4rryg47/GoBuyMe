import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Modal,
	TextInput,
	FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ConfirmationScreen({ navigation, route }) {
	const [addresses, setAddresses] = useState([]);
	const [defaultAddress, setDefaultAddress] = useState(null);
	const [showAddressesModal, setShowAddressesModal] = useState(false);
	const [showAddAddressModal, setShowAddAddressModal] = useState(false);
	const [form, setForm] = useState({
		street: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		landmark: '',
		isDefault: false,
	});
	const [loading, setLoading] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState('');

	const user = getAuth().currentUser;

	const paymentOptions = [
		{ key: 'bank', label: 'Bank Transfer' },
		{ key: 'cash', label: 'Cash on Delivery' },
		{ key: 'card', label: 'Card' },
	];

	const fetchAddresses = async () => {
		try {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) {
				console.error('User is not authenticated');
				return;
			}
			const userId = user.uid;
			const userDoc = await getDoc(doc(db, 'users', userId));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				const addressesMap = userData.addresses || {};
				// Convert map to array
				const addressArray = Object.keys(addressesMap).map((key) => ({
					...addressesMap[key],
					id: key,
				}));
				setAddresses(addressArray);
			} else {
				setAddresses([]);
			}
		} catch (error) {
			console.error('Error fetching addresses:', error);
			setAddresses([]);
		}
	};

	useEffect(() => {
		const fetchDefaultAddress = async () => {
			try {
				const auth = getAuth();
				const user = auth.currentUser;

				if (!user) {
					console.error('User is not authenticated');
					return;
				}

				const userId = user.uid;
				const userDoc = await getDoc(doc(db, 'users', userId));

				if (userDoc.exists()) {
					const userData = userDoc.data();
					const addresses = userData.addresses || {};

					// Find the default address
					const defaultAddressEntry = Object.entries(addresses).find(
						([, address]) => address.isDefault
					);

					if (defaultAddressEntry) {
						const [id, address] = defaultAddressEntry;
						setDefaultAddress({ id, ...address });
					}
				} else {
					console.error('User document does not exist');
				}
			} catch (error) {
				console.error('Error fetching default address:', error);
			}
		};

		fetchDefaultAddress();
	}, []);

	const Checkbox = ({ value, onValueChange, color }) => (
		<Pressable
			onPress={() => onValueChange(!value)}
			style={{
				width: 22,
				height: 22,
				borderWidth: 2,
				borderColor: color || '#FF521B',
				borderRadius: 4,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: value ? color || '#FF521B' : '#fff',
			}}
		>
			{value ? <MaterialIcons name="check" size={18} color="#fff" /> : null}
		</Pressable>
	);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<MaterialIcons name="arrow-back" size={24} color="#FF521B" />
				</Pressable>
				<Text style={styles.locationText}>Address and Billing</Text>
				<View style={{ width: 24 }} />
			</View>
			<View style={{ backgroundColor: 'white', margin: 16, borderRadius: 4, padding: 16, elevation: 1 }}>
  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Cart Items</Text>
  {Array.isArray(route?.params?.cartItems) && route.params.cartItems.length > 0 ? (
    <>
      {route.params.cartItems.map((item, idx) => (
        <View key={item.id || item.name + idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ fontSize: 15 }}>{item.name} x {item.quantity}</Text>
          <Text style={{ fontSize: 15 }}>₦{(parseFloat(item.price) * (parseInt(item.quantity, 10) || 0)).toLocaleString()}</Text>
        </View>
      ))}
      <View style={{ borderTopWidth: 1, borderTopColor: '#eee', marginTop: 8, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          ₦
          {route.params.cartItems
            .reduce(
              (sum, item) =>
                sum + parseFloat(item.price) * (parseInt(item.quantity, 10) || 0),
              0
            )
            .toLocaleString()}
        </Text>
      </View>
    </>
  ) : (
    <Text style={{ color: '#aaa' }}>Your cart is empty.</Text>
  )}
</View>
			<View style={styles.deliveryAddress}>
				<Text style={styles.addressHeader}>Delivery Address</Text>
				{defaultAddress ? (
					<>
						<Text style={styles.addressText}>{defaultAddress.street}</Text>
						<Text style={styles.addressText}>
							{defaultAddress.city}, {defaultAddress.state},{' '}
							{defaultAddress.zipCode}
						</Text>
						<Text style={styles.addressText}>{defaultAddress.country}</Text>
					</>
				) : (
					<Text style={styles.addressText}>No default address set</Text>
				)}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Pressable
						onPress={() => {
							fetchAddresses();
							setShowAddressesModal(true);
						}}
						style={{ marginTop: 10 }}
					>
						<Text style={{ color: '#21A179' }}>My Addresses</Text>
					</Pressable>
					<Pressable
						onPress={() => setShowAddAddressModal(true)}
						style={{ marginTop: 10 }}
					>
						<Text style={{ color: '#FF521B' }}>Add New Delivery Address</Text>
					</Pressable>
				</View>
				<Modal visible={showAddressesModal} animationType="slide" transparent>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							{/* X Close Icon at top right */}
							<Pressable
								onPress={() => setShowAddressesModal(false)}
								style={{
									position: 'absolute',
									top: 10,
									right: 10,
									zIndex: 10,
									padding: 4,
								}}
							>
								<MaterialIcons name="close" size={24} color="#FF521B" />
							</Pressable>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 16,
									marginBottom: 8,
									textAlign: 'center',
								}}
							>
								My Addresses
							</Text>
							<FlatList
								data={addresses}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<Pressable
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											marginVertical: 4,
										}}
										onPress={() => {
											setDefaultAddress(item);
											setShowAddressesModal(false);
										}}
									>
										<Checkbox
											value={defaultAddress?.id === item.id}
											onValueChange={() => {
												setDefaultAddress(item);
												setShowAddressesModal(false);
											}}
											color="#FF521B"
										/>
										<Text style={{ marginLeft: 8 }}>
											{item.street?.slice(0, 10) +
												(item.street?.length > 10 ? '...' : '')}
										</Text>
										{item.isDefault && (
											<Text style={{ color: '#21A179', marginLeft: 8 }}>
												(Default)
											</Text>
										)}
									</Pressable>
								)}
								ListEmptyComponent={
									<Text style={{ color: '#aaa', marginVertical: 8 }}>
										No addresses found.
									</Text>
								}
								style={{ maxHeight: 180, marginBottom: 12 }}
							/>
						</View>
					</View>
				</Modal>
				<Modal visible={showAddAddressModal} animationType="slide" transparent>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							<Text
								style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}
							>
								Add New Address
							</Text>
							{['street', 'city', 'state', 'zip', 'country', 'landmark'].map(
								(field) => (
									<TextInput
										key={field}
										placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
										value={form[field]}
										onChangeText={(text) =>
											setForm((f) => ({ ...f, [field]: text }))
										}
										style={styles.input}
									/>
								)
							)}
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginVertical: 8,
								}}
							>
								<Checkbox
									value={form.isDefault}
									onValueChange={(val) =>
										setForm((f) => ({ ...f, isDefault: val }))
									}
									color="#FF521B"
								/>
								<Text style={{ marginLeft: 8 }}>Set as default address</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Pressable
									style={[styles.modalButton, { backgroundColor: '#FF521B' }]}
									onPress={async () => {
										if (
											!form.street ||
											!form.city ||
											!form.state ||
											!form.zip ||
											!form.country
										)
											return;
										const userDocRef = doc(db, 'users', user.uid);

										// Generate a unique id for the address
										const newId = Date.now().toString();
										const newAddress = {
											...form,
											isDefault: !!form.isDefault,
										};

										// Fetch current addresses map
										const userSnap = await getDoc(userDocRef);
										const data = userSnap.exists() ? userSnap.data() : {};
										let addressesMap = data.addresses || {};

										// If setting as default, unset previous default
										if (form.isDefault) {
											Object.keys(addressesMap).forEach((key) => {
												addressesMap[key].isDefault = false;
											});
										}

										addressesMap[newId] = newAddress;

										await updateDoc(userDocRef, {
											addresses: addressesMap,
										});

										await fetchAddresses();

										// Update local state
										const addressArray = Object.keys(addressesMap).map(
											(key) => ({
												...addressesMap[key],
												id: key,
											})
										);
										setAddresses(addressArray);

										// Always show the newly added address, regardless of isDefault
										setDefaultAddress({ ...newAddress, id: newId });

										setShowAddAddressModal(false);
										setForm({
											street: '',
											city: '',
											state: '',
											zip: '',
											country: '',
											landmark: '',
											isDefault: false,
										});
									}}
								>
									<Text style={{ color: '#fff' }}>Save</Text>
								</Pressable>
								<Pressable
									style={[styles.modalButton, { backgroundColor: '#aaa' }]}
									onPress={() => setShowAddAddressModal(false)}
								>
									<Text style={{ color: '#fff' }}>Cancel</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
				{/* Logic to enter new shipping address */}
			</View>

			<View style={styles.paymentOptions}>
  <Text>Payment Options</Text>
  <View>
    {paymentOptions.map(option => (
      <Pressable
        key={option.key}
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}
        onPress={() => setSelectedPayment(option.key)}
      >
        <Checkbox
          value={selectedPayment === option.key}
          onValueChange={() => setSelectedPayment(option.key)}
          color="#FF521B"
        />
        <Text style={styles.addressText2}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
</View>
			<Pressable onPress={() => navigation.navigate('PaymentOptions')}>
				<Text style={{ color: '#FF521B', fontSize: 18, marginTop: 20, textAlign: 'center' }}>
					Proceed to Payment
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF9F7',
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
	deliveryAddress: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: 'white',
		margin: 16,
		borderRadius: 4,
		elevation: 1,
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowRadius: 2,
		gap: 10,
	},
	addressHeader: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	addressText: {
		fontSize: 16
	},
		addressText2: {
		fontSize: 16,
		marginLeft: 8
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
		width: '90%',
		elevation: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: '#FF521B',
		borderRadius: 4,
		padding: 8,
		marginBottom: 8,
		backgroundColor: '#fff',
	},
	modalButton: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	paymentOptions: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: 'white',
		margin: 16,
		borderRadius: 4,
		elevation: 1,
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowRadius: 2,
		gap: 10,
	},
});
