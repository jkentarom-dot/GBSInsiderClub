/* ============================================================
   mobile.js — GBS Insider Club mobile layer (Batch 1)
   Additive & reversible: remove the <script> to revert any page.
   1. Reading-mode toggle (Dark default <-> Light), persisted.
   2. Universal diagram tap-to-zoom with a visible affordance.
   No dependencies. Degrades gracefully (no-JS = current behaviour).
   ============================================================ */
(function () {
  "use strict";
  var KEY = "gbs-theme";
  var doc = document.documentElement;

  /* ---- 1. THEME: apply saved choice ASAP, then build the toggle ---- */
  try {
    if (localStorage.getItem(KEY) === "light") doc.setAttribute("data-theme", "light");
  } catch (e) {}

  var moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var sun  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5" y1="5" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19" y2="19"/><line x1="5" y1="19" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19" y2="5"/></svg>';

  function isLight(){ return doc.getAttribute("data-theme") === "light"; }
  function renderToggle(btn){
    // show the icon for the mode you'll switch TO
    btn.innerHTML = (isLight() ? sun : moon) +
      '<span class="gbs-tt-label">' + (isLight() ? "Light" : "Dark") + '</span>';
    btn.setAttribute("aria-label", isLight() ? "Switch to dark mode" : "Switch to light mode");
  }
  function buildToggle(){
    var btn = document.createElement("button");
    btn.className = "gbs-theme-toggle";
    btn.type = "button";
    renderToggle(btn);
    btn.addEventListener("click", function(){
      var next = isLight() ? "dark" : "light";
      if (next === "light") doc.setAttribute("data-theme", "light");
      else doc.removeAttribute("data-theme");
      try { localStorage.setItem(KEY, next); } catch (e) {}
      renderToggle(btn);
    });
    document.body.appendChild(btn);
  }

  /* ---- 2. ZOOM: build overlay once ---- */
  var ov, ovInner;
  function buildOverlay(){
    ov = document.createElement("div");
    ov.className = "gbs-zoomov";
    ovInner = document.createElement("div");
    ovInner.style.width = "100%";
    ovInner.style.display = "flex";
    ovInner.style.justifyContent = "center";
    var close = document.createElement("button");
    close.className = "gbs-zclose";
    close.textContent = "Tap to close";
    ov.appendChild(ovInner);
    ov.appendChild(close);
    document.body.appendChild(ov);
    function hide(){ ov.classList.remove("show"); ovInner.innerHTML = ""; }
    close.addEventListener("click", hide);
    ov.addEventListener("click", function(e){ if (e.target === ov) hide(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") hide(); });
  }
  function openZoom(svg){
    ovInner.innerHTML = "";
    var c = svg.cloneNode(true);
    c.removeAttribute("width"); c.removeAttribute("height");
    c.style.width = "100%"; c.style.height = "auto"; c.style.maxWidth = "none";
    ovInner.appendChild(c);
    ov.classList.add("show");
  }

  /* pick real diagrams: sizeable viewBox, not chrome/icons/logos */
  function vbWidth(svg){
    var vb = (svg.getAttribute("viewBox") || "").split(/[ ,]+/).map(parseFloat);
    return vb[2] || 0;
  }
  function enhanceDiagrams(){
    var badge = '<span class="gbs-zbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>Tap to zoom</span>';
    var all = document.querySelectorAll("svg");
    Array.prototype.forEach.call(all, function(svg){
      if (svg.closest(".gbs-zoomable")) return;                 // already done
      if (svg.closest("header,nav,.topbar,.sidebar,.gbs-theme-toggle,.gbs-zoomov")) return;
      if (svg.classList.contains("logo-mark") || svg.classList.contains("logo")) return;
      if (vbWidth(svg) < 280) return;                            // skip small icons
      var wrap = document.createElement("span");
      wrap.className = "gbs-zoomable";
      svg.parentNode.insertBefore(wrap, svg);
      wrap.appendChild(svg);
      wrap.insertAdjacentHTML("beforeend", badge);
      wrap.addEventListener("click", function(){ openZoom(svg); });
    });
  }

  function init(){
    buildToggle();
    buildOverlay();
    enhanceDiagrams();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
