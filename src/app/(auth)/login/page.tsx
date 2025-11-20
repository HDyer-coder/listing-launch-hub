"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Listing Launch Hub</h1>
                <p className={styles.subtitle}>Automate your real estate marketing in seconds.</p>
                <button onClick={signInWithGoogle} className="btn btn-primary">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
