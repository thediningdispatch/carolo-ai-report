const slides=[...document.querySelectorAll('.slide')];let current=0;
const prev=document.querySelector('#prev'),next=document.querySelector('#next');
function sync(i){current=i;document.querySelector('#counter').textContent=`${String(i+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;document.querySelector('#current-title').textContent=slides[i].getAttribute('aria-label');prev.disabled=i===0;next.disabled=i===slides.length-1;}
function go(delta){const i=Math.max(0,Math.min(slides.length-1,current+delta));slides[i].scrollIntoView({block:'start'});history.replaceState(null,'',`#${slides[i].id}`);sync(i)}
prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));document.querySelector('#print').addEventListener('click',()=>window.print());
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,summary,button,a'))return;if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();go(e.key==='ArrowRight'?1:-1)}});
let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const line=innerHeight*.4;let best=0,d=Infinity;slides.forEach((s,i)=>{const r=s.getBoundingClientRect();const dist=r.top<=line&&r.bottom>=line?0:Math.min(Math.abs(r.top-line),Math.abs(r.bottom-line));if(dist<d){best=i;d=dist}});sync(best);ticking=false})},{passive:true});sync(0);
