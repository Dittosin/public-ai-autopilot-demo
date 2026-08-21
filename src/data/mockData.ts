import type {
  AuditLog,
  ConsentItem,
  DirectionOption,
  DocumentState,
  Mission,
  MyDataItem,
  PublicConnectionItem,
  ReplanResult,
  RightsPackage,
  UserProfile,
} from "../types";

export const userProfile: UserProfile = {
  name: "김민지",
  summary: "사회진입을 준비하고 있는 청년",
  facts: [
    { label: "연령", value: "만 24세" },
    { label: "학업", value: "대학 졸업예정" },
    { label: "거주", value: "수도권 거주" },
    { label: "취업", value: "현재 구직 중" },
    { label: "가구", value: "부모와 거주" },
  ],
};

export const publicConnectionItems: PublicConnectionItem[] = [
  {
    name: "기본 신원·연령 정보",
    purpose: "연령 기준 지원을 확인하는 데 사용",
    source: "기본 행정정보",
  },
  {
    name: "주민등록상 거주지",
    purpose: "지역별 지원과 이사 조건을 구분하는 데 사용",
    source: "주민등록 관련 정보",
  },
  {
    name: "취업·고용 상태",
    purpose: "구직·훈련 지원의 현재 행동 시점을 판단하는 데 사용",
    source: "고용 관련 정보",
  },
];

export const missionBefore: Mission = {
  id: "career-independence",
  title: "서울 취업하고 독립하기",
  userGoal: "졸업하고 서울에서 취업해서 독립하고 싶어요.",
  actions: [
    {
      id: "career-eligibility",
      title: "취업·직업훈련 지원 확인",
      category: "취업",
      state: "now",
      description: "현재 구직 중인 데모 상태에서 먼저 확인할 가치가 있습니다.",
      reason: "졸업예정이고 현재 구직 중인 시나리오이므로 취업지원 범위를 우선 검토합니다.",
      canPrepare: true,
      demoExample: true,
    },
    {
      id: "training-review",
      title: "직업훈련 지원 검토",
      category: "직업훈련",
      state: "now",
      description: "희망 직무가 정해지기 전에도 과정 범위를 살펴볼 수 있습니다.",
      reason: "취업 목표는 확인됐지만 직무가 확정되지 않아, 넓은 범위의 훈련 선택지만 먼저 정리합니다.",
      canPrepare: true,
      demoExample: true,
    },
    {
      id: "safe-housing",
      title: "청년안심주택 신규공고",
      category: "주거",
      state: "watch",
      description: "새 공고 등록 여부를 확인하도록 설정했습니다.",
      reason: "아직 근무지와 이사 시점이 정해지지 않아 특정 공고를 지금 신청하지 않고 모니터링합니다.",
      nextCheck: "근무지역 확정 또는 신규공고 등록 시",
      demoExample: true,
    },
    {
      id: "housing-recruitment",
      title: "청년 주거지원 신규 모집",
      category: "주거",
      state: "watch",
      description: "지역과 모집 시기가 맞는 지원을 확인합니다.",
      reason: "서울 취업을 희망하지만 거주지역이 확정되지 않아 모집 변화만 먼저 살핍니다.",
      nextCheck: "희망 근무지역 확정 시",
      demoExample: true,
    },
    {
      id: "monthly-rent",
      title: "청년월세지원",
      category: "주거",
      state: "wait",
      description: "임대차계약 이후 다시 확인합니다.",
      reason: "현재 부모와 거주하고 있어 즉시 행동 항목이 아닙니다. 임대차 상태가 바뀌면 다시 확인합니다.",
      nextCheck: "임대차계약 등록 시",
      demoExample: true,
    },
    {
      id: "moving-cost",
      title: "이사비 지원",
      category: "이사",
      state: "wait",
      description: "실제 이사·전입 이후 다시 확인합니다.",
      reason: "아직 이사와 전입이 발생하지 않아 지금 신청할 단계가 아닙니다.",
      nextCheck: "이사 또는 전입 상태 변경 시",
      demoExample: true,
    },
    {
      id: "unemployment-benefit",
      title: "실업급여",
      category: "생활지원",
      state: "drop",
      description: "현재 미취업 상태만으로는 우선 검토할 항목이 아닙니다.",
      reason: "이전 고용 이력이 확인되지 않아 현재 미션의 행동 목록에서 제외했습니다.",
      demoExample: true,
    },
  ],
};

