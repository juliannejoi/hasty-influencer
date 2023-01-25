//  document.addEventListener("ready", function(){
//     document.querySelector('input#txtLocation').characterCounter();
// });
// hi;
let map;

function initMap() {
  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "restaurant" },
      { type: "tourist_attraction" },
    ],
    maxPlaceCount: 12,
  });

  map = localContextMapView.map;
  map.setOptions({
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 12,
  });
}

window.initMap = initMap;