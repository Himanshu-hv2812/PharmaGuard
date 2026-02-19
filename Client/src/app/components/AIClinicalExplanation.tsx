import { Sparkles, Brain, BookOpen, AlertCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface AIClinicalExplanationProps {
  explanation: string;
  recommendations: string[];
  references: string[];
  modelVersion: string;
}

export function AIClinicalExplanation({ explanation, recommendations, references, modelVersion }: AIClinicalExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-white rounded-2xl border border-[#E2E8F0]/80 overflow-hidden shadow-sm shadow-black/[0.02]"
    >
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4]" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#7C3AED]/15">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] opacity-20 blur-md"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 800 }}>
                AI Clinical Explanation
              </h3>
              <p className="text-[#94A3B8]" style={{ fontSize: "0.6875rem" }}>
                PharmaGuard AI · {modelVersion}
              </p>
            </div>
          </div>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F5F3FF] to-[#EEF2FF] text-[#7C3AED] px-3 py-1.5 rounded-full border border-[#DDD6FE]/50"
            style={{ fontSize: "0.625rem", fontWeight: 700 }}
          >
            <Brain className="w-3 h-3" />
            AI Generated
          </span>
        </div>

        {/* Explanation */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]/50 rounded-xl p-5 mb-5 border border-[#E2E8F0]/50">
          <p className="text-[#334155]" style={{ fontSize: "0.8125rem", lineHeight: 1.8 }}>
            {explanation}
          </p>
        </div>

        {/* Recommendations */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-[#1E40AF]" />
            <span className="text-[#0F172A]" style={{ fontSize: "0.8125rem", fontWeight: 800 }}>
              Clinical Recommendations
            </span>
          </div>
          <div className="space-y-2.5">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <span
                  className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5 border border-[#BFDBFE]/40"
                  style={{ fontSize: "0.625rem", fontWeight: 800 }}
                >
                  {i + 1}
                </span>
                <p className="text-[#475569]" style={{ fontSize: "0.8125rem", lineHeight: 1.7 }}>
                  {rec}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <div className="flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[#94A3B8]" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              REFERENCES
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {references.map((ref, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0]/60 hover:border-[#CBD5E1] hover:text-[#475569] transition-colors cursor-pointer"
                style={{ fontSize: "0.6875rem", fontWeight: 500 }}
              >
                <ChevronRight className="w-2.5 h-2.5" />
                {ref}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-3 bg-[#FFFBEB] border-t border-[#FDE68A]/50 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
        <p className="text-[#92400E]" style={{ fontSize: "0.6875rem", lineHeight: 1.5 }}>
          AI-generated insights are for clinical decision support only. Always verify with established guidelines before making treatment decisions.
        </p>
      </div>
    </motion.div>
  );
}
