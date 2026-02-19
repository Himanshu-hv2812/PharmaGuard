import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Bell, User, ChevronDown, LogOut, HelpCircle, Dna } from "lucide-react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const initials = (user?.name || "SC")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]/80 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-md shadow-[#1E40AF]/15">
            <Dna className="w-[18px] h-[18px] text-white" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[#0F172A] tracking-tight"
              style={{ fontSize: "1.0625rem", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              PharmaGuard
            </span>
            <span
              className="text-[#94A3B8] hidden sm:block"
              style={{ fontSize: "0.5625rem", fontWeight: 600, lineHeight: 1, letterSpacing: "0.08em" }}
            >
              PHARMACOGENOMIC ANALYTICS
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] px-3 py-1.5 rounded-full border border-[#BBF7D0]/50"
            style={{ fontSize: "0.6875rem", fontWeight: 600 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            System Active
          </div>

          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
            <Bell className="w-[17px] h-[17px] text-[#64748B]" />
            <span className="absolute top-1.5 right-2 w-[7px] h-[7px] bg-[#EF4444] rounded-full ring-2 ring-white" />
          </button>

          {/* Settings */}
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
            <Settings className="w-[17px] h-[17px] text-[#64748B]" />
          </button>

          {/* Divider */}
          <div className="w-px h-7 bg-[#E2E8F0] mx-1" />

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all ${
                showDropdown ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center shadow-sm">
                <span className="text-white" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                  {initials}
                </span>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[#0F172A]" style={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.2 }}>
                  {user?.name || "Dr. Sarah Chen"}
                </span>
                <span className="text-[#94A3B8]" style={{ fontSize: "0.625rem", lineHeight: 1.2 }}>
                  {user?.role || "Clinical Genomics"}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#94A3B8] hidden md:block transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#E2E8F0] shadow-xl shadow-black/8 z-50 py-1.5 overflow-hidden"
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-[#F1F5F9]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center">
                          <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                            {initials}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#0F172A] truncate" style={{ fontSize: "0.8125rem", fontWeight: 700 }}>
                            {user?.name || "Dr. Sarah Chen"}
                          </p>
                          <p className="text-[#94A3B8] truncate" style={{ fontSize: "0.6875rem" }}>
                            {user?.email || "sarah.chen@clinic.org"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      {[
                        { icon: User, label: "My Profile" },
                        { icon: Settings, label: "Settings" },
                        { icon: HelpCircle, label: "Help & Support" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] text-[#475569] transition-colors text-left"
                          style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                        >
                          <item.icon className="w-4 h-4 text-[#94A3B8]" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-[#F1F5F9] py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF2F2] text-[#EF4444] transition-colors text-left"
                        style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
