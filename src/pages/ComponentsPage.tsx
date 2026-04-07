import { useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import { InlineAlert, type InlineAlertSeverity, type InlineAlertStyle } from "../components/InlineAlert";

const allIcons: IconName[] = [
  "upload", "download", "home", "close", "plus", "minus", "search", "bell",
  "settings", "menu-burger", "chevron-down", "chevron-up", "chevron-left",
  "chevron-right", "arrow-left", "arrow-right", "check-mark", "info-circle",
  "warning-circle", "done-check", "exclamation-triangle", "trash", "edit",
  "copy", "lock", "star", "heart", "share", "users", "single-user", "logout",
  "calendar", "clock", "bolt", "play", "pause", "eye-on", "eye-off",
];

const iconSizes = [16, 20, 24, 32];

const alertVariants: Array<{ severity: InlineAlertSeverity; style: InlineAlertStyle }> = [
  { severity: "error",   style: "default" },
  { severity: "error",   style: "filled"  },
  { severity: "warning", style: "default" },
  { severity: "warning", style: "filled"  },
  { severity: "info",    style: "default" },
  { severity: "info",    style: "filled"  },
  { severity: "success", style: "default" },
  { severity: "success", style: "filled"  },
];

export function ComponentsPage() {
  const [iconSize, setIconSize] = useState<number>(20);
  const [copied, setCopied] = useState<string | null>(null);

  function copyName(name: string) {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <main className="comp-shell">

      {/* ── Icon component ── */}
      <section className="comp-section">
        <div className="comp-section__header">
          <div>
            <p className="eyebrow">Component</p>
            <h2 className="comp-section__title">Icon</h2>
          </div>
          <div className="comp-section__meta">
            <span className="status-pill status-pill--info">{allIcons.length} icons</span>
            <div className="size-picker" role="group" aria-label="Icon size">
              {iconSizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn${iconSize === s ? " size-btn--active" : ""}`}
                  onClick={() => setIconSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="icon-grid">
          {allIcons.map((name) => (
            <button
              key={name}
              className={`icon-tile${copied === name ? " icon-tile--copied" : ""}`}
              onClick={() => copyName(name)}
              title={`Copy "${name}"`}
            >
              <Icon name={name} size={iconSize} />
              <span className="icon-tile__label">{name}</span>
              {copied === name && <span className="icon-tile__toast">Copied!</span>}
            </button>
          ))}
        </div>

        <div className="comp-usage">
          <p className="eyebrow">Usage</p>
          <pre className="comp-code">{`import { Icon } from "./components/Icon";\n\n<Icon name="check-mark" size={20} />`}</pre>
        </div>
      </section>

      {/* ── InlineAlert component ── */}
      <section className="comp-section">
        <div className="comp-section__header">
          <div>
            <p className="eyebrow">Component</p>
            <h2 className="comp-section__title">InlineAlert</h2>
          </div>
          <span className="status-pill status-pill--info">8 variants</span>
        </div>

        <div className="alert-preview-grid">
          {alertVariants.map(({ severity, style }) => (
            <div key={`${severity}-${style}`} className="alert-preview-cell">
              <p className="alert-preview-label">{severity} / {style}</p>
              <InlineAlert
                severity={severity}
                style={style}
                title="Alert title"
                description="Supporting description text goes here."
                actionLabel="Action"
              />
            </div>
          ))}
        </div>

        <div className="comp-usage">
          <p className="eyebrow">Usage</p>
          <pre className="comp-code">{`import { InlineAlert } from "./components/InlineAlert";\n\n<InlineAlert\n  severity="error"\n  style="default"\n  title="Something went wrong."\n  description="Check the details and try again."\n  actionLabel="Retry"\n/>`}</pre>
        </div>
      </section>

    </main>
  );
}
