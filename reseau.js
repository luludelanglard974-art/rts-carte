/* Carte du reseau : meme photo aerienne IGN que carte.html (Geoplateforme), repli OpenTopoMap si l'IGN est bloque.
   Carte figee : aucun zoom, aucun deplacement, aucun bouton. Deux series de pastilles toujours affichees. */
(function(){if(typeof L==='undefined')return;var el=document.getElementById('reseauMap');if(!el)return;
var m=L.map(el,{zoomControl:false,dragging:false,scrollWheelZoom:false,doubleClickZoom:false,touchZoom:false,boxZoom:false,keyboard:false,tap:false,zoomSnap:0.1,attributionControl:true});
var IGN='&copy; <a href="https://www.ign.fr/" target="_blank" rel="noopener">IGN</a> Géoplateforme',OSMA='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
/* photo aerienne IGN : exactement la couche et les parametres de carte.html */
var B='https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';
var plan=L.tileLayer(B+'&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&FORMAT=image/jpeg',{attribution:IGN+' &middot; '+OSMA,maxNativeZoom:17});
var topo=L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png',{attribution:OSMA+' &middot; OpenTopoMap',maxNativeZoom:16});
var ok=0,ko=0,basc=false;plan.on('tileload',function(){ok++});plan.on('tileerror',function(){ko++;if(!basc&&ko>4&&ok===0){basc=true;m.removeLayer(plan);topo.addTo(m)}});plan.addTo(m);
var S1=[["Saint-Denis",-20.8789,55.4481],["Sainte-Suzanne",-20.9057,55.6058],["Saint-André",-20.9625,55.6503],["La Plaine-des-Palmistes",-21.1333,55.6333],["Saint-Paul",-21.0096,55.2707],["Trois-Bassins",-21.1053,55.2925],["Saint-Leu",-21.1706,55.2861],["Saint-Louis",-21.2861,55.4119],["Saint-Pierre",-21.3393,55.4781],["Le Tampon",-21.2783,55.5153],["Petite-Île",-21.3556,55.5678],["Le Port",-20.9394,55.2925]];
var S2=[["Sainte-Marie",-20.8969,55.5497],["Aéroport Roland Garros",-20.8907,55.5164],["Sainte-Clotilde",-20.8917,55.4661],["La Montagne",-20.9053,55.4211],["Bois-de-Nèfles Saint-Denis",-20.9128,55.4525],["Le Brûlé",-20.9394,55.4361],["Dos d'Âne",-20.9744,55.3486],["La Possession",-20.9247,55.335],["Bras-Panon",-21.0,55.6789],["Saint-Benoît",-21.0339,55.7136],["Bras-Fusil",-21.045,55.7],["Sainte-Anne",-21.0783,55.7458],["Sainte-Rose",-21.1281,55.7925],["Champ Borne",-20.9481,55.665],["Salazie",-21.0286,55.5386],["Plateau Caillou",-21.01,55.29],["Le Guillaume",-21.0089,55.34],["Saint-Gilles-les-Bains",-21.05,55.2225],["La Saline",-21.0783,55.2358],["Piton Saint-Leu",-21.2072,55.31],["Les Avirons",-21.2408,55.3392],["L'Étang-Salé",-21.265,55.3625],["Étang-Salé les Bains",-21.2811,55.3606],["Cilaos",-21.1339,55.4714],["Entre-Deux",-21.245,55.4692],["Les Makes",-21.2019,55.4058],["La Rivière",-21.2853,55.3986],["Bois de Nèfles Saint-Louis",-21.2478,55.4147],["Ravine des Cabris",-21.3183,55.4589],["Terre Sainte",-21.345,55.4869],["Trois Mares",-21.29,55.4986],["Bourg-Murat",-21.2114,55.5758],["La Plaine-des-Cafres",-21.2231,55.5628],["Grand Bois",-21.3444,55.5361],["Manapany",-21.3742,55.5911],["Saint-Joseph",-21.3789,55.6194],["Vincendo",-21.3739,55.6789]];
var g=L.layerGroup().addTo(m);
S2.forEach(function(p){L.circleMarker([p[1],p[2]],{radius:5,color:'#0141AC',weight:2,fillColor:'#FFFFFF',fillOpacity:1}).bindTooltip(p[0]).addTo(g)});
S1.forEach(function(p){L.circleMarker([p[1],p[2]],{radius:7,color:'#FFFFFF',weight:1.5,fillColor:'#0141AC',fillOpacity:1}).bindTooltip(p[0]).addTo(g)});
/* bornes : l'ile (lat -21.39 a -20.87, lon 55.21 a 55.84) plus environ 10 % de mer de chaque cote */
var BB=L.latLngBounds([[-21.44,55.15],[-20.82,55.90]]);function cadre(){m.invalidateSize();m.fitBounds(BB,{padding:[0,0],animate:false})}
cadre();setTimeout(cadre,400);window.addEventListener('resize',cadre);
})();
