import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, Dna } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FileUploadProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
}

export function FileUpload({ onFileSelected, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const removeFile = useCallback(() => {
    onFileSelected(null);
  }, [onFileSelected]);

  return (
    <div className="w-full">
      <label className="flex items-center gap-1.5 text-[#0F172A] mb-2.5" style={{ fontSize: "0.8125rem", fontWeight: 700 }}>
        <Dna className="w-3.5 h-3.5 text-[#3B82F6]" />
        Patient VCF File
      </label>
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="vcf-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative flex flex-col items-center justify-center w-full py-10 px-6
                border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
                ${
                  isDragging
                    ? "border-[#3B82F6] bg-[#EFF6FF] scale-[1.01]"
                    : "border-[#CBD5E1]/70 bg-[#F8FAFC] hover:border-[#93C5FD] hover:bg-[#FAFCFF]"
                }
              `}
            >
              {/* Animated icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  isDragging ? "bg-[#DBEAFE]" : "bg-[#EFF6FF]"
                }`}
                animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-[#1E40AF]" : "text-[#3B82F6]"}`} />
              </motion.div>
              <p className="text-[#0F172A] mb-1" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                {isDragging ? "Drop your file here" : "Drag & Drop your VCF file"}
              </p>
              <p className="text-[#94A3B8] mb-4" style={{ fontSize: "0.8125rem" }}>
                or click to browse from your computer
              </p>
              <span className="inline-flex items-center gap-1.5 text-[#64748B] bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-xl shadow-sm" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>
                <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                .vcf files only · Max 5MB
              </span>
              <input
                id="vcf-upload"
                type="file"
                accept=".vcf"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-3.5 bg-gradient-to-r from-[#F0FDF4] to-[#F0FDF4]/60 border border-[#BBF7D0] rounded-2xl px-5 py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-11 h-11 bg-[#DCFCE7] rounded-xl flex items-center justify-center shrink-0"
            >
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-[#0F172A] truncate" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                {selectedFile.name}
              </p>
              <p className="text-[#16A34A]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                {(selectedFile.size / 1024).toFixed(1)} KB · Ready for analysis
              </p>
            </div>
            <button
              onClick={removeFile}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] transition-all group"
            >
              <X className="w-4 h-4 text-[#94A3B8] group-hover:text-[#EF4444] transition-colors" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
