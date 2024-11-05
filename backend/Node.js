import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKxFhD8P3v6ipO9rgfo6eyfMgtDH-LXag",
    authDomain: "skin-751d2.firebaseapp.com",
    projectId: "skin-751d2",
    storageBucket: "skin-751d2.appspot.com",
    messagingSenderId: "370426503364",
    appId: "1:370426503364:web:8d9bb87748a050c87be991",
    measurementId: "G-V257G8GQVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const PORT = 5000;
const cartCollection = collection(db, 'cart');

const server = express();
server.use(cors());
server.use(express.json());

// Register a new user
server.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log('Incoming registration request:', req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.status(201).json({ uid: user.uid, email: user.email });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: error.code, message: error.message });
    }
});

// Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: error.message });
    }
});

// Get all cart items
server.get('/cart', async (req, res) => {
    try {
        const cartSnapshot = await getDocs(cartCollection);
        const cartItems = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        res.status(500).send('Error fetching cart items');
    }
});

// Add a new item to the cart
server.post('/cart', async (req, res) => {
    try {
        const newItem = req.body;
        const docRef = await addDoc(cartCollection, newItem);
        res.status(201).json({ id: docRef.id, ...newItem });
    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        res.status(500).send('Error adding item to cart');
    }
});

// Remove an item from the cart
server.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = doc(db, 'cart', id);
        await deleteDoc(docRef);
        res.status(204).send();
    } catch (error) {
        console.error('Error removing item from cart:', error.message);
        res.status(500).send('Error removing item from cart');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
