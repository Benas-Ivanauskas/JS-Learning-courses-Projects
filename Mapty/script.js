'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//2) Using the Geoloaction API ----------------------------------------

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // const latitude = position.coords.latitude;
      // const longitude = position.coords.longitude;
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //{ latitude } and { longitude } are examples of destructuring assignment, where it allows you to create variables named latitude and longitude and assign them the values of the corresponding properties from position.coords.
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      //3) Displaying a Map Using Leaflet Library
      const map = L.map('map').setView(coords, 13); //after coords, 13-is zoom level

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coords)
      //   .addTo(map)
      //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      //   .openPopup();

      //3) display a Map Marker
      //we Gonna use on() instead of addEventListener() it comes from Leaflet library
      map.on('click', function (mapEvent) {
        // console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent(`Workout`)
          .openPopup();
      });
    },
    function () {
      alert(`Could not get your current position`);
    }
  );
}

//working because other.js is above than script.js and its like global
//Thats why Leaflet is global and we can use it!
// console.log(firstName);