import { useState } from "react";
import { InlineAlert, type InlineAlertSeverity, type InlineAlertStyle } from "../components/InlineAlert";
import { ValidationMessage } from "../components/ValidationMessage";
import { Snackbar } from "../components/Snackbar";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Icon } from "../components/Icon";

const auditItems = [
  { label: "Org ID",   value: "cw-1982-ops"     },
  { label: "Region",   value: "Frankfurt / EU"   },
  { label: "Updated",  value: "2 minutes ago"    },
];

const queueRows = [
  { flow: "Identity verification", owner: "Risk Ops",   state: "Blocked"      },
  { flow: "VAT document review",   owner: "Compliance", state: "Needs review" },
  { flow: "Billing profile sync",  owner: "Platform",   state: "Healthy"      },
];

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

type SnackbarState = {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  actionLabel?: string;
} | null;

export function AdminAlertsDemoPage() {
  const [snackbar, setSnackbar] = useState<SnackbarState>(null);

  function showSnackbar(severity: SnackbarState["severity"], message: string, actionLabel?: string) {
    setSnackbar({ severity, message, actionLabel });
  }

  return (
    <main className="admin-shell">

      {/* ── Hero ── */}
      <section className="hero-card">
        <div className="hero-card__copy">
          <p className="eyebrow">C4S Flow Playground</p>
          <h1>Dark admin panel with DS components.</h1>
          <p className="hero-card__lede">
            Full design system preview: alerts, validation, snackbars, buttons, and more.
          </p>
        </div>
        <div className="hero-card__stats" aria-label="Workspace metadata">
          {auditItems.map((item) => (
            <div key={item.label} className="hero-card__stat">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-grid">

        {/* ── InlineAlert variants ── */}
        <article className="admin-panel admin-panel--wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Design system preview</p>
              <h2>InlineAlert variants</h2>
            </div>
            <span className="status-pill status-pill--info">8 variants</span>
          </div>
          <div className="alert-demo-grid">
            {alertVariants.map((item) => (
              <InlineAlert
                key={`${item.severity}-${item.style}`}
                severity={item.severity}
                style={item.style}
                title="Alert title"
                description="Supporting description text."
                actionLabel="Action"
              />
            ))}
          </div>
        </article>

        {/* ── Admin usage / workflow alerts ── */}
        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Admin usage</p>
              <h2>Section-level workflow state</h2>
            </div>
            <span className="status-pill status-pill--warning">Reusable</span>
          </div>

          <InlineAlert
            severity="error"
            title="Primary payout account failed verification."
            description="Update the beneficiary record before the April 1 payout batch to avoid an automatic hold."
            actionLabel="Review"
          />
          <InlineAlert
            severity="warning"
            title="Three onboarding flows need manual review."
            description="Stale tax attachments must be cleared before Friday export."
            actionLabel="Open queue"
          />
          <InlineAlert
            severity="info"
            title="Weekly export window starts in 3 hours."
            description="The queue will become read-only while the export job runs."
            actionLabel="Details"
          />
          <InlineAlert
            severity="success"
            title="Banking profile synced successfully."
            description="Details are now available across payouts, invoicing, and tax workflows."
            actionLabel="View log"
          />

          <div className="queue-list" role="table" aria-label="Review queue">
            {queueRows.map((row) => (
              <div key={row.flow} className="queue-row" role="row">
                <span role="cell">{row.flow}</span>
                <span role="cell">{row.owner}</span>
                <span role="cell">{row.state}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* ── ValidationMessage ── */}
      <section className="panel-grid">
        <article className="admin-panel admin-panel--wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Design system preview</p>
              <h2>ValidationMessage</h2>
            </div>
            <span className="status-pill status-pill--info">Component-level</span>
          </div>
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="eyebrow" style={{ marginBottom: 4 }}>Default (bordered)</p>
              <ValidationMessage severity="error"   message="All files must be the same format." />
              <ValidationMessage severity="warning" message="Image resolution may be too low for verification." />
              <ValidationMessage severity="info"    message="You may upload front and back separately." />
              <ValidationMessage severity="success" message="File uploaded successfully." />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p className="eyebrow" style={{ marginBottom: 4 }}>Compact (inline)</p>
              <ValidationMessage severity="error"   variant="compact" message="Performer ID is required." />
              <ValidationMessage severity="warning" variant="compact" message="This file is already attached." />
              <ValidationMessage severity="info"    variant="compact" message="Multiple pages can be merged after upload." />
              <ValidationMessage severity="success" variant="compact" message="Files merged into a single document." />
            </div>
          </div>
        </article>

        {/* ── Snackbar triggers ── */}
        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Design system preview</p>
              <h2>Snackbar</h2>
            </div>
            <span className="status-pill status-pill--info">Global / transient</span>
          </div>
          <p style={{ color: "var(--cw-text-secondary)", fontSize: "0.875rem", margin: 0 }}>
            Click to trigger. Auto-dismisses. Pauses on hover.
          </p>
          <div className="comp-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Button color="primary" variant="outlined" size="small"
              onClick={() => showSnackbar("success", "Changes saved.", "View")}>
              Success snackbar
            </Button>
            <Button color="secondary" variant="outlined" size="small"
              onClick={() => showSnackbar("info", "New pricing suggestions available.", "View details")}>
              Info snackbar
            </Button>
            <Button color="secondary" variant="outlined" size="small"
              onClick={() => showSnackbar("warning", "2 files failed to upload.", "Retry")}>
              Warning snackbar
            </Button>
            <Button color="error" variant="outlined" size="small"
              onClick={() => showSnackbar("error", "Upload failed. Please try again.", "Retry")}>
              Error snackbar
            </Button>
          </div>
        </article>
      </section>

      {/* ── Snackbar rendered ── */}
      {snackbar && (
        <Snackbar
          severity={snackbar.severity}
          message={snackbar.message}
          actionLabel={snackbar.actionLabel}
          onAction={() => setSnackbar(null)}
          onClose={() => setSnackbar(null)}
        />
      )}

    </main>
  );
}
