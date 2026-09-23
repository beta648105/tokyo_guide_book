/**
 * 도쿄 가이드북 - 홈 화면
 * common.js 의 AREAS 로 2x2 카드를 그린다.
 */

/** 카드가 아래에서 올라오기 시작하는 시간 */
const RISE_START = 0.25;  // 초
const RISE_STEP = 0.09;   // 카드 하나당 간격

/** 카드 하나를 만든다. 페이지가 있는 지역만 링크가 된다. */
function createCard(area, index) {
  const wrap = document.createElement("div");
  wrap.className = "card-wrap rise";
  wrap.style.setProperty("--delay", `${RISE_START + index * RISE_STEP}s`);

  // 갈 곳이 있으면 <a>, 준비중이면 그냥 <div>
  const card = document.createElement(area.page ? "a" : "div");
  card.className = area.ready ? "card" : "card soon";
  if (area.page) {
    card.href = area.page;
    card.dataset.area = area.id;
    card.setAttribute("aria-label", `${area.name} 가이드 열기`);
  }

  const inner = document.createElement("div");
  inner.className = "card-inner";

  if (area.image) {
    const img = document.createElement("img");
    img.className = "card-img";
    img.src = area.image;
    img.alt = area.name;
    img.decoding = "async";
    inner.append(img);
  }

  const label = document.createElement("span");
  label.className = "card-label";
  label.textContent = area.name;
  inner.append(label);

  card.append(inner);
  wrap.append(card);
  return wrap;
}

/** 2x2 그리드를 그린다. */
function renderGrid() {
  const grid = document.getElementById("view-areas");
  if (!grid) return;
  grid.replaceChildren(...AREAS.map(createCard));
}

/* ── 아래 섹션 전환 ──
   상단 이미지는 그대로 두고 그 아래만 바꾼다. 페이드 없이 즉시. */

const VIEWS = ["areas", "schedule"];

function showView(view) {
  if (!VIEWS.includes(view)) view = "areas";
  for (const name of VIEWS) {
    const section = document.getElementById(`view-${name}`);
    if (section) section.hidden = name !== view;
  }
  // 상단 제목도 같이 교체 (이미지는 그대로)
  const mainTitle = document.querySelector(".hero-title:not(.hero-title-alt)");
  const altTitle = document.querySelector(".hero-title-alt");
  if (mainTitle) mainTitle.hidden = view !== "areas";
  if (altTitle) altTitle.hidden = view === "areas";

  document.body.dataset.view = view;
  history.replaceState(null, "", view === "areas" ? "./" : `#${view}`);
}

/** 홈 버튼: 다른 섹션을 보고 있으면 새로고침 없이 지역 목록으로 되돌린다. */
function initHomeButton() {
  const btn = document.querySelector(".home-btn");
  if (!btn) return;
  btn.addEventListener("click", (event) => {
    if ((document.body.dataset.view || "areas") === "areas") return; // 이미 홈
    event.preventDefault();
    event.stopPropagation();
    showView("areas");
  }, true);
}

renderGrid();
showView(location.hash.replace("#", "") || "areas");
initHomeButton();
registerServiceWorker();
initPageTransitions();
initMenu();
