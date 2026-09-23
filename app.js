/**
 * 도쿄 가이드북 - 홈 화면
 * 지역 목록을 데이터로 두고 2x2 카드를 그린다.
 */

const AREAS = [
  { id: "shibuya",   name: "시부야",     image: "images/shibuya.png",   ready: true  },
  { id: "akihabara", name: "아키하바라", image: "images/akihabara.png", ready: true  },
  { id: null,        name: "준비중",     image: null,                   ready: false },
  { id: null,        name: "준비중",     image: null,                   ready: false },
];

/** 카드가 아래에서 올라오기 시작하는 시간 */
const RISE_START = 0.25;  // 초
const RISE_STEP = 0.09;   // 카드 하나당 간격

/** 카드 하나를 만든다. 아직 누르는 동작은 없다. */
function createCard(area, index) {
  const wrap = document.createElement("div");
  wrap.className = "card-wrap rise";
  wrap.style.setProperty("--delay", `${RISE_START + index * RISE_STEP}s`);

  const card = document.createElement("div");
  card.className = area.ready ? "card" : "card soon";
  if (area.id) card.dataset.area = area.id;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  if (area.image) {
    const img = document.createElement("img");
    img.className = "card-img";
    img.src = area.image;
    img.alt = area.name;
    img.loading = "lazy";
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
  const grid = document.getElementById("grid");
  if (!grid) return;
  grid.replaceChildren(...AREAS.map(createCard));
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

renderGrid();
registerServiceWorker();
