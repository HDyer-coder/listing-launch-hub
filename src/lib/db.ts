import { db } from "./firebase";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    setDoc,
    Timestamp
} from "firebase/firestore";
import { Listing, AgentProfile } from "@/types";

const LISTINGS_COLLECTION = "listings";
const USERS_COLLECTION = "users";

// --- Listing Operations ---

export async function createListing(userId: string, initialData: Partial<Listing>) {
    try {
        const docRef = await addDoc(collection(db, LISTINGS_COLLECTION), {
            ...initialData,
            userId,
            status: 'draft',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating listing:", error);
        throw error;
    }
}

export async function getListings(userId: string): Promise<Listing[]> {
    try {
        const q = query(collection(db, LISTINGS_COLLECTION), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}

export async function getListing(listingId: string): Promise<Listing | null> {
    try {
        const docRef = doc(db, LISTINGS_COLLECTION, listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Listing;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching listing:", error);
        throw error;
    }
}

export async function updateListing(listingId: string, data: Partial<Listing>) {
    try {
        const docRef = doc(db, LISTINGS_COLLECTION, listingId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Date.now(),
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        throw error;
    }
}

export async function deleteListing(listingId: string) {
    try {
        await deleteDoc(doc(db, LISTINGS_COLLECTION, listingId));
    } catch (error) {
        console.error("Error deleting listing:", error);
        throw error;
    }
}

// --- User Operations ---

export async function getUserProfile(userId: string): Promise<AgentProfile | null> {
    try {
        const docRef = doc(db, USERS_COLLECTION, userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as AgentProfile;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(userId: string, data: Partial<AgentProfile>) {
    try {
        const docRef = doc(db, USERS_COLLECTION, userId);
        // Use setDoc with merge: true to create if not exists or update
        await setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}
