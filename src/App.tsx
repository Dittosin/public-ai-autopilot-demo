import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ApplicationPrepPage } from "./pages/ApplicationPrepPage";
import { AuditLogPage } from "./pages/AuditLogPage";
import { ConsentPage } from "./pages/ConsentPage";
import { FinalApprovalPage } from "./pages/FinalApprovalPage";
import { HomePage } from "./pages/HomePage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import type { Screen } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen]);

  const page = (() => {
    switch (screen) {
      case "onboarding":
        return <OnboardingPage onStart={() => setScreen("home")} />;
      case "home":
        return (
          <HomePage
            simpleMode={simpleMode}
            onOpenPackage={() => setScreen("package")}
          />
        );
      case "package":
        return (
          <PackageDetailPage
            simpleMode={simpleMode}
            onConsent={() => setScreen("consent")}
          />
        );
      case "consent":
        return (
          <ConsentPage
            simpleMode={simpleMode}
            onStartPreparation={() => setScreen("application")}
          />
        );
      case "application":
        return (
          <ApplicationPrepPage
            simpleMode={simpleMode}
            onReview={() => setScreen("approval")}
          />
        );
      case "approval":
        return (
          <FinalApprovalPage
            simpleMode={simpleMode}
            onLogs={() => setScreen("logs")}
          />
        );
      case "logs":
        return <AuditLogPage simpleMode={simpleMode} />;
      case "settings":
        return (
          <SettingsPage
            largeText={largeText}
            highContrast={highContrast}
            simpleMode={simpleMode}
            onToggleLargeText={() => setLargeText((value) => !value)}
            onToggleHighContrast={() => setHighContrast((value) => !value)}
            onToggleSimpleMode={() => setSimpleMode((value) => !value)}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <AppShell
      currentScreen={screen}
      largeText={largeText}
      highContrast={highContrast}
      simpleMode={simpleMode}
      onNavigate={setScreen}
      onToggleLargeText={() => setLargeText((value) => !value)}
      onToggleHighContrast={() => setHighContrast((value) => !value)}
      onToggleSimpleMode={() => setSimpleMode((value) => !value)}
    >
      {page}
    </AppShell>
  );
}

export default App;
