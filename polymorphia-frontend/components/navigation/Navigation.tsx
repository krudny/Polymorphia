import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import {NavigationProvider} from "@/components/navigation/NavigationContext";

export default function Navigation() {
  return (
      <NavigationProvider>
        <div className="bg-neutral-800 text-neutral-300 select-none">
          <nav className="w-full max-h-[100dvh] min-h-20 lg:hidden">
            <Navbar />
          </nav>
          <nav className="h-screen sticky left-0 top-0 shrink-0 hidden lg:block">
            <Sidebar />
          </nav>
        </div>
      </NavigationProvider>
  )
}