"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getListing, updateListing } from "@/lib/db";
import { Listing } from "@/types";
import { Wand2, Copy, Check, Share2, Download } from "lucide-react";
import { generatePropertyFlyer, generateOpenHouseSheet } from "@/lib/pdfGenerator";
import styles from "./listing.module.css";

export default function ListingDetailPage() {
    const { id } = useParams();
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("marketing");

    useEffect(() => {
        async function fetchListing() {
            if (typeof id === "string") {
                const data = await getListing(id);
                setListing(data);
                setLoading(false);
            }
        }
        fetchListing();
    }, [id]);

    const handleGenerate = async () => {
        if (!listing) return;
        setGenerating(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ listingId: listing.id, propertyDetails: listing.propertyDetails }),
            });

            const data = await response.json();

            // Update local state and DB
            const updatedListing = {
                ...listing,
                status: 'generated' as const,
                generatedContent: data.content
            };

            setListing(updatedListing);
            await updateListing(listing.id, {
                status: 'generated',
                generatedContent: data.content
            });

        } catch (error) {
            console.error("Generation failed", error);
            alert("Failed to generate content.");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading listing...</div>;
    if (!listing) return <div className={styles.error}>Listing not found</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>{listing.propertyDetails.address}</h1>
                    <p className={styles.subtitle}>
                        {listing.propertyDetails.city}, {listing.propertyDetails.state}
                    </p>
                </div>
                <div className={styles.actions}>
                    {!listing.generatedContent ? (
                        <button
                            onClick={handleGenerate}
                            className="btn btn-primary"
                            disabled={generating}
                        >
                            <Wand2 size={18} style={{ marginRight: "0.5rem" }} />
                            {generating ? "Generating Magic..." : "Generate Launch Package"}
                        </button>
                    ) : (
                        <button className="btn btn-outline">
                            <Share2 size={18} style={{ marginRight: "0.5rem" }} />
                            Share Package
                        </button>
                    )}
                </div>
            </header>

            {listing.generatedContent ? (
                <div className={styles.content}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === "marketing" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("marketing")}
                        >
                            Marketing Copy
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "social" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("social")}
                        >
                            Social Media
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "assets" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("assets")}
                        >
                            Assets & Flyers
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === "marketing" && (
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>MLS Description</h3>
                                <div className={styles.copyBox}>
                                    <p>{listing.generatedContent.mlsDescription}</p>
                                    <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(listing.generatedContent!.mlsDescription)}>
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "social" && (
                            <div className={styles.grid}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>Instagram</h3>
                                    <div className={styles.copyBox}>
                                        <p>{listing.generatedContent.socialPosts.instagram.caption}</p>
                                        <div className={styles.hashtags}>
                                            {listing.generatedContent.socialPosts.instagram.hashtags.map(tag => (
                                                <span key={tag} className={styles.hashtag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>Facebook</h3>
                                    <div className={styles.copyBox}>
                                        <p>{listing.generatedContent.socialPosts.facebook}</p>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>LinkedIn</h3>
                                    <div className={styles.copyBox}>
                                        <p>{listing.generatedContent.socialPosts.linkedin}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "assets" && (
                            <div className={styles.assetsGrid}>
                                <div className={styles.assetCard}>
                                    <div className={styles.assetPreview}>PDF</div>
                                    <div className={styles.assetInfo}>
                                        <h4>Property Flyer</h4>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => generatePropertyFlyer(listing)}
                                        >
                                            <Download size={16} style={{ marginRight: "0.5rem" }} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.assetCard}>
                                    <div className={styles.assetPreview}>PDF</div>
                                    <div className={styles.assetInfo}>
                                        <h4>Open House Sheet</h4>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => generateOpenHouseSheet(listing)}
                                        >
                                            <Download size={16} style={{ marginRight: "0.5rem" }} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <Wand2 size={48} className={styles.emptyIcon} />
                    <h2>Ready to Launch?</h2>
                    <p>Click the button above to generate your complete marketing package using AI.</p>
                </div>
            )}
        </div>
    );
}
