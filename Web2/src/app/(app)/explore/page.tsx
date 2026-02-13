"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { MapView } from "@/components/maps/map-view";
import { motion } from "framer-motion";

const CATEGORIES = ["Tümü", "Doğa", "Şehir", "Kamp", "Yemek", "Müze", "Plaj"];

export default function ExplorePage() {
    return (
        <div className="relative h-full w-full">
            {/* Floating Search Bar */}
            <div className="absolute left-6 right-6 top-6 z-20 flex flex-col gap-4 md:left-12 md:top-24 md:w-96">
                <div className="glass flex items-center gap-3 rounded-2xl p-4 shadow-2xl">
                    <Search className="h-5 w-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Rota veya konum ara..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                    />
                    <button className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10">
                        <SlidersHorizontal className="h-4 w-4 text-white" />
                    </button>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {CATEGORIES.map((cat, i) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-md transition-all ${i === 0
                                    ? "border-purple-500 bg-purple-500/20 text-white"
                                    : "border-white/10 bg-black/40 text-neutral-300 hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Map Layer */}
            <div className="h-full w-full">
                <MapView />
            </div>
        </div>
    );
}
