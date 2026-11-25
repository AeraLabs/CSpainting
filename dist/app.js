'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width: 761px)').addEventListener('change',closeMenu);
document.querySelectorAll('.comparison').forEach(comparison=>{
 const range=comparison.querySelector('input');
 range.addEventListener('input',()=>{comparison.style.setProperty('--split',`${range.value}%`);range.setAttribute('aria-valuetext',`${range.value}% before photo visible`);comparison.querySelector('.before-label').style.opacity=range.value<15?'0':'1';comparison.querySelector('.after-label').style.opacity=range.value>85?'0':'1';});
});
const dialog=document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{dialog.querySelector('img').src=button.dataset.photo;dialog.querySelector('img').alt=button.dataset.caption;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal();}));
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;}));
document.querySelector('#estimate-form').addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const data=new FormData(form);const subject=`Free estimate request: ${data.get('service')} in ${data.get('town')}`;
 const body=`Hello CS Painting & Powerwashing,\n\nI'd like a free estimate.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nTown: ${data.get('town')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}\n\nThank you!`;
 window.location.href=`mailto:info@cspaintingandpowerwashing.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 form.querySelector('.form-status').textContent='Your email draft is ready to open. Please send it from your email app. If it doesn’t open, call or text 208-553-2014.';
});
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
}

// The hero plays once when visible; it never loops or runs off-screen.
(() => {
 const stage=document.querySelector('.transformation');
 if(!stage)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const controls=stage.querySelector('.transformation-controls');
 const replay=stage.querySelector('.replay-reveal');
 const caption=stage.querySelector('.finish-caption');
 const views=[...stage.querySelectorAll('[data-hero-view]')];
 let frame=0,progress=1,elapsed=0,lastTime=0,started=false,visible=false,ready=false;
 const duration=4200;
 function state(value){stage.dataset.state=value;caption.textContent=value==='before'?'CLEANED. PREPPED.':value==='after'?'THE FINISHED LOOK':'THE FINISH COMES TO LIFE';views.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.heroView===value)));replay.innerHTML=value==='playing'?'Pause reveal <span aria-hidden="true">Ⅱ</span>':value==='paused'?'Resume reveal <span aria-hidden="true">▷</span>':'Replay reveal <span aria-hidden="true">↻</span>';}
 function draw(value){progress=value;stage.style.setProperty('--reveal',`${value*100}%`);}
 function stop(){cancelAnimationFrame(frame);frame=0;lastTime=0;}
 function finish(view){stop();draw(view==='after'?1:0);state(view);}
 function tick(now){if(lastTime)elapsed+=now-lastTime;lastTime=now;const t=Math.min(elapsed/duration,1);const eased=t*t*(3-2*t);draw(eased);if(t<1)frame=requestAnimationFrame(tick);else finish('after');}
 function play(resume=false){if(!ready)return;stop();started=true;if(reduced.matches){finish('after');return;}if(!resume){elapsed=0;draw(0);}state('playing');frame=requestAnimationFrame(tick);}
 function pause(){if(stage.dataset.state==='playing'){stop();state('paused');}}
 replay.addEventListener('click',()=>{if(stage.dataset.state==='playing')pause();else play(stage.dataset.state==='paused');});
 views.forEach(button=>button.addEventListener('click',()=>{started=true;finish(button.dataset.heroView);}));
 function maybeStart(){if(ready&&visible&&!started&&!reduced.matches&&!document.hidden)play();}
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)pause();else maybeStart();},{threshold:.3}):null;
 if(observer)observer.observe(stage);else visible=true;
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else maybeStart();});
 reduced.addEventListener('change',()=>{if(reduced.matches)finish('after');replay.hidden=reduced.matches;});
 Promise.all([...stage.querySelectorAll('img')].map(img=>img.decode().catch(()=>null))).then(()=>{
  const images=[...stage.querySelectorAll('img')];
  if(images.some(img=>!img.naturalWidth))return;
  ready=true;controls.hidden=false;replay.hidden=reduced.matches;
  if(!reduced.matches&&!started){draw(0);state('before');}maybeStart();
 });
})();
