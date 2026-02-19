import { Dna, ChevronDown, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from 'react';

interface GeneVariant {
  gene: string;
  diplotype: string;
  phenotype: string;
  activityScore: string;
  clinicalSignificance: "Normal" | "Reduced" | "Poor" | "Rapid" | "Ultra-Rapid";
  affectedDrugs: string[];
}

interface GeneticProfilePanelProps {
  variants: GeneVariant[];
}

const significanceColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  Normal: { bg: "bg-[#F0FDF4]", text: "text-[#15803D]", dot: "bg-[#22C55E]", border: "border-[#BBF7D0]" },
  Reduced: { bg: "bg-[#FFFBEB]", text: "text-[#92400E]", dot: "bg-[#F59E0B]", border: "border-[#FDE68A]" },
  Poor: { bg: "bg-[#FEF2F2]", text: "text-[#991B1B]", dot: "bg-[#EF4444]", border: "border-[#FECACA]" },
  Rapid: { bg: "bg-[#EFF6FF]", text: "text-[#1E40AF]", dot: "bg-[#3B82F6]", border: "border-[#BFDBFE]" },
  "Ultra-Rapid": { bg: "bg-[#F5F3FF]", text: "text-[#5B21B6]", dot: "bg-[#8B5CF6]", border: "border-[#DDD6FE]" },
};

export function GeneticProfilePanel({ variants }: GeneticProfilePanelProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-[#E2E8F0]/80 overflow-hidden shadow-sm shadow-black/[0.02]"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] flex items-center justify-center">
            <Dna className="w-[18px] h-[18px] text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 800 }}>
              Genetic Profile
            </h3>
            <p className="text-[#94A3B8]" style={{ fontSize: "0.6875rem" }}>
              {variants.length} pharmacogenes detected
            </p>
          </div>
        </div>
      </div>

      {/* Table Header (Desktop) */}
      <div className="hidden lg:grid grid-cols-[1.2fr_1fr_1.3fr_0.8fr_1.5fr] gap-4 px-6 py-3 bg-[#F8FAFC]/80 border-b border-[#F1F5F9]">
        {["Gene", "Diplotype", "Phenotype", "Activity", "Affected Drugs"].map((h) => (
          <span key={h} className="text-[#94A3B8]" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em" }}>
            {h.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Variant Rows / Accordion */}
      <div className="divide-y divide-[#F8FAFC]">
        {variants.map((variant, index) => {
          const colors = significanceColors[variant.clinicalSignificance] || significanceColors.Normal;
          const isExpanded = expandedIndex === index;

          return (
            <div key={variant.gene}>
              {/* Desktop Row */}
              <div className="hidden lg:grid grid-cols-[1.2fr_1fr_1.3fr_0.8fr_1.5fr] gap-4 px-6 py-4 items-center hover:bg-[#FAFBFC] transition-colors group">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${colors.dot} ring-2 ring-white shadow-sm`} />
                  <span className="text-[#0F172A]" style={{ fontSize: "0.875rem", fontWeight: 800 }}>{variant.gene}</span>
                </div>
                <span
                  className="text-[#0F172A]"
                  style={{ fontSize: "0.8125rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {variant.diplotype}
                </span>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`}
                    style={{ fontSize: "0.6875rem", fontWeight: 700 }}
                  >
                    {variant.phenotype}
                  </span>
                </div>
                <span
                  className="text-[#475569]"
                  style={{ fontSize: "0.8125rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {variant.activityScore}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {variant.affectedDrugs.map((d) => (
                    <span
                      key={d}
                      className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md border border-[#E2E8F0]/60"
                      style={{ fontSize: "0.6875rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Accordion */}
              <div className="lg:hidden">
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${
                    isExpanded ? "bg-[#FAFBFC]" : "hover:bg-[#FAFBFC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${colors.dot} ring-2 ring-white shadow-sm`} />
                    <span className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 800 }}>{variant.gene}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`}
                      style={{ fontSize: "0.625rem", fontWeight: 700 }}
                    >
                      {variant.clinicalSignificance}
                    </span>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#F8FAFC] rounded-xl p-3">
                            <p className="text-[#94A3B8] mb-1" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em" }}>DIPLOTYPE</p>
                            <p className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{variant.diplotype}</p>
                          </div>
                          <div className="bg-[#F8FAFC] rounded-xl p-3">
                            <p className="text-[#94A3B8] mb-1" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em" }}>ACTIVITY</p>
                            <p className="text-[#0F172A]" style={{ fontSize: "0.9375rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{variant.activityScore}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[#94A3B8] mb-1.5" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em" }}>PHENOTYPE</p>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`} style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                            {variant.phenotype}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#94A3B8] mb-1.5" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em" }}>AFFECTED DRUGS</p>
                          <div className="flex flex-wrap gap-1.5">
                            {variant.affectedDrugs.map((d) => (
                              <span key={d} className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md border border-[#E2E8F0]/60" style={{ fontSize: "0.6875rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-6 py-3.5 bg-[#F8FAFC]/80 border-t border-[#F1F5F9]">
        <Info className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
        <span className="text-[#94A3B8]" style={{ fontSize: "0.6875rem" }}>
          Annotations sourced from CPIC® Guidelines & PharmGKB · Updated Feb 2026
        </span>
      </div>
    </motion.div>
  );
}