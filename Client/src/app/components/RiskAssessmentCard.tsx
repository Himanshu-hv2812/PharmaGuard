import { AlertTriangle, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

type RiskLevel = "safe" | "adjust" | "toxic";

interface DrugRisk {
  drug: string;
  risk: RiskLevel;
  confidence: number;
  summary: string;
}

interface RiskAssessmentCardProps {
  overallRisk: RiskLevel;
  overallConfidence: number;
  drugRisks: DrugRisk[];
}

const riskConfig = {
  safe: {
    bg: "bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5]",
    border: "border-[#BBF7D0]",
    accentBg: "bg-gradient-to-br from-[#16A34A] to-[#22C55E]",
    text: "text-[#15803D]",
    lightBg: "bg-[#DCFCE7]/60",
    icon: CheckCircle2,
    label: "SAFE TO PRESCRIBE",
    description: "No significant pharmacogenomic risks detected",
    color: "#10B981",
    gradient: "from-[#10B981] to-[#22C55E]",
  },
  adjust: {
    bg: "bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/60",
    border: "border-[#FDE68A]",
    accentBg: "bg-gradient-to-br from-[#D97706] to-[#F59E0B]",
    text: "text-[#92400E]",
    lightBg: "bg-[#FEF3C7]/60",
    icon: AlertTriangle,
    label: "DOSAGE ADJUSTMENT",
    description: "Dosage modification recommended based on genetic profile",
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FBBF24]",
  },
  toxic: {
    bg: "bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2]/60",
    border: "border-[#FECACA]",
    accentBg: "bg-gradient-to-br from-[#DC2626] to-[#EF4444]",
    text: "text-[#991B1B]",
    lightBg: "bg-[#FEE2E2]/60",
    icon: XCircle,
    label: "HIGH RISK — AVOID",
    description: "Critical pharmacogenomic interaction — do not prescribe",
    color: "#EF4444",
    gradient: "from-[#EF4444] to-[#F87171]",
  },
};

export function RiskAssessmentCard({ overallRisk, overallConfidence, drugRisks }: RiskAssessmentCardProps) {
  const config = riskConfig[overallRisk];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`rounded-2xl border-2 ${config.border} ${config.bg} overflow-hidden shadow-sm`}
      style={{ boxShadow: `0 4px 24px ${config.color}10` }}
    >
      {/* Main Risk Banner */}
      <div className="p-6">
        <div className="flex items-start gap-5">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
            className={`w-16 h-16 ${config.accentBg} rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}
            style={{ boxShadow: `0 8px 32px ${config.color}35` }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <span
              className={`${config.text} tracking-wider`}
              style={{ fontSize: "0.625rem", fontWeight: 800, letterSpacing: "0.12em" }}
            >
              RISK ASSESSMENT
            </span>
            <h2 className={`${config.text} mt-1 mb-1.5`} style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {config.label}
            </h2>
            <p className={`${config.text} opacity-75`} style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
              {config.description}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="hidden sm:flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative w-[72px] h-[72px]">
              <svg className="w-[72px] h-[72px] -rotate-90" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" fill="none" stroke={`${config.color}15`} strokeWidth="5" />
                <motion.circle
                  cx="36" cy="36" r="30" fill="none" stroke={config.color} strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - overallConfidence / 100) }}
                  transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`${config.text}`}
                  style={{ fontSize: "1rem", fontWeight: 900, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {overallConfidence}%
                </span>
              </div>
            </div>
            <span
              className={`${config.text} opacity-50`}
              style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              CONFIDENCE
            </span>
          </div>
        </div>
      </div>

      {/* Drug-specific risks */}
      <div className="border-t-2 border-dashed px-6 py-5" style={{ borderColor: `${config.color}20` }}>
        <p className={`${config.text} mb-4`} style={{ fontSize: "0.625rem", fontWeight: 800, letterSpacing: "0.08em" }}>
          DRUG-SPECIFIC ANALYSIS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {drugRisks.map((dr, i) => {
            const dConfig = riskConfig[dr.risk];
            const DIcon = dConfig.icon;
            return (
              <motion.div
                key={dr.drug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-center gap-3 ${dConfig.lightBg} rounded-xl px-4 py-3.5 border ${dConfig.border} hover:shadow-sm transition-shadow`}
              >
                <div className={`w-9 h-9 rounded-lg ${dConfig.accentBg} flex items-center justify-center shrink-0`}>
                  <DIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#0F172A]"
                    style={{ fontSize: "0.8125rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {dr.drug}
                  </p>
                  <p className={`${dConfig.text} opacity-75 truncate`} style={{ fontSize: "0.6875rem", lineHeight: 1.4 }}>
                    {dr.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className={`w-3 h-3 ${dConfig.text}`} />
                  <span
                    className={`${dConfig.text}`}
                    style={{ fontSize: "0.75rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {dr.confidence}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
