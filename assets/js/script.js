//  document.addEventListener("ready", function(){
//     document.querySelector('input#txtLocation').characterCounter();
// });
// hi;

var form = document.querySelector('#cssform');
// form entery city name
var selector = document.querySelector('#txtLocation')
var x = 40.7128;
var y = -74.0060;
let map;
console.log(typeof x);
console.log(x);
// btn
var userSearch = document.querySelector('#txtLocation').value;
var btn = document.querySelector('#BTNmatt');
btn.addEventListener('click', function (e) {
  e.preventDefault()
  var userSearch = document.querySelector('#txtLocation').value;
  console.log(userSearch);
  getLogLat(userSearch)

})
// press enter key instead of using button
selector.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    var userSearch = document.querySelector('#txtLocation').value;
    console.log(userSearch);
    getLogLat(userSearch)
  }
})
var getLogLat = function (location) {
  var cordapi = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&lon&limit=1&appid=9caf1333480d692c12783172b60d65b1"
  fetch(cordapi).then(function (response) {
    if (response.ok) {
      console.log(response);
      console.log('hi'
      );
      response.json().then(function (data) {
        console.log(data);
        a = data
        b = data
        console.log(a[0].lat)
        console.log(b[0].lon)
        x = a[0].lat
        y = b[0].lon
        console.log(typeof x);

        initMap()
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
  console.log(userSearch)
}



function initMap() {
  console.log(x);
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
    center: { lat: x, lng: y },
    zoom: 12,
  });
}
console.log(x);

    // 