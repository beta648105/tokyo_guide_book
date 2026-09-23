/**
 * 모든 페이지가 함께 쓰는 지역 데이터와 공통 기능.
 */

const AREAS = [
  {
    id: "shibuya",
    name: "시부야",
    roman: "SHIBUYA",
    image: "images/shibuya.png",
    page: "shibuya.html",
    ready: true,
  },
  {
    id: "akihabara",
    name: "아키하바라",
    roman: "AKIHABARA",
    image: "images/akihabara.png",
    page: "akihabara.html",
    ready: true,
  },
  { id: null, name: "준비중", roman: "", image: null, page: null, ready: false },
  { id: null, name: "준비중", roman: "", image: null, page: null, ready: false },
];

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

/* ── 페이지 전환 효과 ──
   떠나는 페이지는 아래로 페이드아웃, 새 페이지는 아래에서 위로 올라오며 페이드인.
   (올라오는 쪽은 각 요소의 .rise 애니메이션이 맡는다) */

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
    if (prefersReducedMotion()) return;               // 움직임 줄이기 설정 존중

    event.preventDefault();
    app.classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, EXIT_MS);
  });
}

/* ── 오른쪽 상단 메뉴 ──
   가로선 3개 버튼을 누르면 오른쪽에서 패널이 절반 폭만큼 밀려 나온다.
   항목은 아직 누르는 동작이 없다. */

const MENU_ITEMS = [
  { label: "일정표", view: "schedule" },
];

/**
 * 메뉴 항목을 골랐을 때.
 * 홈 화면이면 상단 이미지는 그대로 두고 아래 섹션만 바로 바꾸고,
 * 지역 페이지면 홈으로 이동하면서 해당 섹션을 연다.
 */
function openMenuItem(item) {
  if (typeof showView === "function") {
    showView(item.view);          // 홈 화면: 페이드 없이 즉시 전환
  } else {
    location.href = `index.html#${item.view}`;
  }
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
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  const drawer = buildDrawer();
  app.append(btn, scrim, drawer);

  // PC 에서 스크롤바 폭까지 고려해 앱 본체 오른쪽 끝에 정확히 붙인다
  const syncPosition = () => {
    const rect = app.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    drawer.style.right = `${Math.max(0, viewport - rect.right)}px`;
    drawer.style.width = `${rect.width / 2}px`;
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
