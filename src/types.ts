import type { LucideIcon } from "lucide-react";

export type Screen =
  | "onboarding"
  | "home"
  | "package"
  | "consent"
  | "application"
  | "approval"
  | "logs"
  | "settings";

export type PackageStatus =
  | "바로 신청 가능"
  | "추가 확인 필요"
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
