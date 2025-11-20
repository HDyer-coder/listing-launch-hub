"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getListings } from "@/lib/db";
import { Listing } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import styles from "./page.module.css";

export default function DashboardPage() {
    const { user } = useAuth();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchListings() {
            if (user) {
                try {
                    const data = await getListings(user.uid);
                    setListings(data);
                } catch (error) {
                    console.error("Failed to fetch listings", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchListings();
    }, [user]);

    if (loading) return <div>Loading listings...</div>;

    return (
        <div>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Listings</h1>
                    <p className={styles.subtitle}>Manage and track your property launches.</p>
                </div>
                <Link href="/create" className="btn btn-primary">
                    <Plus size={20} style={{ marginRight: "0.5rem" }} />
                    New Listing
                </Link>
            </header>

            {listings.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No listings yet. Start your first launch!</p>
                    <Link href="/create" className="btn btn-outline" style={{ marginTop: "1rem" }}>
                        Create Listing
                    </Link>
                </div>
            ) : (
                <div className={styles.grid}>
                    {listings.map((listing) => (
                        <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                {listing.media?.[0]?.url ? (
                                    <img src={listing.media[0].url} alt="Property" />
                                ) : (
                                    <div className={styles.placeholder}>No Image</div>
                                )}
                                <span className={`${styles.status} ${styles[listing.status]}`}>
                                    {listing.status}
                                </span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{listing.propertyDetails.address}</h3>
                                <p className={styles.cardPrice}>
                                    ${listing.propertyDetails.price.toLocaleString()}
                                </p>
                                <div className={styles.cardMeta}>
                                    <span>{listing.propertyDetails.bedrooms} Beds</span>
                                    <span>•</span>
                                    <span>{listing.propertyDetails.bathrooms} Baths</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
