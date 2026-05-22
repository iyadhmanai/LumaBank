import type { CSSProperties } from "react";

type StatusBadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning";
};

const toneStyles: Record<NonNullable<StatusBadgeProps["tone"]>, CSSProperties> = {
  neutral: {
    background: "#eef1ef",
    color: "#2d3930"
  },
  success: {
    background: "#d8f1ec",
    color: "#0f5f58"
  },
  warning: {
    background: "#fff0c2",
    color: "#7a4b00"
  }
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span
      style={{
        ...toneStyles[tone],
        alignSelf: "flex-start",
        borderRadius: 999,
        display: "inline-flex",
        fontSize: "0.84rem",
        fontWeight: 700,
        lineHeight: 1,
        padding: "10px 12px",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </span>
  );
}
