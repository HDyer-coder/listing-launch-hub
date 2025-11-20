"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, LogOut, User } from "lucide-react";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>Launch Hub</div>
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={styles.navItem}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/create" className={styles.navItem}>
                        <PlusCircle size={20} />
                        <span>New Listing</span>
                    </Link>
                    <Link href="/profile" className={styles.navItem}>
                        <User size={20} />
                        <span>Profile</span>
                    </Link>
                </nav>
                <button onClick={() => logout()} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
