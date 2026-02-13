import { FeedContainer } from "@/components/feed/feed-container";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="sticky top-0 z-10 border-b border-white/5 bg-neutral-950/80 px-4 py-4 backdrop-blur-md">
        <h1 className="text-xl font-bold text-white">SnapRoute</h1>
      </div>
      
      <FeedContainer />
    </main>
  );
}
