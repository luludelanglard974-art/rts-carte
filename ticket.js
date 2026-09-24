/* ---- RTS ticket.js : ticket de reservation de demonstration, commun aux modules Bagages et Escale.
   Paiement factice, aucun debit. Le ticket suit la langue passee (fr / en).
   Memorise ?source=xxx (sessionStorage, dans un try/catch) et l'affiche sur le ticket. ---- */
(function(){
/* lien suivi : ?source=irt (ou autre) memorise pour la session */
try{var src=(location.search.match(/[?&]source=([^&#]+)/)||[])[1];if(src)sessionStorage.setItem('rts_source',decodeURIComponent(src).slice(0,40))}catch(e){}
function source(){try{return sessionStorage.getItem('rts_source')||''}catch(e){return ''}}
function sourceLib(){var s=source();if(!s)return '';return s.length<=4?s.toUpperCase():s.charAt(0).toUpperCase()+s.slice(1)}
var S={fr:{paie:'Paiement de démonstration — aucun débit',titre:'Ticket de réservation',num:'N° de réservation',presta:'Prestation',date:'Date',hor:'Horaires',pax:'Passagers',veh:'Véhicule',bag:'Bagages',rdv:'Point de rendez-vous',chauf:'Votre chauffeur',attrib:'attribution en cours',rts:'Numéro RTS',total:'Montant total',just:'Ce ticket vaut justificatif de réservation préalable.',src:'Réservation apportée par',save:'Enregistrer le ticket',mail:'Recevoir par e-mail',fermer:'Fermer',mailPh:'vous@exemple.com',envoyer:'Envoyer',mailOk:'Ticket envoyé (démonstration) à ',mailKo:'Indiquez une adresse e-mail valide.',demo:'Maquette de démonstration — tarifs indicatifs, aucun paiement réel.',fichier:'ticket-RTS'},
 en:{paie:'Demo payment — nothing is charged',titre:'Booking ticket',num:'Booking no.',presta:'Service',date:'Date',hor:'Times',pax:'Passengers',veh:'Vehicle',bag:'Luggage',rdv:'Meeting point',chauf:'Your driver',attrib:'being assigned',rts:'RTS phone',total:'Total amount',just:'This ticket is proof of advance booking.',src:'Booking referred by',save:'Save the ticket',mail:'Receive by e-mail',fermer:'Close',mailPh:'you@example.com',envoyer:'Send',mailOk:'Ticket sent (demo) to ',mailKo:'Please enter a valid e-mail address.',demo:'Demonstration mock-up — indicative prices, no real payment.',fichier:'ticket-RTS'}};
var CSS='.tk-fond{position:fixed;inset:0;z-index:1000;background:rgba(2,17,50,.82);display:flex;align-items:flex-start;justify-content:center;padding:12px;overflow:auto}'+
'.tk-boite{width:100%;max-width:430px;margin:auto;background:#FCF9F4;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#021132}'+
'.tk-paie{background:#0141AC;color:#FFFFFF;font-weight:800;font-size:14px;padding:10px 14px;text-align:center;display:flex;align-items:center;justify-content:center;gap:8px}'+
'.tk-t{background:#FFFFFF;margin:12px;border-radius:14px;border:2px dashed #0141AC;padding:14px 16px 12px}'+
'.tk-head{display:flex;align-items:center;gap:12px;border-bottom:3px solid #DE0715;padding-bottom:10px;margin-bottom:10px}'+
'.tk-head img{height:46px;width:auto}.tk-head b{display:block;font-size:17px;font-weight:900;line-height:1.15}.tk-head i{display:block;font-style:normal;font-size:13px;font-weight:800;color:#0141AC;letter-spacing:.5px;margin-top:2px}'+
'.tk-l{display:flex;justify-content:space-between;gap:10px;font-size:13.5px;padding:4px 0;border-bottom:1px solid rgba(2,17,50,.08)}.tk-l span:first-child{color:rgba(2,17,50,.6);font-weight:700;flex:none}.tk-l span:last-child{text-align:right;font-weight:700}'+
'.tk-l.tot{border:none;margin-top:6px;padding-top:8px;font-size:18px;font-weight:900;background:#FBD608;border-radius:10px;padding:8px 10px;color:#021132}'+
'.tk-just{font-size:11.5px;color:rgba(2,17,50,.6);margin-top:8px;text-align:center;line-height:1.4}'+
'.tk-btns{display:grid;gap:8px;padding:0 12px 12px}'+
'.tk-btn{display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:10px 14px;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.3px;border-radius:14px;border:2.5px solid #FCF9F4;cursor:pointer;font-family:inherit;color:#021132;background-color:#FBD608;--c:#FBD608;background-image:linear-gradient(180deg,rgba(255,255,255,.46) 0%,rgba(255,255,255,.34) 50%,rgba(255,255,255,0) 50%,rgba(0,0,0,.20) 84%,rgba(255,255,255,.14) 100%);box-shadow:0 4px 8px -1px var(--c),0 1px 2px rgba(2,17,50,.35);text-shadow:0 1px 0 rgba(255,255,255,.45)}'+
'.tk-btn.roi{background-color:#0141AC;--c:#0141AC;color:#FFFFFF;text-shadow:0 1px 1px rgba(0,0,0,.35)}'+
'.tk-btn.plat{background:none;box-shadow:none;border:1.5px solid rgba(2,17,50,.25);text-shadow:none;color:#021132;min-height:44px}'+
'.tk-mail{display:none;gap:8px;padding:0 12px 10px}.tk-mail.on{display:flex}.tk-mail input{flex:1;min-width:0;min-height:46px;padding:8px 12px;font-size:15px;border:1px solid rgba(2,17,50,.25);border-radius:12px;font-family:inherit;color:#021132;background:#FFFFFF}'+
'.tk-msg{font-size:13.5px;font-weight:700;padding:0 14px 10px;color:#0141AC;text-align:center}.tk-msg.ko{color:#DE0715}'+
'.tk-demo{font-size:11.5px;color:rgba(2,17,50,.55);text-align:center;padding:0 12px 12px}'+
'@media print{.tk-fond{position:static;background:none;padding:0}.tk-btns,.tk-mail{display:none!important}}';
function style(){if(document.getElementById('tkCss'))return;var s=document.createElement('style');s.id='tkCss';s.textContent=CSS;document.head.appendChild(s)}
function esc(x){return String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function numero(){var d=new Date(),jj=('0'+d.getDate()).slice(-2),mm=('0'+(d.getMonth()+1)).slice(-2);return 'RTS-'+jj+mm+'-'+String(Math.floor(1000+Math.random()*9000))}
function ic(n){var P={check:'<path d="M20 6 9 17l-5-5"/>',down:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',mail:'<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'};
 return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;vertical-align:-.14em">'+P[n]+'</svg>'}
var courant=null;
function ouvrir(o){style();var L=S[o.lang==='en'?'en':'fr'],lang=o.lang==='en'?'en':'fr';
 var num=numero(),src=sourceLib();
 var lignes=[[L.presta,o.prestation],[L.date,o.date]];
 if(o.horaires)lignes.push([L.hor,o.horaires]);
 if(o.pax)lignes.push([L.pax,o.pax]);
 if(o.vehicule)lignes.push([L.veh,o.vehicule]);
 if(o.bagages)lignes.push([L.bag,o.bagages]);
 lignes.push([L.rdv,o.rdv||'']);
 lignes.push([L.chauf,L.attrib]);
 lignes.push([L.rts,'0693 91 12 67']);
 if(src)lignes.push([L.src,src]);
 courant={num:num,L:L,lignes:lignes,total:o.total,lang:lang};
 var h='<div class="tk-boite" role="dialog" aria-modal="true" aria-label="'+esc(L.titre)+'">'+
 '<div class="tk-paie">'+ic('shield')+' '+esc(L.paie)+'</div>'+
 '<div class="tk-t" id="tkTicket"><div class="tk-head"><img src="images/logo-rts.png" alt="RTS"><div><b>'+esc(L.titre)+'</b><i>'+esc(num)+'</i></div></div>';
 lignes.forEach(function(l){h+='<div class="tk-l"><span>'+esc(l[0])+'</span><span>'+esc(l[1])+'</span></div>'});
 h+='<div class="tk-l tot"><span>'+esc(L.total)+'</span><span>'+Math.round(o.total)+' €</span></div>'+
 '<div class="tk-just">'+esc(L.just)+'</div></div>'+
 '<div class="tk-btns"><button type="button" class="tk-btn" id="tkSave">'+ic('down')+' '+esc(L.save)+'</button>'+
 '<button type="button" class="tk-btn roi" id="tkMailB">'+ic('mail')+' '+esc(L.mail)+'</button></div>'+
 '<div class="tk-mail" id="tkMail"><input type="email" id="tkMailIn" placeholder="'+esc(L.mailPh)+'" autocomplete="email"><button type="button" class="tk-btn roi" id="tkMailGo">'+esc(L.envoyer)+'</button></div>'+
 '<div class="tk-msg" id="tkMsg"></div>'+
 '<div class="tk-btns"><button type="button" class="tk-btn plat" id="tkClose">'+esc(L.fermer)+'</button></div>'+
 '<div class="tk-demo">'+esc(L.demo)+'</div></div>';
 var f=document.createElement('div');f.className='tk-fond';f.id='tkFond';f.innerHTML=h;document.body.appendChild(f);
 var prec=document.activeElement;
 function fermer(){if(f.parentNode)f.parentNode.removeChild(f);document.removeEventListener('keydown',kd);if(prec&&prec.focus)prec.focus()}
 function kd(e){if(e.key==='Escape')fermer()}
 document.addEventListener('keydown',kd);
 f.addEventListener('click',function(e){if(e.target===f)fermer()});
 document.getElementById('tkClose').addEventListener('click',fermer);
 document.getElementById('tkSave').addEventListener('click',function(){png(courant)});
 document.getElementById('tkMailB').addEventListener('click',function(){var m=document.getElementById('tkMail');m.classList.add('on');document.getElementById('tkMailIn').focus()});
 document.getElementById('tkMailGo').addEventListener('click',function(){var v=document.getElementById('tkMailIn').value.trim(),msg=document.getElementById('tkMsg');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){msg.textContent=L.mailKo;msg.className='tk-msg ko';return}
  msg.textContent=L.mailOk+v;msg.className='tk-msg';document.getElementById('tkMail').classList.remove('on')});
 document.getElementById('tkClose').focus();
 return num}
/* image PNG du ticket : dessin sur canvas (logo + lignes), telechargement */
function png(t){var W=720,pad=36,y=0,lh=44;var n=t.lignes.length;var H=250+n*lh+150;
 var c=document.createElement('canvas');c.width=W;c.height=H;var g=c.getContext('2d');
 g.fillStyle='#FCF9F4';g.fillRect(0,0,W,H);g.fillStyle='#FFFFFF';g.fillRect(pad-16,pad-16,W-2*(pad-16),H-2*(pad-16));
 g.strokeStyle='#0141AC';g.lineWidth=3;g.setLineDash([10,8]);g.strokeRect(pad-16,pad-16,W-2*(pad-16),H-2*(pad-16));g.setLineDash([]);
 function texte(){var yy=pad+14;g.fillStyle='#021132';g.font='900 30px system-ui,sans-serif';g.textBaseline='top';g.fillText(t.L.titre,pad+120,yy);
  g.fillStyle='#0141AC';g.font='800 20px system-ui,sans-serif';g.fillText(t.num,pad+120,yy+40);
  g.fillStyle='#DE0715';g.fillRect(pad,yy+90,W-2*pad,4);
  y=yy+112;
  t.lignes.forEach(function(l){g.fillStyle='rgba(2,17,50,.6)';g.font='700 18px system-ui,sans-serif';g.textAlign='left';g.fillText(l[0],pad,y+10);
   g.fillStyle='#021132';g.font='700 19px system-ui,sans-serif';g.textAlign='right';var v=String(l[1]);while(g.measureText(v).width>W-2*pad-220&&v.length>4)v=v.slice(0,-2);if(v!==String(l[1]))v+='…';g.fillText(v,W-pad,y+10);
   g.fillStyle='rgba(2,17,50,.1)';g.fillRect(pad,y+lh-4,W-2*pad,1);y+=lh});
  g.fillStyle='#FBD608';roundRect(g,pad,y+10,W-2*pad,56,12);g.fill();
  g.fillStyle='#021132';g.font='900 26px system-ui,sans-serif';g.textAlign='left';g.fillText(t.L.total,pad+16,y+24);g.textAlign='right';g.fillText(Math.round(t.total)+' €',W-pad-16,y+24);
  g.textAlign='center';g.fillStyle='rgba(2,17,50,.6)';g.font='600 15px system-ui,sans-serif';g.fillText(t.L.just,W/2,y+86);g.fillText(t.L.demo,W/2,y+110)}
 function roundRect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
 function sortie(){var nom=t.L.fichier+'-'+t.num+'.png';
  var fin=function(url,blob){var a=document.createElement('a');a.href=url;a.download=nom;document.body.appendChild(a);a.click();setTimeout(function(){document.body.removeChild(a);if(blob)URL.revokeObjectURL(url)},800)};
  if(c.toBlob)c.toBlob(function(b){if(b)fin(URL.createObjectURL(b),true);else fin(c.toDataURL('image/png'))},'image/png');else fin(c.toDataURL('image/png'))}
 var img=new Image();img.onload=function(){try{g.drawImage(img,pad,pad,96,96*img.height/img.width)}catch(e){}texte();sortie()};img.onerror=function(){texte();sortie()};img.src='images/logo-rts.png'}
window.RTS_TICKET={ouvrir:ouvrir,source:source,sourceLib:sourceLib,numero:numero};
})();
