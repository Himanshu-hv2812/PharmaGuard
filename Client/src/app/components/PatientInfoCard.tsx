import { User, Calendar, FileText, Pill } from "lucide-react";
import { motion } from "motion/react";

interface PatientInfoCardProps {
  patientId: string;
  timestamp: string;
  fileName: string;
  drugsAnalyzed: string[];
}

const infoItems = [
  { key: "patient", icon: User, label: "PATIENT ID", color: "#1E40AF", bg: "#EFF6FF" },
  { key: "timestamp", icon: Calendar, label: "TIMESTAMP", color: "#7C3AED", bg: "#F5F3FF" },
  { key: "file", icon: FileText, label: "SOURCE FILE", color: "#0891B2", bg: "#ECFEFF" },
  { key: "drugs", icon: Pill, label: "DRUGS ANALYZED", color: "#059669", bg: "#ECFDF5" },
] as const;

export function PatientInfoCard({ patientId, timestamp, fileName, drugsAnalyzed }: PatientInfoCardProps) {
  const values: Record<string, string> = {
    patient: patientId,
    timestamp,
    file: fileName,
    drugs: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl border border-[#E2E8F0]/80 shadow-sm shadow-black/[0.02] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center">
          <User className="w-4 h-4 text-[#1E40AF]" />
        </div>
        <div>
          <h3 className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 800 }}>
            Patient Information
          </h3>
          <p className="text-[#94A3B8]" style={{ fontSize: "0.6875rem" }}>
            Report metadata & analysis parameters
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 divide-[#F8FAFC]">
        {infoItems.map((item, i) => (
          <div
            key={item.key}
            className={`flex items-start gap-3.5 px-6 py-4 ${
              i < 2 ? "sm:border-b sm:border-[#F8FAFC]" : ""
            } ${i % 2 === 0 ? "sm:border-r sm:border-[#F8FAFC]" : ""}`}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.bg }}
            >
              <item.icon className="w-[18px] h-[18px]" style={{ color: item.color }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-[#94A3B8] mb-0.5"
                style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em" }}
              >
                {item.label}
              </p>
              {item.key === "drugs" ? (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {drugsAnalyzed.map((drug) => (
                    <span
                      key={drug}
                      className="bg-[#EFF6FF] text-[#1E40AF] px-2.5 py-0.5 rounded-lg border border-[#DBEAFE]/60"
                      style={{ fontSize: "0.6875rem", fontWeight: 700 }}
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              ) : item.key === "patient" ? (
                <p
                  className="text-[#0F172A]"
                  style={{ fontSize: "1rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {values[item.key]}
                </p>
              ) : (
                <p
                  className="text-[#0F172A] truncate"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {values[item.key]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
