var txtAlert = document.querySelector('#innercontaineer');
var btnSaveLoc = document.querySelector('#btnSaveLoc');
var btnSaved = document.querySelector("#btnCSS");
var form = document.querySelector('#cssform');
var savedList = [];
var savedLoc = [];
var x = 40.7128;
var y = -74.0060;
let map;
// btn
var btnALERT = document.querySelector('.btnAlert');
var userSearch = document.querySelector('#txtLocation');
var selector = document.querySelector('#txtLocation');
txtAlert.style.display = "none";
btnSaveLoc.disabled = true;
var dayOne = document.querySelector("#dayOne");
var dayTwo = document.querySelector("#dayTwo");
var dayThree = document.querySelector("#dayThree");
var dayFour = document.querySelector("#dayFour");
var dayFive = document.querySelector("#dayFive");

var nightOne = document.querySelector("#nightOne");
var nightTwo = document.querySelector("#nightTwo");
var nightThree = document.querySelector("#nightThree");
var nightFour = document.querySelector("#nightFour");
var nightFive = document.querySelector("#nightFive");


btnSaved.addEventListener('click', function () {

  var savedString = "./saved.html";
  location.assign(savedString);

});
selector.addEventListener("keypress", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();

    userSearch = document.querySelector('#txtLocation').value;

    if (userSearch) {
      storeGoogle(userSearch);
      getLogLat(userSearch);
    }
  }
});


function storeGoogle(userSearch) {

  savedList.push(userSearch);
  console.log(userSearch);
  console.log(savedList);
  localStorage.setItem('location', JSON.stringify(savedList));

}
//function for log n lat
var getLogLat = function (location) {

  var cordapi = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&lon&limit=1&appid=9caf1333480d692c12783172b60d65b1";

  fetch(cordapi).then(function (response) {
    if (response.ok) {
      btnSaveLoc.disabled = false;
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        var lat = data;
        var long = data;
        console.log(lat[0].lat);
        console.log(long[0].lon);
        x = lat[0].lat;
        y = long[0].lon;
        console.log(typeof x);
        getWeatherData();
        initMap();
      });
    } else {
      // alert('Error: ' + response.statusText);
      var time = setInterval(function () {
        timercount--;
        console.log('word is here');
        txtAlert.style.display = "block";

        txtAlert.innerHTML = '<img class ="alertimg" src="https://media.tenor.com/DCI2uoqFUvEAAAAd/the-office-the.gifd" alt="">  ERROR: ' + response.statusText + timercount;
        if (timercount == 0) {
          txtAlert.style.display = "none";
          clearInterval(time)

        }
      }, 900)
    }
  })
    .catch(function (error) {
      //('Unable to connect to GitHub');
      var time = setInterval(function () {
        timercount--;
        txtAlert.style.display = "block";

        txtAlert.innerHTML = '<img class ="alertimg" src="https://media.tenor.com/DCI2uoqFUvEAAAAd/the-office-the.gifd" alt="">  UNABLE TO CONNECT TO GITHUB ';
        if (timercount == 0) {
          txtAlert.style.display = "none";
          clearInterval(time)

        }
      }, 900)
    });
  console.log(userSearch)
}

var getWeatherData = function () {
  var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + x + "&lon=" + y + "&cnt=5&appid=9caf1333480d692c12783172b60d65b1";
  console.log(weatherApi);

  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        console.log("hi");
        response.json().then(function (data) {
          console.log(data.list[0]);

          dayOne.textContent = "Temp - " + data.list[0].main.temp;
          dayTwo.textContent = "Temp - " + data.list[1].main.temp;
          dayThree.textContent = "Temp - " + data.list[2].main.temp;
          dayFour.textContent = "Temp - " + data.list[3].main.temp;
          dayFive.textContent = "Temp - " + data.list[4].main.temp;
          console.log(dayOne)
          console.log(dayTwo);
          console.log(dayThree);
          console.log(dayFour);
          console.log(dayFive);

          nightOne.textContent = "Feels Like - " + data.list[0].main.feels_like;
          nightTwo.textContent = "Feels Like - " + data.list[1].main.feels_like;
          nightThree.textContent = "Feels Like - " + data.list[2].main.feels_like;
          nightFour.textContent = "Feels Like - " + data.list[3].main.feels_like;
          nightFive.textContent = "Feels Like - " + data.list[4].main.feels_like;
          console.log(nightOne);
          console.log(nightTwo);
          console.log(nightThree);
          console.log(nightFour);
          console.log(nightFive)

          showWeatherData(data);
          initMap();
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
  console.log(userSearch);
};

// google map api
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
    center: { lat: x, lng: y },
    zoom: 12,
  });
}

function init() {

  var storedLocations = JSON.parse(localStorage.getItem('Savedlocation'))
  if (storedLocations) {
    savedLoc = storedLocations;
  }

}

// 
btnSaveLoc.addEventListener('click', function () {

  btnSaveLoc.disabled = true;
  if (savedList.length >= 1) {
    console.log(savedList);
    var savedWord = savedList.pop();
    console.log(savedList, savedLoc, 'saved list here');
  }
  if (savedLoc.includes(savedWord)) {

    var timercount = 11;
    var time = setInterval(function () {
      timercount--;
      console.log('word is here');
      txtAlert.style.display = "block";

      txtAlert.innerHTML = '<img class ="alertimg" src="https://media.tenor.com/DCI2uoqFUvEAAAAd/the-office-the.gifd" alt="">  this city has already been saved ' + timercount;
      if (timercount == 0) {
        txtAlert.style.display = "none";
        clearInterval(time)

      }
    }, 900)


    return
  } else if (savedWord == "") {
    var time = setInterval(function () {
      timercount--;
      txtAlert.style.display = "block";

      txtAlert.innerHTML = '<img class ="alertimg" src="https://media.tenor.com/DCI2uoqFUvEAAAAd/the-office-the.gifd" alt=""> there is nothing to be saved ' + timercount;
      if (timercount == 0) {
        txtAlert.style.display = "none";
        clearInterval(time)

      }
    }, 900)
    console.log('no word here ');
    return
  } else {
    console.log(savedWord);
    console.log(savedLoc);
    savedLoc.push(savedWord);
    localStorage.setItem('Savedlocation', JSON.stringify(savedLoc));
    btnSaveLoc.disabled = true;
  }
})


init();
