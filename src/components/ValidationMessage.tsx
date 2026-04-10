import type { ReactNode } from "react";

export type ValidationSeverity = "error" | "warning" | "info" | "success";
export type ValidationVariant  = "default" | "compact";

type ValidationMessageProps = {
  /** The validation message text */
  message: ReactNode;
  severity?: ValidationSeverity;
  /**
   * default — bordered pill, used below dropzones and file upload blocks
   * compact — no border, inline use within dense UI
   */
  variant?: ValidationVariant;
  className?: string;
};

const icons: Record<ValidationSeverity, ReactNode> = {
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.1L17 15.9H3L10 3.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 7V10.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="13.25" r="1" fill="currentColor" />
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
 * ValidationMessage — compact component-level validation feedback.
 *
 * Rules (Confluence Feedback System):
 *   - Component-level scope only (dropzones, file upload blocks, grouped inputs)
 *   - NOT dismissible — no close button
 *   - NO action buttons
 *   - Short, direct text — one constraint per message
 *   - Disappears when condition is resolved
 *   - Never use for cross-section issues → use InlineAlert instead
 *
 * Source: Figma node 5325:1696, Confluence page 2807988258
 */
export function ValidationMessage({
  message,
  severity = "error",
  variant  = "default",
  className,
}: ValidationMessageProps) {
  return (
    <div
      role="alert"
      className={[
        "cw-validation-msg",
        `cw-validation-msg--${severity}`,
        variant === "compact" ? "cw-validation-msg--compact" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="cw-validation-msg__icon" aria-hidden="true">
        {icons[severity]}
      </span>
      <p className="cw-validation-msg__text">{message}</p>
    </div>
  );
}
