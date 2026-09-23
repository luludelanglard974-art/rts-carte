/* ---- RTS vitrine : boutons flottants, pop-ups accessibles (bagages, course immediate, accueil).
   Aucune dependance externe. Confirmation factice, aucun paiement. ---- */
(function(){
var IC={"luggage": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2\" /><path d=\"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14\" /><path d=\"M10 20h4\" /><circle cx=\"16\" cy=\"20\" r=\"2\" /><circle cx=\"8\" cy=\"20\" r=\"2\" /></svg>", "zap": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\" /></svg>", "x": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" /></svg>", "phone": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\" /></svg>", "check": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m16 9-5.5 5.5L8 12\" /></svg>", "lock": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"16\" r=\"1\" /><rect x=\"3\" y=\"10\" width=\"18\" height=\"12\" rx=\"2\" /><path d=\"M7 10V7a5 5 0 0 1 10 0v3\" /></svg>", "truck": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /><path d=\"M15 18H9\" /><path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /><circle cx=\"17\" cy=\"18\" r=\"2\" /><circle cx=\"7\" cy=\"18\" r=\"2\" /></svg>", "plane": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\" /></svg>", "arrow": "<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" /></svg>"};
var TXT={fr:{
 fbBag:'Bagages',fbImm:'Course immédiate',fermer:'Fermer',
 accT:'On vous récupère à l\'aéroport, vos bagages suivent.',accS:'Un réseau de chauffeurs réunionnais, une centrale de réservation T3P déclarée.',accBag:'Mes bagages',accImm:'Un chauffeur maintenant',
 bagT:'Vos bagages, sans vous',bagS:'Vous marchez, nous transportons. Trois façons de voyager léger :',
 bag1:'Gardiennage au box sécurisé du Port',bag1i:'Vos bagages à l\'abri pendant tout le séjour.',bag1p:'30 €',bag1s:'forfait groupe',
 bag2:'Livraison des bagages aux points de change',bag2i:'Dos d\'Âne 84 € · Cilaos 105 € · Bourg-Murat 126 €',bag2p:'dès 84 €',bag2s:'par livraison',
 bag3:'Transfert aéroport + bagages',bag3i:'Un chauffeur vous attend, vos sacs voyagent avec vous.',bag3p:'Tarif direct',bag3s:'selon trajet',
 bagR:'Réserver',bagN:'Tarifs TTC indicatifs, berline 1 à 4 passagers. Maquette de démonstration, aucun paiement.',
 immT:'Un chauffeur, maintenant',immS:'Dites-nous où vous êtes : un chauffeur du réseau vous rappelle.',
 immLieu:'Lieu de prise en charge',immLieuP:'Aéroport, hôtel, port, adresse…',immDest:'Destination',immDestP:'Où allez-vous ?',immPax:'Passagers',immTel:'Téléphone',immTelP:'0692 …',
 immB:'Demander un chauffeur maintenant',immOk:'Demande reçue. Un chauffeur du réseau vous rappelle rapidement.',immDemo:'Maquette de démonstration, aucune réservation réelle, aucun paiement.',
 immTel2:'Ou appelez directement : 0693 91 12 67',immErr:'Merci d\'indiquer un lieu de prise en charge et un téléphone.'
}};
var lang='fr';
function t(k){var d=TXT[lang]||TXT.fr;return d[k]!==undefined?d[k]:(TXT.fr[k]||k)}
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
var mem={get:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
/* ---- modales accessibles : focus piege, aria-modal, Echap, clic exterieur ---- */
var ouverte=null,focusAvant=null;
function focusables(b){return [].slice.call(b.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex]:not([tabindex="-1"])')).filter(function(e){return e.offsetParent!==null})}
function ouvrir(id){var m=document.getElementById(id);if(!m)return;if(ouverte&&ouverte!==m)ouverte.hidden=true;
 focusAvant=document.activeElement;m.hidden=false;ouverte=m;document.body.style.overflow='hidden';
 var f=focusables(m.querySelector('.rts-boite'));(f[0]||m.querySelector('.rts-boite')).focus()}
function fermer(){if(!ouverte)return;ouverte.hidden=true;ouverte=null;document.body.style.overflow='';if(focusAvant&&focusAvant.focus)focusAvant.focus()}
document.addEventListener('keydown',function(e){if(!ouverte)return;
 if(e.key==='Escape'){e.preventDefault();fermer();return}
 if(e.key==='Tab'){var f=focusables(ouverte.querySelector('.rts-boite'));if(!f.length)return;var i=f.indexOf(document.activeElement);
  if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(i===f.length-1||i<0)){e.preventDefault();f[0].focus()}}});
function modale(id,titre,corps){var m=el('<div class="rts-modal" id="'+id+'" hidden role="dialog" aria-modal="true" aria-labelledby="'+id+'T"><div class="rts-boite" tabindex="-1"><button type="button" class="rts-x" aria-label="'+t('fermer')+'">'+IC.x+'</button><h2 id="'+id+'T">'+titre+'</h2>'+corps+'</div></div>');
 m.addEventListener('click',function(e){if(e.target===m)fermer()});m.querySelector('.rts-x').addEventListener('click',fermer);document.body.appendChild(m);return m}
/* ---- construction ---- */
function construire(){
 var page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 var src=(location.search.match(/[?&]source=([^&]+)/)||[])[1];var q=src?'&source='+encodeURIComponent(src):'';
 /* boutons flottants */
 document.body.classList.add('rts-flottants');
 var flot=el('<div class="rts-flot"><button type="button" class="rts-glossy rts-fb bag jaune" id="rtsFbBag">'+IC.luggage+'<span>'+t('fbBag')+'</span></button><button type="button" class="rts-glossy rts-fb imm rouge" id="rtsFbImm">'+IC.zap+'<span>'+t('fbImm')+'</span></button></div>');
 document.body.appendChild(flot);
 flot.querySelector('#rtsFbBag').addEventListener('click',function(){ouvrir('rtsBag')});
 flot.querySelector('#rtsFbImm').addEventListener('click',function(){ouvrir('rtsImm')});
 /* pop-up bagages */
 modale('rtsBag',t('bagT'),'<p class="rts-sous">'+t('bagS')+'</p><div class="rts-cartes">'+
  '<a class="rts-carte" href="reservation.html?box=1'+q+'">'+IC.lock+'<span><b>'+t('bag1')+'</b><i>'+t('bag1i')+'</i></span><span class="rts-px">'+t('bag1p')+'<small>'+t('bag1s')+'</small></span></a>'+
  '<a class="rts-carte" href="trek.html'+(q?'?'+q.slice(1):'')+'">'+IC.truck+'<span><b>'+t('bag2')+'</b><i>'+t('bag2i')+'</i></span><span class="rts-px">'+t('bag2p')+'<small>'+t('bag2s')+'</small></span></a>'+
  '<a class="rts-carte" href="reservation.html?bag=1'+q+'">'+IC.plane+'<span><b>'+t('bag3')+'</b><i>'+t('bag3i')+'</i></span><span class="rts-px">'+t('bag3p')+'<small>'+t('bag3s')+'</small></span></a></div>'+
  '<div class="rts-fin"><a class="rts-glossy jaune" href="reservation.html?bag=1'+q+'">'+IC.arrow+' '+t('bagR')+'</a></div><p class="rts-note">'+t('bagN')+'</p>');
 /* pop-up course immediate */
 var imm=modale('rtsImm',t('immT'),'<p class="rts-sous">'+t('immS')+'</p><form id="rtsImmF" novalidate>'+
  '<label for="rtsLieu">'+t('immLieu')+'</label><input id="rtsLieu" placeholder="'+t('immLieuP')+'" autocomplete="off">'+
  '<label for="rtsDest">'+t('immDest')+'</label><input id="rtsDest" placeholder="'+t('immDestP')+'" autocomplete="off">'+
  '<div class="rts-deux"><div><label for="rtsPax">'+t('immPax')+'</label><select id="rtsPax"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select></div>'+
  '<div><label for="rtsTel">'+t('immTel')+'</label><input id="rtsTel" type="tel" placeholder="'+t('immTelP')+'" autocomplete="tel"></div></div>'+
  '<p class="rts-note" id="rtsImmErr" hidden></p>'+
  '<div class="rts-fin"><button type="submit" class="rts-glossy rouge">'+IC.zap+' '+t('immB')+'</button></div></form>'+
  '<div class="rts-ok" id="rtsImmOk" hidden>'+IC.check+'<p><b>'+t('immOk')+'</b></p><p class="rts-demo">'+t('immDemo')+'</p></div>'+
  '<a class="rts-tel" href="tel:+262693911267">'+IC.phone+' '+t('immTel2')+'</a>');
 imm.querySelector('#rtsImmF').addEventListener('submit',function(e){e.preventDefault();var lieu=imm.querySelector('#rtsLieu').value.trim(),tel=imm.querySelector('#rtsTel').value.trim(),err=imm.querySelector('#rtsImmErr');
  if(!lieu||!tel){err.textContent=t('immErr');err.hidden=false;return}
  err.hidden=true;this.hidden=true;imm.querySelector('#rtsImmOk').hidden=false;imm.querySelector('.rts-x').focus()});
 /* pop-up d'accueil : index seulement, 3 s apres le chargement, une fois par session */
 if(document.body.hasAttribute('data-accueil')){
  var acc=modale('rtsAcc',t('accT'),'<p class="rts-sous">'+t('accS')+'</p><div class="rts-gros">'+
   '<button type="button" class="rts-glossy jaune" id="rtsAccBag">'+IC.luggage+' '+t('accBag')+'</button>'+
   '<button type="button" class="rts-glossy rouge" id="rtsAccImm">'+IC.zap+' '+t('accImm')+'</button></div>');
  acc.querySelector('#rtsAccBag').addEventListener('click',function(){ouvrir('rtsBag')});
  acc.querySelector('#rtsAccImm').addEventListener('click',function(){ouvrir('rtsImm')});
  if(!mem.get('rts_accueil_vu')){setTimeout(function(){if(!ouverte){mem.set('rts_accueil_vu','1');ouvrir('rtsAcc')}},3000)}
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',construire);else construire();
window.RTS={ouvrir:ouvrir,fermer:fermer,t:t};
})();
