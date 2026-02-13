import { Navbar } from "@/components/layout/navbar";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="mx-auto max-w-lg pb-24 pt-20 md:max-w-xl md:pt-24 lg:max-w-2xl">
                {children}
            </main>
        </div>
    );
}
