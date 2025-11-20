import { PropertyDetails } from "@/types";
import styles from "./forms.module.css";

interface Props {
    data: Partial<PropertyDetails>;
    updateData: (data: Partial<PropertyDetails>) => void;
}

export default function Step1PropertyDetails({ data, updateData }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        updateData({
            [name]: type === "number" ? parseFloat(value) : value,
        });
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.field}>
                <label className={styles.label}>Address</label>
                <input
                    type="text"
                    name="address"
                    value={data.address || ""}
                    onChange={handleChange}
                    className="input"
                    placeholder="123 Main St"
                />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>City</label>
                    <input
                        type="text"
                        name="city"
                        value={data.city || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="San Francisco"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>State</label>
                    <input
                        type="text"
                        name="state"
                        value={data.state || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="CA"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Zip</label>
                    <input
                        type="text"
                        name="zip"
                        value={data.zip || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="94105"
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={data.price || ""}
                        onChange={handleChange}
                        className="input"
                        placeholder="1500000"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Property Type</label>
                    <select
                        name="propertyType"
                        value={data.propertyType || ""}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="">Select Type</option>
                        <option value="Single Family">Single Family</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Multi-Family">Multi-Family</option>
                        <option value="Land">Land</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        value={data.bedrooms || ""}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Bathrooms</label>
                    <input
                        type="number"
                        name="bathrooms"
                        value={data.bathrooms || ""}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Sq Ft</label>
                    <input
                        type="number"
                        name="squareFeet"
                        value={data.squareFeet || ""}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Lot Size (Sq Ft)</label>
                    <input
                        type="number"
                        name="lotSize"
                        value={data.lotSize || ""}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Year Built</label>
                    <input
                        type="number"
                        name="yearBuilt"
                        value={data.yearBuilt || ""}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
            </div>
        </div>
    );
}
