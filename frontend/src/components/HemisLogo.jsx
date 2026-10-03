import { GraduationCap } from "lucide-react";

export default function HemisLogo({ className = "", compact = false }) {
  return (
    <div className={`brand ${className}`}>
      <span className="brand-icon">
        <GraduationCap size={27} strokeWidth={1.8} />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>
            NSUMT<span>.</span>
          </strong>
          <small>Boshqaruv paneli</small>
        </span>
      )}
    </div>
  );
}
