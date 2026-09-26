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

/* ── 세로 화면 고정 ──
   매니페스트의 orientation 은 안드로이드에서만 듣고 아이폰은 무시한다.
   잠글 수 있는 기기에서는 잠그고, 안 되는 기기에서는 안내 화면을 덮는다. */

function initPortraitLock() {
  // 안드로이드 설치형에서만 실제로 잠긴다. 실패해도 무시.
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch(() => {});
  }

  const notice = document.createElement("div");
  notice.className = "rotate-notice";
  notice.innerHTML =
    '<svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect x="7" y="2.5" width="10" height="19" rx="2.2" />' +
    '<path d="M12 18.4h.01" />' +
    '</svg><p>세로 화면으로 돌려주세요</p>';
  document.body.append(notice);
}

/* ── 오른쪽 상단 메뉴 ──
   가로선 3개 버튼을 누르면 오른쪽에서 패널이 절반 폭만큼 밀려 나온다.
   항목은 아직 누르는 동작이 없다. */

const MENU_ITEMS = [
  { label: "일정표", view: "schedule" },
];

/* ── 섹션 전환 ──
   어느 페이지에서든 상단 사진은 그대로 두고 그 아래만 바꾼다.
   시부야에서 열면 시부야 사진이, 홈에서 열면 도쿄 사진이 그대로 남는다. */

const VIEWS = ["main", "schedule"];

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
  if (altTitle) altTitle.hidden = view === "main";

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
  app.append(btn);
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
