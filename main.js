// let googleMapsAPIJSKey = "AIzaSyDt1SS2o5nSute3-7poY0PHNFr4abz9prM";

// var map;

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//     });
// }


// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -34.397, lng: 150.644},
//       zoom: 6
//     });
//     infoWindow = new google.maps.InfoWindow;

//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         console.log(pos);
//         })
//     }
// }
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


let map;
let infoWindow;
let pos = {lat: 30.265817399999996, lng: -97.7492271};
document.getElementById('search').addEventListener('click', categoryInitializationSelection)
  
function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;

    infoWindow.setPosition(pos);

    map.setCenter(pos);
    var service = new google.maps.places.PlacesService(map);
    
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
        }
    };
    
    service.nearbySearch({
        location: pos,
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
    

    






   
    
