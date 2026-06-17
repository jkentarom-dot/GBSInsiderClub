/* ============================================================
   site.js — GBS Insider Club dynamic behaviour
   Additive & reversible: remove the <script> to revert.
   - scroll reveal (IntersectionObserver)
   - count-up for [data-count] and .cu elements
   No dependencies. Degrades gracefully (no-JS = everything visible).
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. auto-tag elements for reveal (no markup edits needed) ---- */
  var revealSelectors = [
    "section#why", "section#who", "section#career-map", "section#inside",
    "section.cluster-nav", ".topics-container", ".photo-band", ".concept-fig",
    ".section > h2", ".section > .section-hook", ".section > .card"
  ];
  var groupSelectors = [
    ".why-grid", ".audience-grid", ".pillars-grid", ".cluster-cards",
    ".gov-grid", ".owner-grid", ".tile-grid", ".glossary-grid",
    ".maturity-track", ".axis-diagram"
  ];

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");
    });
  });
  groupSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.hasAttribute("data-reveal-group")) el.setAttribute("data-reveal-group", "");
    });
  });

  /* ---- 2. reveal observer ---- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- 3. count-up ---- */
  function animateCount(el) {
    var raw = el.getAttribute("data-count");
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = raw + suffix; return; }
    var dur = 1100, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }
})();
