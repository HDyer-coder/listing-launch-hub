import { PropertyDetails } from "@/types";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import styles from "./forms.module.css";

interface Props {
    data: Partial<PropertyDetails>;
    updateData: (data: Partial<PropertyDetails>) => void;
}

const COMMON_FEATURES = [
    "Pool", "Spa", "View", "Fireplace", "Hardwood Floors",
    "Solar Panels", "EV Charger", "Smart Home", "Gated Community"
];

export default function Step2Features({ data, updateData }: Props) {
    const [newFeature, setNewFeature] = useState("");

    const addFeature = (feature: string) => {
        if (!data.features?.includes(feature)) {
            updateData({
                features: [...(data.features || []), feature],
            });
        }
        setNewFeature("");
    };

    const removeFeature = (feature: string) => {
        updateData({
            features: data.features?.filter((f) => f !== feature) || [],
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label className={styles.label}>Key Features & Amenities</label>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addFeature(newFeature)}
                        className="input"
                        placeholder="Add a custom feature..."
                    />
                    <button
                        onClick={() => addFeature(newFeature)}
                        className="btn btn-secondary"
                        disabled={!newFeature.trim()}
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            <div className={styles.tags}>
                {data.features?.map((feature, index) => (
                    <span key={index} className={styles.tag}>
                        {feature}
                        <button onClick={() => removeFeature(feature)} className={styles.tagRemove}>
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>

            <div className={styles.suggestions}>
                <p className={styles.suggestionLabel}>Suggested Features:</p>
                <div className={styles.suggestionList}>
                    {COMMON_FEATURES.map((feature) => (
                        <button
                            key={feature}
                            onClick={() => addFeature(feature)}
                            className={`${styles.suggestionChip} ${data.features?.includes(feature) ? styles.activeChip : ""
                                }`}
                        >
                            {feature}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
