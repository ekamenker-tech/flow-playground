import type { ReactNode } from "react";

export type InlineAlertVariant = "error" | "warning";

type InlineAlertProps = {
  variant: InlineAlertVariant;
  title: string;
  description: ReactNode;
  meta?: string;
};

const variantLabels: Record<InlineAlertVariant, string> = {
  error: "Error",
  warning: "Warning",
};

export function InlineAlert({ variant, title, description, meta }: InlineAlertProps) {
  return (
    <section className={`inline-alert inline-alert--${variant}`} aria-live="polite">
      <div className="inline-alert__icon" aria-hidden="true">
        <AlertGlyph variant={variant} />
      </div>
      <div className="inline-alert__body">
        <div className="inline-alert__header">
          <span className="inline-alert__eyebrow">{variantLabels[variant]}</span>
          {meta ? <span className="inline-alert__meta">{meta}</span> : null}
        </div>
        <strong className="inline-alert__title">{title}</strong>
        <div className="inline-alert__description">{description}</div>
      </div>
    </section>
  );
}

function AlertGlyph({ variant }: { variant: InlineAlertVariant }) {
  if (variant === "error") {
    return (
      <svg viewBox="0 0 20 20" fill="none" role="presentation">
        <path
          d="M10 2.25L18 16.25H2L10 2.25Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 7V10.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="10" cy="13.55" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" role="presentation">
      <path
        d="M10 2.25L18 16.25H2L10 2.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 6.7V11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 13.6H10.01" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}