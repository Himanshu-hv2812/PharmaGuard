import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Microscope, ArrowRight, RotateCcw, ShieldCheck, Activity,
  FlaskConical, Dna, Sparkles,
} from "lucide-react";
import { Header } from "./Header";
import { FileUpload } from "./FileUpload";
import { DrugInput } from "./DrugInput";
import { LoadingState } from "./LoadingState";
import { PatientInfoCard } from "./PatientInfoCard";
import { RiskAssessmentCard } from "./RiskAssessmentCard";
import { GeneticProfilePanel } from "./GeneticProfilePanel";
import { AIClinicalExplanation } from "./AIClinicalExplanation";
import { ActionButtons } from "./ActionButtons";

type AppState = "empty" | "loading" | "results";

const mockVariants = [
  {
    gene: "CYP2C9",
    diplotype: "*2/*3",
    phenotype: "Poor Metabolizer",
    activityScore: "0.5",
    clinicalSignificance: "Poor" as const,
    affectedDrugs: ["WARFARIN", "CELECOXIB"],
  },
  {
    gene: "CYP2D6",
    diplotype: "*4/*4",
    phenotype: "Poor Metabolizer",
    activityScore: "0.0",
    clinicalSignificance: "Poor" as const,
    affectedDrugs: ["CODEINE", "TRAMADOL"],
  },
  {
    gene: "CYP2C19",
    diplotype: "*1/*2",
    phenotype: "Intermediate Metabolizer",
    activityScore: "1.0",
    clinicalSignificance: "Reduced" as const,
    affectedDrugs: ["CLOPIDOGREL", "OMEPRAZOLE"],
  },
  {
    gene: "VKORC1",
    diplotype: "-1639 A/A",
    phenotype: "High Sensitivity",
    activityScore: "N/A",
    clinicalSignificance: "Reduced" as const,
    affectedDrugs: ["WARFARIN"],
  },
  {
    gene: "CYP3A5",
    diplotype: "*1/*3",
    phenotype: "Intermediate Metabolizer",
    activityScore: "1.0",
    clinicalSignificance: "Normal" as const,
    affectedDrugs: ["TACROLIMUS"],
  },
];

const mockDrugRisks = [
  { drug: "WARFARIN", risk: "toxic" as const, confidence: 98, summary: "CYP2C9 Poor Metabolizer + VKORC1 High Sensitivity" },
  { drug: "CODEINE", risk: "toxic" as const, confidence: 96, summary: "CYP2D6 PM — No analgesic effect, risk of toxicity" },
  { drug: "CLOPIDOGREL", risk: "adjust" as const, confidence: 89, summary: "CYP2C19 IM — Reduced antiplatelet response" },
];

const mockExplanation = `Based on the comprehensive pharmacogenomic analysis of patient PAT-9928's VCF data, critical gene-drug interactions have been identified. The patient carries CYP2C9 *2/*3 diplotype (Poor Metabolizer, activity score 0.5) combined with VKORC1 -1639 A/A genotype, indicating significantly increased sensitivity to Warfarin. Standard dosing would result in supra-therapeutic INR levels and severe bleeding risk. Additionally, the CYP2D6 *4/*4 genotype (Poor Metabolizer) renders Codeine ineffective as it cannot be converted to its active metabolite morphine, while simultaneously increasing risk of adverse effects from parent compound accumulation.`;

const mockRecommendations = [
  "WARFARIN: Initiate therapy at ≤2mg/day (60-80% reduction from standard dose). Use IWPC dosing algorithm incorporating CYP2C9 and VKORC1 genotypes. Monitor INR every 2-3 days during initiation.",
  "CODEINE: Contraindicated. Select alternative analgesic not metabolized by CYP2D6 (e.g., acetaminophen, NSAIDs, or morphine if opioid required).",
  "CLOPIDOGREL: Consider alternative antiplatelet therapy (e.g., prasugrel or ticagrelor) for patients requiring dual antiplatelet therapy post-ACS or PCI.",
  "Order confirmatory clinical-grade pharmacogenomic testing if analysis was based on research-grade VCF data.",
];

