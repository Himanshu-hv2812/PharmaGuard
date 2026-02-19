import { motion } from "motion/react";

interface Props {
  size?: number;
  className?: string;
}

export function AnimatedDNALogo({ size = 72, className = "" }: Props) {
  const w = size;
  const h = size;
  const cx = w / 2;
  const cy = h / 2;
  const r = w * 0.32;

  // Generate helix rungs
  const rungs = Array.from({ length: 7 }, (_, i) => {
    const t = (i / 6) * Math.PI;
    const y = cy - r + (i / 6) * r * 2;
    const spread = Math.sin(t) * r * 0.75;
    return { y, x1: cx - spread, x2: cx + spread, i };
  });

  return (
    <div className={`relative ${className}`} style={{ width: w, height: h }}>
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        className="relative z-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="dna-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="dna-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="dna-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left strand */}
        <motion.path
          d={`M ${cx - r * 0.6} ${cy - r} Q ${cx - r * 0.9} ${cy} ${cx - r * 0.6} ${cy + r}`}
          fill="none"
          stroke="url(#dna-grad-1)"
          strokeWidth={2.5}
          strokeLinecap="round"
          filter="url(#dna-glow)"
        />

        {/* Right strand */}
        <motion.path
          d={`M ${cx + r * 0.6} ${cy - r} Q ${cx + r * 0.9} ${cy} ${cx + r * 0.6} ${cy + r}`}
          fill="none"
          stroke="url(#dna-grad-2)"
          strokeWidth={2.5}
          strokeLinecap="round"
          filter="url(#dna-glow)"
        />

        {/* Rungs (base pairs) */}
        {rungs.map(({ y, x1, x2, i }) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke="#93C5FD"
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.7}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Node dots */}
        {rungs.map(({ y, x1, x2, i }) => (
          <g key={`dots-${i}`}>
            <motion.circle
              cx={x1}
              cy={y}
              r={2}
              fill="#3B82F6"
              animate={{ r: [1.5, 2.5, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
            <motion.circle
              cx={x2}
              cy={y}
              r={2}
              fill="#1E40AF"
              animate={{ r: [1.5, 2.5, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 + 0.5 }}
            />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}
