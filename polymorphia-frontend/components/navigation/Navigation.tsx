import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import "./index.css";

export default function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar-wrapper">
        <Navbar />
      </nav>
      <nav className="sidebar-wrapper">
        <Sidebar />
      </nav>
    </div>
  );
}
