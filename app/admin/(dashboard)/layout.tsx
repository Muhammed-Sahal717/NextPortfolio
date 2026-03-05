import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel",
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
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />
      <main className="lg:ml-[260px] pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 md:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
