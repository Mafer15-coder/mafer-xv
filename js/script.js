const target=new Date('2026-09-12T18:00:00-06:00').getTime();
function tick(){
 const d=Math.max(0,target-Date.now());
 document.getElementById('days').textContent=String(Math.floor(d/86400000)).padStart(2,'0');
 document.getElementById('hours').textContent=String(Math.floor(d%86400000/3600000)).padStart(2,'0');
 document.getElementById('minutes').textContent=String(Math.floor(d%3600000/60000)).padStart(2,'0');
 document.getElementById('seconds').textContent=String(Math.floor(d%60000/1000)).padStart(2,'0');
}
tick();setInterval(tick,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const btn=document.getElementById('musicBtn');
const audio=document.getElementById('localAudio');
const yt=document.getElementById('ytPlayer');
const status=document.getElementById('audioStatus');
let playing=false;
function showStatus(t){status.textContent=t;status.style.display='block';setTimeout(()=>status.style.display='none',3500)}

btn.addEventListener('click',async()=>{
 if(playing){
   audio.pause(); yt.src='about:blank'; playing=false;
   btn.textContent='♫ Reproducir música'; return;
 }
 try{
   await audio.play();
   playing=true; btn.textContent='❚❚ Pausar música';
 }catch(err){
   yt.src='https://www.youtube.com/embed/fZSZMp32XaA?autoplay=1&loop=1&playlist=fZSZMp32XaA&controls=0&rel=0';
   playing=true; btn.textContent='❚❚ Pausar música';
   showStatus('Reproduciendo desde YouTube. Se necesita conexión a internet.');
 }
});

const lanternLayer=document.getElementById('lanternLayer');
if(lanternLayer && lanternLayer.children.length===0){
  const lanternData=[
    [4,16,2,10,-18],[10,12,5,13,24],[17,18,9,9,-14],[23,13,1,15,28],
    [30,20,12,8,-12],[37,14,6,12,18],[44,17,3,16,-24],[51,11,8,10,20],
    [58,19,11,9,-18],[65,13,4,14,24],[72,16,7,11,-16],[79,12,2,15,20],
    [86,18,10,9,-20],[93,14,5,13,18],[27,10,9,18,14],[61,11,10,17,-14],
    [14,21,15,8,10],[82,22,14,8,-10]
  ];
  lanternData.forEach(([left,duration,delay,size,drift])=>{
    const lamp=document.createElement('span');
    lamp.className='lantern';
    lamp.style.left=left+'%';
    lamp.style.animationDuration=duration+'s';
    lamp.style.animationDelay='-'+delay+'s';
    lamp.style.width=size+'px';
    lamp.style.height=(size*1.48)+'px';
    lamp.style.setProperty('--drift',drift+'px');
    lanternLayer.appendChild(lamp);
  });
}


const globalLanternLayer=document.getElementById('globalLanternLayer');
if(globalLanternLayer && globalLanternLayer.children.length===0){
  const globalLanterns=[
    [6,23,4,8,-18],[14,27,13,10,20],[23,31,18,7,-14],[33,25,9,9,18],
    [43,29,21,8,-20],[54,24,15,10,16],[65,30,6,7,-15],[76,26,19,9,20],
    [87,32,11,8,-18],[95,28,23,7,14]
  ];
  globalLanterns.forEach(([left,duration,delay,size,drift])=>{
    const lamp=document.createElement('span');
    lamp.className='global-lantern';
    lamp.style.left=left+'%';
    lamp.style.animationDuration=duration+'s';
    lamp.style.animationDelay='-'+delay+'s';
    lamp.style.width=size+'px';
    lamp.style.height=(size*1.5)+'px';
    lamp.style.setProperty('--drift',drift+'px');
    globalLanternLayer.appendChild(lamp);
  });
}


const dedicationButton=document.getElementById('sendDedication');
if(dedicationButton){
  dedicationButton.addEventListener('click',()=>{
    const field=document.getElementById('dedicationText');
    const message=field.value.trim();
    if(!message){
      field.focus();
      field.setCustomValidity('Escribe una dedicatoria antes de enviarla.');
      field.reportValidity();
      field.setCustomValidity('');
      return;
    }
    const text=`Dedicatoria para María Fernanda:\n\n${message}`;
    window.open(`https://wa.me/529381604399?text=${encodeURIComponent(text)}`,'_blank','noopener');
  });
}
