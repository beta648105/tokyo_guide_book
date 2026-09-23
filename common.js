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
