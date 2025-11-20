import { MediaAsset } from "@/types";
import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import styles from "./forms.module.css";

interface Props {
    data: MediaAsset[];
    updateData: (data: MediaAsset[]) => void;
}

export default function Step3Media({ data, updateData }: Props) {
    const [urlInput, setUrlInput] = useState("");

    const addMedia = () => {
        if (!urlInput.trim()) return;

        const newAsset: MediaAsset = {
            id: Math.random().toString(36).substr(2, 9),
            url: urlInput,
            type: "image",
            tag: "other",
        };

        updateData([...data, newAsset]);
        setUrlInput("");
    };

    const removeMedia = (id: string) => {
        updateData(data.filter((item) => item.id !== id));
    };

    const updateTag = (id: string, tag: MediaAsset["tag"]) => {
        updateData(
            data.map((item) => (item.id === id ? { ...item, tag } : item))
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label className={styles.label}>Photo URLs</label>
                <p className={styles.suggestionLabel} style={{ marginBottom: "1rem" }}>
                    Paste direct links to your property photos (e.g., from Dropbox, Google Drive, or a hosting service).
                </p>
                <div className={styles.inputGroup}>
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addMedia()}
                        className="input"
                        placeholder="https://example.com/photo.jpg"
                    />
                    <button onClick={addMedia} className="btn btn-secondary" disabled={!urlInput}>
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            <div className={styles.mediaGrid}>
                {data.map((item) => (
                    <div key={item.id} className={styles.mediaCard}>
                        <div className={styles.mediaPreview}>
                            <img src={item.url} alt="Property" onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=Error")} />
                            <button onClick={() => removeMedia(item.id)} className={styles.mediaRemove}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className={styles.mediaControls}>
                            <select
                                value={item.tag}
                                onChange={(e) => updateTag(item.id, e.target.value as MediaAsset["tag"])}
                                className={styles.miniSelect}
                            >
                                <option value="front">Front</option>
                                <option value="kitchen">Kitchen</option>
                                <option value="living">Living</option>
                                <option value="master">Master Bed</option>
                                <option value="exterior">Exterior</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className={styles.emptyMedia}>
                        <ImageIcon size={48} className={styles.emptyIcon} />
                        <p>No photos added yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
