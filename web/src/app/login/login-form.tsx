"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, signUp } from "./actions";

// Submit Button Component for loading state
function SubmitButton({
    children,
    variant = "primary",
    formAction
}: {
    children: React.ReactNode,
    variant?: "primary" | "outline",
    formAction?: (formData: FormData) => void | Promise<void>
}) {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            formAction={formAction}
            className={cn(
                "group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 text-sm font-medium transition-all duration-300",
                variant === "primary"
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "border border-neutral-800 bg-transparent text-neutral-400 hover:border-neutral-700 hover:text-white",
                pending && "opacity-70 cursor-not-allowed"
            )}
        >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
            {!pending && variant === "primary" && (
                <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            )}
        </button>
    );
}

export function LoginForm({ error, message }: { error?: string, message?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass rounded-2xl p-8 w-full max-w-[400px] relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">
                    SnapRoute
                </h1>
                <p className="text-neutral-400 text-sm">
                    Keşfetmeye başla. Dünyanı paylaş.
                </p>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200"
                >
                    {error}
                </motion.div>
            )}

            {message && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-200"
                >
                    {message}
                </motion.div>
            )}

            <form className="flex flex-col gap-4">
                <div className="group relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-white">
                        <Mail className="h-4 w-4" />
                    </div>
                    <input
                        name="email"
                        type="email"
                        placeholder="E-posta adresi"
                        required
                        className="h-11 w-full rounded-lg bg-neutral-900/50 border border-neutral-800 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:bg-neutral-900/80 focus:outline-none focus:ring-0 transition-all"
                    />
                </div>

                <div className="group relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-white">
                        <Lock className="h-4 w-4" />
                    </div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Şifre"
                        required
                        minLength={6}
                        className="h-11 w-full rounded-lg bg-neutral-900/50 border border-neutral-800 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:bg-neutral-900/80 focus:outline-none focus:ring-0 transition-all"
                    />
                </div>

                <div className="mt-2 space-y-3">
                    <SubmitButton formAction={signIn}>
                        Giriş Yap
                    </SubmitButton>
                    <SubmitButton variant="outline" formAction={signUp}>
                        Hesap Oluştur
                    </SubmitButton>
                </div>
            </form>
        </motion.div>
    );
}
