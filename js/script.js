'use strict';

const target = new Date('2026-09-12T18:00:00-06:00').getTime();
function tick(){
  const d=Math.max(0,target-Date.now());
  const values={days:Math.floor(d/86400000),hours:Math.floor(d%86400000/3600000),minutes:Math.floor(d%3600000/60000),seconds:Math.floor(d%60000/1000)};
  Object.entries(values).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=String(value).padStart(2,'0')});
}
tick();setInterval(tick,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const audio=document.getElementById('localAudio');
const musicBtn=document.getElementById('musicBtn');
const status=document.getElementById('audioStatus');
let playing=false;
function showStatus(text){if(!status)return;status.textContent=text;status.style.display='block';setTimeout(()=>status.style.display='none',3200)}
async function playMusic(){try{await audio.play();playing=true;musicBtn.textContent='❚❚ Pausar';return true}catch{return false}}
function pauseMusic(){audio.pause();playing=false;musicBtn.textContent='♫ Música'}
musicBtn.addEventListener('click',async()=>{if(playing){pauseMusic();return}if(!(await playMusic()))showStatus('Toca nuevamente para iniciar la música.')});

const welcome=document.getElementById('welcomeScreen');
const welcomePanel=document.querySelector('.welcome-panel');
const enterButton=document.getElementById('enterInvitation');
const typedName=document.getElementById('typedName');
const name='María Fernanda';
let index=0;
function typeName(){
  if(index<name.length){typedName.textContent+=name[index++];setTimeout(typeName,index===5?180:115)}
  else{welcomePanel.classList.add('ready');enterButton.disabled=false}
}
setTimeout(typeName,550);
enterButton.addEventListener('click',async()=>{
  await playMusic();
  document.body.classList.add('invitation-open');
  document.body.classList.remove('welcome-open');
  welcome.classList.add('is-leaving');
  setTimeout(()=>welcome.remove(),950);
});

const pascalButton=document.getElementById('pascalButton');
let pascalTimer;
pascalButton.addEventListener('click',()=>{
  clearTimeout(pascalTimer);
  pascalButton.classList.remove('is-active');
  void pascalButton.offsetWidth;
  pascalButton.classList.add('is-active');
  pascalTimer=setTimeout(()=>pascalButton.classList.remove('is-active'),1100);
});

const dedicationButton=document.getElementById('sendDedication');
dedicationButton.addEventListener('click',()=>{
  const field=document.getElementById('dedicationText');
  const message=field.value.trim();
  if(!message){field.focus();field.setCustomValidity('Escribe una dedicatoria antes de enviarla.');field.reportValidity();field.setCustomValidity('');return}
  const text=`Dedicatoria para María Fernanda:\n\n${message}`;
  window.open(`https://wa.me/529381604399?text=${encodeURIComponent(text)}`,'_blank','noopener');
});
