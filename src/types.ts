import type { LucideIcon } from "lucide-react";

export type Screen =
  | "onboarding"
  | "home"
  | "package"
  | "consent"
  | "application"
  | "approval"
  | "logs"
  | "settings"
  | "trust";

export type HomeView =
  | "goal"
  | "mission"
  | "direction"
  | "support";

export type MissionPhase = "planning" | "employmentConfirmed";

export type ExecutionStage = "idle" | "prepared" | "reviewed" | "submitted";

export type ActionState = "now" | "watch" | "wait" | "drop";

export type ProfileFact = {
  label: string;
  value: string;
};

export type UserProfile = {
  name: string;
  summary: string;
  facts: ProfileFact[];
};

export type MissionAction = {
  id: string;
  title: string;
  category: "취업" | "직업훈련" | "주거" | "이사" | "생활지원";
  state: ActionState;
  description: string;
  reason: string;
  nextCheck?: string;
  canPrepare?: boolean;
  changeNote?: string;
  demoExample?: boolean;
};

export type Mission = {
  id: string;
  title: string;
  userGoal: string;
  actions: MissionAction[];
};

export type ReplanResult = {
  eventTitle: string;
  title: string;
  description: string;
};

export type PublicConnectionItem = {
  name: string;
  purpose: string;
  source: string;
};

export type DirectionOption = {
  title: string;
  description: string;
  considerations: string[];
};

export type PackageStatus =
  | "사전 확인 가능"
  | "추가 확인 후 신청"
  | "현재 해당 없음"
  | "추후 알림 필요";

export type RightsPackage = {
  id: string;
  title: string;
  subtitle: string;
  alert: string;
  progress: number;
  tone: "blue" | "mint" | "amber";
  items: {
    name: string;
    description: string;
    status: PackageStatus;
  }[];
};

export type ConsentItem = {
  dataName: string;
  reason: string;
  purpose: string;
  agency: string;
  period: string;
  revocable: boolean;
};

export type DocumentState = {
  name: string;
  status: string;
  level: "ready" | "warning" | "info";
};

export type AuditLog = {
  time: string;
  title: string;
  detail: string;
};

export type MyDataItem = {
  name: string;
  description: string;
  status: "연결됨" | "확인 필요";
  period: string;
  lastUsed: string;
};

export type TabItem = {
  key: Screen;
  label: string;
  icon: LucideIcon;
};
