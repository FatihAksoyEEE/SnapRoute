"use client";

import { motion } from "framer-motion";
import { Map, Navigation } from "lucide-react";

export function MapPlaceholder() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#0a0a0a]">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Radar Scan Effect */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent rounded-full blur-3xl"
            />

            {/* Center Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute h-20 w-20 rounded-full bg-purple-500/20"
                    />
                    <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl">
                        <Navigation className="h-6 w-6 text-purple-400 fill-current" />
                    </div>
                </div>
            </div>

            {/* Floating Info */}
            <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                        <Map className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white">Harita Modu</h3>
                        <p className="text-xs text-neutral-400">Gerçek harita verileri API anahtarı bekleniyor.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
