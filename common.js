/**
 * 모든 페이지가 함께 쓰는 지역 데이터와 공통 기능.
 */

const AREAS = [
  {
    id: "odaiba",
    name: "오다이바",
    roman: "ODAIBA",
    image: "images/home/odaiba.jpg",
    page: "odaiba.html",
    ready: true,
  },
  {
    id: "diversity",
    name: "다이버시티",
    roman: "DIVERCITY",
    image: "images/home/diceverity.jpg",
    page: "diversity.html",
    ready: true,
  },
  {
    id: "akihabara",
    name: "아키하바라",
    roman: "AKIHABARA",
    image: "images/home/akihabara.png",
    page: "akihabara.html",
    ready: true,
  },
  {
    id: "warnerbros",
    name: "워너브라더스",
    roman: "WARNER BROS",
    image: "images/home/warnerbros.jpg",
    page: "warnerbros.html",
    ready: true,
  },
  {
    id: "disney",
    name: "디즈니씨",
    roman: "DISNEYSEA",
    image: "images/home/disney.jpg",
    page: "disney.html",
    ready: true,
  },
  {
    id: "naritasan",
    name: "신승사",
    roman: "NARITASAN",
    image: "images/home/naritasan.jpg",
    page: "naritasan.html",
    ready: true,
  },
];

/* ── 홈 화면 추가 안내 ──
   내용 출처: text/guide.txt
   (대괄호 안이 images 폴더의 이미지 이름, 그 아래 줄이 설명) */

const GUIDE_GROUPS = [
  {
    title: "아이폰",
    steps: [
      { image: "images/guide/guide_1.jpg", text: "사파리에서 웹을 연 다음, 오른쪽 하단 ··· 누른 다음 공유 클릭" },
      { image: "images/guide/guide_2.jpg", text: "더 보기 클릭" },
      { image: "images/guide/guide_3.jpg", text: "홈 화면에 추가 클릭" },
      { image: "images/guide/guide_4.jpg", text: "추가 클릭" },
      { image: "images/guide/guide_5.jpg", text: "" },
    ],
  },
  {
    title: "갤럭시",
    steps: [
      { image: "images/guide/guide_7.jpg", text: "크롬에서 웹을 연 다음, 오른쪽 상단 ··· 누르기" },
      { image: "images/guide/guide_6.jpg", text: "설치 및 바로가기 누르기" },
    ],
  },
];

/* ── 일본어 회화 ──
   내용 출처: text/japanese.txt (쓰임새별로 나눴다) */

const JAPANESE_GROUPS = [
  {
    title: "기본 인사",
    phrases: [
      { ja: "すみません", read: "스미마센", ko: "저기요 / 실례합니다 / 죄송합니다" },
      { ja: "ありがとうございます", read: "아리가토 고자이마스", ko: "감사합니다" },
      { ja: "大丈夫です", read: "다이조부데스", ko: "괜찮습니다" },
    ],
  },
  {
    title: "가게에서",
    phrases: [
      { ja: "これはいくらですか", read: "고레와 이쿠라데스카", ko: "이거 얼마예요?" },
      { ja: "これをください", read: "고레오 쿠다사이", ko: "이거 주세요" },
      { ja: "袋はいりません", read: "후쿠로와 이리마센", ko: "봉투는 필요 없어요" },
    ],
  },
  {
    title: "식당에서",
    phrases: [
      { ja: "いただきます", read: "이타다키마스", ko: "잘 먹겠습니다" },
      { ja: "お会計をお願いします", read: "오카이케이오 오네가이시마스", ko: "계산해 주세요" },
    ],
  },
  {
    title: "길 찾을 때",
    phrases: [
      { ja: "トイレはどこですか", read: "토이레와 도코데스카", ko: "화장실이 어디예요?" },
      { ja: "~はどこですか", read: "~와 도코데스카", ko: "~은 어디예요?" },
      { ja: "道に迷いました", read: "미치니 마요이 마시타", ko: "길을 잃었어요" },
    ],
  },
  {
    title: "구경할 때",
    phrases: [
      { ja: "写真を撮ってもいいですか", read: "샤신오 톳테모 이이데스카", ko: "사진 찍어도 되나요?" },
      { ja: "待ち時間はどれくらいですか", read: "마치지칸와 도레쿠라이 데스카", ko: "대기 시간이 얼마나 되나요?" },
      { ja: "これは何ですか", read: "고레와 난데스카", ko: "이건 뭐예요?" },
    ],
  },
  {
    title: "도움이 필요할 때",
    phrases: [
      { ja: "英語は話せますか", read: "에이고와 하나세마스카", ko: "영어 가능하세요?" },
      { ja: "Wi-Fiは使えますか", read: "와이파이와 츠카에마스카", ko: "와이파이 쓸 수 있나요?" },
    ],
  },
];

/** 일본어 회화를 그린다. */
function renderJapanese() {
  const section = document.getElementById("view-japanese");
  if (!section) return;

  const parts = [];

  for (const group of JAPANESE_GROUPS) {
    const sec = document.createElement("section");
    sec.className = "jp-section";

    const head = document.createElement("div");
    head.className = "sec-head";
    const bar = document.createElement("span");
    bar.className = "sec-bar";
    const title = document.createElement("h2");
    title.className = "sec-title";
    title.textContent = group.title;
    // 상황별로 접어 두고, 화살표 마크(또는 제목줄)를 누르면 펼친다
    head.classList.add("jp-head");
    const toggle = buildToggle();
    head.append(bar, title, toggle);
    sec.append(head);

    head.addEventListener("click", () => {
      const open = sec.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "접기" : "자세히 보기");
    });

    const list = document.createElement("ul");
    list.className = "jp-list";

    for (const phrase of group.phrases) {
      const item = document.createElement("li");
      item.className = "jp-item";

      const ja = document.createElement("p");
      ja.className = "jp-ja";
      ja.lang = "ja";
      ja.textContent = phrase.ja;

      const read = document.createElement("p");
      read.className = "jp-read";
      read.textContent = phrase.read;

      const ko = document.createElement("p");
      ko.className = "jp-ko";
      ko.textContent = phrase.ko;

      item.append(ja, read, ko);
      list.append(item);
    }

    const body = document.createElement("div");
    body.className = "jp-body";
    const inner = document.createElement("div");
    inner.className = "jp-body-inner";
    inner.append(list);
    body.append(inner);
    sec.append(body);
    parts.push(sec);
  }

  section.replaceChildren(...parts);
}

/* ── 호텔 정보 (메뉴) ──
   내용 출처: text/hotel.txt, 사진: images/hotel/ */

