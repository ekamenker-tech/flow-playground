import type { ReactNode } from "react";
import { Icon } from "./Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = "xs" | "sm" | "md" | "lg";
export type ModalType = "simple" | "form" | "scrollable";

type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "destructive";
  loading?: boolean;
  disabled?: boolean;
};

type ModalProps = {
  /** Controls visibility */
  open: boolean;
  /** Dialog title — shown in header */
  title: ReactNode;
  /** Optional icon before title */
  titleIcon?: ReactNode;
  /** Modal content */
  children?: ReactNode;
  /**
   * simple     — header + content + actions, no dividers
   * form       — header + content + actions, with top/bottom dividers
   * scrollable — form with scrollable content area
   */
  type?: ModalType;
  /** Width: xs=480 sm=600 md=840 lg=1280 */
  size?: ModalSize;
  /** Primary and/or secondary actions in the footer */
  actions?: ModalAction[];
  /** Called when close button or backdrop is clicked */
  onClose?: () => void;
  className?: string;
  "aria-label"?: string;
};


/**
 * Modal — dialog overlay for confirmations, forms, and tools.
 *
 * Rules (Surface & Elevation system):
 *   - Always paired with <Backdrop open={open} onClick={onClose} />
 *   - surface.base background, elevation.modal shadow
 *   - z-index: 500 (above backdrop at 400)
 *   - All sizes use the same surface — only width changes
 *
 * Types:
 *   simple     — no dividers (confirmations, alerts)
 *   form       — dividers between header/content/actions (forms, tools)
 *   scrollable — form with scrollable content area (long content)
 *
 * Source: Figma node 4919:2939
 */
export function Modal({
  open,
  title,
  titleIcon,
  children,
  type = "simple",
  size = "xs",
  actions = [],
  onClose,
  className,
  "aria-label": ariaLabel,
}: ModalProps) {
  if (!open) return null;

  const hasDividers = type === "form" || type === "scrollable";
  const isScrollable = type === "scrollable";

  const classes = [
    "cw-modal",
    `cw-modal--${size}`,
    `cw-modal--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={classes}
    >
      {/* ── Header ── */}
      <div className="cw-modal__header">
        <div className="cw-modal__title">
          {titleIcon && (
            <span className="cw-modal__title-icon" aria-hidden="true">
              {titleIcon}
            </span>
          )}
          <span className="cw-modal__title-text">{title}</span>
        </div>
        {onClose && (
          <button
            className="cw-modal__close"
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
          >
            <Icon name="close" />
          </button>
        )}
      </div>

      {hasDividers && <div className="cw-modal__divider" aria-hidden="true" />}

      {/* ── Content ── */}
      <div className={isScrollable ? "cw-modal__content cw-modal__content--scroll" : "cw-modal__content"}>
        {children}
      </div>

      {/* ── Actions ── */}
      {actions.length > 0 && (
        <>
          {hasDividers && <div className="cw-modal__divider" aria-hidden="true" />}
          <div className="cw-modal__actions">
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={[
                  "cw-btn",
                  "cw-btn--medium",
                  action.variant === "destructive"
                    ? "cw-btn--contained cw-btn--destructive"
                    : action.variant === "secondary"
                    ? "cw-btn--contained cw-btn--secondary"
                    : "cw-btn--contained cw-btn--primary",
                  action.disabled ? "cw-btn--disabled" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
              >
                <span className="cw-btn__label">{action.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
