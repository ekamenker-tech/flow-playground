
      {/* ══════════════════════════════════════════════ BACKDROP + MODAL */}
      <section className="comp-section">
        <div className="comp-section__header">
          <div>
            <p className="eyebrow">Component</p>
            <h2 className="comp-section__title">Backdrop · Modal</h2>
          </div>
          <span className="status-pill status-pill--info">3 types · 4 sizes</span>
        </div>

        <p style={{ color: "var(--cw-text-secondary)", fontSize: "0.875rem", margin: 0 }}>
          Backdrop always wraps Modal. Simple has no dividers; Form and Scrollable do.
        </p>

        <div className="comp-row comp-row--center">
          {(["simple","form","scrollable"] as ModalType[]).map((type) => (
            <Button key={type} variant="outlined" color="secondary" size="small"
              onClick={() => openModal(type)}>
              Open {type}
            </Button>
          ))}
        </div>

        <div className="comp-usage">
          <p className="eyebrow">Usage</p>
          <pre className="comp-code">{`<Backdrop open={isOpen} onClick={onClose} />\n<Modal open={isOpen} title="Confirm" type="simple" size="xs" onClose={onClose}\n  actions={[\n    { label: "Cancel", onClick: onClose, variant: "secondary" },\n    { label: "Delete", onClick: onDelete, variant: "destructive" },\n  ]}>\n  Are you sure you want to delete this clip?\n</Modal>`}</pre>
        </div>
      </section>

      {/* ── Backdrop + Modal rendered ── */}
      <Backdrop open={modalOpen} onClick={() => setModalOpen(false)} />
      <Modal
        open={modalOpen}
        title="Example modal"
        type={modalType}
        size="xs"
        onClose={() => setModalOpen(false)}
        actions={[
          { label: "Cancel", onClick: () => setModalOpen(false), variant: "secondary"    },
          { label: "Confirm", onClick: () => setModalOpen(false), variant: "primary"     },
        ]}
      >
        <p style={{ color: "var(--cw-text-secondary)", fontSize: "14px", lineHeight: "20px", margin: 0 }}>
          This is a <strong style={{ color: "var(--cw-text-primary)" }}>{modalType}</strong> modal
          at xs size. {modalType === "scrollable" && "In the scrollable type, the content area can overflow and scroll independently of the header and footer."}
          {modalType === "form" && "The form type adds dividers between header, content, and actions."}
          {modalType === "simple" && "The simple type has no dividers — best for confirmations."}
        </p>
      </Modal>

      {/* ── Snackbar rendered ── */}
      {snack && (
        <Snackbar
          severity={snack.severity}
          message={snack.message}
          onClose={() => setSnack(null)}
        />
      )}

    </main>
  );
}
