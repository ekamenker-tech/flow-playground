import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonDropdownVariant = "label" | "label-icon" | "label-dropdown" | "label-icon-dropdown";

type ButtonDropdownProps = {
  /** Button label text */
  label?: string;
  /** Optional start icon — shown in label-icon and label-icon-dropdown variants */
  startIcon?: ReactNode;
  /** Which layout variant to render */
  variant?: ButtonDropdownVariant;
  disabled?: boolean;
  /** Handler for the main button area click */
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  /** Handler for the dropdown chevron click (dropdown variants only) */
  onDropdownClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  "aria-label"?: string;
};


/**
 * ButtonDropdown — Secondary-colored split button with optional dropdown trigger.
 *
 * Variants:
 *   label              — text only
 *   label-icon         — start icon + text
 *   label-dropdown     — text + right divider + chevron trigger
 *   label-icon-dropdown — start icon + text + right divider + chevron trigger
 *
 * The dropdown chevron is a separate focusable button (onDropdownClick).
 * The dropdown panel itself is not managed here — pair with a menu/popover.
 *
 * Source: Figma node 4435:7986
 */
export function ButtonDropdown({
  label = "Button",
  startIcon,
  variant = "label",
  disabled = false,
  onClick,
  onDropdownClick,
  className,
  "aria-label": ariaLabel,
}: ButtonDropdownProps) {
  const hasDropdown = variant === "label-dropdown" || variant === "label-icon-dropdown";
  const hasIcon     = variant === "label-icon"     || variant === "label-icon-dropdown";

  const wrapClasses = [
    "cw-btn-dropdown",
    disabled ? "cw-btn-dropdown--disabled" : "",
    hasDropdown ? "cw-btn-dropdown--split" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapClasses} role="group">
      {/* ── Main button area ── */}
      <button
        className="cw-btn-dropdown__main"
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {hasIcon && startIcon && (
          <span className="cw-btn__icon cw-btn__icon--start" aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className="cw-btn__label">{label}</span>
      </button>

      {/* ── Dropdown trigger (split variants only) ── */}
      {hasDropdown && (
        <button
          className="cw-btn-dropdown__trigger"
          disabled={disabled}
          onClick={onDropdownClick}
          aria-label="Open dropdown"
          aria-haspopup="listbox"
        >
          <span className="cw-btn__icon" aria-hidden="true">
            <Icon name="chevron-down-large" />
          </span>
        </button>
      )}
    </div>
  );
}
