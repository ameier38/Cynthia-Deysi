/*global $, google*/

$(document).ready(function() {
    var map = createMap();
    var geocoder = new google.maps.Geocoder();
    
    $("#Searchbutton").click(function() {
        var type = $("#type").val();
        var near = $("#Zipcode").val();
        var url = "https://api.foursquare.com/v2/venues/search?client_id=GJP350DH3G2PX544RXXXML0B22PC32D4XYDTN5OGIH2X0HTE&client_secret=H0MTUBOXYGXFS1OJHRRAT23MCDL5KZKGJGHXK15X1BZZR4UC&v=20130815";
        var url1 = "&near=";
        var url2 = "&query=";
        var url11 = url + url1 + near + url2 + type;
        console.log(url11)
        geocoder.geocode({
            'address': near
        }, function(locations) {
            // set the center of the map to the location of the zip code
            map.setCenter(locations[0].geometry.location)
        });
        $.getJSON(url11, function(response) {
            var Venues = response.response.venues;
            var first_venue = Venues[0]
            addMarkerToMap(map, first_venue.location.lat, first_venue.location.lng, first_venue.name);
            for (var i = 0; i < Venues.length; i++) {
                $("#Results").append(Venues[i].name + "<br>");
                $("#Results").append(Venues[i].contact.formattedPhone + "<br>");
                $("#Results").append(Venues[i].location.formattedAddress + "<br>");
                // add the markers here using the first_venue above as an example
            }

        });
    });
});

function addMarkerToMap(map, lat, lng, label) {
    console.log(`adding ${label} to map`)
    var position = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: label
    });
}

function createMap(){
    console.log('creating map...');
    
    var center = new google.maps.LatLng(40.77664120000001, -73.95214679999998);
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 10,
        
        // The latitude and longitude to center the map (always required)
        center: center,
        
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: []
    };
    
    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');
    
    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // return the map so we can add markers to it later
    return map;
}