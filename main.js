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


let map;
let infoWindow;
let pos = {lat: -34.397, lng: 150.644};
document.getElementById('search').addEventListener('click', categoryInitializationSelection)
  
function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Fetching current position");
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);
            infoWindow.setPosition(pos);
            //tag for you are here
            //infoWindow.open(map);
            map.setCenter(pos);
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: 500,
                type: [categorySelection]
              }, callback);
            
          
            function callback(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  createMarker(results[i]);
                }
              }
            }
          
            function createMarker(place) {
              var placeLoc = place.geometry.location;
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
          
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
              });
            }
        })
        console.log('Get Current Position');
    }
}
    






   
    
