import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Protected</h1>
        <form action={signOut}>
          <button className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800">
            Çıkış Yap
          </button>
        </form>
      </div>

      <div className="rounded-md border border-zinc-200 p-4 text-sm dark:border-zinc-800">
        <div className="font-medium">Session</div>
        <div className="mt-2 text-zinc-700 dark:text-zinc-300">
          {user.email}
        </div>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        <Link className="underline" href="/">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
