let pos = {lat: -34.397, lng: 150.644};
let map;
let infoWindow;

let placeCategorySelection = document.getElementById('placeCateogrySelection');
let categorySelection = 'restaurants';
function categoryInitializationSelection(event) {
    console.log(placeCategorySelection.value);
    categorySelection = placeCategorySelection.value;
    initMap();
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Fetching current position");
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);
        })
    };

mapDisplayPosition = pos



document.getElementById('search').addEventListener('click', categoryInitializationSelection)
  

function setMap () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Fetching current position");
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15
            });
            console.log(pos);
        })
    };

}



function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: map.getCenter(),
        zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;

    google.maps.event.addListener(map, "bounds_changed", function() {
        // send the new bounds back to your server
        console.log("map bounds{"+map.getCenter());
        newCenter = ("map bounds{"+map.getCenter());
     });

    infoWindow.setPosition(map.getCenter);

    map.setCenter(map.getCenter);
    var service = new google.maps.places.PlacesService(map);
    
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
        }
    };
    
    service.nearbySearch({
        location: map.getCenter(),
        radius: 500,
        type: [categorySelection]
        }, callback);
    
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
        });

     
        let markerContent = '';


    google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(markerContent);
    // infoWindow.setContent(place.icon);
    infoWindow.open(map, this);
    });

    if (place.rating) {
        markerContent = '<div id="marker-content">'+'<h3>'+place.name+'</h3>'+'<h4> Rating: '+ place.rating +'</h4>'+
'</div>';
    }
    else {
        markerContent = '<div id="marker-content">'+'<h3>'+place.name+'</h3>'+'<h4> Rating: unavailable '+ '</h4>'+
'</div>';
    }
    }
}
console.log('Get Current Position');
    

    






   
    
