var projet={};
$(function() {

    projet.mobile = false;
    if( navigator.userAgent.match(/Android/i) ||
         navigator.userAgent.match(/webOS/i) ||
         navigator.userAgent.match(/iPhone/i) || 
         navigator.userAgent.match(/iPod/i)
    ){ 
        projet.mobile = true;
    }﻿

    /*-------------------------------------------------------
                            MAP
    -------------------------------------------------------*/
    projet.centre={
        latlon:[46.80,-71.2],
        zoom:14,
    };
    
    projet.map = L.map('map',{
    });

    projet.map.setView(projet.centre.latlon,projet.centre.zoom);

    /*-------------------------------------------------------
                            LAYER
    -------------------------------------------------------*/
    L.tileLayer('http://cartalib.mapgears.com/mapcache/tms/1.0.0/mgmap@g3857/{z}/{x}/{y}.png', {
        maxZoom: 18,
        tms: true,
        dragging: false,
        zoomAnimation:true
    }).addTo(projet.map);


  /*-------------------------------------------------------
                    Parcours
    -------------------------------------------------------*/
    projet.layers={};
    projet.layers.parcours = {
        defaultStyle: {
            "color": "#E28426",
            "weight": 6,
            "opacity": 0.8
        },

        highlightStyle: {
            "color": "#6ACE18",
            "weight": 6,
            "opacity": 0.5,
        },

        onEachFeature: function(feature, layer) {
            layer.on('click', function(e) { 
                content = '<h3>'+feature.properties.NOM+'</h3>';
                content = content + feature.properties.distance+ ' mètres</p>'; 
                projet.layers.parcours.superdefi.setStyle(projet.layers.parcours.defaultStyle);   
                projet.layers.parcours.defi.setStyle(projet.layers.parcours.defaultStyle);   
                layer.setStyle(projet.layers.parcours.highlightStyle);
                var popup = L.popup({maxWidth:450})
                    .setLatLng(e.latlng)
                    .setContent(content)
                    .openOn(projet.map);
            });
        }
    };

    projet.layers.parcours.defi = L.geoJson(parcoursLine.features, {
        filter: function (feature, layer) {
            return feature.properties.defi;
        },
        style: projet.layers.parcours.defaultStyle,
        onEachFeature: projet.layers.parcours.onEachFeature
    });

    projet.layers.parcours.superdefi = L.geoJson(parcoursLine.features, {
        filter: function (feature, layer) {
            return feature.properties.superDefi;
        },
        style: projet.layers.parcours.defaultStyle,
        onEachFeature: projet.layers.parcours.onEachFeature
    }).addTo(projet.map);

  /*-------------------------------------------------------
                    Parcours Point
    -------------------------------------------------------*/
    projet.layers.escaliers = {
        defaultStyle: {
            "radius": 6,
            "fillColor": "#2EB9C9",
            "color": "#000",
            "weight": 1,
            "opacity": 1,
            "fillOpacity": 1
        },

        highlightStyle: {
            "color": "#6ACE18",
            "weight": 6,
            "opacity": 0.5,
            //"dashArray": "5, 15"
        },

        onEachFeature: function(feature, layer) {
            layer.on('click', function(e) { 
                content = '<h3>'+feature.properties.NOM+'</h3>';
                if (feature.properties.MARCHES != null){
                    content = content + '<p>'+feature.properties.TYPE+ '<br />';
                    content = content + feature.properties.MARCHES+ ' marches</p>';
                };          
                var popup = L.popup({maxWidth:450})
                    .setLatLng(e.target._latlng)
                    .setContent(content)
                    .openOn(projet.map);
            });
        }
    };

    projet.layers.escaliers.superdefi = L.geoJson(parcoursPoint.features, {
        filter: function (feature, layer) {
            return feature.properties.superDefi;
        },
        pointToLayer: function (feature, latlng) {
            if(feature.properties.TYPE == 'descente') {
                var myIcon = L.icon({ 
                    iconUrl: "./img/down.png",
                    iconSize: [20, 20]
                });
                return L.marker(latlng, {icon: myIcon})    
            } else if(feature.properties.TYPE == 'montée') {
                var myIcon = L.icon({ 
                    iconUrl: "./img/up.png",
                    iconSize: [20, 20]
                });
                return L.marker(latlng, {icon: myIcon})   
            } else if(feature.properties.TYPE == 'départ') { 
                 var style= {
                    "radius": 6,
                    "fillColor": "#22ff22",
                    "color": "#000",
                    "weight": 1,
                    "opacity": 1,
                    "fillOpacity": 1
                };
                return L.circleMarker(latlng, style);
            } else if(feature.properties.TYPE == 'arrivée') { 
                 var style= {
                    "radius": 6,
                    "fillColor": "#ff2222",
                    "color": "#000",
                    "weight": 1,
                    "opacity": 1,
                    "fillOpacity": 1
                };
                return L.circleMarker(latlng, style);
            } else {
                return L.circleMarker(latlng, projet.layers.escaliers.defaultStyle);
            
            }
        },
        onEachFeature: projet.layers.escaliers.onEachFeature,
    }).addTo(projet.map);

    projet.layers.escaliers.defi = L.geoJson(parcoursPoint.features, {
        filter: function (feature, layer) {
            return feature.properties.defi;
        },
        pointToLayer: function (feature, latlng) {
                if(feature.properties.TYPE == 'descente') {
                    var myIcon = L.icon({ 
                        iconUrl: "./img/down.png",
                        iconSize: [20, 20]
                    });
                    return L.marker(latlng, {icon: myIcon})    
                } else if(feature.properties.TYPE == 'montée') {
                    var myIcon = L.icon({ 
                        iconUrl: "./img/up.png",
                        iconSize: [20, 20]
                    });
                    return L.marker(latlng, {icon: myIcon})    
                                } else if(feature.properties.TYPE == 'départ') { 
                 var style= {
                    "radius": 6,
                    "fillColor": "#22ff22",
                    "color": "#000",
                    "weight": 1,
                    "opacity": 1,
                    "fillOpacity": 1
                };
                return L.circleMarker(latlng, style);
            } else if(feature.properties.TYPE == 'arrivée') { 
                 var style= {
                    "radius": 6,
                    "fillColor": "#ff2222",
                    "color": "#000",
                    "weight": 1,
                    "opacity": 1,
                    "fillOpacity": 1
                };
                return L.circleMarker(latlng, style);
                } else {
                    return L.circleMarker(latlng, projet.layers.escaliers.defaultStyle);
                
                }
        },
        onEachFeature: projet.layers.escaliers.onEachFeature,
    });
      /*-------------------------------------------------------
                    Liste des Parcours
    -------------------------------------------------------*/
    $( "#parcours" ).accordion({collapsible: false, active:false, heightStyle: "content"});

    $( "#parcours" ).on( "accordionactivate", function( event, ui ) {
        var idParcours = $( "#parcours" ).accordion( "option", "active" );
        if(idParcours == 0) {
            projet.map.removeLayer(projet.layers.parcours.defi);
            projet.map.addLayer(projet.layers.parcours.superdefi);
            projet.map.removeLayer(projet.layers.escaliers.defi);
            projet.map.addLayer(projet.layers.escaliers.superdefi);
            if(projet.locate == true) {
                projet.layers.location.snapediting._guides = [];
                projet.layers.location.snapediting.addGuideLayer(projet.layers.parcours.superdefi);
            };
        } else {
            projet.map.removeLayer(projet.layers.parcours.superdefi);
            projet.map.addLayer(projet.layers.parcours.defi);
            projet.map.removeLayer(projet.layers.escaliers.superdefi);
            projet.map.addLayer(projet.layers.escaliers.defi);
            if(projet.locate == true) {
                projet.layers.location.snapediting._guides = [];
                projet.layers.location.snapediting.addGuideLayer(projet.layers.parcours.defi);
            };
        };
    });


    /*-------------------------------------------------------
                   Locate
    -------------------------------------------------------*/
    projet.mobile = true;
    if(projet.mobile == true) {
        $("#bouton").append("<div id=\"locate\"><img src=\"img/locate_red.png\"></div>");

        projet.layers.location = {};
        $( "#locate" ).click(function(e) {
            if (projet.locate != true) {
                $("#locate img").attr("src", "img/locate_green.png");
                projet.map.locate({setView : true});
                projet.locate = true;
            } else {
                $("#locate img").attr("src", "img/locate_red.png");
                if (projet.layers.location.radius) {
                    projet.map.removeLayer(projet.layers.location.radius);
                };
                if (projet.layers.location.marker) {
                    projet.map.removeLayer(projet.layers.location.marker);
                };
                projet.layers.location = {};
                projet.locate = false;
            }
        });  

        function onLocationFound(e) {
            if (!projet.layers.location.marker) {
                projet.layers.location.marker = L.marker(new L.LatLng(projet.centre.latlon[0], projet.centre.latlon[1])).addTo(projet.map);
                projet.layers.location.snapediting = new L.Handler.MarkerSnap(projet.map, projet.layers.location.marker);
                var idParcours = $( "#parcours" ).accordion( "option", "active" );
                if (idParcours == 0) {
                    projet.layers.location.snapediting.addGuideLayer(projet.layers.parcours.superdefi);
                } else {
                    projet.layers.location.snapediting.addGuideLayer(projet.layers.parcours.defi);
                };
            };
            var radius = e.accuracy / 2;
            projet.layers.location.marker.unbindPopup();
            projet.layers.location.marker.setLatLng(e.latlng).bindPopup("Vous êtes à l'intérieur de " + radius + " mètres de ce point");//.openPopup();

            if (projet.layers.location.radius) {
                projet.map.removeLayer(projet.layers.location.radius);
            };

            var scale = 221872016/Math.pow(2,(projet.map._zoom-1));
            var tolerance = Math.ceil(50/((0.0254*scale)/72));
            if (tolerance < 5) {
                tolerance = 5;
            };
            projet.layers.location.snapediting.snapMarker(projet.layers.location.marker, tolerance);

            if (projet.layers.location.snapediting._markers[0].snap){
                projet.layers.location.radius = null;
            } else {
                projet.layers.location.radius = L.circle(e.latlng, radius).addTo(projet.map);
            };

            setTimeout(function() 
                {
                    if (projet.locate == true) {
                        projet.map.locate({setView : true});
                    };
                }, 15000);
        }

        projet.map.on('locationfound', onLocationFound);

        function onLocationError(e) {
            $("#locate img").attr("src", "img/locate_red.png");
            projet.locate = false;
        }

        projet.map.on('locationerror', onLocationError);
    };


    $( "#dialog" ).dialog({ width: 500, title: "Défi des escaliers"});


});


