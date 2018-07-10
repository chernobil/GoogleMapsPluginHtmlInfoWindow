/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    map : null, 
    createMap :function () {

        var mapOptions = {
            styles: [
                {
                    elementType: "geometry",
                    featureType: "administrative.province",
                    stylers: [
                        { saturation: 75 }
                    ]
                },
                {
                    elementType: "geometry",
                    featureType: "administrative.country",
                    stylers: [
                        { invert_lightness: true }
                    ]
                }],
            mapType: plugin.google.maps.MapTypeId.ROADMAP,
            controls: {
                compass: true,
                indoorPicker: true,
                myLocationButton: true,
                myLocation: true,   // (blue dot)
                //zoom: true,          // android only
                mapToolbar: true     // android only
            },
            camera: {
                target: {
                    lat: 0,
                    lng: 24
                },
                zoom: 5
            }
        }
        var mapDiv = document.getElementById("map_canvas");
        map = plugin.google.maps.Map.getMap(mapDiv, mapOptions);

        map.one(plugin.google.maps.event.MAP_READY,  app.createInfoWindow);


    },
    createInfoWindow:function (){

        var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();
        
        var html = document.createElement ("div", {width : "280px"});
        html.innerHTML = "here goes text";


        var linkToclick  = document.createElement('a');
        linkToclick.title = "tova e linka";
        linkToclick.onclick = function () {console.log('clicking') } ;
        html.appendChild(linkToclick);        
          

        var button = document.createElement("button");
        button.innerText = "clickME";
        button.addEventListener("click", function() {
          console.log('button click');
          alert(1);
        });
        html.appendChild(button); 

        htmlInfoWindow.setContent(html);

           var marker1 = map.addMarker({
            position: { lat: 0,
                    lng: 24}
          }, function (marker ){
            marker.on(plugin.google.maps.event.MARKER_CLICK, function() {
                htmlInfoWindow.open(marker);
              });
          });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
        app.createMap()
       

        
       
    }
};

app.initialize();