import type {
  AuditLog,
  ConsentItem,
  DocumentState,
  MyDataItem,
  RightsPackage,
} from "../types";

export const agentProfile = {
  name: "권리 에이전트",
  headline: "필요한 권리를 먼저 찾고, 신청 준비까지 도와드려요.",
  message:
    "실직 후 받을 수 있는 지원 5건을 찾았어요. 제출은 본인 승인 전까지 진행되지 않습니다.",
};

export const todayAlert = {
  title: "실직 관련 지원 5건을 찾았어요",
  description: "고용, 생활비, 직업훈련 지원을 한 번에 확인할 수 있습니다.",
  action: "실행 패키지 보기",
};

export const rightsPackages: RightsPackage[] = [
  {
    id: "unemployment",
    title: "실직자 권리실행 패키지",
    subtitle: "실업급여, 취업지원, 직업훈련, 긴급복지를 함께 준비합니다.",
    alert: "오늘 실행 가능",
    progress: 72,
    tone: "blue",
    items: [
      {
        name: "실업급여",
        description: "고용보험 이력 기준으로 바로 신청 가능한 상태입니다.",
        status: "바로 신청 가능",
      },
      {
        name: "국민취업지원제도",
        description: "구직 상태와 가구 정보를 확인하면 신청 준비가 가능합니다.",
        status: "추가 확인 필요",
      },
      {
        name: "직업훈련",
        description: "최근 경력과 희망 직무에 맞는 과정을 추천할 수 있습니다.",
        status: "바로 신청 가능",
      },
      {
        name: "긴급복지",
        description: "소득과 위기 사유 확인이 필요합니다.",
        status: "추가 확인 필요",
      },
      {
        name: "지자체 지원금",
        description: "현재 거주지 기준으로는 조건이 맞지 않습니다.",
        status: "현재 해당 없음",
      },
    ],
  },
  {
    id: "birth",
    title: "출산가정 패키지",
    subtitle: "출산과 양육 지원을 빠뜨리지 않도록 정리합니다.",
    alert: "신청 후보 3건",
    progress: 44,
    tone: "mint",
    items: [
      {
        name: "첫만남 이용권",
        description: "출생 신고 후 바로 신청할 수 있습니다.",
        status: "바로 신청 가능",
      },
      {
        name: "부모급여",
        description: "가구 정보를 확인하면 신청 준비가 가능합니다.",
        status: "추가 확인 필요",
      },
      {
        name: "산후조리비",
        description: "출산 예정일 또는 출생 신고 후 다시 알려드립니다.",
        status: "추후 알림 필요",
      },
    ],
  },
  {
    id: "senior",
    title: "어르신 복지 패키지",
    subtitle: "연금, 돌봄, 교통비 지원을 한 화면에서 확인합니다.",
    alert: "확인 후보 4건",
    progress: 58,
    tone: "amber",
    items: [
      {
        name: "기초연금",
        description: "소득 정보를 확인하면 가능성을 계산할 수 있습니다.",
        status: "추가 확인 필요",
      },
      {
        name: "돌봄 서비스",
        description: "연령과 거주지 기준으로 바로 신청 가능한 상태입니다.",
        status: "바로 신청 가능",
      },
      {
        name: "교통비 지원",
        description: "현재 연령 기준으로는 해당하지 않습니다.",
        status: "현재 해당 없음",
      },
    ],
  },
];

export const consentItems: ConsentItem[] = [
  {
    dataName: "고용보험 이력",
    reason: "실업급여 자격과 이직 이력을 사전 확인하기 위해 필요합니다.",
    purpose: "실업급여 및 취업지원 신청 가능성 확인",
    agency: "고용보험 관련 기관",
    period: "7일",
    revocable: true,
  },
  {
    dataName: "주민등록 정보",
    reason: "거주지 기준 지자체 지원과 가구 요건을 확인하기 위해 필요합니다.",
    purpose: "지역 지원 및 가구 기준 확인",
    agency: "주민등록 관련 기관",
    period: "신청 준비 완료까지",
    revocable: true,
  },
  {
    dataName: "건강보험 자격득실",
    reason: "보험료 조정 가능성과 자격 변동 여부를 확인하기 위해 필요합니다.",
    purpose: "감면 및 자격 변동 여부 확인",
    agency: "건강보험 관련 기관",
    period: "7일",
    revocable: true,
  },
];

export const applicationDraft = {
  title: "AI가 준비한 신청서 초안",
  applicant: "김민지",
  target: "실직 후 구직 중",
  summary:
    "기본 정보와 고용보험 이력은 확인됐습니다. 이직확인서만 확인하면 제출 전 검토로 넘어갈 수 있습니다.",
  validation: ["기본 정보 확인 완료", "필수 조회 완료", "이직확인서 추가 확인 필요"],
};

export const documentStates: DocumentState[] = [
  {
    name: "주민등록등본",
    status: "공공 마이데이터로 대체할 수 있습니다.",
    level: "ready",
  },
  {
    name: "고용보험 이력",
    status: "조회가 완료되었습니다.",
    level: "ready",
  },
  {
    name: "이직확인서",
    status: "회사 제출 여부를 한 번 더 확인해야 합니다.",
    level: "warning",
  },
];

export const finalReview = {
  checkedInfo: ["고용보험 이력", "거주지", "구직 상태"],
  documents: ["신청서 초안", "고용보험 확인 자료", "주민등록 정보"],
  targets: ["실업급여", "국민취업지원제도", "직업훈련"],
  cautions: [
    "공식 자격 판정과 처분은 소관기관 시스템이 수행합니다.",
    "AI는 신청 준비를 도와주며, 사용자 승인 없이 제출하지 않습니다.",
  ],
};

export const auditLogs: AuditLog[] = [
  {
    time: "09:10",
    title: "고용보험 이력 조회",
    detail: "실업급여 확인에 필요한 범위만 조회했습니다.",
  },
  {
    time: "09:12",
    title: "권리 가능성 분석",
    detail: "신청 가능성이 높은 지원과 추가 확인 항목을 분류했습니다.",
  },
  {
    time: "09:15",
    title: "신청서 초안 작성",
    detail: "사용자가 확인할 수 있는 초안으로 저장했습니다.",
  },
  {
    time: "09:20",
    title: "사용자 최종승인 대기",
    detail: "본인인증과 제출 승인을 기다리고 있습니다.",
  },
];

export const myDataItems: MyDataItem[] = [
  {
    name: "고용보험 이력",
    description: "실업급여와 취업지원 대상 여부를 확인할 때 사용합니다.",
    status: "연결됨",
    period: "오늘까지",
    lastUsed: "09:10",
  },
  {
    name: "주민등록 정보",
    description: "거주지 기준 지자체 지원금을 찾을 때 사용합니다.",
    status: "연결됨",
    period: "7일",
    lastUsed: "09:12",
  },
  {
    name: "건강보험 자격득실",
    description: "보험료 조정 가능성을 확인할 때 사용합니다.",
    status: "확인 필요",
    period: "동의 전",
    lastUsed: "없음",
  },
];
