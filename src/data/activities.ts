export type Activity = {
  readonly title: string;
  readonly period?: string;
  readonly meta?: string;
  readonly detail?: string;
  readonly url?: string;
  readonly emphasis?: boolean;
};

export type ActivityGroup = { readonly label: string; readonly items: readonly Activity[] };

export const activityGroups: readonly ActivityGroup[] = [
  {
    label: 'OTHER PROJECT',
    items: [
      {
        title: 'KOKKOK(콕콕)',
        period: '2025.02 — 2025.07',
        meta: 'Mash-Up 15기 · 백엔드',
        detail: '친구들과 예약 일정을 공유하고 준비 상태부터 성공 여부까지 같이 확인하는 앱. CI/CD 구축, FCM 푸시 알림, 엔티티 설계, 예약 목록·결과 조회 API, 콕 찌르기 기능을 맡았습니다.',
        url: 'https://github.com/mash-up-kr/HGDGDS-Node',
      },
    ],
  },
  {
    label: 'COMMUNITY',
    items: [
      {
        title: 'Mash-Up 16기 Node Team 파트장',
        period: '2026.02 — 2026.09',
        meta: 'IT에 관심 있는 개발자와 디자이너가 함께 모여 협업하고 성장하는 IT 연합동아리',
        emphasis: true,
      },
      { title: 'Mash-Up 15기 Node Team', period: '2025.02 — 2025.07' },
      {
        title: 'GDG on Campus SKHU Organizer',
        period: '2023.07 — 2024.06',
        meta: 'Google Developers가 지원하는 대학 개발자 커뮤니티',
      },
    ],
  },
  {
    label: 'STUDY',
    items: [
      {
        title: 'Kubernetes 스터디',
        period: '2025.04 — 2025.06',
        meta: 'Mash-Up 15기 Node·Spring 합동',
        url: 'https://github.com/mash-up-kr/Mash-Up-15th-Server-k8s-Study',
      },
      {
        title: '코어 자바스크립트 스터디',
        period: '2024.07 — 2024.08',
        meta: '8주간 매주 정리 제출과 상호 리뷰',
        url: 'https://github.com/labyrinth30/Core-JS-Study',
      },
    ],
  },
  {
    label: 'PRESENTATION',
    items: [
      {
        title: 'Entity와 DTO 대신 Schema를 믿기로 했다',
        meta: 'Mash-Up 16기 Node Team 세미나',
        url: 'https://velog.io/@ayeon0/Entity%EC%99%80-DTO-%EB%8C%80%EC%8B%A0Schema%EB%A5%BC-%EB%AF%BF%EA%B8%B0%EB%A1%9C-%ED%96%88%EB%8B%A4',
      },
      {
        title: 'AWS Serverless로 진짜 On-Demand 알아보기',
        meta: 'Mash-Up 15기 Node Team 세미나',
        url: 'https://velog.io/@ayeon0/Mash-Up-15%EA%B8%B0-Node%ED%8C%80-10%EB%B6%84-%EC%84%B8%EB%AF%B8%EB%82%98-Serverless',
      },
      {
        title: '들어봤니 GraphQL',
        meta: 'GDG on Campus SKHU 테크톡',
        url: 'https://www.youtube.com/watch?v=Pss3TkZ6ksA&t=412s',
      },
    ],
  },
  {
    label: 'WRITING',
    items: [
      {
        title: '당신의 API 때문에 유저에게 서비스 규모를 들키고 있습니다 — NestJS에서 PK 암호화하기',
        url: 'https://velog.io/@ayeon0/PK%EB%A5%BC-%EC%88%A8%EA%B2%A8%EB%B3%B4%EC%9E%90-NestJS%EC%97%90%EC%84%9C',
      },
      {
        title: 'TypeORM의 forFeature 반복 문제 해결하기 — 서비스의 SRP를 위한 Repository',
        url: 'https://velog.io/@ayeon0/forFeature-solution',
      },
    ],
  },
];