export const missionAfter: Mission = {
  ...missionBefore,
  actions: [
    {
      id: "work-area-housing",
      title: "근무지역 기준 주거지원 검토",
      category: "주거",
      state: "now",
      description: "취업 확정으로 주거지원 검토 시점이 앞당겨졌습니다.",
      reason: "근무지역을 기준으로 통근권과 이사 후보를 좁힐 수 있어 지금 확인할 가치가 생겼습니다.",
      changeNote: "확인 중이던 항목이 지금 할 일로 변경",
      canPrepare: true,
      demoExample: true,
    },
    {
      id: "independence-checklist",
      title: "독립 준비 행정 체크",
      category: "이사",
      state: "now",
      description: "계약·전입 전에 확인할 절차를 정리합니다.",
      reason: "취업이 확정되어 독립 계획을 실제 일정으로 바꿀 수 있는 단계가 됐습니다.",
      changeNote: "새로운 행동",
      canPrepare: true,
      demoExample: true,
    },
    {
      id: "safe-housing-after",
      title: "근무지 인근 청년안심주택 공고",
      category: "주거",
      state: "watch",
      description: "근무지 통근권 안의 신규공고 등록 여부를 확인합니다.",
      reason: "취업은 확정됐지만 실제 입주 가능 시점이 정해지지 않아 공고 변화를 모니터링합니다.",
      nextCheck: "신규공고 또는 입주 희망월 입력 시",
      demoExample: true,
    },
    {
      id: "monthly-rent-after",
      title: "청년월세지원",
      category: "주거",
      state: "wait",
      description: "임대차계약 이후 다시 확인합니다.",
      reason: "취업은 확정됐지만 아직 부모와 거주 중입니다. 계약 상태가 바뀌면 즉시 재판단합니다.",
      nextCheck: "임대차계약 등록 시",
      demoExample: true,
    },
    {
      id: "moving-cost-after",
      title: "이사비 지원",
      category: "이사",
      state: "wait",
      description: "실제 이사·전입 이후 다시 확인합니다.",
      reason: "지원 판단에 필요한 이사·전입 조건이 아직 발생하지 않았습니다.",
      nextCheck: "이사 또는 전입 상태 변경 시",
      demoExample: true,
    },
    {
      id: "training-after",
      title: "구직자 중심 직업훈련",
      category: "직업훈련",
      state: "drop",
      description: "취업 확정으로 현재 우선순위에서 내렸습니다.",
      reason: "현재 목표가 구직에서 독립 준비로 이동해 우선 행동 목록에서 제외했습니다.",
      changeNote: "지금 할 일에서 우선순위 낮춤",
      demoExample: true,
    },
  ],
};

export const replanResult: ReplanResult = {
  eventTitle: "취업 확정 · 강남 · 12월 출근",
  title: "취업 상태를 반영해 미션을 다시 판단했어요",
  description: "취업 준비보다 근무지역을 기준으로 한 독립 준비가 먼저 필요한 상태입니다.",
};

export const directionOptions: DirectionOption[] = [
  {
    title: "서울 취업 + 독립",
    description: "취업지역과 이사 시점이 정해질수록 주거지원 검토가 구체화됩니다.",
    considerations: [
      "주거지원 검토 필요",
      "근무지역 확정 후 주거 후보 재평가",
      "이사·전입 관련 지원 가능성 확인",
    ],
  },
  {
    title: "본가 거주 + 취업준비",
    description: "현재 거주상태를 유지하며 구직과 훈련지원을 중심으로 봅니다.",
    considerations: [
      "기존 거주상태 유지",
      "구직·훈련지원 중심",
      "취업지역 확정 시 주거지원 재평가",
    ],
  },
];

export const rightsPackages: RightsPackage[] = [
  {
    id: "youth-entry",
    title: "사회진입 청년 실행 패키지",
    subtitle: "취업·직업훈련·주거·이사 지원 중 지금 확인할 항목만 정리했습니다.",
    alert: "지금 확인할 가치가 있는 지원",
    progress: 64,
    tone: "blue",
    items: [
      {
        name: "청년 취업지원",
        description: "현재 상태에서 신청 가능성을 먼저 확인할 수 있습니다. (데모 예시)",
        status: "사전 확인 가능",
      },
      {
        name: "직업훈련 지원",
        description: "희망 직무를 확인하면 과정 범위를 더 좁힐 수 있습니다. (데모 예시)",
        status: "추가 확인 후 신청",
      },
      {
        name: "청년 주거지원",
        description: "근무지역이 확정되면 다시 확인합니다. (데모 예시)",
        status: "추후 알림 필요",
      },
      {
        name: "청년월세지원",
        description: "임대차계약 이후 다시 확인합니다. (데모 예시)",
        status: "현재 해당 없음",
      },
    ],
  },
];

