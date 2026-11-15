(function () {
  const DOG = window.DOG || {};
  const NOTES = window.YEAR_NOTES || {};
  const PHOTOS = (window.PHOTOS || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const DIR = "photos/sabbi/";

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
  const fmtDate = (d) => {
    const [y, m, day] = d.split("-").map(Number);
    return `${y} 年 ${m} 月 ${day} 日`;
  };

  // Hero
  document.title = `${DOG.name}'s World`;
  $("#title").textContent = `${DOG.name}'s World`;
  $("#breed").textContent = DOG.breed || "";
  $("#intro").textContent = DOG.born || "";
  const av = $("#avatar");
  if (DOG.avatarVideo || DOG.avatar) {
    if (DOG.avatar) av.poster = DOG.avatar;
    if (DOG.avatarVideo) av.src = DOG.avatarVideo;
    av.setAttribute("aria-label", `${DOG.name} 的大頭照`);
  } else av.remove();

  // 依年份、月份分組
  const years = {};
  PHOTOS.forEach((p, i) => {
    p.index = i;
    const [y, m] = p.date.split("-");
    ((years[y] ||= {})[Number(m)] ||= []).push(p);
  });
  const yearKeys = Object.keys(years).sort();

  $("#years-nav").innerHTML = yearKeys.map((y) => `<a class="bone" href="#y${y}" data-year="${y}">${y}</a>`).join("");

  const dogSvg = (dh) => `
    <div class="dog" style="--dh:${dh}px" aria-hidden="true">
      <svg class="dog-rear" viewBox="0 0 50 50"><use href="#dog-rear"/></svg>
      <div class="dog-body"></div>
      <svg class="dog-front" viewBox="0 0 72 50"><use href="#dog-front"/></svg>
    </div>`;

  $("#timeline").innerHTML = yearKeys.map((y, yi) => {
    const months = years[y];
    const note = NOTES[y];
    const list = Object.keys(months).map(Number).sort((a, b) => a - b).flatMap((m) => months[m]);
    // 每年一排，左右滑動
    const body = `
      <div class="carousel">
        <button class="nav prev" aria-label="往左">‹</button>
        <div class="strip">
          ${list.map((p) => `
            <figure class="photo" data-index="${p.index}">
              <img src="${DIR}thumbs/${esc(p.file)}"
                   srcset="${DIR}thumbs/${esc(p.file)} 640w, ${DIR}${esc(p.file)} 1600w"
                   sizes="(max-width: 560px) 78vw, 280px"
                   alt="${esc(p.caption || `${DOG.name}・${fmtDate(p.date)}`)}" loading="lazy">
              <figcaption>${p.caption ? esc(p.caption) : ""}<span class="date">${fmtDate(p.date)}</span></figcaption>
            </figure>`).join("")}
        </div>
        <button class="nav next" aria-label="往右">›</button>
      </div>`;

    // 年與年之間的臘腸狗（統一長度）
    const divider = yi < yearKeys.length - 1 ? `
      <div class="divider">
        <div style="width:100%; max-width:320px; margin: 0 auto">${dogSvg(40)}</div>
      </div>` : "";

    return `
      <section class="year" id="y${y}" data-year="${y}">
        <div class="year-head"><h2>${y}</h2></div>
        ${note ? `<p class="year-note">${esc(note)}</p>` : ""}
        ${body}
        ${divider}
      </section>`;
  }).join("");

  // 捲動進度狗 + 目前年份
  const progressBody = $("#progress-body");
  const fixedW = 30 * (1 + 1.44);
  const bones = [...document.querySelectorAll(".bone")];
  const sections = [...document.querySelectorAll(".year")];
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    progressBody.style.width = `${p * (innerWidth - 24 - fixedW)}px`;
    let cur = sections[0]?.dataset.year;
    sections.forEach((s) => { if (s.getBoundingClientRect().top < 120) cur = s.dataset.year; });
    bones.forEach((b) => b.classList.toggle("active", b.dataset.year === cur));
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  // 滑到最左／最右時，隱藏對應的箭頭
  function updateNav(strip) {
    const c = strip.parentElement;
    c.querySelector(".prev").disabled = strip.scrollLeft < 4;
    c.querySelector(".next").disabled = strip.scrollLeft + strip.clientWidth > strip.scrollWidth - 4;
  }
  document.querySelectorAll(".strip").forEach((s) => {
    s.addEventListener("scroll", () => updateNav(s), { passive: true });
    updateNav(s);
  });
  addEventListener("resize", () => document.querySelectorAll(".strip").forEach(updateNav));

  // Lightbox
  let lbIndex = 0;
  function show() {
    const p = PHOTOS[lbIndex];
    $("#lb-img").src = DIR + p.file;
    $("#lb-img").alt = p.caption || fmtDate(p.date);
    $("#lb-cap").textContent = [p.caption, fmtDate(p.date)].filter(Boolean).join("・");
  }
  function open(i) { lbIndex = i; show(); $("#lightbox").hidden = false; }
  function close() { $("#lightbox").hidden = true; }
  function step(d) { lbIndex = (lbIndex + d + PHOTOS.length) % PHOTOS.length; show(); }

  document.addEventListener("click", (e) => {
    const ph = e.target.closest(".photo");
    if (ph) return open(Number(ph.dataset.index));
    const nav = e.target.closest(".carousel .nav");
    if (nav) {
      const strip = nav.parentElement.querySelector(".strip");
      const dir = nav.classList.contains("next") ? 1 : -1;
      return strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: "smooth" });
    }
    if (e.target.closest(".lb-close") || e.target.id === "lightbox") return close();
    if (e.target.closest(".lb-prev")) return step(-1);
    if (e.target.closest(".lb-next")) return step(1);
  });
  document.addEventListener("keydown", (e) => {
    if ($("#lightbox").hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
