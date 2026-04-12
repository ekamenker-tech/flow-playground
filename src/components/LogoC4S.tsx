import type { SVGProps } from "react";

/**
 * Clips4Sale logo — dark background variant.
 * Source: Figma node 1524:45048 "logo_on_dark_bg"
 *
 * Wordmark: "CLIPS" + yellow lightning bolt + "SALE" in heavy condensed sans.
 */
export function LogoC4S({ height = 22, ...props }: SVGProps<SVGSVGElement> & { height?: number }) {
  const w = Math.round((188 / 22) * height);
  return (
    <svg
      viewBox="0 0 188 22"
      width={w}
      height={height}
      fill="none"
      aria-label="Clips4Sale"
      role="img"
      {...props}
    >
      {/* CLIPS */}
      <text
        x="0" y="18"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        CLIPS
      </text>

      {/* Lightning bolt — yellow, sits between CLIPS and SALE */}
      {/* Bolt shape: narrow zigzag polygon */}
      <polygon
        points="76,2 68,12 73,12 65,22 77,10 71,10"
        fill="#ffcc17"
      />

      {/* SALE */}
      <text
        x="82" y="18"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        SALE
      </text>
    </svg>
  );
}