const HOTEL = {
  tagline: "도쿄 여행의 출발점, 시나가와 프린스 호텔",
  intro: [
    "시나가와 프린스 호텔(品川プリンスホテル)은 시나가와역 다카나와 출구에서 도보 약 2분 거리에 있는 대형 호텔이다.",
    "JR과 게이큐선, 도카이도 신칸센을 이용할 수 있는 역과 가까워 도쿄 시내 관광과 다른 도시로의 이동을 계획하기 편리하다.",
    "숙박 시설뿐 아니라 레스토랑, 수족관, 영화관, 볼링장까지 모여 있어 식사와 여가를 한곳에서 즐길 수 있다.",
    "메인 타워·아넥스 타워·N 타워·이스트 타워로 나뉘므로, 도착하기 전에 예약한 타워 이름을 확인해 두는 것이 좋다.",
  ],
  notes: [
    "(1) 주소: 일본 도쿄도 미나토구 다카나와 4-10-30 (〒108-8611)",
    "(2) 교통: JR·게이큐선·도카이도 신칸센 시나가와역 다카나와 출구에서 도보 약 2분",
    "(3) 체크인 / 체크아웃: 일반적으로 15:00부터 / 11:00까지. 예약한 숙박 상품에 별도 시간이 있으면 해당 조건을 따른다.",
    "(4) 문의 전화: +81-3-3440-1111",
    "(5) 공식 홈페이지: https://www.princehotels.com/ko/shinagawa/",
    "(6) 지도: https://www.google.com/maps/search/?api=1&query=Shinagawa+Prince+Hotel+4-10-30+Takanawa",
    "(7) 숙박 요금: 날짜·타워·객실 종류·식사 포함 여부에 따라 달라지므로 예약 화면에서 확인한다.",
  ],
  spots: [
    {
      image: "images/hotel/hotel_exterior.jpg",
      title: "시나가와 프린스 호텔",
      blocks: [
        { type: "lead", text: "시나가와역 앞에 펼쳐진 숙박과 엔터테인먼트 공간" },
        { type: "para", text: "호텔은 여러 타워와 부대시설이 모인 형태로, 여행 중 쉬어 가는 숙소이자 다양한 실내 활동을 즐기는 장소이다." },
        { type: "para", text: "역에서 호텔까지는 다카나와 출구 쪽으로 나와 이동한다. 같은 지역의 다른 프린스 계열 호텔과 혼동하지 않도록 호텔 이름과 주소를 함께 확인한다." },
        { type: "label", text: "주요 즐길 거리" },
        {
          type: "bullets",
          items: [
            "맥셀 아쿠아파크 시나가와: 호텔 부지 안의 수족관으로, 해양생물 전시와 공연을 즐길 수 있다.",
            "T・조이 프린스 시나가와: 호텔 단지 안의 영화관으로, 상영작과 시간은 영화관 홈페이지에서 확인한다.",
            "시나가와 프린스 호텔 볼링센터: 날씨에 관계없이 실내에서 즐길 수 있는 여가 시설이다.",
            "이용 안내: 각 시설의 입장료와 이용료는 숙박료에 자동으로 포함되는 것이 아니므로 예약 상품의 포함 내역을 확인한다. 운영 시간과 휴무는 시설별로 다르다.",
          ],
        },
      ],
    },
    {
      image: "images/hotel/hotel_main_lobby.jpg",
      title: "메인 타워와 숙박 안내",
      blocks: [
        { type: "lead", text: "체크인부터 식사까지, 호텔 이용의 중심이 되는 메인 타워" },
        { type: "para", text: "메인 타워 프런트는 1층에 있다. 트윈룸과 코너 트윈룸 등 여러 객실 유형이 있으며, 높은 층에서는 객실 방향에 따라 도쿄의 도시 풍경을 감상할 수 있다." },
        { type: "note", text: "사진은 메인 타워 로비이며, 객실 내부 사진은 아니다." },
        { type: "label", text: "숙박 시 알아둘 점" },
        {
          type: "bullets",
          items: [
            "객실: 메인 타워 일반 트윈룸은 약 21㎡, 코너 트윈룸은 약 26.5㎡이다. 층과 객실 유형에 따라 구성과 침대 조건이 다르다.",
            "전망: 도쿄 타워가 보이는 방이나 높은 층은 요청할 수 있지만, 객실 상황에 따라 배정이 보장되지는 않는다.",
            "인터넷: 객실에서 무료 Wi-Fi를 사용할 수 있다.",
            "짐 보관: 체크인 전·체크아웃 후에는 메인 타워 1층 짐 보관 카운터를 이용할 수 있다. 귀중품·깨지기 쉬운 물건·신선식품은 보관 대상에서 제외된다.",
          ],
        },
        { type: "label", text: "주요 식사 공간" },
        {
          type: "bullets",
          items: [
            "LUXE DINING HAPUNA: 메인 타워 1층의 뷔페 레스토랑이다. 조식 운영 시간은 공식 안내 기준 06:00~10:00이며, 조식 포함 여부는 예약 내역에서 확인한다.",
            "DINING & BAR TABLE 9 TOKYO: 메인 타워 39층, 지상 약 130m 높이에 있는 다이닝·바이다. 도쿄의 전망과 함께 식사할 수 있다.",
            "TABLE 9 이용 안내: 스마트 캐주얼 복장이 요구되며, 바 구역은 어린이가 이용할 수 없다. 저녁에는 연령과 보호자 동반 여부에 따른 입장 제한이 있으므로 방문 전 확인한다.",
            "식사 요금과 운영 시간은 날짜·메뉴에 따라 달라질 수 있다. 알레르기가 있다면 식당에 미리 문의한다.",
          ],
        },
      ],
    },
    {
      image: "images/hotel/hotel_annex_lobby.jpg",
      title: "타워별 위치와 이동 안내",
      blocks: [
        { type: "lead", text: "같은 호텔 안에서도 다른 체크인 장소" },
        { type: "para", text: "각 타워는 프런트 위치와 객실 구성이 다르다. 역에서 가까운 호텔이라도 예약한 타워를 확인하지 않으면 다른 프런트로 이동할 수 있으므로, 예약 확인서의 타워 이름을 먼저 살펴본다." },
        { type: "note", text: "사진은 아넥스 타워 로비이다." },
        { type: "label", text: "타워별 프런트" },
        {
          type: "table",
          rows: [
            ["메인 타워", "1층"],
            ["아넥스 타워", "7층"],
            ["N 타워", "2층"],
            ["이스트 타워", "1층"],
          ],
        },
        { type: "label", text: "이용 팁" },
        {
          type: "bullets",
          items: [
            "일행이 서로 다른 타워에 숙박한다면 타워 이름과 객실 예약자 이름을 함께 공유한다.",
            "N 타워와 이스트 타워는 저층 건물이므로, 모든 타워에서 높은 층의 전망을 기대할 수 있는 것은 아니다.",
            "조식 장소·식사권·체크아웃 시간은 예약 상품에 따라 달라질 수 있으므로 체크인할 때 확인한다.",
          ],
        },
      ],
    },
  ],
};

/** 호텔 정보를 그린다. 소개글 → 방문 안내 → 사진(위)+제목+내용 */
function renderHotel() {
  const section = document.getElementById("view-hotel");
  if (!section) return;

  const parts = [];

  const tag = document.createElement("p");
  tag.className = "spot-tagline";
  tag.textContent = `‘${HOTEL.tagline}’`;
  parts.push(tag);

  const intro = document.createElement("div");
  intro.className = "spot-intro";
  for (const text of HOTEL.intro) {
    const p = document.createElement("p");
    p.textContent = text;
    intro.append(p);
  }
  parts.push(intro);

  const info = document.createElement("section");
  info.className = "wb-section";
  const head = document.createElement("div");
  head.className = "sec-head";
  const bar = document.createElement("span");
  bar.className = "sec-bar";
  const title = document.createElement("h2");
  title.className = "sec-title";
  title.textContent = "방문 안내";
  head.append(bar, title);
  info.append(head, buildBlock({ type: "notes", items: HOTEL.notes }));
  parts.push(info);

  for (const spot of HOTEL.spots) {
    const wrap = document.createElement("section");
    wrap.className = "spot hotel-spot";

    // 사진은 가로로 꽉 채워 위에, 제목과 화살표 마크는 그 아래에
    const img = document.createElement("img");
    img.src = spot.image;
    img.alt = spot.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.className = "hotel-img";

    const side = document.createElement("div");
    side.className = "hotel-head";
    const name = document.createElement("h2");
    name.className = "ds-name hotel-name";
    name.textContent = spot.title;
    side.append(name);

    // 접지 않고 내용을 바로 보여준다
    const body = document.createElement("div");
    body.className = "hotel-body";
    for (const block of spot.blocks) body.append(buildBlock(block));

    wrap.append(img, side, body);
    parts.push(wrap);
  }

  // 메뉴 화면은 처음에 숨겨져 있으므로 스크롤 등장 효과는 쓰지 않는다
  for (const part of parts) {
    part.classList.remove("reveal");
    for (const el of part.querySelectorAll(".reveal")) el.classList.remove("reveal");
  }
  section.replaceChildren(...parts);
}

/* ── 일정표 (메뉴) ──
   내용 출처: images/timeline/timeline_1~4.jpg (이미지 대신 글로 다시 만들었다)
   group 은 조 이름(A·B·C·D), 색은 styles.css 의 .tl-group 에서 정한다. */

