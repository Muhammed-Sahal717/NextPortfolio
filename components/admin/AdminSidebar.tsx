"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import {
  FiHome,
  FiFolder,
  FiLogOut,
  FiZap,
  FiMenu,
  FiX,
  FiFileText,
} from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/resume", label: "Resume", icon: FiFileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo / Brand */}
      <div className="p-6 border-b border-white/[0.06]">
        <Link
          href="/admin"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center group-hover:bg-lime-400/20 transition-colors">
            <FiZap className="text-lime-400" size={18} />
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-tight block">
              Portfolio
            </span>
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-lime-400/10 text-lime-400 border border-lime-400/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/[0.06]">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
            <FiZap className="text-lime-400" size={16} />
          </div>
          <span className="text-white font-bold text-sm">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-zinc-400 hover:text-white p-2"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 z-50 w-[280px] h-full bg-zinc-950 border-r border-white/[0.06] flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-40 w-[260px] h-full bg-zinc-950/50 backdrop-blur-xl border-r border-white/[0.06] flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}
