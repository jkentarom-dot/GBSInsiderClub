/* ─────────────────────────────────────────────────────────────
   unlock.js — registration reveal ("next level" gate)
   Free tier = name + email only. No password, no approval.
   Reveals deeper links; never hides content that was already free.

   Contract per gate:
     <div class="ul-gate" data-gate>
       <div class="ul-lock">  ... inputs [data-ul-fn] [data-ul-em]
                                  button [data-ul-btn]
                                  <p [data-ul-msg]>            </div>
       <div class="ul-open" hidden> ...revealed links... </div>
     </div>

   Returning visitors: localStorage "gbs_joined" is set by join.html and
   by this component, so the ask never repeats.
   ───────────────────────────────────────────────────────────── */
(function () {
  var URL_ = "https://wgdcfgknnentriqlajqe.supabase.co/rest/v1/waitlist",
      KEY  = "sb_publishable_CCTet76nH9bl-eAj6mYZ8g_Q5OD82_Y",
      FLAG = "gbs_joined";

  function joined() {
    try { return localStorage.getItem(FLAG) === "1"; } catch (e) { return false; }
  }
  function markJoined() {
    try { localStorage.setItem(FLAG, "1"); } catch (e) {}
  }

  function openGate(gate, animate) {
    var lock = gate.querySelector(".ul-lock"),
        open = gate.querySelector(".ul-open");
    if (lock) lock.hidden = true;
    if (open) {
      open.hidden = false;
      if (!animate) open.style.animation = "none";
    }
  }

  function wire(gate) {
    var btn = gate.querySelector("[data-ul-btn]"),
        fn  = gate.querySelector("[data-ul-fn]"),
        em  = gate.querySelector("[data-ul-em]"),
        msg = gate.querySelector("[data-ul-msg]");
    if (!btn) return;

    var label = btn.textContent;

    function bad(t) {
      if (!msg) return;
      msg.className = "ul-msg err";
      msg.textContent = t;
    }
    function reset() {
      btn.disabled = false;
      btn.textContent = label;
    }

    function submit() {
      var f = fn ? fn.value.trim() : "",
          e = em ? em.value.trim() : "";
      if (!f) { bad("Please enter your first name."); return; }
      if (!e || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
        bad("Please enter a valid email address."); return;
      }
      if (msg) { msg.className = "ul-msg"; msg.textContent = ""; }
      btn.disabled = true;
      btn.textContent = "Opening...";

      fetch(URL_, {
        method: "POST",
        headers: { "apikey": KEY, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ email: e, first_name: f, last_name: null, company: null })
      }).then(function (r) {
        if (r.ok || r.status === 201 || r.status === 204 || r.status === 409) {
          markJoined();
          openGate(gate, true);
          document.querySelectorAll(".ul-gate[data-gate]").forEach(function (g) {
            if (g !== gate) openGate(g, false);
          });
        } else {
          bad("Something went wrong. Please try again."); reset();
        }
      }).catch(function () {
        bad("Network problem. Please try again."); reset();
      });
    }

    btn.addEventListener("click", submit);
    [fn, em].forEach(function (i) {
      if (!i) return;
      i.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") { ev.preventDefault(); submit(); }
      });
    });
  }

  function init() {
    var gates = document.querySelectorAll(".ul-gate[data-gate]");
    if (!gates.length) return;
    var isIn = joined();
    gates.forEach(function (g) {
      if (isIn) { openGate(g, false); } else { wire(g); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