const SCHEDULE = [
  {
    day: "1일차",
    date: "10월 20일 (화)",
    legs: [
      {
        route: "대전 → 인천",
        by: "전용차량",
        items: [
          { time: "02:00", text: "대전대신고등학교 집결 및 출발", place: "대전대신고등학교" },
          { time: "06:00", text: "인천국제공항 도착 후 출국 수속", place: "인천공항 T2 3층 H카운터" },
        ],
      },
      {
        route: "인천 → 나리타",
        by: "OZ102 (아시아나항공)",
        items: [
          { time: "08:25", text: "인천국제공항 출발", place: "인천국제공항 T2" },
          { time: "10:50", text: "나리타국제공항 도착 후 입국 수속", place: "나리타국제공항" },
        ],
      },
      {
        route: "도쿄",
        by: "전용차량",
        items: [
          { time: "12:30", group: "A", text: "중식 → 다이바시티 쇼핑몰 → 석식 → 오다이바 해변공원·레인보우브릿지", place: "다이바시티 · 오다이바", note: "5반, 7반 · 중식 스타미나타로 · 석식 더오븐" },
          { time: "13:00", group: "B", text: "중식 → 다이바시티 쇼핑몰 · 오다이바 해변공원·레인보우브릿지 → 석식", place: "다이바시티 · 오다이바", note: "4반, 6반, 10반 · 중식 스타미나타로 · 석식 더오븐" },
          { time: "12:30", group: "C", text: "중식 → 아키하바라 → 석식", place: "아키하바라", note: "1반, 8반 · 중식 스타미나타로 · 석식 샤브요" },
          { time: "13:00", group: "D", text: "중식 → 아키하바라 → 석식", place: "아키하바라", note: "2반, 3반, 9반 · 중식 스타미나타로 · 석식 샤브요" },
          { time: "19:30", text: "호텔 이동 → 20:00 체크인 및 자유시간", place: "시나가와 프린스 호텔" },
        ],
      },
    ],
  },
  {
    day: "2일차",
    date: "10월 21일 (수)",
    legs: [
      {
        route: "도쿄",
        by: "전용차량",
        items: [
          { time: "06:00", text: "기상 및 호텔 조식", place: "호텔 조식당 하푸나", note: "메인타워 1층 · 뷔페" },
          { time: "08:30", group: "A·B", text: "아키하바라 → 중식 → 워너브라더스 스튜디오 이동", place: "아키하바라", note: "중식 샤브요" },
          { time: "14:00", group: "A·B", text: "메이킹 오브 해리포터 관람 (~18:00)", place: "워너브라더스 스튜디오", note: "석식 자유식 (1,500엔)" },
          { time: "08:30", group: "C·D", text: "워너브라더스 스튜디오 이동 → 09:30 메이킹 오브 해리포터 관람", place: "워너브라더스 스튜디오", note: "관람 ~13:30 · 중식 자유식 (1,500엔)" },
          { time: "14:30", group: "C", text: "다이바시티 쇼핑몰 → 석식 → 오다이바 해변공원·레인보우브릿지", place: "다이바시티 · 오다이바", note: "석식 더오븐" },
          { time: "14:30", group: "D", text: "다이바시티 쇼핑몰 · 오다이바 해변공원·레인보우브릿지 → 석식", place: "다이바시티 · 오다이바", note: "석식 더오븐" },
          { time: "19:30", text: "호텔 이동" },
          { time: "20:00", text: "호텔 귀환 및 자유시간", place: "시나가와 프린스 호텔" },
        ],
      },
    ],
  },
  {
    day: "3일차",
    date: "10월 22일 (목)",
    legs: [
      {
        route: "도쿄",
        by: "전용차량",
        items: [
          { time: "06:00", text: "기상 및 호텔 조식", place: "호텔 조식당 하푸나" },
          { time: "10:00", text: "도쿄 디즈니씨로 이동", note: "약 30분 소요" },
          { time: "10:30", text: "도쿄 디즈니씨 전일 자유 관광", place: "도쿄 디즈니씨", note: "프리패스권 포함" },
          { time: "", text: "중식 · 석식 자유식", place: "도쿄 디즈니씨 내 식당", note: "각 1,500엔 현금 지급" },
          { time: "21:00", text: "호텔 이동" },
          { time: "21:30", text: "호텔 귀환 및 휴식", place: "시나가와 프린스 호텔" },
        ],
      },
    ],
  },
  {
    day: "4일차",
    date: "10월 23일 (금)",
    legs: [
      {
        route: "도쿄 → 나리타",
        by: "전용차량",
        items: [
          { time: "06:00", text: "기상 및 호텔 조식", place: "호텔 조식당 하푸나" },
          { time: "08:40", text: "호텔 체크아웃 후 나리타로 이동", note: "짐 · 여권 꼭 확인!" },
          { time: "10:00", text: "문화탐방 · 나리타산 신승사 탐방", place: "나리타산 신승사" },
          { time: "11:00", text: "나리타국제공항 이동 후 출국 수속", place: "나리타국제공항" },
        ],
      },
      {
        route: "나리타 → 인천",
        by: "OZ101",
        items: [
          { time: "12:50", text: "나리타국제공항 출발", place: "나리타국제공항", note: "중식 기내식" },
          { time: "15:25", text: "인천국제공항 도착", place: "인천국제공항 T2" },
        ],
      },
      {
        route: "인천 → 대전",
        by: "전용차량",
        items: [
          { time: "", text: "공항 인근 식당에서 석식 후 대전 이동", place: "공항 인근 식당" },
          { time: "20:30", text: "대전대신고등학교 도착 후 해산", place: "대전대신고등학교" },
        ],
      },
    ],
  },
];

/** 회색 막대 + 큰 제목 (섹션 머리) */
function buildSecHead(text) {
  const head = document.createElement("div");
  head.className = "sec-head";
  const bar = document.createElement("span");
  bar.className = "sec-bar";
  const title = document.createElement("h2");
  title.className = "sec-title";
  title.textContent = text;
  head.append(bar, title);
  return head;
}

/** 일정표를 그린다. 날짜별로, 이동 구간(지역·교통) 아래에 시간순 일정 */
function renderTimeline() {
  const section = document.getElementById("view-schedule");
  if (!section) return;

  const parts = [];
  for (const day of SCHEDULE) {
    const wrap = document.createElement("section");
    wrap.className = "tl-day";
    const head = buildSecHead(day.day);
    const date = document.createElement("span");
    date.className = "tl-date";
    date.textContent = day.date;
    head.append(date);
    wrap.append(head);

    for (const leg of day.legs) {
      const route = document.createElement("p");
      route.className = "tl-leg";
      const where = document.createElement("b");
      where.textContent = leg.route;
      route.append(where, ` · ${leg.by}`);
      wrap.append(route);

      const list = document.createElement("ul");
      list.className = "tl-list";
      for (const item of leg.items) {
        const li = document.createElement("li");
        li.className = "tl-item";

        const time = document.createElement("span");
        time.className = "tl-time";
        time.textContent = item.time || "";

        const body = document.createElement("div");
        body.className = "tl-body";
        const text = document.createElement("p");
        text.className = "tl-text";
        if (item.group) {
          const tag = document.createElement("span");
          tag.className = "tl-group";
          tag.dataset.group = item.group.charAt(0);
          tag.textContent = `${item.group}조`;
          text.append(tag);
        }
        text.append(item.text);
        body.append(text);
        if (item.place) {
          const place = document.createElement("p");
          place.className = "tl-place";
          place.textContent = item.place;
          body.append(place);
        }
        if (item.note) {
          const note = document.createElement("p");
          note.className = "tl-note";
          note.textContent = item.note;
          body.append(note);
        }

        li.append(time, body);
        list.append(li);
      }
      wrap.append(list);
    }
    parts.push(wrap);
  }
  section.replaceChildren(...parts);
}

/* ── 유의사항 (메뉴) ──
   내용 출처: 사전안전교육 자료 (images/safe/, 저장소에는 올리지 않음)
   글 안의 **굵게** 는 굵은 글씨로 바뀐다.
   rules: 번호 목록 / steps: [제목, 설명] 번호 목록 / groups: 소제목별 묶음 */

