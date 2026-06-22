(function(){
  var css='.zoomov{position:fixed;inset:0;z-index:9999;background:rgba(6,9,14,.93);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;opacity:0;transition:opacity .15s ease;}'
  +'.zoomov.show{opacity:1;}'
  +'.zoomov svg{display:block;background:#0e131b;border:1px solid #2a3347;border-radius:12px;padding:18px;box-sizing:border-box;box-shadow:0 20px 60px rgba(0,0,0,.6);}'
  +'.zoomhint{position:fixed;bottom:18px;left:0;right:0;text-align:center;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.1em;color:#8da2c0;text-transform:uppercase;pointer-events:none;}'
  +'.side-visual svg,.svg-frame svg,.minifig svg,.mod-body figure svg{cursor:zoom-in;}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  function openZoom(svg){
    var vb=(svg.getAttribute('viewBox')||'').split(/[ ,]+/).map(parseFloat);
    var vbw=vb[2]||svg.clientWidth||600, vbh=vb[3]||svg.clientHeight||400, aspect=vbw/vbh;
    var aw=window.innerWidth*0.94, ah=window.innerHeight*0.9, w,h;
    if(aw/ah>aspect){h=ah;w=ah*aspect;}else{w=aw;h=aw/aspect;}
    var ov=document.createElement('div');ov.className='zoomov';
    var clone=svg.cloneNode(true);
    clone.removeAttribute('width');clone.removeAttribute('height');clone.removeAttribute('class');
    clone.style.width=Math.round(w)+'px';clone.style.height=Math.round(h)+'px';
    clone.style.maxWidth='none';clone.style.maxHeight='none';clone.style.minWidth='0';clone.style.boxSizing='border-box';
    ov.appendChild(clone);
    var hint=document.createElement('div');hint.className='zoomhint';hint.textContent='Click anywhere or press Esc to close';
    ov.appendChild(hint);
    document.body.appendChild(ov);
    requestAnimationFrame(function(){ov.classList.add('show');});
    function done(){ov.classList.remove('show');setTimeout(function(){if(ov.parentNode)ov.parentNode.removeChild(ov);},160);document.removeEventListener('keydown',key);}
    ov.addEventListener('click',done);
    function key(e){if(e.key==='Escape')done();}
    document.addEventListener('keydown',key);
  }
  document.addEventListener('click',function(e){
    var t=e.target;if(!t||!t.closest)return;
    if(t.closest('.zoomov'))return;
    var svg=t.closest('svg');if(!svg)return;
    if(svg.closest('.side-visual')||svg.closest('.svg-frame')||svg.closest('.minifig')||(svg.closest('figure')&&svg.closest('.mod-body'))){
      e.preventDefault();openZoom(svg);
    }
  });
})();
