import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { ThemeToggle } from "@/components/navbar/ThemeToggle";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground h-screen flex flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="absolute -bottom-[4.5px] -left-[4.5px] w-[8px] h-[8px] rotate-45 bg-background z-50 border border-border" />
            <SidebarTrigger className="-ml-2" />
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 min-h-0 overflow-y-auto w-full max-w-[100rem] mx-auto px-4 md:px-6 lg:px-16 py-6 lg:py-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
