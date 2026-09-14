const galleries={
  exterior:Array.from({length:45},(_,i)=>`assets/gallery/exterior/exterior-${String(i+1).padStart(3,'0')}.webp`),
  estudio:Array.from({length:27},(_,i)=>`assets/gallery/estudio/estudio-${String(i+1).padStart(3,'0')}.webp`),
  cabina:Array.from({length:60},(_,i)=>`assets/gallery/cabina/cabina-${String(i+1).padStart(3,'0')}.webp`)
};
const labels={exterior:'Sesión exterior',estudio:'Sesión de estudio',cabina:'Cabina de fotos'};
let sessionType='exterior',sessionExpanded=false,boothExpanded=false;
let currentGallery=[],currentIndex=0;

function card(src,index,type){
  const b=document.createElement('button'); b.className='photo-card'; b.type='button'; b.setAttribute('aria-label',`Abrir foto ${index+1} de ${labels[type]}`);
  const img=document.createElement('img'); img.loading='lazy'; img.decoding='async'; img.src=src; img.alt=`${labels[type]} de María Fernanda, foto ${index+1}`;
  b.appendChild(img); b.addEventListener('click',()=>openLightbox(galleries[type],index,type)); return b;
}
function renderSession(){
  const grid=document.getElementById('sessionGrid'); grid.innerHTML=''; const all=galleries[sessionType],items=sessionExpanded?all:all.slice(0,12);
  items.forEach((src,i)=>grid.appendChild(card(src,i,sessionType)));
  const more=document.getElementById('sessionMore'); more.textContent=sessionExpanded?'Ver menos':`Ver las ${all.length} fotos`;
}
function renderBooth(){
  const grid=document.getElementById('boothGrid'); grid.innerHTML=''; const all=galleries.cabina,items=boothExpanded?all:all.slice(0,12);
  items.forEach((src,i)=>grid.appendChild(card(src,i,'cabina')));
  document.getElementById('boothMore').textContent=boothExpanded?'Ver menos':'Ver las 60 fotos';
}
document.querySelectorAll('.gallery-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.gallery-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active'); sessionType=tab.dataset.gallery; sessionExpanded=false; renderSession();
}));
document.getElementById('sessionMore').addEventListener('click',()=>{sessionExpanded=!sessionExpanded;renderSession();if(!sessionExpanded)document.getElementById('sesion').scrollIntoView({behavior:'smooth'})});
document.getElementById('boothMore').addEventListener('click',()=>{boothExpanded=!boothExpanded;renderBooth();if(!boothExpanded)document.getElementById('cabina').scrollIntoView({behavior:'smooth'})});

const lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightboxImage'),caption=document.getElementById('lightboxCaption');
function openLightbox(list,index,type){currentGallery=list;currentIndex=index;lightbox.dataset.type=type;updateLightbox();lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open')}
function updateLightbox(){lightboxImage.src=currentGallery[currentIndex];caption.textContent=`${labels[lightbox.dataset.type]} · ${currentIndex+1} de ${currentGallery.length}`}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open');lightboxImage.src=''}
function moveLightbox(dir){currentIndex=(currentIndex+dir+currentGallery.length)%currentGallery.length;updateLightbox()}
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);document.getElementById('lightboxPrev').addEventListener('click',()=>moveLightbox(-1));document.getElementById('lightboxNext').addEventListener('click',()=>moveLightbox(1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')moveLightbox(-1);if(e.key==='ArrowRight')moveLightbox(1)});
let touchX=0;lightbox.addEventListener('touchstart',e=>touchX=e.changedTouches[0].screenX,{passive:true});lightbox.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-touchX;if(Math.abs(d)>50)moveLightbox(d>0?-1:1)},{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const btn=document.getElementById('musicBtn'),audio=document.getElementById('localAudio'),yt=document.getElementById('ytPlayer'),status=document.getElementById('audioStatus');let playing=false;function showStatus(t){status.textContent=t;status.style.display='block';setTimeout(()=>status.style.display='none',3500)}btn.addEventListener('click',async()=>{if(playing){audio.pause();yt.src='about:blank';playing=false;btn.textContent='♫ Reproducir música';return}try{await audio.play();playing=true;btn.textContent='❚❚ Pausar música'}catch(err){yt.src='https://www.youtube.com/embed/fZSZMp32XaA?autoplay=1&loop=1&playlist=fZSZMp32XaA&controls=0&rel=0';playing=true;btn.textContent='❚❚ Pausar música';showStatus('Reproduciendo desde YouTube. Se necesita conexión a internet.')}});
function makeLanterns(id,data,cls){const layer=document.getElementById(id);if(!layer)return;data.forEach(([left,duration,delay,size,drift])=>{const lamp=document.createElement('span');lamp.className=cls;lamp.style.left=left+'%';lamp.style.animationDuration=duration+'s';lamp.style.animationDelay='-'+delay+'s';lamp.style.width=size+'px';lamp.style.height=(size*1.48)+'px';lamp.style.setProperty('--drift',drift+'px');layer.appendChild(lamp)})}
makeLanterns('lanternLayer',[[4,16,2,10,-18],[10,12,5,13,24],[17,18,9,9,-14],[23,13,1,15,28],[30,20,12,8,-12],[37,14,6,12,18],[44,17,3,16,-24],[51,11,8,10,20],[58,19,11,9,-18],[65,13,4,14,24],[72,16,7,11,-16],[79,12,2,15,20],[86,18,10,9,-20],[93,14,5,13,18]],'lantern');
makeLanterns('globalLanternLayer',[[6,23,4,8,-18],[14,27,13,10,20],[23,31,18,7,-14],[33,25,9,9,18],[43,29,21,8,-20],[54,24,15,10,16],[65,30,6,7,-15],[76,26,19,9,20],[87,32,11,8,-18],[95,28,23,7,14]],'global-lantern');
const dedicationButton=document.getElementById('sendDedication');dedicationButton.addEventListener('click',()=>{const field=document.getElementById('dedicationText'),message=field.value.trim();if(!message){field.focus();field.setCustomValidity('Escribe una dedicatoria antes de enviarla.');field.reportValidity();field.setCustomValidity('');return}window.open(`https://wa.me/529381604399?text=${encodeURIComponent(`Dedicatoria para María Fernanda:\n\n${message}`)}`,'_blank','noopener')});
renderSession();renderBooth();
