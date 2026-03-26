import { InlineAlert } from "../components/InlineAlert";

const auditItems = [
  { label: "Org ID", value: "cw-1982-ops" },
  { label: "Region", value: "Frankfurt / EU" },
  { label: "Updated", value: "2 minutes ago" },
];

const queueRows = [
  { flow: "Identity verification", owner: "Risk Ops", state: "Blocked" },
  { flow: "VAT document review", owner: "Compliance", state: "Needs review" },
  { flow: "Billing profile sync", owner: "Platform", state: "Healthy" },
];

export function AdminAlertsDemoPage() {
  return (
    <main className="admin-shell">
      <section className="hero-card">
        <div className="hero-card__copy">
          <p className="eyebrow">C4S Flow Playground</p>
          <h1>Admin controls with reusable inline feedback.</h1>
          <p className="hero-card__lede">
            Dark workflow surface with a reusable design-system alert block for section-level errors
            and warnings.
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
        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">InlineAlert / error</p>
              <h2>Payout routing</h2>
            </div>
            <span className="status-pill status-pill--critical">Action required</span>
          </div>

          <InlineAlert
            variant="error"
            meta="Blocking"
            title="Primary payout account failed verification."
            description={
              <p>
                We could not confirm the beneficiary details for the selected IBAN. Update the
                account record before the April 1 payout batch to avoid an automatic hold.
              </p>
            }
          />

          <div className="detail-card">
            <div>
              <span className="detail-card__label">Beneficiary</span>
              <strong>Clipsale Commerce GmbH</strong>
            </div>
            <div>
              <span className="detail-card__label">IBAN ending</span>
              <strong>... 4409</strong>
            </div>
            <div>
              <span className="detail-card__label">Next run</span>
              <strong>Apr 1, 09:00 CET</strong>
            </div>
          </div>
        </article>

        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">InlineAlert / warning</p>
              <h2>Review queue</h2>
            </div>
            <span className="status-pill status-pill--warning">Monitor</span>
          </div>

          <InlineAlert
            variant="warning"
            meta="Non-blocking"
            title="A subset of records needs manual review."
            description={
              <p>
                Existing submissions remain valid, but 3 onboarding flows contain stale tax
                attachments. Resolve them before the weekly export on Friday.
              </p>
            }
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
    </main>
  );
}