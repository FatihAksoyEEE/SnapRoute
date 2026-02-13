"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, PlusSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/feed", icon: Home, label: "Ana Sayfa" },
    { href: "/explore", icon: Compass, label: "Keşfet" },
    { href: "/create", icon: PlusSquare, label: "Oluştur", isPrimary: true },
    { href: "/activity", icon: Heart, label: "Aktivite" },
    { href: "/profile", icon: User, label: "Profil" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Navigation (Top) */}
            <nav className="fixed top-0 z-50 hidden w-full border-b border-white/5 bg-black/50 backdrop-blur-xl md:block">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <Link href="/feed" className="text-xl font-bold tracking-tighter text-white">
                        SnapRoute
                    </Link>

                    <div className="flex items-center gap-6">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-medium transition-colors",
                                        isActive ? "text-white" : "text-neutral-400 hover:text-white"
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5", item.isPrimary && "text-purple-400")} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation (Bottom) */}
            <nav className="fixed bottom-0 z-50 w-full border-t border-white/5 bg-black/80 backdrop-blur-xl md:hidden pb-safe">
                <div className="flex h-16 items-center justify-around px-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center justify-center gap-1 p-2"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-xl bg-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon
                                    className={cn(
                                        "relative z-10 h-6 w-6 transition-colors",
                                        isActive ? "text-white" : "text-neutral-500",
                                        item.isPrimary && !isActive && "text-purple-400"
                                    )}
                                />
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
