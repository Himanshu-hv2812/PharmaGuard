import { motion } from "motion/react";
import { Dna, Brain, FlaskConical, ShieldCheck } from "lucide-react";
import { AnimatedDNALogo } from "./AnimatedDNALogo";

const steps = [
  { icon: Dna, label: "Parsing VCF Variants", sublabel: "Extracting genomic data from file..." },
  { icon: Brain, label: "AI Guideline Analysis", sublabel: "Cross-referencing CPIC & DPWG databases..." },
  { icon: FlaskConical, label: "Pharmacokinetic Modeling", sublabel: "Calculating metabolizer phenotypes..." },
  { icon: ShieldCheck, label: "Risk Assessment", sublabel: "Generating clinical safety profile..." },
];

interface LoadingStateProps {
  progress: number;
  currentStep: number;
}

export function LoadingState({ progress, currentStep }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto py-16"
    >
      <div className="text-center mb-12">
        {/* Animated DNA Logo */}
        <motion.div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center shadow-2xl shadow-[#1E40AF]/25">
              <AnimatedDNALogo size={56} />
            </div>
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-[#3B82F6] shadow-lg shadow-[#3B82F6]/40"
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ top: -6, left: "calc(50% - 6px)", transformOrigin: "6px 54px" }}
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#0F172A] mb-2"
          style={{ fontSize: "1.375rem", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Analyzing Pharmacogenomic Data
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#64748B]"
          style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
        >
          Processing your VCF file against clinical guidelines
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#64748B]" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
            Analysis Progress
          </span>
          <span
            className="text-[#1E40AF] tabular-nums"
            style={{ fontSize: "0.9375rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}
          >
            {progress}%
          </span>
        </div>
        <div className="w-full h-3 bg-[#E2E8F0]/60 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: "linear-gradient(90deg, #1E40AF, #3B82F6, #60A5FA)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const isPending = index > currentStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500
                ${isActive ? "bg-[#EFF6FF] border border-[#BFDBFE] shadow-sm shadow-[#3B82F6]/5" : ""}
                ${isComplete ? "bg-[#F0FDF4]/80 border border-[#BBF7D0]/60" : ""}
                ${isPending ? "bg-[#F8FAFC] border border-transparent opacity-50" : ""}
              `}
            >
              <motion.div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500
                  ${isActive ? "bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] shadow-md shadow-[#1E40AF]/20" : ""}
                  ${isComplete ? "bg-[#16A34A]" : ""}
                  ${isPending ? "bg-[#E2E8F0]" : ""}
                `}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon className={`w-5 h-5 ${isPending ? "text-[#94A3B8]" : "text-white"}`} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p
                  className={`${isPending ? "text-[#94A3B8]" : "text-[#0F172A]"}`}
                  style={{ fontSize: "0.875rem", fontWeight: 700 }}
                >
                  {step.label}
                </p>
                <p
                  className={`${
                    isActive ? "text-[#3B82F6]" : isComplete ? "text-[#16A34A]" : "text-[#CBD5E1]"
                  }`}
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {isComplete ? "Completed" : step.sublabel}
                </p>
              </div>
              {isActive && (
                <motion.div
                  className="w-6 h-6 border-[2.5px] border-[#1E40AF] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              )}
              {isComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-6 h-6 bg-[#16A34A] rounded-full flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Estimated time */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[#94A3B8] mt-8"
        style={{ fontSize: "0.75rem" }}
      >
        Estimated time remaining: {Math.max(1, Math.ceil((100 - progress) / 25))}s
      </motion.p>
    </motion.div>
  );
}
