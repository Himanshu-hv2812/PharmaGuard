import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2,
  User, Building2, Stethoscope, CheckCircle2,
  Dna, Activity, FlaskConical, ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { AnimatedDNALogo } from "./AnimatedDNALogo";

type AuthMode = "login" | "signup";

const ROLES = [
  "Clinical Pharmacologist",
  "Clinical Genomics Specialist",
  "Physician / Prescriber",
  "Pharmacist",
  "Research Scientist",
  "Lab Director",
  "Other",
];

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* ── Left Panel — Branding ── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#1E40AF] flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <AnimatedDNALogo size={28} />
            </div>
            <div>
              <span className="text-white block" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                PharmaGuard
              </span>
              <span className="text-[#93C5FD]" style={{ fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.08em' }}>
                PHARMACOGENOMIC ANALYTICS
              </span>
            </div>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-white mb-4" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Precision Medicine,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] to-[#06B6D4]">
                Powered by AI.
              </span>
            </h1>
            <p className="text-[#94A3B8] max-w-sm" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
              Transform patient VCF data into actionable pharmacogenomic insights with clinical-grade AI analysis.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative z-10 space-y-4">
          {[
            { icon: Dna, text: "VCF variant analysis with CPIC guidelines" },
            { icon: Activity, text: "Real-time drug-gene interaction alerts" },
            { icon: FlaskConical, text: "AI-powered clinical recommendations" },
          ].map((feat) => (
            <div key={feat.text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <feat.icon className="w-4 h-4 text-[#93C5FD]" />
              </div>
              <span className="text-[#CBD5E1]" style={{ fontSize: '0.8125rem' }}>{feat.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="relative z-10 flex items-center gap-4 pt-6 border-t border-white/10">
          <span className="text-[#64748B]" style={{ fontSize: '0.6875rem' }}>Trusted by 200+ institutions worldwide</span>
        </motion.div>
      </div>

      {/* ── Right Panel — Forms ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-md shadow-[#1E40AF]/15">
              <AnimatedDNALogo size={22} />
            </div>
            <span className="text-[#0F172A]" style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em' }}>PharmaGuard</span>
          </Link>

          {/* ── Tab Switcher ── */}
          <div className="bg-[#F1F5F9] rounded-2xl p-1.5 flex mb-8">
            {(["login", "signup"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`flex-1 py-3 rounded-xl transition-all duration-200 ${
                  mode === tab
                    ? "bg-white text-[#0F172A] shadow-md shadow-black/5"
                    : "text-[#64748B] hover:text-[#475569]"
                }`}
                style={{ fontSize: '0.8125rem', fontWeight: 600 }}
              >
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* ── Animated form area ── */}
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <SignupForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-4 mt-10 text-[#CBD5E1]" style={{ fontSize: '0.6875rem' }}>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> HIPAA Compliant</span>
            <span>·</span>
            <span>SOC 2 Type II</span>
            <span>·</span>
            <span>256-bit Encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━ Login Form ━━━━━━━━━━━━━━━━━━ */
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const canSubmit = email.trim() && password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Welcome back, Doctor!", { description: "Redirecting to dashboard..." });
        navigate("/dashboard");
      }
    } catch {
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[#0F172A] mb-1" style={{ fontSize: '1.375rem', fontWeight: 800, lineHeight: 1.2 }}>Welcome back</h2>
        <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Sign in to your clinical dashboard</p>
      </div>

      {/* Demo notice */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 mb-5 flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
        <div>
          <p className="text-[#1E40AF]" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Demo Mode</p>
          <p className="text-[#3B82F6]" style={{ fontSize: '0.6875rem' }}>Use any email & password to sign in.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.org"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none"
              style={{ fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[#0F172A]" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Password</label>
            <button type="button" className="text-[#3B82F6] hover:text-[#1E40AF] transition-colors" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-12 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none"
              style={{ fontSize: '0.875rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] transition-colors"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px] text-[#94A3B8]" /> : <Eye className="w-[18px] h-[18px] text-[#94A3B8]" />}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className={`w-[18px] h-[18px] rounded flex items-center justify-center border transition-all ${
              rememberMe ? "bg-[#1E40AF] border-[#1E40AF]" : "bg-white border-[#CBD5E1]"
            }`}
          >
            {rememberMe && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span className="text-[#64748B]" style={{ fontSize: '0.8125rem' }}>Keep me signed in for 30 days</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || isLoading}
          className={`
            w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl transition-all duration-200
            ${canSubmit && !isLoading
              ? "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] shadow-lg shadow-[#1E40AF]/25 hover:shadow-xl hover:shadow-[#1E40AF]/30 active:scale-[0.98]"
              : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            }
          `}
          style={{ fontSize: '0.9375rem', fontWeight: 700 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* SSO */}
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>or continue with</span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] py-2.5 rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google SSO
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] py-2.5 rounded-xl hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
          <svg className="w-4 h-4 text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.913 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
          </svg>
          Apple ID
        </button>
      </div>
    </>
  );
}


/* ━━━━━━━━━━━━━━━━━━ Signup Form ━━━━━━━━━━━━━━━━━━ */
function SignupForm() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "#EF4444" };
    if (score === 2) return { level: 2, label: "Fair", color: "#F59E0B" };
    if (score === 3) return { level: 3, label: "Good", color: "#3B82F6" };
    return { level: 4, label: "Strong", color: "#10B981" };
  };

  const strength = getPasswordStrength();
  const canStep1 = fullName.trim() && email.trim() && password.length >= 8 && password === confirmPassword;
  const canStep2 = institution.trim() && role && agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canStep2) return;
    setIsLoading(true);
    try {
      const success = await signup({ fullName, email, password, institution, role });
      if (success) {
        toast.success("Account created!", { description: "Welcome to PharmaGuard." });
        navigate("/dashboard");
      }
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="text-[#0F172A] mb-1" style={{ fontSize: '1.375rem', fontWeight: 800, lineHeight: 1.2 }}>Create your account</h2>
        <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>
          {step === 1 ? "Enter your credentials" : "Tell us about your practice"}
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-5">
        {[{ num: 1, label: "Credentials" }, { num: 2, label: "Profile" }].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2 flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                step > s.num ? "bg-[#16A34A] text-white" : step === s.num ? "bg-[#1E40AF] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"
              }`}
              style={{ fontSize: '0.75rem', fontWeight: 700 }}
            >
              {step > s.num ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : s.num}
            </div>
            <span className={`hidden sm:block ${step >= s.num ? "text-[#0F172A]" : "text-[#94A3B8]"}`} style={{ fontSize: '0.75rem', fontWeight: 500 }}>{s.label}</span>
            {i < 1 && <div className={`flex-1 h-px ${step > 1 ? "bg-[#16A34A]" : "bg-[#E2E8F0]"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Jane Smith" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none" style={{ fontSize: '0.875rem' }} />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Institutional Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="doctor@hospital.org" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none" style={{ fontSize: '0.875rem' }} />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-12 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none" style={{ fontSize: '0.875rem' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] transition-colors">
                    {showPassword ? <EyeOff className="w-[18px] h-[18px] text-[#94A3B8]" /> : <Eye className="w-[18px] h-[18px] text-[#94A3B8]" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-colors" style={{ backgroundColor: i <= strength.level ? strength.color : "#E2E8F0" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className={`w-full bg-[#F8FAFC] border rounded-xl pl-11 pr-4 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:ring-2 transition-all outline-none ${
                    confirmPassword && confirmPassword !== password ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10" : confirmPassword && confirmPassword === password ? "border-[#10B981] focus:border-[#10B981] focus:ring-[#10B981]/10" : "border-[#E2E8F0] focus:border-[#3B82F6] focus:ring-[#3B82F6]/10"
                  }`} style={{ fontSize: '0.875rem' }} />
                  {confirmPassword && confirmPassword === password && <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#10B981]" />}
                </div>
                {confirmPassword && confirmPassword !== password && <p className="text-[#EF4444] mt-1" style={{ fontSize: '0.6875rem' }}>Passwords do not match</p>}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canStep1}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl transition-all duration-200 mt-1 ${
                  canStep1 ? "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] shadow-lg shadow-[#1E40AF]/25 active:scale-[0.98]" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                }`}
                style={{ fontSize: '0.9375rem', fontWeight: 700 }}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
              {/* Institution */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Institution / Hospital</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="e.g. Mayo Clinic, Johns Hopkins" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none" style={{ fontSize: '0.875rem' }} />
                </div>
              </div>
              {/* Role */}
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Clinical Role</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] z-10" />
                  <select value={role} onChange={(e) => setRole(e.target.value)} className={`w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 appearance-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all outline-none ${role ? "text-[#0F172A]" : "text-[#CBD5E1]"}`} style={{ fontSize: '0.875rem' }}>
                    <option value="" disabled>Select your role</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* Terms */}
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#F1F5F9]">
                <div className="flex items-start gap-2.5">
                  <button type="button" onClick={() => setAgreeTerms(!agreeTerms)} className={`w-[18px] h-[18px] rounded flex items-center justify-center border transition-all shrink-0 mt-0.5 ${agreeTerms ? "bg-[#1E40AF] border-[#1E40AF]" : "bg-white border-[#CBD5E1]"}`}>
                    {agreeTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[#64748B]" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                    I agree to the <span className="text-[#1E40AF] cursor-pointer hover:underline">Terms of Service</span>, <span className="text-[#1E40AF] cursor-pointer hover:underline">Privacy Policy</span>, and <span className="text-[#1E40AF] cursor-pointer hover:underline">Clinical Data Usage Agreement</span>.
                  </span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setStep(1)} className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#475569] py-3.5 rounded-xl hover:bg-[#F8FAFC] transition-all" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!canStep2 || isLoading}
                  className={`flex-[2] flex items-center justify-center gap-2.5 py-3.5 rounded-xl transition-all duration-200 ${
                    canStep2 && !isLoading ? "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] shadow-lg shadow-[#1E40AF]/25 active:scale-[0.98]" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                  }`}
                  style={{ fontSize: '0.9375rem', fontWeight: 700 }}
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</>
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}