const mockReferences = [
  "CPIC® Guideline: Warfarin (2017)",
  "CPIC® Guideline: Codeine (2019)",
  "PharmGKB: CYP2C19-Clopidogrel",
  "FDA Table of PGx Biomarkers",
  "DPWG Guidelines v3.2",
];

const mockResultData = {
  patientId: "PAT-9928",
  timestamp: "2026-02-19T14:32:00Z",
  overallRisk: "toxic",
  confidence: 98,
  variants: mockVariants,
  drugRisks: mockDrugRisks,
  aiExplanation: mockExplanation,
  recommendations: mockRecommendations,
};

export function Dashboard() {
  const [appState, setAppState] = useState<AppState>("empty");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const canAnalyze = selectedFile && selectedDrugs.length > 0;

  const handleAnalyze = useCallback(() => {
    if (!canAnalyze) return;
    setAppState("loading");
    setProgress(0);
    setCurrentStep(0);
  }, [canAnalyze]);

  const handleReset = useCallback(() => {
    setAppState("empty");
    setSelectedFile(null);
    setSelectedDrugs([]);
    setProgress(0);
    setCurrentStep(0);
  }, []);

  // Loading simulation
  useEffect(() => {
    if (appState !== "loading") return;

    const totalDuration = 4000;
    const stepDuration = totalDuration / 4;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      const newStep = Math.min(Math.floor(elapsed / stepDuration), 3);

      setProgress(newProgress);
      setCurrentStep(newStep);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setTimeout(() => setAppState("results"), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [appState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <AnimatePresence mode="wait">
            {/* ═════════ EMPTY STATE ═════════ */}
            {appState === "empty" && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Hero Section */}
                <div className="text-center mb-10 pt-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] text-[#1E40AF] px-4 py-2 rounded-full mb-5 shadow-sm"
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    FDA-Grade Clinical Decision Support
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-[#0F172A] mb-3"
                    style={{ fontSize: "1.875rem", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.03em" }}
                  >
                    Pharmacogenomic Risk Analysis
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#64748B] max-w-lg mx-auto"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}
                  >
                    Upload a patient VCF file and specify medications to receive
                    AI-powered risk assessment with clinical recommendations.
                  </motion.p>
                </div>

                {/* Input Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#E2E8F0]/70 shadow-xl shadow-black/[0.03] p-7 sm:p-9 max-w-2xl mx-auto"
                >
                  {/* Step indicators */}
                  <div className="flex items-center gap-3 mb-8">
                    {[
                      { num: 1, label: "Upload VCF", icon: Dna, done: !!selectedFile },
                      { num: 2, label: "Select Drugs", icon: FlaskConical, done: selectedDrugs.length > 0 },
                      { num: 3, label: "Analyze", icon: Microscope, done: false },
                    ].map((step, i) => (
                      <div key={step.num} className="flex items-center gap-2.5 flex-1">
                        <motion.div
                          animate={step.done ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`
                            w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                            ${step.done
                              ? "bg-[#16A34A] text-white shadow-sm shadow-[#16A34A]/20"
                              : "bg-[#F1F5F9] text-[#94A3B8]"
                            }
                          `}
                          style={{ fontSize: "0.75rem", fontWeight: 700 }}
                        >
                          {step.done ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <step.icon className="w-4 h-4" />
                          )}
                        </motion.div>
                        <span
                          className={`hidden sm:block transition-colors ${step.done ? "text-[#0F172A]" : "text-[#94A3B8]"}`}
                          style={{ fontSize: "0.75rem", fontWeight: 600 }}
                        >
                          {step.label}
                        </span>
                        {i < 2 && (
                          <div className={`flex-1 h-px transition-colors duration-500 ${step.done ? "bg-[#16A34A]/30" : "bg-[#E2E8F0]"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <FileUpload
                      onFileSelected={setSelectedFile}
                      selectedFile={selectedFile}
                    />

                    <div className="h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent" />

                    <DrugInput
                      selectedDrugs={selectedDrugs}
                      onDrugsChange={setSelectedDrugs}
                    />

                    <motion.button
                      onClick={handleAnalyze}
                      disabled={!canAnalyze}
                      whileTap={canAnalyze ? { scale: 0.98 } : {}}
                      className={`
                        w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300 mt-2
                        ${canAnalyze
                          ? "bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white shadow-xl shadow-[#1E40AF]/25 hover:shadow-2xl hover:shadow-[#1E40AF]/30 hover:from-[#1E3A8A] hover:to-[#1E40AF]"
                          : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
                        }
                      `}
                      style={{ fontSize: "0.9375rem", fontWeight: 700 }}
                    >
                      {canAnalyze ? (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Run Pharmacogenomic Analysis
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Microscope className="w-5 h-5" />
                          Complete Steps Above to Analyze
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10 text-[#94A3B8]"
                  style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    HIPAA Compliant
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    CPIC® Guidelines
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    PharmGKB Validated
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ═════════ LOADING STATE ═════════ */}
            {appState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <LoadingState progress={progress} currentStep={currentStep} />
              </motion.div>
            )}

            {/* ═════════ RESULTS STATE ═════════ */}
            {appState === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-[#0F172A]" style={{ fontSize: "1.375rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
                        Analysis Results
                      </h2>
                      <span
                        className="bg-[#F0FDF4] text-[#15803D] px-2.5 py-0.5 rounded-lg border border-[#BBF7D0]/50"
                        style={{ fontSize: "0.625rem", fontWeight: 700 }}
                      >
                        COMPLETE
                      </span>
                    </div>
                    <p className="text-[#64748B]" style={{ fontSize: "0.8125rem" }}>
                      Pharmacogenomic risk assessment for patient <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>PAT-9928</span>
                    </p>
                  </div>
                  <motion.button
                    onClick={handleReset}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] text-[#475569] px-5 py-2.5 rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:shadow-sm transition-all"
                    style={{ fontSize: "0.8125rem", fontWeight: 700 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Analysis
                  </motion.button>
                </div>

                {/* Patient Info */}
                <PatientInfoCard
                  patientId="PAT-9928"
                  timestamp="Feb 19, 2026 · 02:32 PM UTC"
                  fileName={selectedFile?.name || "patient_sample.vcf"}
                  drugsAnalyzed={selectedDrugs.length > 0 ? selectedDrugs : ["WARFARIN", "CODEINE", "CLOPIDOGREL"]}
                />

                {/* Risk Assessment */}
                <RiskAssessmentCard
                  overallRisk="toxic"
                  overallConfidence={98}
                  drugRisks={mockDrugRisks}
                />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <GeneticProfilePanel variants={mockVariants} />
                  <AIClinicalExplanation
                    explanation={mockExplanation}
                    recommendations={mockRecommendations}
                    references={mockReferences}
                    modelVersion="v4.2-CPIC"
                  />
                </div>

                {/* Action Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E2E8F0]/70 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-[#64748B]">
                    <Dna className="w-4 h-4 text-[#3B82F6]" />
                    <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                      Report <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>PG-2026-0219-9928</span> · PharmaGuard AI
                    </span>
                  </div>
                  <ActionButtons resultData={mockResultData} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0]/60 bg-white/60 backdrop-blur-sm py-5 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#94A3B8]" style={{ fontSize: "0.6875rem" }}>
            © 2026 PharmaGuard. For clinical decision support only. Not a substitute for professional medical judgment.
          </p>
          <div className="flex items-center gap-5 text-[#94A3B8]" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
            <span className="hover:text-[#64748B] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#64748B] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#64748B] cursor-pointer transition-colors">Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
