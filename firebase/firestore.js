import { 
    collection, doc, setDoc, getDoc, updateDoc,
    getDocs, query, where, addDoc 
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  // ================= USERS =================
  export const createUserProfile = async (userId, { name, email, phone }) => {
    await setDoc(doc(db, 'users', userId), {
      name,
      email,
      phone,
      createdAt: new Date()
    });
  };
  
  export const getUserProfile = async (userId) => {
    const snapshot = await getDoc(doc(db, 'users', userId));
    return snapshot.exists() ? snapshot.data() : null;
  };
  
  // ================= RESTAURANTS =================
  export const fetchRestaurants = async () => {
    const snapshot = await getDocs(collection(db, 'restaurants'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  // ================= ORDERS =================
  export const createOrder = async (userId, items, total) => {
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date()
    });
    return orderRef.id;
  };