export const housingRightsPackage: RightsPackage = {
  id: "housing-after-employment",
  title: "취업 확정 후 주거지원 패키지",
  subtitle: "근무지역을 기준으로 주거·이사 지원의 확인 시점을 다시 정리했습니다.",
  alert: "새로운 다음 행동",
  progress: 42,
  tone: "mint",
  items: [
    {
      name: "근무지 기준 주거지원",
      description: "입주 희망 시점을 확인하면 가능성을 더 좁힐 수 있습니다. (데모 예시)",
      status: "추가 확인 후 신청",
    },
    {
      name: "근무지 인근 청년주택 공고",
      description: "근무지 통근권의 신규 모집공고를 확인합니다. (데모 예시)",
      status: "추후 알림 필요",
    },
    {
      name: "청년월세지원",
      description: "임대차계약 이후 다시 확인합니다. (데모 예시)",
      status: "추후 알림 필요",
    },
    {
      name: "이사비 지원",
      description: "실제 이사·전입 이후 확인할 항목입니다. (데모 예시)",
      status: "현재 해당 없음",
    },
  ],
};

export const consentItems: ConsentItem[] = [
  {
    dataName: "기본 신원·연령 정보",
    reason: "청년 취업지원의 연령 기준을 사전 확인하는 데 필요합니다.",
    purpose: "신청 대상 연령과 본인 정보 확인",
    agency: "기본 행정정보 관련 기관",
    period: "신청 준비 완료까지",
    revocable: true,
  },
  {
    dataName: "주민등록상 거주지",
    reason: "지역에 따라 달라지는 지원과 제출서류를 구분하는 데 필요합니다.",
    purpose: "거주지 기준 지원 범위 확인",
    agency: "주민등록 관련 기관",
    period: "7일",
    revocable: true,
  },
  {
    dataName: "취업·고용 상태",
    reason: "현재 행동할 취업지원과 추가 확인 항목을 구분하는 데 필요합니다.",
    purpose: "취업지원 신청 가능성 사전 확인",
    agency: "고용 관련 기관",
    period: "신청 준비 완료까지",
    revocable: true,
  },
];

export const housingConsentItems: ConsentItem[] = [
  {
    dataName: "기본 신원·연령 정보",
    reason: "청년 주거지원의 연령 기준을 사전 확인하는 데 필요합니다.",
    purpose: "연령 기준과 본인 정보 확인",
    agency: "기본 행정정보 관련 기관",
    period: "신청 준비 완료까지",
    revocable: true,
  },
  {
    dataName: "주민등록상 거주지",
    reason: "현재 거주 상태와 이사 전후 조건을 구분하는 데 필요합니다.",
    purpose: "거주지·전입 조건 확인",
    agency: "주민등록 관련 기관",
    period: "7일",
    revocable: true,
  },
  {
    dataName: "취업 예정·근무지역",
    reason: "근무지역을 기준으로 주거지원 확인 범위를 좁히는 데 필요합니다.",
    purpose: "근무지역 기준 주거지원 사전검토",
    agency: "고용 관련 기관",
    period: "신청 준비 완료까지",
    revocable: true,
  },
];

export const applicationDraft = {
  title: "청년 취업지원 신청 초안",
  applicant: "김민지",
  target: "대학 졸업예정 · 현재 미취업",
  summary:
    "기본 정보와 거주지, 취업 상태를 바탕으로 데모용 신청 초안을 준비했습니다. 졸업예정 증빙만 추가로 확인하면 됩니다.",
  validation: ["기본 정보 확인 완료", "거주지 확인 완료", "졸업예정 증빙 추가 확인 필요"],
};