const SAFETY = [
  {
    title: "안전 및 생활수칙",
    rules: [
      "**인솔교사·가이드 전화번호**를 핸드폰에 저장하기",
      "**여권**은 항상 몸에 지니고 분실에 주의하기",
      "고가의 귀중품과 필요 이상의 현금은 소지하지 않기",
      "차량 및 비행기에서는 지정된 좌석에 앉은 뒤 **안전벨트**를 반드시 착용하기",
    ],
  },
  {
    title: "도쿄 시내 탐방",
    rules: [
      "조별로 이동하고, 절대로 **개인행동**을 하지 않기",
      "일본은 차량이 **좌측**으로 통행하므로, 길을 건널 때 한 번 더 확인하기",
      "집합 **시간**과 집합 **장소**를 꼭 지키기",
      "위험한 시설에는 다가가지 말고, 지정된 길로만 이동하기",
      "지갑·휴대폰 소매치기와 분실에 주의하기",
    ],
  },
  {
    title: "테마파크 탐방",
    rules: [
      "편한 **운동화**를 신고, 우비와 겉옷을 챙기기",
      "일행과 함께 이동하고, **인솔교사 연락처**를 메모해 두기",
      "워너브라더스는 일부 전시물의 촬영이 제한되므로 안내를 따르기",
      "**식사비**를 잘 보관하고, 물을 자주 마시기",
      "집합 **시간·장소**를 꼭 확인하고 **늦지 않게** 이동하기",
    ],
  },
  {
    title: "숙소 체류 시",
    rules: [
      "선생님의 숙소 **생활지도** 내용을 지키기",
      "화재·지진 등 재난에 대비해 **탈출 경로**를 미리 알아 두기",
      "화재가 나면 젖은 수건을 코에 대고 낮은 자세로 비상구로 대피하기",
      "허가 없이 외출하거나 다른 방에 들어가지 않기",
      "객실 안에서는 금연, 복도에서는 떠들지 않기",
    ],
  },
  {
    title: "일본 여행 에티켓 10가지",
    steps: [
      ["길을 건널 땐 차량 방향 확인", "일본은 차량이 왼쪽으로 다닌다. 횡단보도에서는 평소보다 한 번 더 좌우를 확인한다."],
      ["전철·버스에서는 조용히", "큰 소리로 떠들거나 음악·영상을 크게 틀지 않는다. 휴대전화 통화는 되도록 삼간다."],
      ["줄은 꼭 지키기", "전철, 식당, 계산대에서는 정해진 줄에 선다. 새치기는 하지 않는다."],
      ["길을 여러 명이 가로막지 않기", "나란히 걸으며 길 전체를 막지 않도록 하고, 사람이 오면 자연스럽게 비켜 준다."],
      ["쓰레기는 직접 챙기기", "거리에 쓰레기통이 많지 않다. 작은 봉투를 준비해 숙소나 정해진 곳에서 버린다."],
      ["사진 찍기 전에 한 번 확인", "신사·사찰·가게의 촬영 금지 구역을 확인한다. 허락 없이 다른 사람을 찍거나 SNS에 올리지 않는다."],
      ["식당에서는 기본 매너 지키기", "젓가락을 밥에 꽂거나 젓가락끼리 음식을 주고받지 않는다. 식사 전 “이타다키마스”, 식사 후 “고치소사마데시타”."],
      ["신사와 사찰에서는 차분하게", "떠들거나 뛰지 않는다. 신사에서는 박수를 치며 참배하고, 사찰에서는 박수를 치지 않는 것이 일반적이다."],
      ["호텔에서는 복도 소음 주의", "밤늦게 방이나 복도에서 떠들지 않는다. 문을 세게 닫거나 뛰어다니면 다른 손님에게 피해가 된다."],
      ["“스미마센”, “아리가토 고자이마스”", "스미마센: 실례합니다 / 죄송합니다. 아리가토 고자이마스: 감사합니다."],
    ],
  },
  {
    title: "응급상황 행동요령",
    groups: [
      {
        label: "전세버스 교통사고가 났을 때",
        steps: [
          ["위험 확인", "안전벨트를 풀기 전에 주변 위험을 확인한다."],
          ["순차 대피", "선생님 지시에 따라 차례대로 대피한다."],
          ["버스와 거리 두기", "버스에서 멀리 떨어진 곳으로 이동한다."],
          ["인원 확인", "인원을 확인하고 기다린다."],
        ],
      },
      {
        label: "호텔에 불이 났을 때",
        steps: [
          ["화재 신고", "선생님·프런트에 알리고 안내에 집중한다."],
          ["낮은 자세로 대피", "엘리베이터 대신 비상계단으로 이동하고, 젖은 수건으로 입과 코를 가린다."],
          ["안전한 곳으로", "건물 밖 지정된 안전장소로 이동한다."],
          ["인원 확인", "위치와 상태를 알리고 기다린다."],
        ],
      },
      {
        label: "지진이 났을 때",
        steps: [
          ["몸 보호", "탁자 아래로 들어가 머리를 보호한다."],
          ["출구 확보", "흔들림이 멈추면 문을 열어 출구를 확보한다."],
          ["계단으로 대피", "엘리베이터는 타지 않고 계단으로 이동한다."],
          ["넓은 곳으로", "공원·운동장 등 넓은 곳에서 기다린다."],
        ],
      },
      {
        label: "친구가 안 보일 때",
        steps: [
          ["바로 알리기", "친구가 안 보이면 선생님께 바로 알린다."],
          ["제자리에서 기다리기", "혼자 찾아다니지 않고 기다린다."],
          ["찾으면 알리기", "친구를 찾으면 바로 알린다."],
          ["지시 따르기", "선생님 지시에 따라 행동한다."],
        ],
      },
    ],
  },
  {
    title: "여권·짐 분실 시",
    warn: "절대 혼자 찾으러 다니지 않기!",
    groups: [
      {
        label: "여권을 잃어버렸을 때",
        steps: [
          ["인솔교사에게 먼저 알리기", ""],
          ["경찰서에서 분실증명서 발급", ""],
          ["대사관에서 여권 재발급 신청", ""],
          ["서류를 갖추면 현지에서 재발급", ""],
        ],
      },
      {
        label: "짐을 잃어버렸을 때",
        steps: [
          ["인솔교사에게 먼저 알리기", ""],
          ["공항 신고소·호텔 프런트에 신고", ""],
          ["분실·도난 증명서 받기", ""],
          ["여행자보험으로 보상 청구", ""],
        ],
      },
    ],
  },
  {
    title: "보조배터리 기내 반입",
    rules: [
      "보조배터리는 **반드시 기내**에 들고 타기 (부치는 짐에 넣지 않기)",
      "**1인 2개**까지, 100Wh(27,000mAh) 이하만 가능",
      "**단자 보호** 필수 (개별 비닐백·절연테이프·보호캡 중 1개)",
      "비행 중 기내에서 **사용·충전 금지**",
      "과열되거나 부풀면 즉시 승무원에게 알리기",
    ],
  },
  {
    title: "무료 수하물 기준",
    tables: [
      { label: "부치는 짐 (위탁 수하물)", rows: [["크기", "158cm 이하 (가로+세로+높이 합계)"], ["무게", "23kg 이하"], ["개수", "1개"]] },
      { label: "들고 타는 짐 (기내 수하물)", rows: [["크기", "115cm 이하 (55×20×40)"], ["무게", "10kg 이하"], ["개수", "1개"]] },
    ],
    foot: "※ 크기는 손잡이·바퀴를 포함한다.",
  },
  {
    title: "우리 함께 지켜요!",
    groups: [
      { label: "약속 지키기", list: ["약속 시간 지키기", "약속 장소 지키기", "선생님 공지에 집중하기"] },
      { label: "건강 지키기", list: ["개인 비상약 챙기기 (알레르기 약 등)", "충분히 쉬기", "밤새지 않기"] },
      { label: "안전 지키기", list: ["혼자 다니지 않기", "선생님과 인솔자 말씀 잘 따르기", "호텔에 들어온 뒤에는 나가지 않기"] },
    ],
  },
];

/** '**굵게**' 표시를 굵은 글씨로 바꿔 넣는다 */
function fillBold(el, text) {
  text.split(/\*\*(.+?)\*\*/).forEach((piece, i) => {
    if (!piece) return;
    if (i % 2) {
      const b = document.createElement("b");
      b.textContent = piece;
      el.append(b);
    } else {
      el.append(piece);
    }
  });
}

