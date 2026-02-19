import { useState, useRef, useCallback } from "react";
import { Search, X, Pill, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DRUG_SUGGESTIONS = [
  "WARFARIN", "CODEINE", "CLOPIDOGREL", "TAMOXIFEN", "OMEPRAZOLE",
  "SIMVASTATIN", "METOPROLOL", "AMITRIPTYLINE", "FLUOXETINE", "TRAMADOL",
  "VORICONAZOLE", "CAPECITABINE", "IRINOTECAN", "ABACAVIR", "CARBAMAZEPINE",
  "PHENYTOIN", "TACROLIMUS", "MERCAPTOPURINE", "AZATHIOPRINE", "THIOGUANINE",
];

interface DrugInputProps {
  selectedDrugs: string[];
  onDrugsChange: (drugs: string[]) => void;
}

export function DrugInput({ selectedDrugs, onDrugsChange }: DrugInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = DRUG_SUGGESTIONS.filter(
    (drug) =>
      drug.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedDrugs.includes(drug)
  );

  const addDrug = useCallback(
    (drug: string) => {
      if (!selectedDrugs.includes(drug)) {
        onDrugsChange([...selectedDrugs, drug]);
      }
      setInputValue("");
      setShowSuggestions(false);
      inputRef.current?.focus();
    },
    [selectedDrugs, onDrugsChange]
  );

  const removeDrug = useCallback(
    (drug: string) => {
      onDrugsChange(selectedDrugs.filter((d) => d !== drug));
    },
    [selectedDrugs, onDrugsChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        addDrug(inputValue.trim().toUpperCase());
      }
      if (e.key === "Backspace" && !inputValue && selectedDrugs.length > 0) {
        removeDrug(selectedDrugs[selectedDrugs.length - 1]);
      }
    },
    [inputValue, selectedDrugs, addDrug, removeDrug]
  );

  return (
    <div className="w-full">
      <label className="flex items-center gap-1.5 text-[#0F172A] mb-2.5" style={{ fontSize: "0.8125rem", fontWeight: 700 }}>
        <Pill className="w-3.5 h-3.5 text-[#3B82F6]" />
        Medications to Analyze
      </label>

      <div className="relative">
        <div
          className="flex flex-wrap items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 py-3 min-h-[52px] focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-[#3B82F6]/10 focus-within:bg-white transition-all cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <AnimatePresence>
            {selectedDrugs.map((drug) => (
              <motion.span
                key={drug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#DBEAFE] to-[#EFF6FF] text-[#1E40AF] pl-2.5 pr-1.5 py-1 rounded-lg shrink-0 border border-[#BFDBFE]/50"
                style={{ fontSize: "0.75rem", fontWeight: 600 }}
              >
                <Pill className="w-3 h-3" />
                {drug}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDrug(drug);
                  }}
                  className="w-4 h-4 flex items-center justify-center rounded hover:bg-[#1E40AF]/15 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={selectedDrugs.length === 0 ? "Type a drug name (e.g. WARFARIN)..." : "Add more..."}
            className="flex-1 min-w-[140px] bg-transparent border-none outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
            style={{ fontSize: "0.875rem" }}
          />
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl shadow-black/8 z-10 max-h-52 overflow-y-auto py-1.5"
            >
              {filteredSuggestions.slice(0, 6).map((drug) => (
                <button
                  key={drug}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addDrug(drug);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#EFF6FF] transition-colors text-left group"
                  style={{ fontSize: "0.8125rem" }}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] group-hover:bg-[#DBEAFE] flex items-center justify-center transition-colors">
                    <Pill className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  </div>
                  <span className="text-[#0F172A] flex-1" style={{ fontWeight: 600 }}>{drug}</span>
                  <Plus className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#3B82F6] transition-colors" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[#94A3B8] mt-2" style={{ fontSize: "0.6875rem" }}>
        Type drug names and press Enter, or select from suggestions
      </p>
    </div>
  );
}
