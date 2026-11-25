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
