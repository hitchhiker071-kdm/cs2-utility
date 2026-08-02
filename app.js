/* CS2 道具本 —— 浏览与搜索逻辑（零依赖，file:// 可用） */
(() => {
  "use strict";

  const D = window.ENTRIES;
  const $ = (sel) => document.querySelector(sel);
  const content = $("#content");
  const tabsEl = $("#map-tabs");
  const searchEl = $("#search");

  let currentMap = null;
  let searchMode = false;

  /* ---------- 地图页签 ---------- */
  function renderTabs() {
    tabsEl.innerHTML = "";
    D.mapOrder.forEach((key) => {
      const n = D.entries.filter((e) => e.map === key).length;
      const btn = document.createElement("button");
      btn.className = "map-tab" + (key === currentMap ? " active" : "") + (n > 0 ? " has-data" : "");
      btn.dataset.map = key;
      btn.innerHTML = `${D.mapNames[key]}<span class="count">${n || ""}</span>`;
      btn.addEventListener("click", () => selectMap(key));
      tabsEl.appendChild(btn);
    });
  }

  function selectMap(key) {
    currentMap = key;
    searchMode = false;
    searchEl.value = "";
    renderTabs();
    render();
  }

  /* ---------- 渲染 ---------- */
  function render() {
    if (searchMode) { renderSearch(); return; }
    if (!currentMap) {
      const first = D.mapOrder.find((k) => D.entries.some((e) => e.map === k));
      currentMap = first || D.mapOrder[0];
    }
    renderMap(currentMap);
  }

  function renderMap(mapKey) {
    const list = D.entries.filter((e) => e.map === mapKey);
    if (!list.length) {
      content.innerHTML = `<div class="empty">${D.mapNames[mapKey]} 还没有收录条目。<br>看到想摘录的道具教学视频时，把「视频链接 + 时间戳 + 分类 + 用途」发来即可录入。</div>`;
      return;
    }
    // 按点位分组，组内按类型顺序
    const typeOrder = ["smoke", "flash", "fire", "he", "tactic"];
    const groups = {};
    list.forEach((e) => { (groups[e.site] = groups[e.site] || []).push(e); });
    Object.values(groups).forEach((arr) =>
      arr.sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) || a.name.localeCompare(b.name, "zh"))
    );

    let html = "";
    Object.keys(groups).sort((a, b) => a.localeCompare(b, "zh", { numeric: true })).forEach((site) => {
      html += `<h2 class="group-title">${site}</h2>`;
      groups[site].forEach((e) => { html += cardHTML(e); });
    });
    content.innerHTML = html;
    bindCards();
  }

  function cardHTML(e) {
    const typeName = D.typeNames[e.type] || e.type;
    const throwName = D.throwNames[e.throw] || e.throw || "";
    const media = e.media
      ? (e.media.endsWith(".mp4")
          ? `<video src="${e.media}" autoplay muted loop playsinline></video>`
          : `<img class="anim" src="${e.media}" alt="${e.name}" loading="lazy">`)
      : "";
    const src = e.url
      ? `<a href="${e.url}" target="_blank" rel="noopener">${e.source || "来源视频"} · ${e.timestamp}</a>`
      : (e.source || "（待补来源）") + (e.timestamp && e.timestamp !== "00:00" ? ` · ${e.timestamp}` : "");
    return `
      <article class="card" data-id="${e.id}">
        ${media}
        <div class="card-body">
          <div class="card-head">
            <span class="card-title">${e.name}</span>
            <span class="badge ${e.type}">${typeName}</span>
            ${throwName ? `<span class="badge throw">${throwName}</span>` : ""}
            ${e.verified ? `<span class="verified">✓ 已亲测</span>` : ""}
          </div>
          ${e.aim ? `<p class="aim"><b>瞄准：</b>${e.aim}</p>` : ""}
          ${e.effect ? `<p class="effect"><b>效果：</b>${e.effect}</p>` : ""}
          ${e.note ? `<p class="note"><b>备注：</b>${e.note}</p>` : ""}
          <p class="source">📺 ${src}</p>
        </div>
      </article>`;
  }

  function bindCards() {
    // 动图点击放大（简单全屏预览）
    content.querySelectorAll("video, img.anim").forEach((el) => {
      el.addEventListener("click", () => {
        if (el.requestFullscreen) el.requestFullscreen();
      });
    });
  }

  /* ---------- 搜索 ---------- */
  function renderSearch() {
    const q = searchEl.value.trim().toLowerCase();
    if (!q) { renderMap(currentMap); return; }
    const hits = D.entries.filter((e) =>
      [e.name, e.site, e.aim, e.effect, e.note, D.typeNames[e.type], D.throwNames[e.throw], e.source]
        .filter(Boolean).join(" ").toLowerCase().includes(q)
    );
    if (!hits.length) {
      content.innerHTML = `<div class="empty">没有匹配「${searchEl.value}」的条目。</div>`;
      return;
    }
    const header = `<p class="search-result-title">找到 ${hits.length} 条匹配「${searchEl.value}」</p>`;
    content.innerHTML = header + hits.map((e) => {
      const mapTag = `<span class="badge throw">${D.mapNames[e.map]}</span>`;
      return cardHTML(e).replace('<div class="card-head">', `<div class="card-head">${mapTag}`);
    }).join("");
    bindCards();
  }

  /* ---------- 事件 ---------- */
  let searchTimer = null;
  searchEl.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchMode = searchEl.value.trim().length > 0;
      render();
    }, 150);
  });
  searchEl.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") { searchEl.value = ""; searchMode = false; render(); }
  });

  /* ---------- 启动 ---------- */
  renderTabs();
  render();
})();