export const documentStates: DocumentState[] = [
  {
    name: "주민등록 정보",
    status: "동의한 공공정보로 대체 가능한 항목입니다.",
    level: "ready",
  },
  {
    name: "취업 상태 확인",
    status: "데모 시나리오에서 확인 완료로 표시했습니다.",
    level: "ready",
  },
  {
    name: "졸업예정 증빙",
    status: "사용자가 직접 확인할 항목입니다.",
    level: "warning",
  },
];

export const housingApplicationDraft = {
  title: "주거지원 사전검토 초안",
  applicant: "김민지",
  target: "취업 확정 · 강남 근무 예정",
  summary:
    "현재 거주지와 근무지역을 바탕으로 데모용 주거지원 사전검토 초안을 준비했습니다. 임대차계약 정보는 계약 이후 확인합니다.",
};

export const housingDocumentStates: DocumentState[] = [
  {
    name: "주민등록 정보",
    status: "동의한 공공정보로 대체 가능한 항목입니다.",
    level: "ready",
  },
  {
    name: "취업 예정·근무지역",
    status: "데모 시나리오에서 확인 완료로 표시했습니다.",
    level: "ready",
  },
  {
    name: "임대차계약 정보",
    status: "계약 이후 사용자가 직접 확인할 항목입니다.",
    level: "warning",
  },
];

export const finalReview = {
  checkedInfo: ["만 24세", "수도권 거주", "현재 미취업"],
  documents: ["신청서 초안", "주민등록 정보", "취업 상태 확인 자료"],
  targets: ["청년 취업지원 (데모 예시)"],
  cautions: [
    "공식 자격 판정과 처분은 소관기관 시스템이 수행합니다.",
    "AI는 신청 준비를 도와주며, 사용자 승인 없이 제출하지 않습니다.",
  ],
};

export const housingFinalReview = {
  checkedInfo: ["만 24세", "수도권 거주", "강남 근무 예정"],
  documents: ["사전검토 초안", "주민등록 정보", "취업 예정 확인 자료"],
  targets: ["근무지 기준 주거지원 (데모 예시)"],
};

export const auditLogs: AuditLog[] = [
  {
    time: "09:00",
    title: "현재 상태 구성",
    detail: "동의한 범위의 데모 정보로 연령·거주·취업 상태를 정리했습니다.",
  },
  {
    time: "09:03",
    title: "‘서울 취업하고 독립하기’ 미션 생성",
    detail: "사용자 목표와 확인된 현재 상태를 연결했습니다.",
  },
  {
    time: "09:05",
    title: "다음 행동 분류",
    detail: "취업·훈련·주거·이사 항목을 지금 할 일, 공고 확인, 나중에 확인할 일로 나눴습니다.",
  },
  {
    time: "09:08",
    title: "신청 초안 준비",
    detail: "사용자가 승인하기 전 단계의 데모용 초안을 만들었습니다.",
  },
  {
    time: "09:10",
    title: "사용자 최종승인 대기",
    detail: "본인 확인과 제출 승인을 기다리고 있습니다.",
  },
];

export const replanAuditLogs: AuditLog[] = [
  {
    time: "12:00",
    title: "취업 확정 상태 반영",
    detail: "사용자가 알린 상황 변화를 데모 프로필에 반영했습니다.",
  },
  {
    time: "12:01",
    title: "미션 전체 재판단",
    detail: "취업 준비의 우선순위를 낮추고 주거·독립 준비의 우선순위를 높였습니다.",
  },
];

export const submittedAuditLog: AuditLog = {
  time: "09:12",
  title: "데모 제출 흐름 완료",
  detail: "사용자가 최종 확인을 체험했습니다. 실제 본인인증이나 기관 제출은 진행하지 않았습니다.",
};

export const myDataItems: MyDataItem[] = [
  {
    name: "기본 신원·연령 정보",
    description: "연령 기준 지원을 판단할 때 필요한 범위만 사용합니다.",
    status: "연결됨",
    period: "미션 관리 중",
    lastUsed: "09:00",
  },
  {
    name: "주민등록상 거주지",
    description: "지역별 지원과 이사 조건을 구분할 때 사용합니다.",
    status: "연결됨",
    period: "7일",
    lastUsed: "09:05",
  },
  {
    name: "취업·고용 상태",
    description: "취업 상태가 바뀌면 다음 행동을 다시 판단하는 데 사용합니다.",
    status: "연결됨",
    period: "미션 관리 중",
    lastUsed: "09:05",
  },
];
