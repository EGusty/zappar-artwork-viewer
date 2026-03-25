import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getBytes } from 'firebase/storage';

export class FirebaseManager {
    constructor(projectId) {
        this.projectId = projectId;
        this.db = null;
        this.storage = null;
        this.artworks = [];
    }

    async init() {
        // Firebase config (usando projectId)
        const firebaseConfig = {
            apiKey: "AIzaSyAKzVvxS8mDkV1zXq1kGhVzDxYP7-7Y8_I",
            authDomain: `${this.projectId}.firebaseapp.com`,
            projectId: this.projectId,
            storageBucket: `${this.projectId}.appspot.com`,
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        try {
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore(app);
            this.storage = getStorage(app);

            // Cargar obras
            await this.loadArtworks();

            console.log('Firebase inicializado correctamente');
        } catch (error) {
            console.error('Error inicializando Firebase:', error);
            throw error;
        }
    }

    async loadArtworks() {
        try {
            const artworksCollection = collection(this.db, 'artworks');
            const snapshot = await getDocs(artworksCollection);

            this.artworks = [];
            snapshot.forEach(doc => {
                this.artworks.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            console.log(`Cargadas ${this.artworks.length} obras`);
            return this.artworks;
        } catch (error) {
            console.error('Error cargando obras:', error);
            return [];
        }
    }

    getArtworks() {
        return this.artworks;
    }

    async downloadImage(imageUrl) {
        try {
            // Si es URL externa (Firebase Storage)
            if (imageUrl.includes('firebasestorage')) {
                const response = await fetch(imageUrl);
                return await response.blob();
            }

            // Si es una referencia local
            const imageRef = ref(this.storage, imageUrl);
            const buffer = await getBytes(imageRef);
            return new Blob([buffer]);
        } catch (error) {
            console.error('Error descargando imagen:', error);
            throw error;
        }
    }
}