/** 번호가 붙은 목록. 항목은 글 한 줄이거나 [제목, 설명] */
function buildNumbered(items) {
  const ol = document.createElement("ol");
  ol.className = "sf-list";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "sf-item";
    const no = document.createElement("span");
    no.className = "sf-no";
    no.textContent = String(i + 1);
    const body = document.createElement("div");
    body.className = "sf-body";
    if (Array.isArray(item)) {
      const t = document.createElement("p");
      t.className = "sf-title";
      t.textContent = item[0];
      body.append(t);
      if (item[1]) {
        const d = document.createElement("p");
        d.className = "sf-desc";
        d.textContent = item[1];
        body.append(d);
      }
    } else {
      const t = document.createElement("p");
      t.className = "sf-text";
      fillBold(t, item);
      body.append(t);
    }
    li.append(no, body);
    ol.append(li);
  });
  return ol;
}

/** 유의사항을 그린다 */
function renderSafety() {
  const section = document.getElementById("view-safety");
  if (!section) return;

  const parts = [];
  for (const block of SAFETY) {
    const wrap = document.createElement("section");
    wrap.className = "sf-section";
    wrap.append(buildSecHead(block.title));

    if (block.warn) {
      const warn = document.createElement("p");
      warn.className = "sf-warn";
      warn.textContent = block.warn;
      wrap.append(warn);
    }
    if (block.rules) wrap.append(buildNumbered(block.rules));
    if (block.steps) wrap.append(buildNumbered(block.steps));

    for (const group of block.groups || []) {
      const label = document.createElement("p");
      label.className = "ds-sublabel sf-label";
      label.textContent = group.label;
      wrap.append(label);
      if (group.steps) wrap.append(buildNumbered(group.steps));
      if (group.list) {
        const ul = document.createElement("ul");
        ul.className = "ds-bullets";
        for (const text of group.list) {
          const li = document.createElement("li");
          li.textContent = text;
          ul.append(li);
        }
        wrap.append(ul);
      }
    }

    for (const table of block.tables || []) {
      const label = document.createElement("p");
      label.className = "ds-sublabel sf-label";
      label.textContent = table.label;
      const t = buildBlock({ type: "table", rows: table.rows });
      t.classList.remove("reveal");
      t.classList.add("sf-table");
      wrap.append(label, t);
    }
    if (block.foot) {
      const foot = document.createElement("p");
      foot.className = "sf-foot";
      foot.textContent = block.foot;
      wrap.append(foot);
    }

    // 일본어 회화처럼 항목별로 접어 두고, 제목줄(화살표 마크)을 누르면 펼친다
    const [head, ...content] = wrap.children;
    wrap.classList.add("jp-section");
    head.classList.add("jp-head");
    const toggle = buildToggle();
    head.append(toggle);
    const body = document.createElement("div");
    body.className = "jp-body";
    const inner = document.createElement("div");
    inner.className = "jp-body-inner";
    inner.append(...content);
    body.append(inner);
    wrap.append(body);
    head.addEventListener("click", () => {
      const open = wrap.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "접기" : "자세히 보기");
    });

    parts.push(wrap);
  }
  section.replaceChildren(...parts);
}

/** 홈 화면 추가 안내를 그린다. 세 페이지가 같은 내용을 쓴다. */
function renderGuide() {
  const section = document.getElementById("view-install");
  if (!section) return;

  const groups = [];

  for (const group of GUIDE_GROUPS) {
    const wrap = document.createElement("div");
    wrap.className = "guide-group";

    // 가운데 제목과 그 아래 가로로 긴 회색 막대
    const title = document.createElement("h2");
    title.className = "guide-title";
    title.textContent = group.title;
    wrap.append(title);

    const list = document.createElement("ol");
    list.className = "guide";

    for (const [i, step] of group.steps.entries()) {
      const item = document.createElement("li");
      item.className = "guide-step";

      const img = document.createElement("img");
      img.src = step.image;
      img.alt = step.text || `${i + 1}단계`;
      img.loading = "lazy";
      img.decoding = "async";
      item.append(img);

      if (step.text) {
        const caption = document.createElement("p");
        caption.className = "guide-text";
        caption.textContent = step.text;
        item.append(caption);
      }

      list.append(item);
    }

    wrap.append(list);
    groups.push(wrap);
  }

  section.replaceChildren(...groups);
}

/* ── 장소 목록 (지역 페이지 본문) ──
   사진 + 제목 + 펼치기 버튼, 버튼을 누르면 상세가 아래로 펼쳐진다. */

