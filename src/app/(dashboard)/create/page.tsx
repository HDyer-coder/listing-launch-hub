"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createListing } from "@/lib/db";
import { PropertyDetails, MediaAsset } from "@/types";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";
import styles from "./create.module.css";

// Placeholder components for steps (will implement next)
import Step1PropertyDetails from "@/components/forms/Step1PropertyDetails";
import Step2Features from "@/components/forms/Step2Features";
import Step3Media from "@/components/forms/Step3Media";
import Step4AgentNotes from "@/components/forms/Step4AgentNotes";

const STEPS = ["Property Details", "Features & Amenities", "Media Uploads", "Agent Notes"];

export default function CreateListingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<{
        propertyDetails: Partial<PropertyDetails>;
        media: MediaAsset[];
    }>({
        propertyDetails: {
            features: [],
        },
        media: [],
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const listingId = await createListing(user.uid, {
                propertyDetails: formData.propertyDetails as PropertyDetails,
                media: formData.media,
            });
            router.push(`/listing/${listingId}`);
        } catch (error) {
            console.error("Error saving listing:", error);
            alert("Failed to save listing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (section: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Create New Listing</h1>
                <div className={styles.actions}>
                    <button onClick={handleSave} className="btn btn-outline" disabled={loading}>
                        <Save size={18} style={{ marginRight: "0.5rem" }} />
                        Save Draft
                    </button>
                </div>
            </header>

            <div className={styles.progress}>
                {STEPS.map((step, index) => (
                    <div
                        key={index}
                        className={`${styles.step} ${index <= currentStep ? styles.activeStep : ""} ${index === currentStep ? styles.currentStep : ""
                            }`}
                    >
                        <div className={styles.stepNumber}>{index + 1}</div>
                        <span className={styles.stepLabel}>{step}</span>
                        {index < STEPS.length - 1 && <div className={styles.stepLine} />}
                    </div>
                ))}
            </div>

            <div className={styles.content}>
                {currentStep === 0 && (
                    <Step1PropertyDetails
                        data={formData.propertyDetails}
                        updateData={(data) => updateFormData("propertyDetails", { ...formData.propertyDetails, ...data })}
                    />
                )}
                {currentStep === 1 && (
                    <Step2Features
                        data={formData.propertyDetails}
                        updateData={(data) => updateFormData("propertyDetails", { ...formData.propertyDetails, ...data })}
                    />
                )}
                {currentStep === 2 && (
                    <Step3Media
                        data={formData.media}
                        updateData={(data) => updateFormData("media", data)}
                    />
                )}
                {currentStep === 3 && (
                    <Step4AgentNotes
                        data={formData.propertyDetails}
                        updateData={(data) => updateFormData("propertyDetails", { ...formData.propertyDetails, ...data })}
                    />
                )}
            </div>

            <footer className={styles.footer}>
                <button
                    onClick={handleBack}
                    className="btn btn-outline"
                    disabled={currentStep === 0}
                >
                    <ChevronLeft size={18} style={{ marginRight: "0.5rem" }} />
                    Back
                </button>

                {currentStep === STEPS.length - 1 ? (
                    <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                        {loading ? "Generating..." : "Generate Launch Package"}
                    </button>
                ) : (
                    <button onClick={handleNext} className="btn btn-primary">
                        Next
                        <ChevronRight size={18} style={{ marginLeft: "0.5rem" }} />
                    </button>
                )}
            </footer>
        </div>
    );
}
