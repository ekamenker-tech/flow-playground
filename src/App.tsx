import { useState } from "react";
import { AdminAlertsDemoPage } from "./pages/AdminAlertsDemoPage";
import { ComponentsPage } from "./pages/ComponentsPage";

type Page = "demo" | "components";

const tabs: Array<{ id: Page; label: string }> = [
  { id: "demo",       label: "Admin Demo" },
  { id: "components", label: "Components" },
];

export function App() {
  const [page, setPage] = useState<Page>("components");

  return (
    <>
      <nav className="app-nav" aria-label="Pages">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab${page === tab.id ? " nav-tab--active" : ""}`}
            onClick={() => setPage(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {page === "demo"       && <AdminAlertsDemoPage />}
      {page === "components" && <ComponentsPage />}
    </>
  );
}
