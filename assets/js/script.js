//  document.addEventListener("ready", function(){
//     document.querySelector('input#txtLocation').characterCounter();
// });
// hi;
var btnSaveLoc = document.querySelector('#btnSaveLoc')

var btnSaved = document.querySelector("#btnCSS")
var form = document.querySelector('#cssform');
var savedList = [];
var savedLoc = [];
var x = 40.7128;
var y = -74.0060;
let map;
console.log(typeof x);
console.log(x);
// btn
var userSearch = document.querySelector('#txtLocation')//.value;
var selector = document.querySelector('#txtLocation')
btnSaved.addEventListener('click', function () {
  // alert('hi')
  var savedString = "./saved.html"
  location.assign(savedString)
})




//btn for search location
var btn = document.querySelector('#BTNmatt');
btn.addEventListener('click', function (e) {
  btnSaveLoc.disabled = false;
  e.preventDefault()
  var userSearch = document.querySelector('#txtLocation').value;
  if (userSearch) {

    storeGoogle(userSearch)
    getLogLat(userSearch)
  }

})
selector.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    btnSaveLoc.disabled = false;
     userSearch = document.querySelector('#txtLocation').value;
    console.log(userSearch);
    // storeGoogle(userSearch)
    if (userSearch) {

      storeGoogle(userSearch)
      getLogLat(userSearch)
    }
    
    
  }
})



function storeGoogle(userSearch) {
  savedList.push(userSearch)
  console.log(userSearch);
  console.log(savedList);
  localStorage.setItem('location', JSON.stringify(savedList))
}
//function for log n lat
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
// google map api
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
function init() {
 var storedLocations = JSON.parse(localStorage.getItem('Savedlocation'))
 if(storedLocations){
  savedLoc = storedLocations
 }
  // if (savedLoc !== null) {
  //   savedList = savedLoc;
  // }

  console.log(savedLoc);

}

// 
btnSaveLoc.addEventListener('click', function () {
  btnSaveLoc.disabled = true;
  if (savedList.length >= 1) {
    console.log(savedList);
    var savedWord = savedList.pop();
    console.log(savedList, savedLoc, 'saved list here')
  }
  if (savedLoc.includes(savedWord)) {
    console.log('word is here');
    btnSaveLoc.textContent = "location is saved already";
    return
  } else if (savedWord == "") {
    console.log('no word here ');
    return
  } else {
    // savedLoc.push(savedWord);
    console.log(savedWord);
    console.log(savedWord);
    console.log(savedLoc);
    savedLoc.push(savedWord);
    console.log(savedLoc);
    localStorage.setItem('Savedlocation', JSON.stringify(savedLoc))
    btnSaveLoc.disabled = true;
  }



})
    init()
 