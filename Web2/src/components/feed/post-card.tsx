"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PostCardProps {
    author: {
        name: string;
        avatar: string;
        location: string;
    };
    content: {
        image: string;
        description: string;
        likes: number;
        comments: number;
    };
}

export function PostCard({ author, content }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(content.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="group relative w-full overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-neutral-800">
                        <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white">{author.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-neutral-400">
                            <MapPin className="h-3 w-3" />
                            <span>{author.location}</span>
                        </div>
                    </div>
                </div>
                <button className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/* Main Content (Image/Map) */}
            <div className="relative aspect-[4/5] w-full bg-neutral-900 sm:aspect-square">
                <img
                    src={content.image}
                    alt="Post content"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Floating Action Bar */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={handleLike}
                        className="group/btn flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
                    >
                        <Heart
                            className={cn(
                                "h-6 w-6 transition-colors duration-300",
                                isLiked ? "fill-red-500 text-red-500" : "text-white"
                            )}
                        />
                    </motion.button>

                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20">
                        <MessageCircle className="h-6 w-6 text-white" />
                    </button>

                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20">
                        <Share2 className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 pt-2">
                <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-white">{likeCount} beğenme</span>
                    <span className="text-xs text-neutral-500">• {content.comments} yorum</span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-300">
                    <span className="font-semibold text-white mr-2">{author.name}</span>
                    {content.description}
                </p>
            </div>
        </motion.div>
    );
}