/** 구글 지도 검색 링크 */
function mapsLink(name, address) {
  const q = encodeURIComponent(`${name} ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** 펼치기/접기 버튼 (검은 동그라미 안 흰 화살표) */
function buildToggle() {
  const btn = document.createElement("button");
  btn.className = "spot-toggle";
  btn.type = "button";
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "자세히 보기");
  btn.innerHTML =
    '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M9 5.5 15.5 12 9 18.5" /></svg>';
  return btn;
}

/** 옆에 글씨가 붙는 작은 사진: 홈 카드처럼 모서리를 둥글게 하고 아래쪽을 아주 옅게 어둡게 깐다 */
function wrapThumb(img, className = "") {
  const frame = document.createElement("span");
  frame.className = className ? `thumb ${className}` : "thumb";
  frame.append(img);
  return frame;
}

/** 한 장소 블록을 만든다. */
function buildSpot(spot) {
  const section = document.createElement("section");
  section.className = "spot";

  // 사진(왼쪽) + 제목·펼치기 버튼(오른쪽)
  const head = document.createElement("div");
  head.className = spot.flip ? "spot-head flip" : "spot-head";

  const img = document.createElement("img");
  img.className = "spot-img";
  img.src = spot.image;
  img.alt = spot.title;
  img.loading = "lazy";
  img.decoding = "async";

  const side = document.createElement("div");
  side.className = "spot-head-side";
  const title = document.createElement("h2");
  title.className = "spot-title";
  title.textContent = spot.title;
  const toggle = buildToggle();
  side.append(title, toggle);

  head.append(img, side);
  section.append(head);

  // 펼쳐지는 내용
  const body = document.createElement("div");
  body.className = "spot-body";
  const inner = document.createElement("div");
  inner.className = "spot-body-inner";

  const lines = document.createElement("div");
  lines.className = "spot-lines";
  for (const line of spot.lines) {
    const p = document.createElement("p");
    p.className = "spot-line";
    p.textContent = line;
    lines.append(p);
  }
  inner.append(lines);

  const meta = document.createElement("dl");
  meta.className = "spot-meta";

  const addrKey = document.createElement("dt");
  addrKey.textContent = "주소";
  const addrVal = document.createElement("dd");
  const link = document.createElement("a");
  link.href = mapsLink(spot.title, spot.address);
  link.textContent = spot.address;
  link.target = "_blank";
  link.rel = "noopener";
  addrVal.append(link);

  const hoursKey = document.createElement("dt");
  hoursKey.textContent = "영업시간";
  const hoursVal = document.createElement("dd");
  hoursVal.textContent = spot.hours;

  meta.append(addrKey, addrVal, hoursKey, hoursVal);
  inner.append(meta);

  if (spot.floors && spot.floors.length) {
    const heading = document.createElement("h3");
    heading.className = "floors-title";
    heading.textContent = "층별 안내";
    inner.append(heading);

    const table = document.createElement("table");
    table.className = "floors";
    const tbody = document.createElement("tbody");
    for (const row of spot.floors) {
      const tr = document.createElement("tr");
      for (const [i, cell] of row.entries()) {
        const td = document.createElement("td");
        td.textContent = cell;
        if (i === 0) td.className = "floor-no";
        tr.append(td);
      }
      tbody.append(tr);
    }
    table.append(tbody);
    inner.append(table);
  }

  body.append(inner);
  section.append(body);

  toggle.addEventListener("click", () => {
    const open = section.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "접기" : "자세히 보기");
  });

  return section;
}

/** 지역 페이지 본문을 그린다. */
function renderSpots(data) {
  const main = document.getElementById("view-main");
  if (!main) return;

  const parts = [];
  if (data.tagline) {
    const tag = document.createElement("p");
    tag.className = "spot-tagline";
    tag.textContent = `‘${data.tagline}’`;
    parts.push(tag);
  }
  if (data.intro && data.intro.length) {
    const intro = document.createElement("div");
    intro.className = "spot-intro";
    for (const text of data.intro) {
      const p = document.createElement("p");
      p.textContent = text;
      intro.append(p);
    }
    parts.push(intro);
  }
  for (const spot of data.spots) parts.push(buildSpot(spot));
  main.replaceChildren(...parts);
}

/* ── 섹션형 지역 페이지 (관광 / 체험 / 샵 …) ──
   펼치고 접는 것 없이, 사진과 설명이 좌우로 번갈아 놓인다.
   소개글 아래부터는 스크롤을 처음 내릴 때 순서대로 나타난다. */

/** "제목: 내용" 이면 제목만 굵게 */
function fillLabeled(el, text) {
  const at = text.indexOf(": ");
  if (at > 0 && at < 40) {
    const label = document.createElement("b");
    label.textContent = text.slice(0, at);
    el.append(label, text.slice(at));
  } else {
    el.textContent = text;
  }
}

/** 사진 + 설명 한 줄 */
function buildShowcaseItem(item) {
  const row = document.createElement("div");
  const place = item.side === "right" ? " right" : item.side === "top" ? " top" : "";
  row.className = `wb-item${place} reveal`;

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";

  const p = document.createElement("p");
  p.className = "wb-text";
  fillLabeled(p, item.text);

  row.append(item.side === "top" ? img : wrapThumb(img), p);
  return row;
}

/** 스크롤을 처음 내릴 때 순서대로 나타나게 한다. 한 번 나오면 그대로 둔다. */
function initReveal(root) {
  const targets = [...root.querySelectorAll(".reveal")];
  if (!targets.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    for (const el of targets) el.classList.add("shown");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    // 같이 들어온 것들끼리 위에서 아래로 시차를 준다
    const batch = entries.filter((e) => e.isIntersecting);
    batch.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    batch.forEach((entry, i) => {
      entry.target.style.setProperty("--delay", `${i * 0.09}s`);
      entry.target.classList.add("shown");
      observer.unobserve(entry.target);   // 다시는 애니메이션하지 않음
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  for (const el of targets) observer.observe(el);
}

/** 블록 하나를 만든다. (섹션 안에 들어가는 여러 모양들) */
function buildBlock(block) {
  switch (block.type) {
    // 사진 + 시설 이름(제목 폰트), 그 아래 설명
    case "item": {
      const wrap = document.createElement("div");
      const kinds = ["ds-item", "reveal"];
      if (block.wide) kinds.push("wide");
      if (block.quiet) kinds.push("quiet");
      if (block.italicName) kinds.push("italic-name");
      if (block.plainName) kinds.push("plain-name");
      wrap.className = kinds.join(" ");

      const head = document.createElement("div");
      head.className = "ds-head";
      const img = document.createElement("img");
      img.src = block.image;
      img.alt = block.name || "";
      img.loading = "lazy";
      img.decoding = "async";
      const name = document.createElement("h3");
      name.className = "ds-name";
      name.textContent = block.name;
      wrap.append(head);

      // 넓은 사진은 이름·설명을 아래에, 작은 사진은 이름·설명을 사진 옆에 함께 둔다
      let body = wrap;
      if (block.wide) {
        head.append(img, name);
      } else {
        body = document.createElement("div");
        body.className = "ds-side";
        body.append(name);
        head.append(wrapThumb(img), body);
      }

      for (const text of block.lines || (block.text ? [block.text] : [])) {
        const p = document.createElement("p");
        p.className = "ds-text";
        p.textContent = text;
        body.append(p);
      }
      // '• 역사: …' 처럼 머리말이 붙은 줄은 목록으로, 머리말은 굵게
      if (block.bullets && block.bullets.length) {
        const ul = document.createElement("ul");
        ul.className = "ds-bullets";
        for (const text of block.bullets) {
          const li = document.createElement("li");
          fillLabeled(li, text);
          ul.append(li);
        }
        body.append(ul);
      }
      if (block.tip) {
        const tip = document.createElement("p");
        tip.className = "ds-tip";
        fillLabeled(tip, block.tip);
        body.append(tip);
      }
      return wrap;
    }

    // 사진 여러 장을 가로로 두 개씩 (플로어 가이드)
    case "grid": {
      const wrap = document.createElement("div");
      wrap.className = "ds-grid reveal";
      for (const src of block.images) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        wrap.append(img);
      }
      return wrap;
    }

    case "image": {
      const img = document.createElement("img");
      img.className = "ds-full reveal";
      img.src = block.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      return img;
    }

    case "lead": {
      const p = document.createElement("p");
      p.className = "ds-lead reveal";
      p.textContent = block.text;
      return p;
    }

    case "para": {
      const p = document.createElement("p");
      p.className = "ds-text reveal";
      p.textContent = block.text;
      return p;
    }

    // 1·2·3… 작은 회색 목록
    case "steps": {
      const ol = document.createElement("ol");
      ol.className = "small-list reveal";
      for (const text of block.items) {
        const li = document.createElement("li");
        li.textContent = text;
        ol.append(li);
      }
      return ol;
    }

    // '조사할 내용' 같은 작은 회색 목록
    case "todo": {
      const wrap = document.createElement("div");
      wrap.className = "reveal";
      if (block.title) {
        const h = document.createElement("p");
        h.className = "small-list-title";
        h.textContent = block.title;
        wrap.append(h);
      }
      const ul = document.createElement("ul");
      ul.className = "small-list";
      for (const text of block.items) {
        const li = document.createElement("li");
        li.textContent = text;
        ul.append(li);
      }
      wrap.append(ul);
      return wrap;
    }

    case "checklist": {
      const ul = document.createElement("ul");
      ul.className = "ds-checklist reveal";
      for (const text of block.items) {
        const li = document.createElement("li");
        li.textContent = text;
        ul.append(li);
      }
      return ul;
    }

    case "table": {
      const table = document.createElement("table");
      table.className = "floors reveal";
      const tbody = document.createElement("tbody");
      for (const row of block.rows) {
        const tr = document.createElement("tr");
        row.forEach((cell, i) => {
          const td = document.createElement("td");
          td.textContent = cell;
          if (i === 0) td.className = "floor-no";
          tr.append(td);
        });
        tbody.append(tr);
      }
      table.append(tbody);
      return table;
    }

    // '• 이름: 설명' 점 목록 (머리말은 굵게)
    case "bullets": {
      const ul = document.createElement("ul");
      ul.className = "ds-bullets reveal";
      for (const text of block.items) {
        const li = document.createElement("li");
        fillLabeled(li, text);
        ul.append(li);
      }
      return ul;
    }

    case "label": {
      const p = document.createElement("p");
      p.className = "ds-sublabel reveal";
      p.textContent = block.text;
      return p;
    }

    // 화살표 마크를 누르면 아래 내용이 펼쳐진다 (아키하바라와 같은 방식)
    case "fold": {
      const wrap = document.createElement("div");
      wrap.className = "ds-fold";

      const bar = document.createElement("div");
      bar.className = "ds-fold-bar";
      const toggle = buildToggle();
      bar.append(toggle);

      const body = document.createElement("div");
      body.className = "ds-fold-body";
      const inner = document.createElement("div");
      inner.className = "ds-fold-inner";
      for (const child of block.blocks) inner.append(buildBlock(child));
      // 접혀 있는 동안에는 화면에 들어온 적이 없으므로 등장 효과는 쓰지 않는다
      for (const el of inner.querySelectorAll(".reveal")) el.classList.remove("reveal");
      body.append(inner);

      wrap.append(bar, body);

      toggle.addEventListener("click", () => {
        const open = wrap.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "접기" : "자세히 보기");
      });

      return wrap;
    }

    // 여러 줄짜리 회색 작은 글씨. 줄 안의 주소는 링크로 바꾼다.
    case "notes": {
      const wrap = document.createElement("div");
      wrap.className = "ds-notes reveal";
      for (const text of block.items) {
        const p = document.createElement("p");
        const at = text.search(/https?:\/\//);
        if (at >= 0) {
          const url = text.slice(at).trim();
          const a = document.createElement("a");
          a.href = url;
          a.textContent = url;
          a.target = "_blank";
          a.rel = "noopener";
          p.append(text.slice(0, at), a);
        } else {
          p.textContent = text;
        }
        wrap.append(p);
      }
      return wrap;
    }

    case "note": {
      const p = document.createElement("p");
      p.className = "ds-note reveal";
      p.textContent = block.text;
      return p;
    }

    case "link": {
      const p = document.createElement("p");
      p.className = "ds-link reveal";
      const a = document.createElement("a");
      a.href = block.href;
      a.textContent = block.label;
      a.target = "_blank";
      a.rel = "noopener";
      p.append(a);
      return p;
    }

    // ' ' 안에 있던 문구 (따옴표 없이 회색 기울임)
    case "quote": {
      const p = document.createElement("p");
      p.className = "sec-desc reveal";
      p.textContent = block.text;
      return p;
    }

    default:
      return document.createTextNode("");
  }
}

/** 섹션형 본문을 그린다. */
function renderShowcase(data) {
  const main = document.getElementById("view-main");
  if (!main) return;

  const parts = [];

  if (data.tagline) {
    const tag = document.createElement("p");
    tag.className = "spot-tagline";
    tag.textContent = data.tagline;
    parts.push(tag);
  }

  if (data.hero) {
    // 위아래가 배경으로 자연스럽게 녹아들도록 감싸준다
    const frame = document.createElement("figure");
    frame.className = "ds-hero";
    const hero = document.createElement("img");
    hero.src = data.hero;
    hero.alt = "";
    hero.decoding = "async";
    frame.append(hero);
    parts.push(frame);
  }

  if (data.intro && data.intro.length) {
    const intro = document.createElement("div");
    intro.className = "spot-intro";
    for (const text of data.intro) {
      const p = document.createElement("p");
      p.textContent = text;
      intro.append(p);
    }
    parts.push(intro);
  }

  for (const section of data.sections) {
    const sec = document.createElement("section");
    sec.className = "wb-section";

    if (section.title) {
      const head = document.createElement("div");
      head.className = "sec-head reveal";
      const bar = document.createElement("span");
      bar.className = "sec-bar";
      const title = document.createElement("h2");
      title.className = "sec-title";
      title.textContent = section.title;
      head.append(bar, title);
      sec.append(head);
    }

    if (section.desc) {
      const desc = document.createElement("p");
      desc.className = "sec-desc reveal";
      desc.textContent = section.desc;
      sec.append(desc);
    }

    if (section.items) {
      for (const item of section.items) sec.append(buildShowcaseItem(item));
    }
    if (section.blocks) {
      for (const block of section.blocks) sec.append(buildBlock(block));
    }
    parts.push(sec);
  }

  main.replaceChildren(...parts);
  initReveal(main);
}

/** 안드로이드에서 '앱 설치'가 뜨도록 서비스 워커를 등록한다. */
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return; // 로컬에서 그냥 열었을 때는 건너뜀
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("서비스 워커 등록 실패:", err);
    });
  });
}

/* ── 페이지 전환 ──
   떠나는 페이지는 아래로 페이드아웃, 새 페이지는 아래에서 위로 올라오며 페이드인.
   (올라오는 쪽은 각 요소의 .rise 애니메이션이 맡는다)

   이동은 location.replace 로 한다. 방문 기록을 새로 쌓지 않아서
   아이폰의 '왼쪽에서 오른쪽으로 스와이프해 뒤로가기' 가 돌아갈 곳을 못 찾는다.
   (그 제스처는 WebKit 이 처리해서 JS 로는 막을 수 없다.
    기록을 안 만드는 것이 앱처럼 버튼으로만 움직이게 하는 유일한 방법) */

const EXIT_MS = 300; // 페이드아웃에 쓰는 시간. styles.css 의 .app.leaving 과 맞출 것

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initPageTransitions() {
  const app = document.querySelector(".app");
  if (!app) return;

  // 뒤로가기로 돌아왔을 때 사라진 상태로 남지 않도록
  window.addEventListener("pageshow", () => app.classList.remove("leaving"));

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;

    const url = new URL(link.getAttribute("href"), location.href);
    if (url.origin !== location.origin) return;       // 바깥 사이트는 그대로
    if (url.href === location.href) return;           // 같은 페이지면 굳이

    event.preventDefault();

    // 움직임 줄이기 설정이면 효과 없이 바로 이동
    if (prefersReducedMotion()) {
      location.replace(url.href);
      return;
    }

    app.classList.add("leaving");
    setTimeout(() => { location.replace(url.href); }, EXIT_MS);
  });
}

/* ── 위쪽 버튼 ──
   아래로 내릴 때는 숨고, 위로 올릴 때 다시 내려온다.
   (버튼을 body 로 옮겨야 페이지 전환 애니메이션의 transform 에
    휘둘리지 않고 화면에 고정된다) */

function initFloatingNav() {
  const buttons = [...document.querySelectorAll(".home-btn")];
  for (const btn of buttons) document.body.append(btn);

  let last = Math.max(0, window.scrollY);

  const update = () => {
    const y = Math.max(0, window.scrollY);
    const moved = y - last;
    if (y < 60) {
      document.body.classList.remove("nav-hidden");          // 맨 위에서는 항상
    } else if (moved > 6) {
      document.body.classList.add("nav-hidden");             // 내리는 중
    } else if (moved < -6) {
      document.body.classList.remove("nav-hidden");          // 올리는 중
    }
    if (Math.abs(moved) > 6 || y < 60) last = y;
  };

  // 클래스만 바꾸는 가벼운 처리라 그대로 받아도 된다
  window.addEventListener("scroll", update, { passive: true });
}

/* ── 오른쪽 상단 메뉴 ──
   가로선 3개 버튼을 누르면 오른쪽에서 패널이 절반 폭만큼 밀려 나온다.
   항목은 아직 누르는 동작이 없다. */

const MENU_ITEMS = [
  { label: "일정표", view: "schedule" },
  { label: "일본어 회화", view: "japanese" },
  { label: "호텔 정보", view: "hotel" },
  { label: "유의사항", view: "safety" },
  { label: "홈 화면 추가", view: "install" },
];

/* ── 섹션 전환 ──
   어느 페이지에서든 상단 사진은 그대로 두고 그 아래만 바꾼다.
   시부야에서 열면 시부야 사진이, 홈에서 열면 도쿄 사진이 그대로 남는다. */

const VIEWS = ["main", "schedule", "japanese", "hotel", "safety", "install"];

/** 메뉴로 연 화면에서 사진 아래에 표시할 제목 */
const VIEW_TITLES = Object.fromEntries(
  MENU_ITEMS.map((item) => [item.view, item.label])
);

function showView(view) {
  if (!VIEWS.includes(view)) view = "main";

  for (const name of VIEWS) {
    const section = document.getElementById(`view-${name}`);
    if (section) section.hidden = name !== view;
  }

  // 상단 제목도 같이 교체 (사진은 건드리지 않는다)
  const mainTitle = document.querySelector(".hero-title:not(.hero-title-alt)");
  const altTitle = document.querySelector(".hero-title-alt");
  if (mainTitle) mainTitle.hidden = view !== "main";
  if (altTitle) {
    altTitle.hidden = view === "main";
    const label = altTitle.querySelector("span");
    if (label && VIEW_TITLES[view]) label.textContent = VIEW_TITLES[view];
  }

  document.body.dataset.view = view;
  const url = view === "main" ? location.pathname : `#${view}`;
  history.replaceState(null, "", url);
}

/** 메뉴 항목을 골랐을 때: 지금 페이지 안에서 바로 전환 */
function openMenuItem(item) {
  showView(item.view);
}

/** 홈 버튼: 홈 화면에서 다른 섹션을 보고 있으면 새로고침 없이 되돌린다. */
function initHomeButton() {
  const btn = document.querySelector(".home-btn");
  if (!btn) return;
  btn.addEventListener("click", (event) => {
    const onHome = document.body.dataset.page === "home";
    const inMain = (document.body.dataset.view || "main") === "main";
    if (!onHome || inMain) return;   // 지역 페이지거나 이미 홈이면 평소대로 이동
    event.preventDefault();
    event.stopPropagation();
    showView("main");
  }, true);
}

/** 주소에 #schedule 이 붙어 있으면 그 섹션으로 시작한다. */
function initViews() {
  showView(location.hash.replace("#", "") || "main");
  initHomeButton();
}

function buildMenuButton() {
  const btn = document.createElement("button");
  btn.className = "menu-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "메뉴 열기");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>';
  return btn;
}

/** 메뉴로 연 화면에서 쓰는 되돌아가기 버튼 (메뉴 버튼 자리에 대신 들어간다) */
function buildBackButton() {
  const btn = document.createElement("button");
  btn.className = "back-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "이전 화면으로");
  btn.innerHTML =
    '<svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M18 20v-6.5a5.5 5.5 0 0 0-11 0V18" />' +
    '<path d="M3.5 14.5 7 18l3.5-3.5" /></svg>';
  btn.addEventListener("click", () => showView("main"));
  return btn;
}

function buildDrawer() {
  const drawer = document.createElement("aside");
  drawer.className = "drawer";
  drawer.setAttribute("aria-hidden", "true");

  const title = document.createElement("p");
  title.className = "drawer-title";
  title.textContent = "설정";
  drawer.append(title);

  const list = document.createElement("div");
  list.className = "drawer-list";
  for (const item of MENU_ITEMS) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "drawer-item";
    row.textContent = item.label;
    row.dataset.view = item.view;
    list.append(row);
  }
  drawer.append(list);
  return drawer;
}

