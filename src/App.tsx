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
import { TrustCenterPage } from "./pages/TrustCenterPage";
import type { HomeView, MissionPhase, Screen } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [homeView, setHomeView] = useState<HomeView>("goal");
  const [missionPhase, setMissionPhase] = useState<MissionPhase>("planning");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen, homeView, missionPhase]);

  const page = (() => {
    switch (screen) {
      case "onboarding":
        return (
          <OnboardingPage
            onStart={() => {
              setHomeView("goal");
              setScreen("home");
            }}
          />
        );
      case "home":
        return (
          <HomePage
            simpleMode={simpleMode}
            view={homeView}
            missionPhase={missionPhase}
            onChangeView={setHomeView}
            onCreateMission={() => {
              setMissionPhase("planning");
              setHomeView("mission");
            }}
            onConfirmEmployment={() => setMissionPhase("employmentConfirmed")}
            onResetMission={() => setMissionPhase("planning")}
            onOpenPackage={() => setScreen("package")}
            onOpenConsent={() => setScreen("consent")}
            onOpenLogs={() => setScreen("logs")}
            onOpenSettings={() => setScreen("settings")}
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
        return (
          <AuditLogPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
          />
        );
      case "settings":
        return (
          <SettingsPage
            largeText={largeText}
            highContrast={highContrast}
            simpleMode={simpleMode}
            onToggleLargeText={() => setLargeText((value) => !value)}
            onToggleHighContrast={() => setHighContrast((value) => !value)}
            onToggleSimpleMode={() => setSimpleMode((value) => !value)}
            onOpenGuide={() => setScreen("onboarding")}
            onOpenLogs={() => setScreen("logs")}
            onOpenTrustCenter={() => setScreen("trust")}
          />
        );
      case "trust":
        return (
          <TrustCenterPage
            onBack={() => setScreen("settings")}
            onOpenLogs={() => setScreen("logs")}
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
