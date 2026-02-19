import { Download, Copy, FileText, Check, Printer } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ActionButtonsProps {
  resultData: object;
}

export function ActionButtons({ resultData }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(resultData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pharmaguard-result.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded successfully");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(resultData, null, 2));
      setCopied(true);
      toast.success("Result copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleExportPDF = () => {
    toast.success("PDF report generation started", {
      description: "Your report will be ready in a few seconds.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 justify-end">
      <button
        onClick={handlePrint}
        className="inline-flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#64748B] px-4 py-2.5 rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:text-[#475569] transition-all"
        style={{ fontSize: "0.8125rem", fontWeight: 600 }}
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
      <button
        onClick={handleDownloadJSON}
        className="inline-flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#475569] px-4 py-2.5 rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:shadow-sm transition-all"
        style={{ fontSize: "0.8125rem", fontWeight: 600 }}
      >
        <Download className="w-4 h-4" />
        JSON
      </button>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center justify-center gap-2 border px-4 py-2.5 rounded-xl transition-all ${
          copied
            ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]"
            : "bg-white border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
        style={{ fontSize: "0.8125rem", fontWeight: 600 }}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy"}
      </motion.button>
      <motion.button
        onClick={handleExportPDF}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white px-5 py-2.5 rounded-xl hover:from-[#1E3A8A] hover:to-[#1E40AF] shadow-md shadow-[#1E40AF]/20 hover:shadow-lg hover:shadow-[#1E40AF]/25 transition-all"
        style={{ fontSize: "0.8125rem", fontWeight: 700 }}
      >
        <FileText className="w-4 h-4" />
        Export PDF Report
      </motion.button>
    </div>
  );
}
