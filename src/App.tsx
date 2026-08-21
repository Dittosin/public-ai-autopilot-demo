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
import type { ExecutionStage, HomeView, MissionPhase, Screen } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [homeView, setHomeView] = useState<HomeView>("goal");
  const [missionPhase, setMissionPhase] = useState<MissionPhase>("planning");
  const [missionCreated, setMissionCreated] = useState(false);
  const [executionStage, setExecutionStage] = useState<ExecutionStage>("idle");
  const [homeNotice, setHomeNotice] = useState("");

  const navigate = (nextScreen: Screen) => {
    if (nextScreen === "package" && !missionCreated) {
      setHomeView("goal");
      setHomeNotice("먼저 목표를 설정하면 실행할 지원을 정리해드려요.");
      setScreen("home");
      return;
    }

    setHomeNotice("");
    setScreen(nextScreen);
  };

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
              setMissionPhase("planning");
              setMissionCreated(false);
              setExecutionStage("idle");
              setHomeNotice("");
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
            navigationNotice={homeNotice}
            onChangeView={(view) => {
              setHomeNotice("");
              setHomeView(view);
            }}
            onCreateMission={() => {
              setMissionPhase("planning");
              setMissionCreated(true);
              setExecutionStage("idle");
              setHomeNotice("");
              setHomeView("mission");
            }}
            onConfirmEmployment={() => setMissionPhase("employmentConfirmed")}
            onResetMission={() => setMissionPhase("planning")}
            onOpenPackage={() => {
              setHomeNotice("");
              setScreen("package");
            }}
            onOpenConsent={() => setScreen("consent")}
            onOpenLogs={() => setScreen("logs")}
            onOpenSettings={() => setScreen("settings")}
          />
        );
      case "package":
        return (
          <PackageDetailPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
            onConsent={() => setScreen("consent")}
          />
        );
      case "consent":
        return (
          <ConsentPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
            onStartPreparation={() => {
              setExecutionStage("prepared");
              setScreen("application");
            }}
          />
        );
      case "application":
        return (
          <ApplicationPrepPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
            onReview={() => {
              setExecutionStage("reviewed");
              setScreen("approval");
            }}
          />
        );
      case "approval":
        return (
          <FinalApprovalPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
            onLogs={() => setScreen("logs")}
            onSubmit={() => setExecutionStage("submitted")}
          />
        );
      case "logs":
        return (
          <AuditLogPage
            simpleMode={simpleMode}
            missionPhase={missionPhase}
            missionCreated={missionCreated}
            executionStage={executionStage}
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
      onNavigate={navigate}
      onToggleLargeText={() => setLargeText((value) => !value)}
      onToggleHighContrast={() => setHighContrast((value) => !value)}
      onToggleSimpleMode={() => setSimpleMode((value) => !value)}
    >
      {page}
    </AppShell>
  );
}

export default App;
