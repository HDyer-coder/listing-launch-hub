"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/lib/db";
import { AgentProfile } from "@/types";
import styles from "./profile.module.css";

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Partial<AgentProfile>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            if (user) {
                const data = await getUserProfile(user.uid);
                if (data) {
                    setProfile(data);
                } else {
                    setProfile({
                        email: user.email || "",
                        displayName: user.displayName || "",
                    });
                }
                setLoading(false);
            }
        }
        fetchProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateUserProfile(user.uid, profile);
            alert("Profile updated!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Agent Profile</h1>
            <div className={styles.card}>
                <div className={styles.field}>
                    <label className={styles.label}>Full Name</label>
                    <input
                        type="text"
                        value={profile.displayName || ""}
                        onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                        className="input"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={profile.email || ""}
                        disabled
                        className="input"
                        style={{ opacity: 0.7 }}
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Brokerage</label>
                    <input
                        type="text"
                        value={profile.brokerage || ""}
                        onChange={(e) => setProfile({ ...profile, brokerage: e.target.value })}
                        className="input"
                        placeholder="e.g. Keller Williams"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="input"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <div className={styles.divider} />

                <h3 className={styles.sectionTitle}>Branding</h3>
                <div className={styles.field}>
                    <label className={styles.label}>Primary Brand Color</label>
                    <div className={styles.colorInputWrapper}>
                        <input
                            type="color"
                            value={profile.branding?.primaryColor || "#000000"}
                            onChange={(e) => setProfile({
                                ...profile,
                                branding: { ...profile.branding, primaryColor: e.target.value }
                            })}
                            className={styles.colorInput}
                        />
                        <span>{profile.branding?.primaryColor}</span>
                    </div>
                </div>

                <button onClick={handleSave} className="btn btn-primary" disabled={saving} style={{ marginTop: "1rem" }}>
                    {saving ? "Saving..." : "Save Profile"}
                </button>
            </div>
        </div>
    );
}
