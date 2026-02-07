import{p as Q}from"./page-flip-CmgiROxD.js";import{g as y}from"./gsap-C8pce-KX.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const u={name:"My Love",successMessage:"I love you so much!",bookTitle:"Our Story",coverSubtitle:"A Journey of Love",theme:{primary:"#2D5A3D",secondary:"#9CAF88",accent:"#D4A574",background:"#1a2a1a",cream:"#FAF8F0",mint:"#E8F5E9"},pages:[{text:"",image:"images/page-01.jpg"},{text:"",image:"images/page-02.jpg"},{text:"",image:"images/page-03.jpg"},{text:"",image:"images/page-04.jpg"},{text:"",image:"images/page-05.jpg"},{text:"",image:"images/page-06.jpg"},{text:"",image:"images/page-07.jpg"},{text:"",image:"images/page-08.jpg"},{text:"",image:"images/page-09.jpg"},{text:"",image:"images/page-10.jpg"},{text:"",image:"images/page-11.jpg"},{text:"",image:"images/page-12.jpg"},{text:"",image:"images/page-13.jpg"},{text:"",image:"images/page-14.jpg"},{text:"",image:"images/page-15.jpg"},{text:"",image:"images/page-16.jpg"}],animations:{pageFlipDuration:800,particleCount:25,confettiCount:120,heartCount:15},audio:{musicFile:"music.mp3",pageTurnVolume:.25,musicVolume:.5,enableSounds:!0},book:{width:1200,height:675,minWidth:300,maxWidth:1400,minHeight:169,maxHeight:788},noButtonTexts:["No","Are you sure?","Really?","Think about it...","Please reconsider?","Pretty please?","With sugar on top?","I'll be a good boy!","Give me a chance!","Please? 🥺","I'm begging you!","On my knees here!","Have mercy!","Don't do this to me!","I need you!","What would Lulu Think?","🥺👉👈","I'll do anything!","PLEASE I'M DESPERATE","This button has feelings!","You're breaking my heart","I thought we had something","Was it all a lie?","I can't live without you","*sobs uncontrollably*","What if I said please x100?","I'll give you chocolate!","Free hugs forever?","I'll do the dishes!","Name your price!","I'll make you love me","You can't escape love","Reem?","I have all day...","Still here btw","ok but consider: yes","no is just yes spelled wrong","I'm not crying you're crying","I'm telling mama","This is my villain origin story","REEEEEEEEEEEEEEEEEM","💔💔💔💔💔","why must you hurt me","I'm literally a button","This is button abuse","Fine. I'll wait.","*stares intensely*","👁️👄👁️","You know you want to","Just click yes already","The yes button misses you","YES IS RIGHT THERE →","I believe in us","Love always wins","...please? 🥺💚"]},T=[{bg:"#f5e6e8",content:`
      <defs>
        <pattern id="hearts1" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M20 30 L10 20 Q5 15 10 10 Q15 5 20 12 Q25 5 30 10 Q35 15 30 20 Z" fill="#e8b4b8" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hearts1)"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#c9787c" font-size="48" font-family="serif">♥</text>
    `},{bg:"#e8f0e8",content:`
      <circle cx="50%" cy="50%" r="30" fill="#9CAF88" opacity="0.3"/>
      <circle cx="50%" cy="40%" r="12" fill="#c8e6c9"/>
      <circle cx="40%" cy="50%" r="12" fill="#c8e6c9"/>
      <circle cx="60%" cy="50%" r="12" fill="#c8e6c9"/>
      <circle cx="45%" cy="58%" r="12" fill="#c8e6c9"/>
      <circle cx="55%" cy="58%" r="12" fill="#c8e6c9"/>
      <circle cx="50%" cy="50%" r="8" fill="#D4A574"/>
    `},{bg:"#e6e8f0",content:`
      <text x="30%" y="30%" font-size="24" fill="#9CAF88" opacity="0.7">✦</text>
      <text x="70%" y="25%" font-size="32" fill="#D4A574" opacity="0.8">★</text>
      <text x="50%" y="55%" font-size="48" fill="#9CAF88">✨</text>
      <text x="25%" y="70%" font-size="28" fill="#D4A574" opacity="0.6">⭐</text>
      <text x="75%" y="75%" font-size="20" fill="#9CAF88" opacity="0.7">✦</text>
    `},{bg:"#e8f5e9",content:`
      <text x="50%" y="35%" font-size="40" fill="#2D5A3D" opacity="0.8">🌿</text>
      <text x="30%" y="55%" font-size="32" fill="#9CAF88">🍃</text>
      <text x="70%" y="60%" font-size="36" fill="#2D5A3D" opacity="0.7">🌱</text>
      <text x="50%" y="75%" font-size="28" fill="#9CAF88" opacity="0.6">🍀</text>
    `},{bg:"#faf0f0",content:`
      <polygon points="150,100 200,150 150,200 100,150" fill="#e8b4b8" opacity="0.4"/>
      <polygon points="150,120 180,150 150,180 120,150" fill="#c9787c" opacity="0.6"/>
      <text x="50%" y="52%" text-anchor="middle" font-size="28" fill="#9b4d52">❤</text>
    `},{bg:"#e8e6f0",content:`
      <circle cx="40%" cy="40%" r="40" fill="#D4A574" opacity="0.3"/>
      <circle cx="30%" cy="35%" r="35" fill="#e8e6f0"/>
      <text x="65%" y="30%" font-size="20" fill="#9CAF88">✦</text>
      <text x="75%" y="50%" font-size="16" fill="#D4A574">★</text>
      <text x="60%" y="70%" font-size="24" fill="#9CAF88">⭐</text>
      <text x="50%" y="80%" font-size="14" fill="#D4A574">✦</text>
    `},{bg:"#f0e8e6",content:`
      <path d="M100,150 Q150,100 200,150 T300,150" stroke="#D4A574" stroke-width="3" fill="none" opacity="0.5"/>
      <path d="M80,180 Q130,130 180,180 T280,180" stroke="#9CAF88" stroke-width="2" fill="none" opacity="0.4"/>
      <text x="50%" y="50%" text-anchor="middle" font-size="36" fill="#c9787c">💕</text>
    `},{bg:"#f5e8e8",content:`
      <text x="50%" y="45%" text-anchor="middle" font-size="48">🌹</text>
      <text x="30%" y="65%" font-size="24" opacity="0.7">🌷</text>
      <text x="70%" y="60%" font-size="28" opacity="0.8">🌸</text>
    `},{bg:"#e8f0f5",content:`
      <text x="35%" y="35%" font-size="32">🦋</text>
      <text x="65%" y="45%" font-size="40">🦋</text>
      <text x="45%" y="70%" font-size="28" opacity="0.7">🦋</text>
      <circle cx="50%" cy="50%" r="5" fill="#D4A574"/>
    `},{bg:"#f0f5f8",content:`
      <circle cx="70%" cy="30%" r="25" fill="#D4A574" opacity="0.6"/>
      <ellipse cx="40%" cy="50%" rx="40" ry="20" fill="#fff" opacity="0.8"/>
      <ellipse cx="30%" cy="48%" rx="25" ry="15" fill="#fff" opacity="0.8"/>
      <ellipse cx="50%" cy="48%" rx="30" ry="18" fill="#fff" opacity="0.8"/>
      <text x="50%" y="75%" text-anchor="middle" font-size="24" fill="#9CAF88">☀️</text>
    `},{bg:"#f8f0f5",content:`
      <text x="25%" y="25%" font-size="20">✨</text>
      <text x="75%" y="20%" font-size="24">💫</text>
      <text x="50%" y="50%" text-anchor="middle" font-size="48">⭐</text>
      <text x="20%" y="70%" font-size="18">✨</text>
      <text x="80%" y="75%" font-size="22">💫</text>
      <text x="50%" y="85%" font-size="16">✨</text>
    `},{bg:"#e8f0e8",content:`
      <text x="30%" y="35%" font-size="36">🕊️</text>
      <text x="65%" y="45%" font-size="28">🐦</text>
      <text x="50%" y="70%" text-anchor="middle" font-size="20" fill="#9CAF88">~ ~ ~</text>
    `},{bg:"#f5f0e8",content:`
      <rect x="45%" y="50%" width="10%" height="30%" fill="#D4A574"/>
      <ellipse cx="50%" cy="48%" rx="8%" ry="4%" fill="#D4A574"/>
      <ellipse cx="50%" cy="42%" rx="4%" ry="8%" fill="#ffcc00" opacity="0.8"/>
      <ellipse cx="50%" cy="38%" rx="2%" ry="5%" fill="#ff9900"/>
      <text x="30%" y="70%" font-size="16">✨</text>
      <text x="70%" y="65%" font-size="14">✨</text>
    `},{bg:"#f0e8f0",content:`
      <text x="30%" y="35%" font-size="28" fill="#9CAF88">♪</text>
      <text x="55%" y="45%" font-size="36" fill="#D4A574">♫</text>
      <text x="70%" y="30%" font-size="24" fill="#c9787c">♬</text>
      <text x="40%" y="65%" font-size="32" fill="#9CAF88">♩</text>
      <text x="60%" y="75%" font-size="20" fill="#D4A574">♪</text>
    `},{bg:"#f8f5f0",content:`
      <circle cx="40%" cy="50%" r="30" stroke="#D4A574" stroke-width="6" fill="none"/>
      <circle cx="60%" cy="50%" r="30" stroke="#D4A574" stroke-width="6" fill="none"/>
      <text x="50%" y="80%" text-anchor="middle" font-size="20" fill="#9CAF88">💍</text>
    `},{bg:"#f5e8f0",content:`
      <rect x="25%" y="35%" width="50%" height="35%" fill="#fff" stroke="#D4A574" stroke-width="2"/>
      <polygon points="150,105 100,140 200,140" fill="#fff" stroke="#D4A574" stroke-width="2"/>
      <polygon points="150,125 100,105 200,105" fill="#faf0f0" stroke="#D4A574" stroke-width="2"/>
      <text x="50%" y="62%" text-anchor="middle" font-size="28" fill="#c9787c">❤</text>
    `}];function X(t){const e=(t-1)%T.length,n=T[e];return`
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Decorative illustration for page ${t}"
         style="width: 100%; height: 100%;">
      <rect width="100%" height="100%" fill="${n.bg}"/>
      ${n.content}
    </svg>
  `}let m=null;function _(){return`
    <div class="page cover-page" data-density="hard">
      <div class="cover-decoration" aria-hidden="true">💚</div>
      <h1 class="cover-title">${u.bookTitle}</h1>
      <p class="cover-subtitle">For ${u.name}</p>
      <p class="cover-hint" aria-hidden="true">Click to begin...</p>
    </div>
  `}function N(t){return t?"/valentines-game/"+t:""}function K(t,e){const n=e.text&&e.text.trim().length>0,i=!n&&e.image?" image-full":"",o=t<=2?"":' loading="lazy"',a=N(e.image),c=e.image?`<img src="${a}" alt="Page ${t}"${o}>`:"",l=X(t),d=n?`<p class="page-text">${e.text}</p>`:"",r=n?`<span class="page-number" aria-label="Page ${t}">${t}</span>`:"";return`
    <div class="page content-page${i}" role="article" aria-label="Page ${t}">
      <div class="image-container">
        ${c}
        <div class="image-placeholder" ${e.image?'style="display:none"':""}>
          ${l}
        </div>
      </div>
      ${d}
      ${r}
    </div>
  `}function J(){return`
    <div class="page end-page" data-density="hard" role="article" aria-label="End of Story">
      <div class="end-page-content">
        <div class="end-decoration" aria-hidden="true">💚</div>
        <p class="end-text">And now, I have a question for you...</p>
        <button class="end-page-btn" id="end-page-btn" type="button">
          I'm ready 💚
        </button>
      </div>
    </div>
  `}function U(){const t=document.getElementById("book");if(!t){console.error("Book container not found");return}t.innerHTML="",t.insertAdjacentHTML("beforeend",_()),u.pages.forEach((e,n)=>{const i=n+1;t.insertAdjacentHTML("beforeend",K(i,e))}),t.insertAdjacentHTML("beforeend",J()),Z()}function Z(){document.querySelectorAll("#book .image-container img").forEach(e=>{e.addEventListener("load",()=>e.classList.add("loaded")),e.addEventListener("error",()=>{e.style.display="none";const n=e.nextElementSibling;n&&(n.style.display="flex")})})}function ee(){return u.pages.length+2}function te(){const t=document.getElementById("book");if(!t)return console.error("Book container not found"),null;const{width:e,height:n,minWidth:i,maxWidth:o,minHeight:a,maxHeight:c}=u.book;m=new Q.PageFlip(t,{width:e,height:n,size:"stretch",minWidth:i,maxWidth:o,minHeight:a,maxHeight:c,drawShadow:!0,flippingTime:u.animations.pageFlipDuration,usePortrait:!0,showCover:!0,maxShadowOpacity:.5,mobileScrollSupport:!1,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!0});const l=document.querySelectorAll("#book .page");return m.loadFromHTML(l),m}function D(){return m}function $(){m&&m.flipNext()}function V(){m&&m.flipPrev()}function ne(){m&&m.updateFromSize()}class ie{constructor(){this.musicElement=null,this.isMusicPlaying=!1,this.isMusicStarted=!1,this.audioContext=null,this._savedVolume=.5}init(){if(this.musicElement=document.getElementById("bg-music"),this.musicElement){const e="/valentines-game/";this.musicElement.src=e+u.audio.musicFile,this.musicElement.volume=u.audio.musicVolume}document.addEventListener("visibilitychange",()=>{this.musicElement&&(document.hidden&&this.isMusicPlaying?(this._savedVolume=this.musicElement.volume,this.musicElement.volume=0):!document.hidden&&this.isMusicPlaying&&(this.musicElement.volume=this._savedVolume))})}getAudioContext(){if(!this.audioContext)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext)}catch(e){return console.warn("AudioContext creation failed:",e.message),null}return this.audioContext.state==="suspended"&&this.audioContext.resume(),this.audioContext}playPageTurnSound(){try{const e=this.getAudioContext();if(!e)return;const n=.15,i=e.sampleRate*n,o=e.createBuffer(1,i,e.sampleRate),a=o.getChannelData(0);for(let r=0;r<i;r++)a[r]=(Math.random()*2-1)*Math.exp(-r/(i*.1));const c=e.createBufferSource();c.buffer=o;const l=e.createGain();l.gain.setValueAtTime(u.audio.pageTurnVolume*.3,e.currentTime),l.gain.exponentialRampToValueAtTime(.001,e.currentTime+n);const d=e.createBiquadFilter();d.type="lowpass",d.frequency.value=2e3,c.connect(d),d.connect(l),l.connect(e.destination),c.start(),c.stop(e.currentTime+n)}catch(e){console.warn("Page turn sound failed:",e.message)}}playSuccessSound(){try{const e=this.getAudioContext();if(!e)return;[523,659,784,1047].forEach((i,o)=>{const a=e.createOscillator(),c=e.createGain();a.type="sine",a.connect(c),c.connect(e.destination);const l=e.currentTime+o*.12;a.frequency.setValueAtTime(i,l),c.gain.setValueAtTime(.15,l),c.gain.exponentialRampToValueAtTime(.01,l+.35),a.start(l),a.stop(l+.35)})}catch(e){console.warn("Success sound failed:",e.message)}}async tryPlayMusic(){if(!this.musicElement)return!1;try{return await this.musicElement.play(),this.isMusicPlaying=!0,this.isMusicStarted=!0,!0}catch(e){return console.warn("Music autoplay blocked:",e.message),!1}}async toggleMusic(){if(!this.musicElement)return this.isMusicPlaying;if(this.isMusicPlaying)this.musicElement.pause(),this.isMusicPlaying=!1;else try{await this.musicElement.play(),this.isMusicPlaying=!0,this.isMusicStarted=!0}catch(e){console.warn("Music play failed:",e.message)}return this.isMusicPlaying}setVolume(e){this.musicElement&&(this.musicElement.volume=Math.pow(e,2),this._savedVolume=this.musicElement.volume)}get isPlaying(){return this.isMusicPlaying}get hasStarted(){return this.isMusicStarted}destroy(){this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.musicElement&&(this.musicElement.pause(),this.musicElement=null)}}const f=new ie,P=["🌿","✨","💚","🍃","⭐"],L=["16px","20px","24px","28px"];function oe(){const t=document.getElementById("particles");if(!t){console.warn("Particles container not found");return}t.innerHTML="";const n=window.innerWidth<768?Math.floor(u.animations.particleCount/2):u.animations.particleCount;for(let i=0;i<n;i++){const o=document.createElement("div");o.className="particle",o.setAttribute("aria-hidden","true"),o.textContent=P[Math.floor(Math.random()*P.length)],o.style.left=`${Math.random()*100}%`,o.style.fontSize=L[Math.floor(Math.random()*L.length)],o.style.animationDelay=`${Math.random()*10}s`,o.style.animationDuration=`${8+Math.random()*6}s`,t.appendChild(o)}}const I=["#5c8a6b","#9CAF88","#D4A574","#fff","#c8e6c9","#7aa87a"];let g=null,p=!1,v=null,M=null,b=null;function H(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function se(t,e,n,i){t.beginPath(),t.moveTo(e,n+i*.3),t.bezierCurveTo(e,n,e-i/2,n,e-i/2,n+i*.3),t.bezierCurveTo(e-i/2,n+i*.6,e,n+i*.9,e,n+i),t.bezierCurveTo(e,n+i*.9,e+i/2,n+i*.6,e+i/2,n+i*.3),t.bezierCurveTo(e+i/2,n,e,n,e,n+i*.3),t.fill()}function ae(){if(p||H())return;p=!0;const t=document.getElementById("confetti-canvas");if(!t){p=!1;return}const e=t.getContext("2d"),n=Math.min(window.devicePixelRatio||1,2),i=window.innerWidth,o=window.innerHeight;t.width=i*n,t.height=o*n,t.style.width=`${i}px`,t.style.height=`${o}px`,e.scale(n,n);const a=window.innerWidth<768,c=a?60:u.animations.confettiCount,l=a?8:u.animations.heartCount,d=[];for(let s=0;s<c;s++)d.push({x:Math.random()*i,y:Math.random()*o-o,w:6+Math.random()*6,h:4+Math.random()*5,color:I[Math.floor(Math.random()*I.length)],speed:1.5+Math.random()*2.5,rotation:Math.random()*Math.PI*2,rotationSpeed:(Math.random()-.5)*.12,wobble:Math.random()*Math.PI*2,type:"confetti"});for(let s=0;s<l;s++)d.push({x:Math.random()*i,y:o+Math.random()*100,size:12+Math.random()*15,color:I[Math.floor(Math.random()*2)],speed:.8+Math.random()*1.5,wobble:Math.random()*Math.PI*2,type:"heart"});function r(){e.clearRect(0,0,i,o),d.forEach(s=>{s.type==="heart"?(e.fillStyle=s.color,se(e,s.x+Math.sin(s.wobble)*12,s.y,s.size),s.y-=s.speed,s.wobble+=.03,s.y<-s.size&&(s.y=o+s.size,s.x=Math.random()*i)):(e.save(),e.translate(s.x+Math.sin(s.wobble)*20,s.y),e.rotate(s.rotation),e.fillStyle=s.color,e.fillRect(-s.w/2,-s.h/2,s.w,s.h),e.restore(),s.y+=s.speed,s.rotation+=s.rotationSpeed,s.wobble+=.02,s.y>o+20&&(s.y=-20,s.x=Math.random()*i))}),g=requestAnimationFrame(r)}v=()=>{const s=Math.min(window.devicePixelRatio||1,2),h=window.innerWidth,E=window.innerHeight;t.width=h*s,t.height=E*s,t.style.width=`${h}px`,t.style.height=`${E}px`,e.setTransform(s,0,0,s,0,0)},window.addEventListener("resize",v),b=()=>{document.hidden?g&&(cancelAnimationFrame(g),g=null):p&&r()},document.addEventListener("visibilitychange",b),r(),M=setTimeout(()=>{R()},1e4)}function ce(){const t=document.getElementById("success-screen"),e=document.getElementById("success-msg");if(t){if(e&&(e.textContent=u.successMessage),t.classList.add("visible"),H()){t.style.opacity="1";return}y.fromTo(t,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"}),y.from(".success-title",{scale:.5,opacity:0,duration:.8,delay:.3,ease:"back.out(1.7)"}),y.from(".success-message",{y:30,opacity:0,duration:.6,delay:.6}),y.from(".success-hearts",{scale:0,duration:.5,delay:.9,ease:"back.out(2)"}),y.from(".restart-btn",{opacity:0,y:20,duration:.5,delay:1.2})}}function R(){g&&(cancelAnimationFrame(g),g=null),v&&(window.removeEventListener("resize",v),v=null),b&&(document.removeEventListener("visibilitychange",b),b=null),M&&(clearTimeout(M),M=null),p=!1}let A=0,x=.5,w=!1,F=0,C=!1;function le(t,e){let n;return(...i)=>{clearTimeout(n),n=setTimeout(()=>t(...i),e)}}function re(t){const e=u.pages;for(let n=1;n<=2;n++){const i=t-1+n;if(i>=0&&i<e.length&&e[i].image){const o=new Image,a="/valentines-game/";o.src=a+e[i].image}}}function B(){U();const t=te();if(!t){console.error("Failed to initialize page flip");return}f.init();const e=localStorage.getItem("valentines-book-volume");e!==null&&(x=parseFloat(e)),oe(),ue(t),pe(),console.log("Valentine's Book initialized successfully")}function k(t){const e=document.getElementById("page-indicator"),n=document.getElementById("page-announcer"),i=u.pages.length;let o;t<=0?o="Cover":t<=i?o=`Page ${t} of ${i}`:o="The End",e&&(e.textContent=o),n&&(n.textContent=o)}function ue(t){const e=ee();t.on("flip",l=>{f.playPageTurnSound(),k(l.data),F=Date.now(),C=l.data>=e-1,re(l.data),l.data===1&&!f.hasStarted&&f.tryPlayMusic()});const n=document.getElementById("nav-prev"),i=document.getElementById("nav-next");n&&n.addEventListener("click",l=>{l.stopPropagation(),V()}),i&&i.addEventListener("click",l=>{l.stopPropagation(),C?S():$()}),document.addEventListener("keydown",me);const o=document.getElementById("music-btn");o&&o.addEventListener("click",ge),document.addEventListener("click",l=>{l.target.id==="yes-btn"&&he(),(l.target.id==="end-page-btn"||l.target.closest("#end-page-btn"))&&Date.now()-F>900&&S()}),document.addEventListener("mouseenter",ye,!0);const a=document.getElementById("back-to-book-btn");a&&a.addEventListener("click",j);const c=document.getElementById("restart-btn");c&&c.addEventListener("click",q),window.addEventListener("resize",le(ne,150)),document.addEventListener("keydown",fe),de(),k(0)}function de(){const t=document.getElementById("volume-dial"),e=document.getElementById("volume-knob");if(!t||!e)return;z(x),f.setVolume(x),t.addEventListener("mousedown",n),t.addEventListener("touchstart",n,{passive:!1}),document.addEventListener("mousemove",i),document.addEventListener("touchmove",i,{passive:!1}),document.addEventListener("mouseup",o),document.addEventListener("touchend",o);function n(c){c.preventDefault(),w=!0,t.classList.add("dragging"),a(c)}function i(c){w&&(c.preventDefault(),a(c))}function o(){w&&(w=!1,t.classList.remove("dragging"),localStorage.setItem("valentines-book-volume",String(x)))}function a(c){const l=t.getBoundingClientRect();let r=((c.touches?c.touches[0].clientX:c.clientX)-l.left)/l.width;r=Math.max(0,Math.min(1,r)),x=r,f.setVolume(r),z(r)}}function z(t){const e=document.getElementById("volume-fill"),n=document.getElementById("volume-knob"),i=document.getElementById("volume-label"),o=t*100;e&&(e.style.width=`${o}%`),n&&(n.style.left=`${o}%`),i&&(i.textContent=`${Math.round(o)}%`)}function me(t){var e,n;switch(t.code){case"ArrowRight":case"Space":t.preventDefault(),C?S():$();break;case"ArrowLeft":t.preventDefault(),V();break;case"Escape":t.preventDefault(),(e=document.getElementById("success-screen"))!=null&&e.classList.contains("visible")?q():(n=document.getElementById("question-screen"))!=null&&n.classList.contains("visible")&&j();break}}function fe(t){const e=document.getElementById("question-screen"),n=document.getElementById("success-screen"),i=n!=null&&n.classList.contains("visible")?n:e!=null&&e.classList.contains("visible")?e:null;if(!i||t.key!=="Tab")return;const o=i.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(o.length===0)return;const a=o[0],c=o[o.length-1];t.shiftKey?document.activeElement===a&&(t.preventDefault(),c.focus()):document.activeElement===c&&(t.preventDefault(),a.focus())}async function ge(){const t=document.getElementById("music-btn"),e=await f.toggleMusic();t&&(t.textContent=e?"🔊":"🔇",t.setAttribute("aria-label",e?"Mute music":"Play music"))}function S(){const t=document.getElementById("question-screen"),e=document.querySelector(".book-container"),n=document.getElementById("book-footer");if(t){t.classList.add("visible"),t.setAttribute("aria-hidden","false");const i=document.getElementById("yes-btn");i&&setTimeout(()=>i.focus(),100)}e&&(e.style.opacity="0",e.style.pointerEvents="none"),n&&(n.style.opacity="0")}function j(){const t=document.getElementById("question-screen"),e=document.querySelector(".book-container"),n=document.getElementById("book-footer"),i=D();t&&(t.classList.remove("visible"),t.setAttribute("aria-hidden","true")),e&&(e.style.opacity="1",e.style.pointerEvents="auto"),n&&(n.style.opacity="1"),i&&i.flipPrev()}function he(){const t=document.getElementById("question-screen");t&&t.classList.remove("visible"),ce(),ae(),f.playSuccessSound()}function ye(t){if(t.target.id!=="no-btn")return;A++;const e=t.target,n=u.noButtonTexts,i=(A-1)%n.length;e.textContent=n[i];const o=window.innerWidth,a=window.innerHeight,c=e.getBoundingClientRect(),l=100,d=80,r=l,s=o-l-c.width,h=d,E=a-d-c.height,O=r+Math.random()*(s-r),W=h+Math.random()*(E-h),Y=Math.min(A*.01,.3),G=Math.max(.7,1-Y);e.style.left=`${O}px`,e.style.top=`${W}px`,e.style.transform=`scale(${G})`}function q(){const t=document.getElementById("success-screen");t&&(t.classList.remove("visible"),t.style.opacity="");const e=document.getElementById("question-screen");e&&(e.classList.remove("visible"),e.setAttribute("aria-hidden","true"));const n=document.querySelector(".book-container");n&&(n.style.opacity="1",n.style.pointerEvents="auto");const i=document.getElementById("book-footer");i&&(i.style.opacity="1"),R();const o=document.getElementById("confetti-canvas");o&&o.getContext("2d").clearRect(0,0,o.width,o.height);const a=D();a&&a.turnToPage(0),A=0,C=!1,k(0)}function pe(){const t=document.getElementById("loading-screen");t&&setTimeout(()=>{t.classList.add("hidden"),setTimeout(()=>{t.remove()},800)},500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B):B();
