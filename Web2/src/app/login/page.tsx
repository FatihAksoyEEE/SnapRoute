import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; message?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/protected");
  }

  // Next.js 15+ searchParams is a Promise
  const params = await searchParams;
  const error = params?.error;
  const message = params?.message;

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black selection:bg-white/20">
      {/* Ambience Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="z-10 w-full px-6 flex justify-center">
        <LoginForm error={error} message={message} />
      </div>
    </main>
  );
}
