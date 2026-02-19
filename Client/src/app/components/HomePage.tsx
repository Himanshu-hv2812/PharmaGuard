import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart, Pill, ShieldCheck, Activity } from "lucide-react";
import { AnimatedDNALogo } from "./AnimatedDNALogo";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* ── Floating medical decorations ── */
function FloatingIcon({
  children,
  x,
  y,
  delay,
  dur,
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay: number;
  dur: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.55, 0.55, 0], y: [10, -18, -18, 10] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center justify-between relative overflow-hidden">
      {/* ── Backgrounds ── */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #CBD5E1 0.5px, transparent 0.5px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Blobs */}
      <motion.div
        className="absolute top-[-25%] left-[45%] -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #DBEAFE 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #E0E7FF 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[-8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #F0FDFA 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* ── Floating medical icons ── */}
      <FloatingIcon x="8%" y="18%" delay={0} dur={6}>
        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E2E8F0] shadow-sm flex items-center justify-center">
          <Heart className="w-5 h-5 text-[#F87171]" />
        </div>
      </FloatingIcon>
      <FloatingIcon x="85%" y="22%" delay={1.5} dur={7}>
        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E2E8F0] shadow-sm flex items-center justify-center">
          <Pill className="w-5 h-5 text-[#3B82F6]" />
        </div>
      </FloatingIcon>
      <FloatingIcon x="12%" y="72%" delay={3} dur={8}>
        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E2E8F0] shadow-sm flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#10B981]" />
        </div>
      </FloatingIcon>
      <FloatingIcon x="80%" y="68%" delay={2} dur={6.5}>
        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E2E8F0] shadow-sm flex items-center justify-center">
          <Activity className="w-5 h-5 text-[#8B5CF6]" />
        </div>
      </FloatingIcon>

      {/* ── Spacer top ── */}
      <div className="flex-1 min-h-[60px]" />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Animated DNA Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#1E40AF]/30 relative">
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-3 rounded-[28px] border border-[#3B82F6]/20"
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <AnimatedDNALogo size={60} />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-[#0F172A] mb-4"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Pharma
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
            Guard
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-[#64748B] max-w-md mx-auto mb-5"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          AI-powered pharmacogenomic risk analysis.
          <br />
          Predict drug safety from patient DNA.
        </motion.p>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="text-[#94A3B8] max-w-sm mx-auto mb-12"
          style={{ fontSize: "0.875rem", lineHeight: 1.65 }}
        >
          Upload a VCF file, select medications, and receive
          clinical-grade risk reports in seconds.
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <Link
            to="/auth"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white pl-9 pr-7 py-4.5 rounded-2xl hover:from-[#1E3A8A] hover:to-[#1E40AF] shadow-xl shadow-[#1E40AF]/30 hover:shadow-2xl hover:shadow-[#1E40AF]/40 active:scale-[0.96] transition-all"
            style={{ fontSize: "1.0625rem", fontWeight: 700 }}
          >
            {/* Button glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white/10"
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* Medical illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[420px] mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1E40AF]/10 border border-white/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1692035072849-93a511f35b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBkb3VibGUlMjBoZWxpeCUyMDNEJTIwcmVuZGVyJTIwYmx1ZSUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTUxNzc0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="DNA genomic analysis"
                className="w-full h-[220px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFC] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAFBFC]/30 to-transparent" />
            </div>
          </motion.div>

          {/* Floating stat cards on image */}
          <motion.div
            className="absolute -left-6 top-6 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-[#E2E8F0]/60"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <p className="text-[#10B981]" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>Accuracy</p>
            <p className="text-[#0F172A]" style={{ fontSize: "1.25rem", fontWeight: 800 }}>98.4%</p>
          </motion.div>

          <motion.div
            className="absolute -right-4 bottom-14 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-[#E2E8F0]/60"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          >
            <p className="text-[#3B82F6]" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>Analysis Time</p>
            <p className="text-[#0F172A]" style={{ fontSize: "1.25rem", fontWeight: 800 }}>&lt;3s</p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Spacer bottom ── */}
      <div className="flex-1 min-h-[40px]" />

      {/* ── Trust footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 w-full border-t border-[#E2E8F0]/60 bg-white/40 backdrop-blur-sm py-5"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[#94A3B8]" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            HIPAA Compliant
          </span>
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:block" />
          <span>CPIC® Guidelines</span>
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:block" />
          <span>FDA-Grade Analysis</span>
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:block" />
          <span>200+ Institutions</span>
        </div>
      </motion.footer>
    </div>
  );
}
