import { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { LogoC4S } from "./LogoC4S";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserMenuProps = {
  name: string;
  initials: string;
  userId: string;
  tipJarLabel?: string;
  onVisitStore?: () => void;
  onStoreDetails?: () => void;
  onPayoutSettings?: () => void;
  onContactInfo?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
};

type SiteHeaderProps = {
  /** Called when sidebar toggle is clicked */
  onSidebarToggle?: () => void;
  /** Upload button click */
  onUpload?: () => void;
  /** Chat icon click */
  onChat?: () => void;
  /** Notification icon click */
  onNotifications?: () => void;
  /** Notification badge count — omit to hide badge */
  notificationCount?: number;
  /** User info for avatar + menu */
  user: UserMenuProps;
  /** Current datetime string, e.g. "Tue Nov 7 - 8:45 PM" */
  datetime?: string;
  /** Timezone label */
  timezone?: string;
};

// ─── Menu item ────────────────────────────────────────────────────────────────

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
  dividerBefore?: boolean;
  rightIcon?: React.ReactNode;
};

// ─── SiteHeader ───────────────────────────────────────────────────────────────

/**
 * SiteHeader — full-width application header.
 *
 * Tokens from Figma node 1542:82549:
 *   bg:           header-nav/background-color-default = #201c26 (--cw-surface-base)
 *   border-bottom: header-nav/border-color-bottom-default = #3b3248 (--cw-mauve-700)
 *   date text:    header-nav/text-color-date = #ffffff
 *   tz text:      header-nav/text-color-timezone = #c3c3c3 (--cw-grey-500)
 *   icon color:   header-nav/icon-color-default = #ffffff
 *   badge bg:     header-nav/counter-background-color-default = #ffcc17 (--cw-yellow-500)
 *   badge text:   header-nav/counter-text-color-default = #000000
 *   badge border: header-nav/counter-border-color-default = #201c26
 *   avatar bg:    avatar/fallback-background-color = #514761 (--cw-charcoal-400)
 *   menu bg:      dropdown/container-background-color-default = #292431 (--cw-charcoal-500)
 *   menu border:  dropdown/option-border-color-bottom-default = #3b3248 (--cw-mauve-700)
 *   menu text:    dropdown/option-text-color-default = #ffffff
 *   logout text:  dropdown/option-text-color-error = #ff8983
 *
 * Source: Figma node 1520:38348
 */
export function SiteHeader({
  onSidebarToggle,
  onUpload,
  onChat,
  onNotifications,
  notificationCount,
  user,
  datetime = "Tue Nov 7 - 8:45 PM",
  timezone = "Eastern Time (New York)",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handler(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const menuItems: MenuItem[] = [
    {
      icon: <Icon name="store" />,
      label: "Visit My Store",
      onClick: user.onVisitStore,
      rightIcon: <Icon name="open-in-new" />,
    },
    {
      icon: <Icon name="user-profile" />,
      label: "Store Details",
      onClick: user.onStoreDetails,
    },
    {
      icon: <Icon name="payment" />,
      label: "Payout Settings",
      onClick: user.onPayoutSettings,
    },
    {
      icon: <Icon name="single-user" />,
      label: "Contact Info",
      onClick: user.onContactInfo,
    },
    {
      icon: <Icon name="settings" />,
      label: "Settings",
      onClick: user.onSettings,
    },
    {
      icon: <Icon name="logout" />,
      label: "Logout",
      onClick: user.onLogout,
      danger: true,
      dividerBefore: true,
    },
  ];

  return (
    <header className="cw-site-header">
      {/* ── Left: sidebar toggle + logo + datetime ── */}
      <div className="cw-site-header__left">
        <button
          className="cw-site-header__icon-btn"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <Icon name="menu-burger" iconSize="medium" />
        </button>

        <LogoC4S height={21} />

        <div className="cw-site-header__datetime">
          <Icon name="clock" iconSize="medium" />
          <span className="cw-site-header__date">{datetime}</span>
          <span className="cw-site-header__tz">{timezone}</span>
        </div>
      </div>

      {/* ── Right: upload + chat + notifications + user ── */}
      <div className="cw-site-header__right">
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Icon name="cloud-upload" />}
          onClick={onUpload}
        >
          Upload
        </Button>

        <button
          className="cw-site-header__icon-btn"
          onClick={onChat}
          aria-label="Chat"
        >
          <Icon name="chat-message" iconSize="large" />
        </button>

        <div className="cw-site-header__notif-wrap">
          <button
            className="cw-site-header__icon-btn"
            onClick={onNotifications}
            aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
          >
            <Icon name="bell" iconSize="large" />
          </button>
          {notificationCount !== undefined && notificationCount > 0 && (
            <span className="cw-site-header__badge" aria-hidden="true">
              {notificationCount}
            </span>
          )}
        </div>

        {/* ── User avatar + menu trigger ── */}
        <div className="cw-site-header__user">
          <button
            ref={triggerRef}
            className="cw-site-header__avatar-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={`User menu for ${user.name}`}
          >
            <span className="cw-site-header__avatar">{user.initials}</span>
            <Icon
              name="chevron-down-small"
              iconSize="small"
              className={`cw-site-header__chevron${menuOpen ? " cw-site-header__chevron--open" : ""}`}
            />
          </button>

          {/* ── User menu dropdown ── */}
          {menuOpen && (
            <div ref={menuRef} className="cw-user-menu" role="menu">
              {/* Profile header */}
              <div className="cw-user-menu__profile">
                <span className="cw-site-header__avatar cw-site-header__avatar--lg">
                  {user.initials}
                </span>
                <div className="cw-user-menu__profile-info">
                  <p className="cw-user-menu__name">{user.name}</p>
                  <div className="cw-user-menu__meta">
                    <span className="cw-user-menu__meta-item">
                      ID: {user.userId}
                      <button className="cw-user-menu__copy-btn" aria-label="Copy user ID">
                        <Icon name="copy" iconSize="small" />
                      </button>
                    </span>
                    <span className="cw-user-menu__dot" aria-hidden="true" />
                    {user.tipJarLabel && (
                      <span className="cw-user-menu__meta-item">
                        {user.tipJarLabel}
                        <button className="cw-user-menu__copy-btn" aria-label="Copy tip jar link">
                          <Icon name="copy" iconSize="small" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu items */}
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={[
                    "cw-user-menu__item",
                    item.danger ? "cw-user-menu__item--danger" : "",
                    item.dividerBefore ? "cw-user-menu__item--divider" : "",
                  ].filter(Boolean).join(" ")}
                  role="menuitem"
                  onClick={() => { item.onClick?.(); setMenuOpen(false); }}
                >
                  <span className="cw-user-menu__item-icon">{item.icon}</span>
                  <span className="cw-user-menu__item-label">{item.label}</span>
                  {item.rightIcon && (
                    <span className="cw-user-menu__item-right">{item.rightIcon}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
