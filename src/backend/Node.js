const express = require('express');
const path = require('path');
const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} = require('firebase/firestore');
const cors = require('cors');

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyCKxFhD8P3v6ipO9rgfo6eyfMgtDH-LXag",
    authDomain: "skin-751d2.firebaseapp.com",
    projectId: "skin-751d2",
    storageBucket: "skin-751d2.firebasestorage.app",
    messagingSenderId: "370426503364",
    appId: "1:370426503364:web:8d9bb87748a050c87be991",
    measurementId: "G-V257G8GQVG"
  };
  
initializeApp(firebaseConfig);
const db = getFirestore();
const productsCollection = collection(db, 'products');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Add a product
app.post('/products', async (req, res) => {
    try {
        const docRef = await addDoc(productsCollection, req.body);
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).send("Error adding document");
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).send("Error fetching documents");
    }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const docRef = doc(db, 'products', req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.json({ id: docSnap.id, ...docSnap.data() });
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).send("Error fetching document");
    }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const docRef = doc(db, 'products', req.params.id);
        await updateDoc(docRef, req.body);
        res.send("Product updated successfully");
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).send("Error updating document");
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const docRef = doc(db, 'products', req.params.id);
        await deleteDoc(docRef);
        res.send("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send("Error deleting document");
    }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
