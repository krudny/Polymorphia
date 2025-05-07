import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

export default function Navigation() {
  return (
        <div className="bg-neutral-800 text-neutral-300 select-none z-50">
          <nav className="w-full max-h-[100dvh] min-h-20 lg:hidden">
            <Navbar />
          </nav>
          <nav className="h-screen sticky left-0 top-0 shrink-0 hidden lg:block">
            <Sidebar />
          </nav>
        </div>
  )
}