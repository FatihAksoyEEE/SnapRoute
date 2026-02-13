import { Navbar } from "@/components/layout/navbar";

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden flex flex-col">
            {/* Search Header Area */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6 pt-16 md:hidden">
                {/* Mobile search bar container if needed later */}
            </div>

            <Navbar />
            <main className="flex-1 relative">
                {children}
            </main>
        </div>
    );
}
