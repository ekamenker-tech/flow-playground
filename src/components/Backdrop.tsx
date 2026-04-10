import type { HTMLAttributes } from "react";

type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  /** Whether the backdrop is visible */
  open?: boolean;
  /** Click handler — typically closes the modal/drawer above */
  onClick?: () => void;
  className?: string;
};

/**
 * Backdrop — full-screen overlay that blocks interaction behind modals and bottom sheets.
 *
 * Rules (from Surface & Elevation system):
 *   - Modal dialogs:  surface.base + elevation.modal + Backdrop ✅
 *   - Bottom sheets:  surface.base + Backdrop, no elevation
 *   - Snackbars:      NO backdrop
 *   - Dropdowns:      NO backdrop
 *
 * fill:  rgba(0, 0, 0, 0.75)  — _components/backdrop/fill
 * blur:  8px                  — backdrop-filter: blur(8px)
 *
 * Usage:
 *   <Backdrop open={isOpen} onClick={onClose} />
 *
 * Source: Figma node 4852:5008
 */
export function Backdrop({ open = true, onClick, className, ...rest }: BackdropProps) {
  if (!open) return null;

  return (
    <div
      className={["cw-backdrop", className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-hidden="true"
      {...rest}
    />
  );
}
