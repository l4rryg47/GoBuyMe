import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function SelectProductScreen({ navigation, route }) {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(route?.params?.selectedCategory);
    const [activeSubcategory, setActiveSubcategory] = useState(null);

    // Get storeId from navigation params or fallback to a default
    const storeId = route?.params?.storeId || 'J3GO05mnhnoccDG9Bchc';

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const storeRef = doc(db, 'stores', storeId);
                const storeSnap = await getDoc(storeRef);
                if (storeSnap.exists()) {
                    const storeData = storeSnap.data();
                    let categoriesArray = [];
                    if (
                        storeData.categories &&
                        typeof storeData.categories === 'object'
                    ) {
                        categoriesArray = Object.values(storeData.categories);
                    }
                    setCategories(categoriesArray);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.log('Error fetching store:', err);
                setCategories([]);
            }
        };
        fetchStore();
    }, [storeId]);

    const sortedCategories = categories
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const selectedIndex = sortedCategories.findIndex(
        (item) => item.name === activeCategory
    );

    // Find the active top-level category object (e.g., alcohol)
    const activeCategoryObj = sortedCategories.find(
        (cat) => cat.name === activeCategory
    );

    // Get subcategory keys (e.g., beer, wine, etc.), filter out 'name' and other non-subcategory keys
    const subcategoryKeys = activeCategoryObj
        ? Object.keys(activeCategoryObj).filter(
                (key) => key !== 'name' && typeof activeCategoryObj[key] === 'object'
          )
        : [];

    // Build subcategories array with their names and order
    const subcategories = subcategoryKeys.map((key) => {
        const subcat = activeCategoryObj[key];
        return { key, name: subcat.name || key, order: subcat.order ?? 0 };
    }).sort((a, b) => a.order - b.order);

    // Set first subcategory as active on mount or when activeCategory changes
    useEffect(() => {
        if (subcategories.length > 0) {
            setActiveSubcategory(subcategories[0].key);
        } else {
            setActiveSubcategory(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, activeCategoryObj && subcategories.length]);

    const renderCategory = ({ item }) => (
        <Pressable
            onPress={() => setActiveCategory(item.name)}
            style={[
                styles.categoryItem,
                item.name === activeCategory && styles.selectedCategoryItem,
            ]}
        >
            <Text
                style={[
                    styles.categoryName,
                    item.name === activeCategory && styles.selectedCategoryName,
                ]}
            >
                {item.name}
            </Text>
        </Pressable>
    );

    const renderSubcategory = ({ item }) => (
        <Pressable
            style={[
                styles.subcategoryItem,
                item.key === activeSubcategory && styles.selectedSubcategoryItem,
            ]}
            onPress={() => setActiveSubcategory(item.key)}
        >
            <Text
                style={[
                    styles.subcategoryName,
                    item.key === activeSubcategory && styles.selectedSubcategoryName,
                ]}
            >
                {item.name}
            </Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#FF521B" />
                </Pressable>
                <Text style={styles.locationText}>Select Products</Text>
                <View style={{ width: 24 }} />
            </View>
            {/* Horizontal category list */}
            <View style={styles.categoryList}>
                <FlatList
                    data={sortedCategories}
                    renderItem={renderCategory}
                    keyExtractor={(item, idx) => item.name + idx}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    initialScrollIndex={selectedIndex > 0 ? selectedIndex : 0}
                    getItemLayout={(_, index) => ({
                        length: 100,
                        offset: 100 * index,
                        index,
                    })}
                />
            </View>
            {/* Horizontal subcategory list with highlight */}
            <View style={styles.subcategoryList}>
                <FlatList
                    data={subcategories}
                    renderItem={renderSubcategory}
                    keyExtractor={(item, idx) => item.key + idx}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />
            </View>
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
    categoryList: {
        paddingVertical: 8,
        backgroundColor: '#E14E1F',
    },
    horizontalList: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'transparent',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 14,
        color: 'white',
    },
    selectedCategoryItem: {
        backgroundColor: 'white',
        borderColor: '#FF521B',
        borderWidth: 1,
    },
    selectedCategoryName: {
        color: '#E14E1F',
    },
    subcategoryList: {
        padding: 8,
        backgroundColor: '#FFF',
    },
    subcategoryItem: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'transparent',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSubcategoryItem: {
        backgroundColor: '#E14E1F',
        borderColor: '#FF521B',
        borderWidth: 1,
    },
    subcategoryName: {
        fontSize: 14,
        color: '#E14E1F',
    },
    selectedSubcategoryName: {
        color: 'white',
    },
});

export default SelectProductScreen;