function initMenu() {
  const app = document.querySelector(".app");
  if (!app) return;

  const btn = buildMenuButton();
  const back = buildBackButton();
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  const drawer = buildDrawer();
  document.body.append(btn, back);
  // 패널과 배경은 body 에 붙인다. .app 은 페이지 전환 때 transform 이 걸리는데
  // transform 이 걸린 조상 안에서는 position: fixed 가 그 조상 기준으로 바뀌어
  // 패널이 잠깐 화면 안으로 튀어 들어온다.
  document.body.append(scrim, drawer);

  // PC 에서 스크롤바 폭까지 고려해 앱 본체 오른쪽 끝에 정확히 붙인다
  const syncPosition = () => {
    const rect = app.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    drawer.style.right = `${Math.max(0, viewport - rect.right)}px`;
    drawer.style.width = `${Math.min(rect.width / 2, 360)}px`;
  };
  syncPosition();
  window.addEventListener("resize", syncPosition);

  const setOpen = (open) => {
    btn.classList.toggle("open", open);
    scrim.classList.toggle("open", open);
    drawer.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    drawer.setAttribute("aria-hidden", String(!open));
  };

  btn.addEventListener("click", () => setOpen(!drawer.classList.contains("open")));

  drawer.addEventListener("click", (event) => {
    const row = event.target.closest(".drawer-item");
    if (!row) return;
    const item = MENU_ITEMS.find((i) => i.view === row.dataset.view);
    if (!item) return;
    setOpen(false);
    openMenuItem(item);
  });
  scrim.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ── 사진 크게 보기 ──
   플로어 가이드처럼 자세히 봐야 하는 사진을 누르면 전체 화면으로 열린다.
   손가락 두 개로 확대·축소, 확대한 뒤에는 끌어서 이동, 두 번 두드리면 확대/원래대로.
   확대하지 않은 상태에서 아래로 끌어내리거나 배경을 누르면 닫힌다. */
function initLightbox() {
  if (document.querySelector(".lightbox")) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;

  const img = document.createElement("img");
  img.className = "lightbox-img";
  img.alt = "";
  img.decoding = "async";

  const close = document.createElement("button");
  close.className = "lightbox-close";
  close.type = "button";
  close.setAttribute("aria-label", "닫기");
  close.innerHTML =
    '<svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M6 6 18 18" /><path d="M18 6 6 18" /></svg>';

  box.append(img, close);
  document.body.append(box);

  const MAX = 6;
  let scale = 1;
  let tx = 0;
  let ty = 0;

  const pointers = new Map();
  let startScale = 1;
  let startDist = 0;
  let startMid = { x: 0, y: 0 };
  let startTx = 0;
  let startTy = 0;
  let downAt = { x: 0, y: 0 };
  let lastTapAt = 0;

  const apply = () => {
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  };

  // 확대한 만큼만 움직일 수 있게 가둔다
  const clampPan = () => {
    const mx = Math.max(0, (img.offsetWidth * scale - window.innerWidth) / 2);
    const my = Math.max(0, (img.offsetHeight * scale - window.innerHeight) / 2);
    tx = Math.min(mx, Math.max(-mx, tx));
    ty = Math.min(my, Math.max(-my, ty));
  };

  // 화면의 한 점을 기준으로 배율을 바꾼다 (그 점에 있던 부분이 제자리에 남는다)
  const zoomAt = (next, px, py) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const ux = (px - cx - tx) / scale;
    const uy = (py - cy - ty) / scale;
    scale = Math.min(MAX, Math.max(1, next));
    tx = px - cx - ux * scale;
    ty = py - cy - uy * scale;
    clampPan();
    apply();
  };

  const open = (src) => {
    img.src = src;
    scale = 1;
    tx = 0;
    ty = 0;
    img.style.transition = "none";
    apply();
    box.hidden = false;
    close.focus({ preventScroll: true });
  };

  const hide = () => {
    box.hidden = true;
    img.removeAttribute("src");
    pointers.clear();
  };

  close.addEventListener("click", hide);

  box.addEventListener("pointerdown", (event) => {
    if (event.target === close || close.contains(event.target)) return;
    event.preventDefault();
    box.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    img.style.transition = "none";
    startTx = tx;
    startTy = ty;

    if (pointers.size === 1) {
      downAt = { x: event.clientX, y: event.clientY };
      startMid = { x: event.clientX, y: event.clientY };
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      startDist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      startScale = scale;
      startMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
  });

  box.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const next = Math.min(MAX, Math.max(1, startScale * (dist / startDist)));
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const ux = (startMid.x - cx - startTx) / startScale;
      const uy = (startMid.y - cy - startTy) / startScale;
      scale = next;
      tx = mid.x - cx - ux * scale;
      ty = mid.y - cy - uy * scale;
      clampPan();
      apply();
      return;
    }

    tx = startTx + (event.clientX - startMid.x);
    ty = startTy + (event.clientY - startMid.y);
    if (scale > 1.01) clampPan();
    apply();
  });

  const release = (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);

    // 두 손가락 중 하나만 떼면 남은 손가락으로 이어서 움직인다
    if (pointers.size > 0) {
      const [a] = [...pointers.values()];
      startMid = { x: a.x, y: a.y };
      startTx = tx;
      startTy = ty;
      return;
    }

    img.style.transition = "transform 0.25s var(--ease-out)";
    const moved = Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y);

    if (moved < 10) {
      const now = Date.now();
      if (now - lastTapAt < 300) {
        lastTapAt = 0;
        zoomAt(scale > 1.01 ? 1 : 2.5, event.clientX, event.clientY);
        if (scale <= 1.01) { tx = 0; ty = 0; apply(); }
      } else {
        lastTapAt = now;
        // 사진 바깥(배경)을 누르면 닫는다
        if (event.target !== img) hide();
      }
      return;
    }

    if (scale <= 1.01) {
      if (Math.abs(ty) > 90) { hide(); return; }
      tx = 0;
      ty = 0;
      apply();
      return;
    }
    clampPan();
    apply();
  };

  box.addEventListener("pointerup", release);
  box.addEventListener("pointercancel", release);

  box.addEventListener("wheel", (event) => {
    event.preventDefault();
    img.style.transition = "none";
    zoomAt(scale * Math.exp(-event.deltaY / 400), event.clientX, event.clientY);
  }, { passive: false });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !box.hidden) hide();
  });

  // 플로어 가이드처럼 크게 볼 수 있는 사진
  document.addEventListener("click", (event) => {
    const target = event.target.closest?.(".ds-grid img, img.zoomable");
    if (!target) return;
    open(target.currentSrc || target.src);
  });
}
