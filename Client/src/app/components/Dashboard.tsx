import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Upload, FileText, Activity, LogOut, Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return setError("Please select a VCF file first.");
    
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("vcf", file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user?.token}`
        }
      };
      
      const res = await axios.post(`${API_BASE_URL}/api/analyze`, formData, config);
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-blue-600 mb-8">PharmaGuard</h2>
        <nav className="space-y-2 flex-1">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Activity size={20} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <FileText size={20} /> Reports
          </button>
        </nav>
        <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Research Dashboard</h1>
            <p className="text-slate-500">Welcome, {user?.name}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-4">Analyze VCF Data</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input type="file" accept=".vcf" onChange={handleFileChange} className="hidden" id="vcf-upload" />
              <label htmlFor="vcf-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="text-slate-400 mb-4" size={40} />
                <span className="text-slate-600 font-medium">
                  {file ? file.name : "Click to upload VCF file"}
                </span>
                <span className="text-slate-400 text-sm mt-1">Maximum file size: 10MB</span>
              </label>
            </div>
            
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            
            <button 
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : "Start AI Analysis"}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
                  Analysis Complete: {result.variantsCount} variants identified.
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 whitespace-pre-wrap">{result.aiSummary}</p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <Activity size={48} className="mb-4 opacity-20" />
                <p>Upload a file to see AI insights</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}