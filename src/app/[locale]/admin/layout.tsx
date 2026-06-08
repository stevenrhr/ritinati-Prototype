import { Link } from "@/i18n/routing";
import { Flower2, LayoutDashboard, FileText, Users, Image as ImageIcon, ArrowLeft } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/konten", label: "Kelola Konten", icon: FileText },
    { href: "/admin/pendaftar", label: "Data Pendaftar", icon: Users },
    { href: "/admin/media", label: "Pustaka Media", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-zinc-950 transition-colors">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shrink-0 p-6 gap-6">
        <div className="flex flex-col gap-8">
          {/* Studio Brand logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Flower2 className="h-6 w-6 text-accent-gold" />
            <div className="flex flex-col text-left">
              <span className="font-heading text-base font-bold tracking-wider text-black dark:text-white">
                RITINARI
              </span>
              <span className="text-[9px] tracking-[0.2em] font-sans font-semibold text-accent-blue uppercase">
                Panel Admin
              </span>
            </div>
          </Link>

          {/* Links list */}
          <nav className="flex flex-col gap-1 text-left">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-accent-blue transition-colors"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent-gold" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action button footers */}
        <div className="flex flex-col gap-2 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 shrink-0" />
            <span>Kembali ke Web</span>
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Primary content area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-6xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
