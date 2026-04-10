import type { ReactNode } from "react";

export type InlineAlertSeverity = "error" | "warning" | "info" | "success";
export type InlineAlertStyle   = "default" | "filled";

type InlineAlertProps = {
  severity:     InlineAlertSeverity;
  style?:       InlineAlertStyle;
  title?:       ReactNode;
  description?: ReactNode;
  /** Label for the action button. Omit to hide the button entirely. */
  actionLabel?: string;
  onAction?:    () => void;
  /** Omit to hide the close button (use for blocking errors) */
  onClose?:     () => void;
  className?:   string;
};

const severityIcons: Record<InlineAlertSeverity, ReactNode> = {
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.9V10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="13.55" r="1" fill="currentColor" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.1L17 15.9H3L10 3.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 7V10.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="13.25" r="1" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="6.1" r="1" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.1L8.9 12.5L13.7 7.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};


/**
 * InlineAlert — section-level or workflow-level contextual alert.
 *
 * Rules (Confluence Feedback System):
 *   - Use when an issue affects more than one field or blocks progression
 *   - Blocking errors (error severity): omit onClose — not dismissible
 *   - Warning/Info: may include onClose
 *   - Max one action button, verb-first label (Retry, Review, Fix)
 *   - Never duplicate the same issue shown in a ValidationMessage
 *
 * Severities: error | warning | info | success
 * Styles:     default (tinted bg) | filled (solid bg)
 *
 * Source: Figma node 5322:4038, Confluence page 2807988258
 */
export function InlineAlert({
  severity,
  style     = "default",
  title,
  description,
  actionLabel,
  onAction,
  onClose,
  className,
}: InlineAlertProps) {
  return (
    <section
      role="alert"
      className={[
        "cw-inline-alert",
        `cw-inline-alert--${severity}`,
        `cw-inline-alert--${style}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon */}
      <span className="cw-inline-alert__icon" aria-hidden="true">
        {severityIcons[severity]}
      </span>

      {/* Text content */}
      <div className="cw-inline-alert__body">
        {title       && <p className="cw-inline-alert__title">{title}</p>}
        {description && <p className="cw-inline-alert__description">{description}</p>}
      </div>

      {/* Optional action */}
      {actionLabel && (
        <button
          type="button"
          className="cw-inline-alert__action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

      {/* Optional close */}
      {onClose && (
        <button
          type="button"
          className="cw-inline-alert__close"
          aria-label={`Dismiss ${severity} alert`}
          onClick={onClose}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5.5 5.5L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M14.5 5.5L5.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </section>
  );
}
