import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant, ButtonColor } from "./Button";

// ─── Spinner ──────────────────────────────────────────────────────────────────

/** Standalone spinner — can be used independently of ButtonWithLoader */
export function Spinner({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={size === "sm" ? "cw-spinner cw-spinner--sm" : "cw-spinner"}
      aria-hidden="true"
    />
  );
}

// ─── ButtonWithLoader ─────────────────────────────────────────────────────────

type ButtonWithLoaderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?:   ButtonColor;
  /** When true, replaces content with a spinner and disables the button */
  loading?: boolean;
  /** Shown when not loading */
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?:   ReactNode;
  /** Square icon-only mode — matches IconButton layout */
  iconOnly?: boolean;
  className?: string;
};

/**
 * ButtonWithLoader — Button with built-in loading state.
 * When loading=true: shows spinner, disables interaction, preserves size.
 *
 * Usage:
 *   <ButtonWithLoader loading={isSubmitting} color="primary">Save</ButtonWithLoader>
 *   <ButtonWithLoader loading={isLoading} iconOnly variant="outlined" aria-label="Saving" />
 */
export function ButtonWithLoader({
  variant  = "contained",
  color    = "primary",
  loading  = false,
  iconOnly = false,
  children,
  startIcon,
  endIcon,
  className,
  disabled,
  ...rest
}: ButtonWithLoaderProps) {
  const isDisabled = disabled || loading;

  const classes = [
    "cw-btn",
    iconOnly ? "cw-icon-btn" : "cw-btn--medium",
    `cw-btn--${variant}`,
    `cw-btn--${color}`,
    isDisabled ? "cw-btn--disabled" : "",
    loading ? "cw-btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={isDisabled} {...rest}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {startIcon && (
            <span className="cw-btn__icon cw-btn__icon--start" aria-hidden="true">
              {startIcon}
            </span>
          )}
          {!iconOnly && children && (
            <span className="cw-btn__label">{children}</span>
          )}
          {endIcon && (
            <span className="cw-btn__icon cw-btn__icon--end" aria-hidden="true">
              {endIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
