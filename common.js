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

const GUIDE_STEPS = [
  { image: "images/guide/guide_1.jpg", text: "사파리에서 웹을 연 다음, 오른쪽 하단 ··· 누른 다음 공유 클릭" },
  { image: "images/guide/guide_2.jpg", text: "더 보기 클릭" },
  { image: "images/guide/guide_3.jpg", text: "홈 화면에 추가 클릭" },
  { image: "images/guide/guide_4.jpg", text: "추가 클릭" },
  { image: "images/guide/guide_5.jpg", text: "" },
];

/** 일정표를 그린다. */
function renderTimeline() {
  const section = document.getElementById("view-schedule");
  if (!section) return;

  const img = document.createElement("img");
  img.className = "timeline-img";
  img.src = "images/timeline/timeline.jpg";
  img.alt = "여행 일정표";
  img.loading = "lazy";
  img.decoding = "async";
  section.replaceChildren(img);
}

/** 홈 화면 추가 안내를 그린다. 세 페이지가 같은 내용을 쓴다. */
function renderGuide() {
  const section = document.getElementById("view-install");
  if (!section) return;

  const list = document.createElement("ol");
  list.className = "guide";

  for (const [i, step] of GUIDE_STEPS.entries()) {
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

  section.replaceChildren(list);
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

  row.append(img, p);
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
      head.append(img, name);
      wrap.append(head);

      for (const text of block.lines || (block.text ? [block.text] : [])) {
        const p = document.createElement("p");
        p.className = "ds-text";
        p.textContent = text;
        wrap.append(p);
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
        wrap.append(ul);
      }
      if (block.tip) {
        const tip = document.createElement("p");
        tip.className = "ds-tip";
        fillLabeled(tip, block.tip);
        wrap.append(tip);
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
  { label: "홈 화면 추가", view: "install" },
];

/* ── 섹션 전환 ──
   어느 페이지에서든 상단 사진은 그대로 두고 그 아래만 바꾼다.
   시부야에서 열면 시부야 사진이, 홈에서 열면 도쿄 사진이 그대로 남는다. */

const VIEWS = ["main", "schedule", "install"];

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
