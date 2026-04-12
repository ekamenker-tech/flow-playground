import { SiteHeader } from "./components/SiteHeader";
import { PlaygroundPage } from "./pages/PlaygroundPage";

export function App() {
  return (
    <>
      <SiteHeader
        datetime="Tue Nov 7 - 8:45 PM"
        timezone="Eastern Time (New York)"
        notificationCount={6}
        onUpload={() => {}}
        onChat={() => {}}
        onNotifications={() => {}}
        onSidebarToggle={() => {}}
        user={{
          name: "John Doe",
          initials: "JD",
          userId: "6346442",
          tipJarLabel: "Tip Jar",
          onVisitStore:    () => {},
          onTipJar:        () => {},
          onStoreDetails:  () => {},
          onPayoutSettings:() => {},
          onContactInfo:   () => {},
          onReferAndEarn:  () => {},
          onSettings:      () => {},
          onLogout:        () => {},
        }}
      />
      <PlaygroundPage />
    </>
  );
}
