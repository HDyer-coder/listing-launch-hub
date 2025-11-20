import { PropertyDetails } from "@/types";
import styles from "./forms.module.css";

interface Props {
    data: Partial<PropertyDetails>;
    updateData: (data: Partial<PropertyDetails>) => void;
}

export default function Step4AgentNotes({ data, updateData }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Listing Agent Name</label>
                    <input
                        type="text"
                        name="agentName"
                        value={data.agentName || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="John Smith"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Brokerage</label>
                    <input
                        type="text"
                        name="agentBrokerage"
                        value={data.agentBrokerage || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="Keller Williams"
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Property Description / Rough Notes</label>
                <textarea
                    name="description"
                    value={data.description || ""}
                    onChange={handleChange}
                    className="input"
                    rows={6}
                    placeholder="Enter any rough notes, key selling points, or a draft description. The AI will polish this for you."
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Neighborhood & Lifestyle Notes</label>
                <textarea
                    name="neighborhoodNotes"
                    value={data.neighborhoodNotes || ""}
                    onChange={handleChange}
                    className="input"
                    rows={4}
                    placeholder="Great schools, quiet street, walking distance to coffee shops..."
                />
            </div>
        </div>
    );
}
