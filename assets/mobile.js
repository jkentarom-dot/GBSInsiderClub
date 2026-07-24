/* ============================================================
   mobile.js — GBS Insider Club mobile layer
   Additive & reversible: remove the <script> to revert any page.
   1. Reading-mode toggle (Dark default <-> Light), persisted.
   2. Universal diagram tap-to-zoom with a visible affordance.
   3. 1A mobile navigation (bottom bar + slide-up sheet), built
      by reading the page's own sidebar + on-page anchors.
   No dependencies. Degrades gracefully (no-JS = current behaviour).
   ============================================================ */
(function () {
  "use strict";
  var KEY = "gbs-theme";
  var doc = document.documentElement;

  /* ---- 1. THEME ---- */
  try { if (localStorage.getItem(KEY) === "light") doc.setAttribute("data-theme", "light"); } catch (e) {}
  var moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var sun  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5" y1="5" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19" y2="19"/><line x1="5" y1="19" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19" y2="5"/></svg>';
  function isLight(){ return doc.getAttribute("data-theme") === "light"; }
  function buildToggle(){
    var btn = document.createElement("button");
    btn.className = "gbs-theme-toggle"; btn.type = "button";
    function render(){ btn.innerHTML = (isLight()?moon:sun) + '<span class="gbs-tt-label">' + (isLight()?"Dark":"Light") + '</span>';
      btn.setAttribute("aria-label", isLight()?"Switch to dark mode":"Switch to light mode"); }
    render();
    btn.addEventListener("click", function(){
      var next = isLight() ? "dark" : "light";
      if (next === "light") doc.setAttribute("data-theme","light"); else doc.removeAttribute("data-theme");
      try { localStorage.setItem(KEY, next); } catch (e) {}
      render();
    });
    document.body.appendChild(btn);
  }

  /* ---- 2. ZOOM ---- */
  var ov, ovInner;
  function buildOverlay(){
    ov = document.createElement("div"); ov.className = "gbs-zoomov";
    ovInner = document.createElement("div");
    ovInner.style.cssText = "width:100%;display:flex;justify-content:center;";
    var close = document.createElement("button"); close.className = "gbs-zclose"; close.textContent = "Tap to close";
    ov.appendChild(ovInner); ov.appendChild(close); document.body.appendChild(ov);
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
    ovInner.appendChild(c); ov.classList.add("show");
  }
  function vbWidth(svg){ var vb = (svg.getAttribute("viewBox")||"").split(/[ ,]+/).map(parseFloat); return vb[2] || 0; }
  function enhanceDiagrams(){
    var badge = '<span class="gbs-zbadge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>Tap to zoom</span>';
    Array.prototype.forEach.call(document.querySelectorAll("svg"), function(svg){
      if (svg.closest(".gbs-zoomable")) return;
      if (svg.closest("header,nav,.topbar,.sidebar,.gbs-theme-toggle,.gbs-zoomov,.gbs-sheet,.gbs-bottombar")) return;
      if (svg.classList.contains("logo-mark") || svg.classList.contains("logo")) return;
      if (vbWidth(svg) < 280) return;
      var wrap = document.createElement("span"); wrap.className = "gbs-zoomable";
      svg.parentNode.insertBefore(wrap, svg); wrap.appendChild(svg);
      wrap.insertAdjacentHTML("beforeend", badge);
      wrap.addEventListener("click", function(){ openZoom(svg); });
    });
  }

  /* ---- 3. 1A NAVIGATION (built from the page's own DOM) ---- */
  function collectOnpage(){
    var out = [];
    var anchors = document.querySelectorAll(".sidebar-on-page a[href^='#']");
    if (anchors.length){
      Array.prototype.forEach.call(anchors, function(a){
        out.push({ id:a.getAttribute("href").slice(1), label:(a.textContent||"").trim() });
      });
    } else {
      // fallback: section[id] / [id] with an h2
      Array.prototype.forEach.call(document.querySelectorAll("section[id], [id] > h2"), function(el){
        var sec = el.tagName === "SECTION" ? el : el.closest("[id]");
        if (!sec || !sec.id) return;
        var h = sec.querySelector("h2");
        if (!h) return;
        var label = (h.textContent||"").replace(/\s+/g," ").trim();
        if (label && !out.some(function(o){return o.id===sec.id;})) out.push({ id:sec.id, label:label });
      });
    }
    return out;
  }
  function collectClusters(){
    var out = [], items = document.querySelectorAll(".sidebar .sidebar-item");
    Array.prototype.forEach.call(items, function(a){
      var label = (a.querySelector(".nav-label") ? a.querySelector(".nav-label").textContent : a.textContent).trim();
      var num = a.querySelector(".sidebar-badge") ? a.querySelector(".sidebar-badge").textContent.trim() : "";
      out.push({ href:a.getAttribute("href")||"#", label:label, num:num, active:a.classList.contains("active") });
    });
    return out;
  }
  function groupLabel(){
    var g = document.querySelector(".sidebar-group-label");
    return g ? g.textContent.trim() : "Sections";
  }

  function buildNav(){
    var onpage = collectOnpage();
    var clusters = collectClusters();
    // Any page carrying the L2 sidebar always deserves the mobile bar, even if it
    // only has one section (knowledgebase.html) -- otherwise it gets no mobile nav at all.
    var isL2 = !!document.querySelector(".l2-sidebar");
    if (!isL2 && onpage.length < 2 && clusters.length < 2) return;   // not enough to be useful

    document.body.classList.add("gbs-nav-on");
    var hasClusters = clusters.length >= 2;

    // sheet
    var scrim = document.createElement("div"); scrim.className = "gbs-scrim";
    var sheet = document.createElement("div"); sheet.className = "gbs-sheet";
    sheet.innerHTML =
      '<div class="gbs-grab"></div>' +
      '<div class="gbs-sheet-head">' +
        '<button data-tab="onpage" class="on">On this page</button>' +
        (hasClusters ? '<button data-tab="clusters">'+ (/(cluster|pillar)/i.test(groupLabel())?'All clusters':'Sections') +'</button>' : '') +
      '</div>' +
      '<div class="gbs-sheet-search"><input type="text" placeholder="Search..." autocomplete="off"></div>' +
      '<div class="gbs-sheet-body"></div>';
    document.body.appendChild(scrim); document.body.appendChild(sheet);

    var body = sheet.querySelector(".gbs-sheet-body");
    var search = sheet.querySelector("input");
    var tabOn = sheet.querySelector('[data-tab="onpage"]');
    var tabCl = sheet.querySelector('[data-tab="clusters"]');
    var searchMode=false, idx=null, idxState=0;
    function loadIndex(cb){
      if(idxState===2){cb(idx);return;}
      if(idxState===1){setTimeout(function(){loadIndex(cb);},120);return;}
      idxState=1;
      fetch("/assets/search-index.json?v=6").then(function(r){return r.json();})
        .then(function(d){idx=d;idxState=2;cb(d);}).catch(function(){idxState=0;cb([]);});
    }
    function siteSearchHTML(list,q){
      var ql=q.toLowerCase();
      var hits=list.filter(function(r){return (r.t+" "+(r.pn||"")+" "+(r.k||"")).toLowerCase().indexOf(ql)>-1;}).slice(0,25);
      if(!hits.length) return '<div class="gbs-grouplbl">No matches</div>';
      return '<div class="gbs-grouplbl">Results across all pillars</div>'+hits.map(function(r){
        return '<a class="gbs-nav-item" href="'+r.u+'"><span class="gbs-num">'+(r.p||'?')+'</span>'+r.t+'</a>';
      }).join('');
    }

    function onpageHTML(){
      return '<div class="gbs-grouplbl">On this page</div>' + onpage.map(function(s){
        return '<a class="gbs-nav-item cur-target" href="#'+s.id+'" data-jump="'+s.id+'"><span class="gbs-dot"></span>'+s.label+'</a>';
      }).join('');
    }
    function clustersHTML(){
      return '<div class="gbs-grouplbl">'+ groupLabel() +'</div>' + clusters.map(function(c){
        return '<a class="gbs-nav-item'+(c.active?' active':'')+'" href="'+c.href+'"><span class="gbs-num">'+(c.num||'•')+'</span>'+c.label+'</a>';
      }).join('');
    }
    function bindJumps(){
      Array.prototype.forEach.call(body.querySelectorAll("[data-jump]"), function(a){
        a.addEventListener("click", function(e){
          e.preventDefault();
          var el = document.getElementById(a.getAttribute("data-jump"));
          closeSheet();
          if (el) setTimeout(function(){ el.scrollIntoView({behavior:"smooth", block:"start"}); }, 180);
        });
      });
    }
    function filter(){
      var q=(search.value||"").trim();
      if(searchMode){
        if(q.length<2){ body.innerHTML='<div class="gbs-grouplbl">Type to search every pillar, cluster and topic</div>'; return; }
        loadIndex(function(list){ body.innerHTML=siteSearchHTML(list,q); });
        return;
      }
      var ql=q.toLowerCase();
      Array.prototype.forEach.call(body.querySelectorAll(".gbs-nav-item"), function(it){
        it.style.display = it.textContent.toLowerCase().indexOf(ql) > -1 ? "" : "none";
      });
    }
    search.addEventListener("input", filter);
    function openSearch(){
      searchMode=true;
      tabOn.classList.remove("on"); if(tabCl) tabCl.classList.remove("on");
      search.value=""; search.placeholder="Search all topics\u2026";
      body.innerHTML='<div class="gbs-grouplbl">Type to search every pillar, cluster and topic</div>';
      scrim.classList.add("show"); sheet.classList.add("show");
      setTimeout(function(){ search.focus(); },250);
    }
    function render(tab){
      searchMode=false; search.placeholder="Filter this list\u2026";
      tabOn.classList.toggle("on", tab==="onpage");
      if (tabCl) tabCl.classList.toggle("on", tab==="clusters");
      body.innerHTML = (tab==="clusters" && hasClusters) ? clustersHTML() : onpageHTML();
      bindJumps(); filter();
    }
    tabOn.addEventListener("click", function(){ render("onpage"); });
    if (tabCl) tabCl.addEventListener("click", function(){ render("clusters"); });

    function openSheet(tab, focusSearch){
      render(tab||"onpage");
      scrim.classList.add("show"); sheet.classList.add("show");
      if (focusSearch) setTimeout(function(){ search.focus(); }, 250);
    }
    function closeSheet(){ scrim.classList.remove("show"); sheet.classList.remove("show"); search.value=""; searchMode=false; }
    scrim.addEventListener("click", closeSheet);


    function openSiteNav(){
      var cur=location.pathname.split("/").pop()||"index.html";
      // The four doors, each with the sections that sit underneath it.
      // Sub-items are hidden for the door you are already on -- the "Contents"
      // tab already owns the current page's sections, so showing them twice
      // would put the same three links in two different sheets.
      var doors=[
        {href:"who-is-this-for.html",label:"Who is this for?",ico:"1",subs:[
          {href:"who-is-this-for.html#who",label:"Who it is for"},
          {href:"who-is-this-for.html#career-map",label:"Career map"}
        ]},
        {href:"where-are-you-now.html",label:"Where are you right now?",ico:"2",subs:[
          {href:"where-are-you-now.html#start-here",label:"Ten situations"},
          {href:"where-are-you-now.html#build",label:"Career assets"},
          {href:"where-are-you-now.html#deeper",label:"The next level"}
        ]},
        {href:"do-this-from-monday.html",label:"Do this from Monday",ico:"3",subs:[
          {href:"do-this-from-monday.html#free-track",label:"Five-day tracks"},
          {href:"do-this-from-monday.html#watch",label:"Watch and learn"}
        ]},
        {href:"knowledgebase.html",label:"Your own learning path",ico:"4",subs:[
          {href:"knowledgebase.html#study-path",label:"Study path"},
          {href:"pack-1-start-here.html",label:"1 \u00b7 Start Here"},
          {href:"pack-2-deliver-and-improve.html",label:"2 \u00b7 Deliver and Improve"},
          {href:"pack-3-communicate-and-lead.html",label:"3 \u00b7 Communicate and Lead"},
          {href:"pack-4-get-ahead.html",label:"4 \u00b7 Get Ahead"},
          {href:"pack-5-drive-change.html",label:"5 \u00b7 Drive Change"},
          {href:"knowledgebase.html#inside",label:"Ten pillars"}
        ]}
      ];
      var extras=[
        {href:"guide.html",label:"AI Field Guide",ico:"\u2605"},
        {href:"glossary.html",label:"Glossary",ico:"A\u2013Z"},
        {href:"paid-tier.html",label:"Career Playbooks \u2014 $45",ico:"\u2606"},
        {href:"join.html",label:"Join free",ico:"\u2192"}
      ];
      function item(l,isSub,isActive){
        return '<a class="gbs-nav-item'+(isSub?' gbs-nav-sub':'')+(isActive?' active':'')+'" href="'+l.href+'">'+
               (isSub?'<span class="gbs-subdot"></span>':'<span class="gbs-num">'+l.ico+'</span>')+
               l.label+'</a>';
      }
      var html='<div class="gbs-grouplbl">Navigate to</div>';
      doors.forEach(function(d){
        var onThisDoor = (cur===d.href);
        html+=item(d,false,onThisDoor);
        if(!onThisDoor){ d.subs.forEach(function(s){ html+=item(s,true,false); }); }
      });
      html+='<div class="gbs-grouplbl">Also on the site</div>';
      extras.forEach(function(l){ html+=item(l,false,cur===l.href); });
      body.innerHTML=html;
      searchMode=false;
      tabOn.classList.remove("on"); if(tabCl) tabCl.classList.remove("on");
      search.value=""; search.placeholder="Filter\u2026";
      scrim.classList.add("show"); sheet.classList.add("show");
    }
    // bottom bar
    var bar = document.createElement("nav"); bar.className = "gbs-bottombar";
    var icContents = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>';
    var icGrid = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';
    var icSearch = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    var icTop = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
    var icNav = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    var icBack = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    bar.innerHTML =
      '<button class="gbs-bb-item" data-act="back">'+icBack+'Back</button>' +
      '<button class="gbs-bb-item cur" data-act="onpage">'+icContents+'Contents</button>' +
      (hasClusters ? '<button class="gbs-bb-item" data-act="clusters">'+icGrid+(/(cluster|pillar)/i.test(groupLabel())?'Clusters':'Sections')+'</button>' : '') +
      '<button class="gbs-bb-item" data-act="navigate">'+icNav+'Navigate</button>' +
      '<button class="gbs-bb-item" data-act="search">'+icSearch+'Search</button>' +
      '<button class="gbs-bb-item" data-act="top">'+icTop+'Top</button>';
    document.body.appendChild(bar);

    function setCur(btn){ Array.prototype.forEach.call(bar.querySelectorAll(".gbs-bb-item"), function(b){ b.classList.remove("cur"); }); btn.classList.add("cur"); }
    Array.prototype.forEach.call(bar.querySelectorAll(".gbs-bb-item"), function(btn){
      btn.addEventListener("click", function(){
        var act = btn.getAttribute("data-act"); setCur(btn);
        if (act === "back") { history.back(); return; }
        if (act === "top") { window.scrollTo({top:0, behavior:"smooth"}); return; }
        if (act === "search") { openSearch(); return; }
        if (act === "navigate") { openSiteNav(); return; }
        openSheet(act, false);
      });
    });
  }

  function init(){ buildToggle(); buildOverlay(); enhanceDiagrams(); buildNav(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();


/* ---- COMMENTS module (page_comments): submit -> moderation, expand -> approved ---- */
(function(){
  var U="https://wgdcfgknnentriqlajqe.supabase.co/rest/v1/page_comments";
  var K="sb_publishable_gBrOyef2GLzjPnjfmF_4gQ_hPEKuarp";
  function esc(s){return (s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function fmt(d){try{return new Date(d).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});}catch(e){return "";}}
  function init(pc){
    var page=pc.getAttribute("data-page");
    var name=pc.querySelector(".pc-name"),body=pc.querySelector(".pc-body"),submit=pc.querySelector(".pc-submit"),msg=pc.querySelector(".pc-msg"),toggle=pc.querySelector(".pc-toggle"),list=pc.querySelector(".pc-list");
    var loaded=false;
    if(submit)submit.addEventListener("click",function(){
      var n=(name.value||"").trim(),b=(body.value||"").trim();
      if(!n||!b){msg.style.color="var(--amber,#f59e0b)";msg.textContent="Add your name and a comment.";return;}
      submit.disabled=true;msg.textContent="";
      fetch(U,{method:"POST",headers:{"apikey":K,"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify({page_id:page,name:n.slice(0,80),body:b.slice(0,2000)})})
      .then(function(r){if(r.ok){msg.style.color="var(--green,#34d399)";msg.textContent="Thanks \u2014 your comment is awaiting review.";name.value="";body.value="";}else{msg.style.color="var(--ruby,#e84560)";msg.textContent="Could not post \u2014 try again later.";submit.disabled=false;}})
      .catch(function(){msg.style.color="var(--ruby,#e84560)";msg.textContent="Could not post \u2014 try again later.";submit.disabled=false;});
    });
    function load(){
      fetch(U+"?page_id=eq."+encodeURIComponent(page)+"&approved=eq.true&select=name,body,created_at&order=created_at.desc",{headers:{"apikey":K}})
      .then(function(r){return r.json();})
      .then(function(rows){
        var c=pc.querySelector(".pc-count");if(c)c.textContent="("+rows.length+")";
        if(!rows.length){list.innerHTML='<div class="pc-empty">No comments yet. Be the first.</div>';return;}
        list.innerHTML=rows.map(function(x){return '<div class="pc-item"><span class="pc-item-name">'+esc(x.name)+'</span><span class="pc-item-date">'+fmt(x.created_at)+'</span><p class="pc-item-body">'+esc(x.body)+'</p></div>';}).join("");
      }).catch(function(){list.innerHTML='<div class="pc-empty">Comments unavailable right now.</div>';});
    }
    if(toggle)toggle.addEventListener("click",function(){
      var open=toggle.getAttribute("aria-expanded")==="true";
      toggle.setAttribute("aria-expanded",open?"false":"true");
      list.hidden=open;
      if(!open&&!loaded){loaded=true;load();}
    });
  }
  function run(){Array.prototype.forEach.call(document.querySelectorAll(".pc"),init);}
  if(document.readyState!=="loading")run();else document.addEventListener("DOMContentLoaded",run);
})();

/* ---- AUTH/VIP STATE: flag <html> so the UI can suppress upsell for members ---- */
(function(){
  try{
    var REF="wgdcfgknnentriqlajqe";
    var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZGNmZ2tubmVudHJpcWxhanFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzQ0MzgsImV4cCI6MjA5NDM1MDQzOH0.kc1VHPV_CXUREYW5txiAJmZHWLFjH-2wZiEZBBbpsXo";
    var raw=null;
    try{ raw=localStorage.getItem("sb-"+REF+"-auth-token"); }catch(e){}
    if(!raw){
      // fallback: scan for any sb-*-auth-token key
      try{ for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i); if(k&&k.indexOf("-auth-token")>-1&&k.indexOf("sb-")===0){raw=localStorage.getItem(k);break;}} }catch(e){}
    }
    if(!raw) return;
    var sess; try{ sess=JSON.parse(raw); }catch(e){ return; }
    var token=sess&&(sess.access_token||(sess.currentSession&&sess.currentSession.access_token));
    if(!token) return;
    document.documentElement.classList.add("gbs-authed");
    fetch("https://"+REF+".supabase.co/functions/v1/get-user-tier",{method:"POST",headers:{"apikey":ANON,"Authorization":"Bearer "+token}})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(j){ if(j&&j.tier&&j.tier!=="free") document.documentElement.classList.add("gbs-vip"); })
      .catch(function(){});
  }catch(e){}
})();

/* ---- first-party pageview beacon (page_views): cookieless, no PII ---- */
(function(){
  try{
    var U="https://wgdcfgknnentriqlajqe.supabase.co/rest/v1/page_views";
    var K="sb_publishable_gBrOyef2GLzjPnjfmF_4gQ_hPEKuarp";
    var sid;
    try{ sid=localStorage.getItem("gbs_sid"); if(!sid){ sid=(Date.now().toString(36)+Math.random().toString(36).slice(2,10)); localStorage.setItem("gbs_sid",sid); } }catch(e){ sid="anon"; }
    var page=location.pathname.replace(/\/+$/,"")||"/";
    var ref=""; try{ ref=document.referrer?new URL(document.referrer).hostname:""; }catch(e){}
    fetch(U,{method:"POST",headers:{"apikey":K,"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify({page:page,sid:sid,ref:ref}),keepalive:true}).catch(function(){});
  }catch(e){}
})();